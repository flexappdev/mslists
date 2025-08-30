from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "error": None, "success": False})

@app.post("/login", response_class=HTMLResponse)
async def login(request: Request, username: str = Form(...), password: str = Form(...)):
    if username == "admin" and password == "password":
        return templates.TemplateResponse("index.html", {"request": request, "success": True, "error": None})
    return templates.TemplateResponse("index.html", {"request": request, "error": "Invalid credentials", "success": False})
