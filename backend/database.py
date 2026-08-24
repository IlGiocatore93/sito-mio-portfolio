import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# In locale usa SQLite (zero setup). In produzione, imposta DATABASE_URL
# con una connessione PostgreSQL (es. Render), stesso approccio del Game Tracker.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./contact_messages.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
