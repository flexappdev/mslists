import pytest
from fastapi import HTTPException
from fastapi.security import HTTPBasicCredentials

import main


def test_verify_success(monkeypatch):
    monkeypatch.setenv("ADMIN_USERNAME", "user")
    monkeypatch.setenv("ADMIN_PASSWORD", "pass")
    creds = HTTPBasicCredentials(username="user", password="pass")
    assert main.verify(creds) == "user"


def test_verify_missing_env(monkeypatch):
    monkeypatch.delenv("ADMIN_USERNAME", raising=False)
    monkeypatch.delenv("ADMIN_PASSWORD", raising=False)
    creds = HTTPBasicCredentials(username="x", password="y")
    with pytest.raises(HTTPException) as exc:
        main.verify(creds)
    assert exc.value.status_code == 500


def test_verify_wrong_credentials(monkeypatch):
    monkeypatch.setenv("ADMIN_USERNAME", "user")
    monkeypatch.setenv("ADMIN_PASSWORD", "pass")
    creds = HTTPBasicCredentials(username="user", password="wrong")
    with pytest.raises(HTTPException) as exc:
        main.verify(creds)
    assert exc.value.status_code == 401
