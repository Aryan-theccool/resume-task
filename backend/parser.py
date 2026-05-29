import pypdf
from docx import Document
import os
import re

def _clean_pdf_text(text):
    """
    PDF extraction often produces text with missing spaces between words.
    This attempts to fix common issues.
    """
    # Insert space between a lowercase letter followed immediately by an uppercase letter
    text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)
    # Insert space between a letter and a digit (e.g., "Python3" → "Python 3")
    text = re.sub(r'([a-zA-Z])(\d)', r'\1 \2', text)
    text = re.sub(r'(\d)([a-zA-Z])', r'\1 \2', text)
    # Collapse multiple whitespace/newlines into a single space
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_text_from_pdf(file_path):
    text = ""
    try:
        with open(file_path, "rb") as f:
            reader = pypdf.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text(extraction_mode="layout") or page.extract_text() or ""
                text += page_text + " "
    except Exception as e:
        print(f"Error reading PDF {file_path}: {e}")
    return _clean_pdf_text(text)

def extract_text_from_docx(file_path):
    text = ""
    try:
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + " "
    except Exception as e:
        print(f"Error reading DOCX {file_path}: {e}")
    return text

def parse_resume(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    else:
        # Fallback for plain text or other
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()
        except:
            return ""
