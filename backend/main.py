import os
from typing import List, Optional

import requests
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGODB_DB", "AIDB")
LISTS_COLLECTION = os.getenv("LISTS_COLLECTION", "DAILY")
ITEMS_COLLECTION = os.getenv("MONGODB_COLLECTION", "ITEMS")

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
    """Return a small HTML status page."""
    status = "ok"
    try:
        client.admin.command("ping")
        list_count = list_collection.count_documents({})
        item_count = item_collection.count_documents({})
    except Exception:  # pragma: no cover - simple health check
        status = "error"
        list_count = 0
        item_count = 0
    return f"""
    <!doctype html>
    <html lang='en'>
    <head>
      <meta charset='utf-8'>
      <title>Backend API</title>
      <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' rel='stylesheet'>
    </head>
    <body class='container py-5'>
      <h1>Backend API</h1>
      <p>Status: {status}</p>
      <p>Database: {DB_NAME}</p>
      <p>Collections:</p>
      <ul>
        <li>{LISTS_COLLECTION} ({list_count} docs)</li>
        <li>{ITEMS_COLLECTION} ({item_count} docs)</li>
      </ul>
      <h2>Endpoints</h2>
      <ul>
        <li><a href='/list'>/list</a> - GET latest list, POST add list, PUT update list</li>
        <li><a href='/items'>/items</a> - GET latest items, POST add item, PUT update item</li>
        <li><a href='/images'>/images</a> - GET 100 random images</li>
        <li><a href='/docs'>Swagger documentation</a></li>
      </ul>
    </body>
    </html>
    """


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
