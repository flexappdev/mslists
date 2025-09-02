import os
from typing import List, Optional

import requests
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import CollectionInvalid

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB", "AIDB")
DEFAULT_COLLECTION = os.getenv("MONGODB_COLLECTION", "ITEMS")
LISTS_COLLECTION = os.getenv("LISTS_COLLECTION", DEFAULT_COLLECTION)
ITEMS_COLLECTION = os.getenv("ITEMS_COLLECTION", DEFAULT_COLLECTION)

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
list_collection = db[LISTS_COLLECTION]
item_collection = db[ITEMS_COLLECTION]

app = FastAPI(title="Backend API")


class ListModel(BaseModel):
    name: str
    items: List[str] = []


class ItemModel(BaseModel):
    name: str
    image: Optional[str] = None


@app.get("/", response_class=HTMLResponse)
async def root() -> str:
    """Return the HTML index page with service status."""
    # MongoDB status and counts
    try:
        client.admin.command("ping")
        mongo_status = "ok"
        try:
            list_count = list_collection.count_documents({})
        except Exception:
            list_count = 0
        try:
            item_count = item_collection.count_documents({})
        except Exception:
            item_count = 0
    except Exception:  # pragma: no cover - simple health check
        mongo_status = "error"
        list_count = 0
        item_count = 0

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
    llm_url = os.getenv("LLM_API_URL")
    if llm_url:
        try:
            requests.get(llm_url, timeout=5).raise_for_status()
            llm_status = "ok"
        except Exception:
            llm_status = "error"
    else:
        llm_status = "not configured"

    return f"""<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <title>Backend Index</title>
  <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>
  <style>
    body {{
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }}
  </style>
</head>
<body class='d-flex flex-column min-vh-100'>
  <header class='navbar navbar-dark bg-dark fixed-top'>
    <div class='container-fluid'>
      <span class='navbar-brand mb-0 h1'>Backend Index</span>
    </div>
  </header>
  <main class='flex-shrink-0 container py-4'>
    <h1>Backend Index</h1>
    <p class='lead'>Overview of API, sites and services.</p>
    <h2>Status</h2>
    <ul>
      <li>API: ok</li>
      <li>Mongo: {mongo_status} (DB: {DB_NAME}, {LISTS_COLLECTION} {list_count}, {ITEMS_COLLECTION} {item_count})</li>
      <li>LLM: {llm_status}</li>
      <li>Sites:<ul>{site_status_html}</ul></li>
    </ul>
    <h2>Links</h2>
    <ul>
      <li><a href='http://localhost:15000'>Frontend</a></li>
      <li><a href='http://localhost:15001'>Backend</a></li>
      <li><a href='/docs'>Docs</a></li>
      <li>Frontend Sites
        <ul>
          <li><a href='http://localhost:15000'>yb100</a></li>
          <li><a href='http://localhost:16000'>fs</a></li>
          <li><a href='http://localhost:17000'>sp</a></li>
          <li><a href='http://localhost:18000'>xmas</a></li>
        </ul>
      </li>
    </ul>
    <h2>Endpoints</h2>
    <ul>
      <li><a href='/list'>/list</a> - GET latest list, POST add list, PUT update list</li>
      <li><a href='/items'>/items</a> - GET latest items, POST add item, PUT update item</li>
      <li><a href='/images'>/images</a> - GET 100 random images</li>
      <li><a href='/mongo-test'>/mongo-test</a> - verify MongoDB connection</li>
      <li><a href='/docs'>Swagger documentation</a></li>
    </ul>
    <h2>Readme</h2>
    <p><a href='../README.md'>README</a></p>
    <h2>Backlog</h2>
    <p><a href='../BACKLOG.md'>BACKLOG</a></p>
  </main>
  <footer class='footer mt-auto py-3 bg-light fixed-bottom'>
    <div class='container'>
      <span class='text-muted'>Backend API</span>
    </div>
  </footer>
  <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'></script>
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


@app.get("/list")
async def get_list(id: Optional[str] = None, keyword: Optional[str] = None):
    """Return the latest list or a specific one by id/keyword."""
    if id:
        doc = list_collection.find_one({"_id": ObjectId(id)})
        if not doc:
            raise HTTPException(status_code=404, detail="List not found")
        doc["_id"] = str(doc["_id"])
        return doc
    query = {}
    if keyword:
        query["name"] = {"$regex": keyword, "$options": "i"}
    doc = list_collection.find_one(query, sort=[("_id", -1)])
    if not doc:
        raise HTTPException(status_code=404, detail="No list found")
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
