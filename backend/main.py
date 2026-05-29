from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import pandas as pd

from fastapi.responses import FileResponse
from database import SessionLocal, Candidate
from parser import parse_resume
from analyzer import analyze_resumes

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/upload-resumes")
async def upload_resumes(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    # Clear previous candidates so re-uploads don't stack up stale data
    db.query(Candidate).delete()
    db.commit()

    uploaded_candidates = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        text = parse_resume(file_path)
        if not text.strip():
            # Skip files that produced no extractable text
            continue

        # Try to extract name from filename (simple)
        name = file.filename.split('.')[0].replace('_', ' ').replace('-', ' ').title()
        
        candidate = Candidate(
            name=name,
            filename=file.filename,
            content=text
        )
        db.add(candidate)
        uploaded_candidates.append(name)
    
    db.commit()
    return {"message": f"Successfully uploaded {len(uploaded_candidates)} resumes", "candidates": uploaded_candidates}

@app.post("/analyze")
async def analyze(jd_text: str = Form(None), jd_file: UploadFile = File(None), db: Session = Depends(get_db)):
    # Determine JD text
    final_jd_text = ""
    if jd_file:
        file_path = os.path.join(UPLOAD_DIR, f"jd_{jd_file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(jd_file.file, buffer)
        final_jd_text = parse_resume(file_path)
    elif jd_text:
        final_jd_text = jd_text
    else:
        raise HTTPException(status_code=400, detail="Please provide either a JD text or a JD file")

    # Get all candidates from DB
    candidates = db.query(Candidate).all()
    if not candidates:
        raise HTTPException(status_code=400, detail="No resumes uploaded yet")

    resume_texts = [c.content for c in candidates]
    analysis_results = analyze_resumes(final_jd_text, resume_texts)

    # Update candidates with scores and ranks
    # Sort by score descending
    sorted_results = sorted(zip(candidates, analysis_results), key=lambda x: x[1]['score'], reverse=True)
    
    for rank, (candidate, result) in enumerate(sorted_results, start=1):
        candidate.score = result['score']
        candidate.rank = rank
        candidate.matching_skills = ",".join(result['matching_skills'])
        candidate.missing_skills = ",".join(result['missing_skills'])
        db.add(candidate)
    
    db.commit()
    return {"message": "Analysis complete", "top_candidate": sorted_results[0][0].name}

@app.get("/candidates")
async def get_candidates(db: Session = Depends(get_db)):
    candidates = db.query(Candidate).order_by(Candidate.rank.asc()).all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "filename": c.filename,
            "score": round(c.score, 2),
            "rank": c.rank,
            "matching_skills": c.matching_skills.split(",") if c.matching_skills else [],
            "missing_skills": c.missing_skills.split(",") if c.missing_skills else []
        }
        for c in candidates
    ]

@app.get("/export")
async def export_results(db: Session = Depends(get_db)):
    candidates = db.query(Candidate).order_by(Candidate.rank.asc()).all()
    data = [
        {
            "Name": c.name,
            "Score": c.score,
            "Rank": c.rank,
            "Matching Skills": c.matching_skills,
            "Missing Skills": c.missing_skills
        }
        for c in candidates
    ]
    df = pd.DataFrame(data)
    csv_path = "results.csv"
    df.to_csv(csv_path, index=False)
    
    return FileResponse(
        path=csv_path,
        filename="resume_screening_results.csv",
        media_type="text/csv"
    )

@app.post("/clear")
async def clear_data(db: Session = Depends(get_db)):
    db.query(Candidate).delete()
    db.commit()
    return {"message": "Data cleared"}
