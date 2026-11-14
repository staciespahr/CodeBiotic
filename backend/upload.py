# Receives uploaded files, validates them, and passes their 
# contents to the organizer.

from fastapi import APIRouter, UploadFile, File, HTTPException
from .html_organizer import organize_html

router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    if not file.filename or not file.filename.lower().endswith(
        (".html", ".vue")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only HTML and Vue files are supported."
        )

    contents = await file.read()

    try:
        html_code = contents.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400,
            detail="File must use UTF-8 encoding."
        )

    organized = organize_html(html_code)

    return {
        "filename": file.filename,
        "organized": organized
    }