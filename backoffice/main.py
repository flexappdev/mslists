import base64
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
MONGODB_DB = os.getenv("MONGODB_DB", "AIDB")
MONGODB_COLLECTION = os.getenv("MONGODB_COLLECTION", "ITEMS")

client = MongoClient(MONGODB_URI)
collection = client[MONGODB_DB][MONGODB_COLLECTION]

app = FastAPI()
templates = Jinja2Templates(directory="templates")
security = HTTPBasic(auto_error=False)


def authenticate(
    request: Request, credentials: HTTPBasicCredentials | None = Depends(security)
) -> str:
    username = password = None
    if credentials:
        username = credentials.username
        password = credentials.password
    else:
        cookie = request.cookies.get("auth")
        if cookie:
            try:
                decoded = base64.b64decode(cookie).decode()
                username, password = decoded.split(":", 1)
            except Exception:
                pass
    correct_username = secrets.compare_digest(username or "", ADMIN_USERNAME)
    correct_password = secrets.compare_digest(password or "", ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication",
            headers={"WWW-Authenticate": "Basic"},
        )
    return username  # type: ignore


@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    cookie = request.cookies.get("auth")
    if cookie:
        try:
            decoded = base64.b64decode(cookie).decode()
            username, password = decoded.split(":", 1)
            if secrets.compare_digest(username, ADMIN_USERNAME) and secrets.compare_digest(
                password, ADMIN_PASSWORD
            ):
                return RedirectResponse(url="/dashboard", status_code=status.HTTP_302_FOUND)
        except Exception:
            pass
    return templates.TemplateResponse("login.html", {"request": request, "error": None})


@app.post("/login", response_class=HTMLResponse)
async def login(
    request: Request,
    username: str = Form(...),
    password: str = Form(...),
    remember: bool = Form(False),
):
    if not (
        secrets.compare_digest(username, ADMIN_USERNAME)
        and secrets.compare_digest(password, ADMIN_PASSWORD)
    ):
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": "Invalid credentials"},
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
    response = RedirectResponse(url="/dashboard", status_code=status.HTTP_303_SEE_OTHER)
    if remember:
        token = base64.b64encode(f"{username}:{password}".encode()).decode()
        response.set_cookie("auth", token, max_age=30 * 24 * 3600)
    return response


@app.get("/dashboard", response_class=HTMLResponse)
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
    return RedirectResponse(url="/dashboard", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/update/{item_id}", response_class=HTMLResponse)
async def update_item(
    item_id: str,
    name: str = Form(...),
    username: str = Depends(authenticate),
):
    collection.update_one({"_id": ObjectId(item_id)}, {"$set": {"name": name}})
    return RedirectResponse(url="/dashboard", status_code=status.HTTP_303_SEE_OTHER)


@app.post("/delete/{item_id}", response_class=HTMLResponse)
async def delete_item(item_id: str, username: str = Depends(authenticate)):
    collection.delete_one({"_id": ObjectId(item_id)})
    return RedirectResponse(url="/dashboard", status_code=status.HTTP_303_SEE_OTHER)
