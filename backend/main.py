import os
import random
import secrets
from pathlib import Path
from typing import List, Optional

import markdown
import requests
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import CollectionInvalid

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB", "AIDB")
LISTS_COLLECTION = os.getenv("LISTS_COLLECTION", "DAILY")
ITEMS_COLLECTION = os.getenv("ITEMS_COLLECTION", "ITEMS")
BASE_DIR = Path(__file__).resolve().parents[1]
security = HTTPBasic(auto_error=False)

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
list_collection = db[LISTS_COLLECTION]
item_collection = db[ITEMS_COLLECTION]

app = FastAPI(title="Backend API")


def verify(credentials: Optional[HTTPBasicCredentials] = Depends(security)) -> str:
    """Validate basic auth credentials."""
    username = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    if not username or not password:
        raise HTTPException(status_code=500, detail="ADMIN credentials not set")
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Basic"},
        )
    correct_username = secrets.compare_digest(credentials.username, username)
    correct_password = secrets.compare_digest(credentials.password, password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


class ListModel(BaseModel):
    name: str
    items: List[str] = []


class ItemModel(BaseModel):
    name: str
    image: Optional[str] = None


@app.get("/", response_class=HTMLResponse)
async def root(user: str = Depends(verify)) -> str:
    """Return the HTML index page with service status."""
    # MongoDB status and counts
    try:
        client.admin.command("ping")
        mongo_status = "ok"
        collection_status = []
        for name in db.list_collection_names():
            try:
                count = db[name].count_documents({})
                collection_status.append(f"{name}: {count}")
            except Exception:
                collection_status.append(f"{name}: error")
    except Exception:  # pragma: no cover - simple health check
        mongo_status = "error"
        collection_status = []
    collection_status_html = "".join(f"<li>{c}</li>" for c in collection_status)

    # Check frontend site availability
    sites = {
        "yb100": "http://localhost:15000",
        "fs": "http://localhost:16000",
        "sp": "http://localhost:17000",
        "xmas": "http://localhost:18000",
    }
    site_status = {}
    for name, url in sites.items():
        try:
            requests.get(url, timeout=2).raise_for_status()
            site_status[name] = "ok"
        except Exception:
            site_status[name] = "error"
    site_status_html = "".join(
        f"<li>{name}: {status}</li>" for name, status in site_status.items()
    )

    # LLM status
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            r = requests.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
                params={"key": gemini_key},
                json={"contents": [{"parts": [{"text": "AI today"}]}]},
                timeout=10,
            )
            r.raise_for_status()
            data = r.json()
            text = (
                data.get("candidates", [{}])[0]
                .get("content", {})
                .get("parts", [{}])[0]
                .get("text", "")
            )
            llm_status = f"ok: {text}"
        except Exception as exc:
            llm_status = f"error: {exc}"
    else:
        llm_status = "not configured"

    # README content
    try:
        readme_html = markdown.markdown((BASE_DIR / "README.md").read_text())
    except Exception:
        readme_html = "<p>README not found</p>"

    # Backlog checklist
    try:
        backlog_lines = (BASE_DIR / "BACKLOG.md").read_text().splitlines()
        items = [line[2:] for line in backlog_lines if line.startswith("- ")]
        backlog_html = "<ul>" + "".join(
            f"<li><input type='checkbox' disabled> {item}</li>" for item in items
        ) + "</ul>"
    except Exception:
        backlog_html = "<p>BACKLOG not found</p>"

    return f"""<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>MSLISTS</title>
  <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>
  <style>
    body {{
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }}
    #random-item {{
      width: 200px;
    }}
  </style>
</head>
<body class='d-flex flex-column min-vh-100'>
  <header class='navbar navbar-dark bg-dark fixed-top'>
    <div class='container-fluid'>
      <span class='navbar-brand mb-0 h1'>MSLISTS</span>
    </div>
  </header>
  <div id='random-item' class='position-fixed top-50 end-0 translate-middle-y bg-light border p-3'>Right Item</div>
  <main class='flex-shrink-0 container py-4'>
    <h1>MSLISTS</h1>
    <p class='lead'>Overview of API, sites and services.</p>
    <h2>Status</h2>
    <ul>
      <li>API: ok</li>
      <li>Mongo: {mongo_status} (DB: {DB_NAME})<ul>{collection_status_html}</ul></li>
      <li>LLM: {llm_status}</li>
      <li>Sites:<ul>{site_status_html}</ul></li>
    </ul>
    <h2>Links</h2>
    <ul>
      <li><a href='http://localhost:15000'>yb100</a></li>
      <li><a href='http://localhost:16000'>fs</a></li>
      <li><a href='http://localhost:17000'>sp</a></li>
      <li><a href='http://localhost:18000'>xmas</a></li>
    </ul>
    <h2>Readme</h2>
    {readme_html}
    <h2>Backlog</h2>
    {backlog_html}
  </main>
  <footer class='footer mt-auto py-3 bg-light fixed-bottom' style='z-index:1030;'>
    <div class='container d-flex justify-content-between'>
      <div>
        <button class='btn btn-link p-0 me-3' onclick="location.href='/about'">About</button>
        <button class='btn btn-link p-0' onclick='loadRandomItem()'>Random</button>
      </div>
      <span class='text-muted'>&copy; 2025 Mat Siems LTD</span>
    </div>
  </footer>
  <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'></script>
  <script>
    function loadRandomItem() {{
      fetch('/items')
        .then(r => r.json())
        .then(items => {{
          if(items.length > 0) {{
            const item = items[Math.floor(Math.random()*items.length)];
            document.getElementById('random-item').innerText = item.name || JSON.stringify(item);
          }} else {{
            document.getElementById('random-item').innerText = 'No items';
          }}
        }});
    }}
  </script>
</body>
</html>
"""


