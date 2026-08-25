import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from database import Base, SessionLocal, engine, get_db
from email_service import send_contact_notification

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio Contact API", version="1.0.0")

# Origini consentite: il frontend in locale (Vite) e quello deployato.
# Aggiorna FRONTEND_URL con l'URL reale una volta fatto il deploy
# (stesso problema di CORS già affrontato nel Game Tracker — vedi Deathmatch).
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:4173",
    os.getenv("FRONTEND_URL", ""),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin for origin in ALLOWED_ORIGINS if origin],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "ok", "service": "portfolio-contact-api"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/api/contact", response_model=schemas.ContactMessageOut, status_code=201)
async def create_contact_message(
    payload: schemas.ContactMessageCreate, db: Session = Depends(get_db)
):
    db_message = models.ContactMessage(
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    sent = await send_contact_notification(payload.name, payload.email, payload.message)
    db_message.email_sent = "sent" if sent else "failed"
    db.commit()
    db.refresh(db_message)

    return db_message


@app.get("/api/contact", response_model=list[schemas.ContactMessageOut])
def list_contact_messages(db: Session = Depends(get_db)):
    """Endpoint di sola lettura per consultare lo storico messaggi.
    In produzione andrebbe protetto da autenticazione prima del deploy pubblico."""
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()
