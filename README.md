# mslists

This repository contains the Docker setup for the backend, backoffice, and multiple React frontends.

## Running locally

1. Ensure Docker is installed.
2. Copy `.env.example` to `.env` and adjust values as needed.
3. Execute `./start.sh` to rebuild and start all services.

### Environment variables

The `.env` file controls service configuration. Key variables include:

- `ADMIN_USERNAME` / `ADMIN_PASSWORD` – credentials for the backoffice.
- `MONGODB_URI` – MongoDB connection string.
- `MONGODB_DB` – database name.
- `MONGODB_COLLECTION` – default MongoDB collection name.
- `LISTS_COLLECTION` – optional collection for lists.
- `ITEMS_COLLECTION` – optional collection for items.

### Service endpoints

Once running, the following endpoints are available:

- **Backend API:** http://localhost:15001
  - `/list` – GET latest list or fetch by `id`/`keyword`, POST to create, PUT to update.
  - `/items` – GET recent items or fetch by `id`, POST to create, PUT to update.
  - `/images` – GET 100 random image URLs.
- **Swagger Docs:** http://localhost:15001/docs
- **Backoffice:** http://localhost:15002 (HTTP Basic auth with `ADMIN_USERNAME` / `ADMIN_PASSWORD`)
- **Frontends:**
  - http://localhost:15000 (yb100)
  - http://localhost:16000 (fs)
  - http://localhost:17000 (sp)
  - http://localhost:18000 (xmas)