@app.get("/about", response_class=HTMLResponse)
async def about() -> str:
    """Simple about page."""
    return """<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>About</title>
  <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>
</head>
<body class='p-4'>
  <h1>About MSLISTS</h1>
  <p>MSLISTS backend API.</p>
</body>
</html>
"""


@app.get("/mongo-test")
async def mongo_test():
    """Verify MongoDB connection and ensure default collections exist."""
    try:
        client.admin.command("ping")
        collections = db.list_collection_names()
        if LISTS_COLLECTION not in collections:
            try:
                db.create_collection(LISTS_COLLECTION)
            except CollectionInvalid:
                pass
        if ITEMS_COLLECTION not in collections:
            try:
                db.create_collection(ITEMS_COLLECTION)
            except CollectionInvalid:
                pass
        collections = db.list_collection_names()
        return {
            "status": "ok",
            "database": DB_NAME,
            "collections": collections,
        }
    except Exception as exc:  # pragma: no cover - health check
        return {"status": "error", "detail": str(exc)}


@app.get("/lists")
async def get_lists(keyword: Optional[str] = None):
    """Return all lists, optionally filtered by keyword in the _id."""
    docs = list_collection.find()
    lists = []
    for doc in docs:
        doc["_id"] = str(doc["_id"])
        if not keyword or keyword.lower() in doc["_id"].lower():
            lists.append(doc)
    return lists


@app.get("/list")
async def get_list(id: Optional[str] = None, keyword: Optional[str] = None):
    """Return a random list or a specific one by id/keyword."""
    if id:
        try:
            doc = list_collection.find_one({"_id": ObjectId(id)})
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid id")
        if not doc:
            raise HTTPException(status_code=404, detail="List not found")
        doc["_id"] = str(doc["_id"])
        return doc
    docs = list(list_collection.find())
    if keyword:
        docs = [d for d in docs if keyword.lower() in str(d["_id"]).lower()]
    if not docs:
        raise HTTPException(status_code=404, detail="No list found")
    doc = random.choice(docs)
    doc["_id"] = str(doc["_id"])
    return doc


@app.post("/list")
async def add_list(list_data: ListModel):
    result = list_collection.insert_one(list_data.model_dump())
    return {"_id": str(result.inserted_id)}


@app.put("/list/{list_id}")
async def update_list(list_id: str, list_data: ListModel):
    result = list_collection.update_one({"_id": ObjectId(list_id)}, {"$set": list_data.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="List not found")
    return {"status": "updated"}


@app.get("/items")
async def get_items(id: Optional[str] = None, limit: int = 10):
    """Return latest items or a specific item."""
    if id:
        doc = item_collection.find_one({"_id": ObjectId(id)})
        if not doc:
            raise HTTPException(status_code=404, detail="Item not found")
        doc["_id"] = str(doc["_id"])
        return doc
    docs = item_collection.find().sort("_id", -1).limit(limit)
    items = []
    for d in docs:
        d["_id"] = str(d["_id"])
        items.append(d)
    return items


@app.post("/items")
async def add_item(item: ItemModel):
    result = item_collection.insert_one(item.model_dump())
    return {"_id": str(result.inserted_id)}


@app.put("/items/{item_id}")
async def update_item(item_id: str, item: ItemModel):
    result = item_collection.update_one({"_id": ObjectId(item_id)}, {"$set": item.model_dump()})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"status": "updated"}


@app.get("/images")
async def get_images():
    """Return 100 random image URLs from external service."""
    images: List[Optional[str]] = []
    for _ in range(100):
        try:
            r = requests.get("https://app.flexappdev.com/api/random-image", timeout=5)
            r.raise_for_status()
            data = r.json()
            image_url = data.get("image") or data.get("url") or data
            images.append(image_url)
        except Exception:
            images.append(None)
    return images
