from sqlalchemy import create_engine, Column, Integer, String, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./resumes.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    filename = Column(String)
    content = Column(Text)
    score = Column(Float, default=0.0)
    rank = Column(Integer, default=0)
    matching_skills = Column(Text) # Comma separated
    missing_skills = Column(Text)   # Comma separated

Base.metadata.create_all(bind=engine)
