"""
Simple static file server for Dig it Up directory website
"""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Dig it Up - Directory Website")

# Base directory from environment variable for portability
BASE_DIR = os.getenv('APP_BASE_DIR', '/app')

# Serve static files from root app directory
app.mount("/css", StaticFiles(directory=os.path.join(BASE_DIR, "css")), name="css")
app.mount("/js", StaticFiles(directory=os.path.join(BASE_DIR, "js")), name="js")
app.mount("/images", StaticFiles(directory=os.path.join(BASE_DIR, "images")), name="images")
app.mount("/categories", StaticFiles(directory=os.path.join(BASE_DIR, "categories"), html=True), name="categories")
app.mount("/tools", StaticFiles(directory=os.path.join(BASE_DIR, "tools"), html=True), name="tools")

# Serve HTML pages from root
@app.get("/")
async def root():
    return FileResponse(os.path.join(BASE_DIR, "index"))

@app.get("/{page}")
async def serve_page(page: str):
    file_path = os.path.join(BASE_DIR, f"{page}")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join(BASE_DIR, "index"))

@app.get("/health")
async def health():
    return {"status": "healthy"}
