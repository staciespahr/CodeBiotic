# Starts the FastAPI application and connects the frontend 
# to the backend.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .upload import router as upload_router

app = FastAPI(title="CodeBiotic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["POST"],
    allow_headers=["*"],
)

app.include_router(upload_router)


@app.get("/")
def home():
    return {"message": "CodeBiotic backend is running"}