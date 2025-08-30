import os
import secrets
from typing import List

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Form, HTTPException, Request, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.templating import Jinja2Templates
from pymongo import MongoClient

load_dotenv()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "changeme")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB = os.getenv("MONGODB_DB", "mslists")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "items")

client = MongoClient(MONGODB_URI)
collection = client[MONGODB_DB][MONGODB_COLLECTION]

app = FastAPI()
templates = Jinja2Templates(directory="templates")
security = HTTPBasic()


def authenticate(credentials: HTTPBasicCredentials = Depends(security)) -> str:
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request, username: str = Depends(authenticate)):
    items: List[dict] = list(collection.find())
    return templates.TemplateResponse(
        "dashboard.html", {"request": request, "items": items, "username": username}
    )


@app.post("/create", response_class=HTMLResponse)
async def create_item(
    request: Request,
    name: str = Form(...),
    username: str = Depends(authenticate),
):
    collection.insert_one({"name": name})
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/delete/{item_id}", response_class=HTMLResponse)
async def delete_item(item_id: str, username: str = Depends(authenticate)):
    collection.delete_one({"_id": ObjectId(item_id)})
    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
