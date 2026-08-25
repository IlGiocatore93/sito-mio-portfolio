# Backend — Form di contatto portfolio

API minimale in FastAPI che riceve i messaggi dal form "Extra Life" del portfolio,
li salva in un database e invia una notifica email tramite [Resend](https://resend.com).

Stesso approccio (FastAPI + SQLAlchemy) già usato nel Game Tracker.

## Come funziona

1. Il form invia una richiesta `POST /api/contact` con nome, email e messaggio
2. Il messaggio viene salvato nel database (SQLite in locale, PostgreSQL in produzione)
3. Viene inviata una notifica email al proprietario del portfolio via Resend
4. Se l'email fallisce, il messaggio resta comunque salvato (non si perde nulla)

## Setup in locale

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

copy .env.example .env       # Windows
# cp .env.example .env       # macOS/Linux
```

Apri `.env` e compila almeno `RESEND_API_KEY` (la trovi sulla dashboard di
Resend dopo la registrazione gratuita) e `NOTIFY_EMAIL`.

Avvia il server:

```bash
uvicorn main:app --reload --port 8000
```

Documentazione interattiva (Swagger) su `http://localhost:8000/docs`.

## Collegare il frontend

Nel progetto React, crea un file `.env` (nella root, non in `backend/`) con:

```
VITE_API_URL=http://localhost:8000
```

In produzione, aggiorna questo valore con l'URL del backend deployato.

## Deploy (stesso flusso del Game Tracker su Render)

1. Crea un nuovo **Web Service** su Render, puntando alla cartella `backend/`
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Crea un database **PostgreSQL** gratuito su Render e collega `DATABASE_URL`
   alle variabili d'ambiente del servizio
5. Aggiungi le altre variabili d'ambiente (`RESEND_API_KEY`, `NOTIFY_EMAIL`,
   `FROM_EMAIL`, `FRONTEND_URL`) dal pannello Render
6. **Importante**: `FRONTEND_URL` deve combaciare esattamente con l'URL del
   sito deployato (es. Vercel), altrimenti si ripresenta lo stesso problema
   di CORS già visto nel Game Tracker

## Verificare un dominio custom su Resend (opzionale)

Di default le email partono da `onboarding@resend.dev` (dominio di test,
funziona subito ma è meno professionale come mittente). Per usare un dominio
personalizzato tipo `noreply@tuosito.com`, servono record DNS (SPF/DKIM) da
configurare presso il tuo provider di dominio — vedi la guida ufficiale
Resend. Non necessario per far funzionare il form, solo per un tocco più
curato.

## Endpoint disponibili

| Metodo | Path | Descrizione |
|---|---|---|
| GET | `/health` | Controllo che il servizio sia attivo |
| POST | `/api/contact` | Invia un nuovo messaggio dal form |
| GET | `/api/contact` | Elenco messaggi ricevuti (⚠️ da proteggere con autenticazione prima di esporlo pubblicamente) |

## Nota di sicurezza prima del deploy pubblico

L'endpoint `GET /api/contact` al momento è aperto a chiunque conosca l'URL.
Va bene per svilupparlo e testarlo in locale, ma prima di mettere il backend
online conviene aggiungere una protezione semplice (es. una API key da
passare in header, o rimuovere del tutto l'endpoint se non ti serve
consultare i messaggi da browser).
