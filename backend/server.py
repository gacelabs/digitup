"""
Simple static file server for Dig it Up directory website
"""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI(title="Dig it Up - Directory Website")

# Serve static files from root app directory
app.mount("/css", StaticFiles(directory="/app/css"), name="css")
app.mount("/js", StaticFiles(directory="/app/js"), name="js")
app.mount("/images", StaticFiles(directory="/app/images"), name="images")
app.mount("/categories", StaticFiles(directory="/app/categories", html=True), name="categories")
app.mount("/tools", StaticFiles(directory="/app/tools", html=True), name="tools")

# Serve HTML pages from root
@app.get("/")
async def root():
    return FileResponse("/app/index.html")

@app.get("/{page}.html")
async def serve_page(page: str):
    file_path = f"/app/{page}.html"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return FileResponse("/app/index.html")

@app.get("/health")
async def health():
    return {"status": "healthy"}
