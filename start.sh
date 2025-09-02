#!/bin/bash
set -e
docker compose down --volumes --remove-orphans
docker compose build --no-cache
docker compose up -d

echo "- **Backend API:** http://localhost:15001"
echo "- **Swagger Docs:** http://localhost:15001/docs"
echo "- **Backoffice:** http://localhost:15002"
echo "- **Frontends:**"
echo "  - http://localhost:15000 (yb100)"
echo "  - http://localhost:16000 (fs)"
echo "  - http://localhost:17000 (sp)"
echo "  - http://localhost:18000 (xmas)"
