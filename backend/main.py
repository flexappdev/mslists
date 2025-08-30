from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/", response_class=HTMLResponse)
async def read_root():
    return """
    <!doctype html>
    <html lang=\"en\">
    <head>
      <meta charset=\"utf-8\">
      <title>Backend API</title>
      <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\">
    </head>
    <body class=\"container py-5\">
      <h1>Backend API</h1>
      <p>This is the API service.</p>
    </body>
    </html>
    """

@app.get("/api")
async def api_root():
    return {"message": "Hello from backend API"}
