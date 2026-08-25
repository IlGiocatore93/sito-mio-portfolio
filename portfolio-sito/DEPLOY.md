# Guida al Deploy — Portfolio

Documentazione del processo reale seguito per portare questo portfolio online: dal repository GitHub al sito live, backend incluso. Non è una guida teorica — sono i passaggi (e i problemi) affrontati davvero.

**Stack di deploy:** GitHub → Vercel (frontend) + Render (backend) + Neon (database PostgreSQL)

---

## 1. Caricare il progetto su GitHub

```bash
git init
git add .
git commit -m "primo commit"
git branch -M main
git remote add origin https://github.com/IlGiocatore93/sito-mio-portfolio.git
git push -u origin main
```

---

## 2. Database PostgreSQL su Neon

Render permette un solo database gratuito per account — essendo già occupato da un altro progetto, ho usato [Neon](https://neon.tech) come alternativa gratuita e separata.

1. Registrazione su neon.tech
2. Creazione nuovo progetto/database
3. Copia della connection string (`postgresql://...`) dalla sezione "Connection Details"

![Dashboard Neon](deploy-screenshots/01-neon-dashboard.png)

---

## 3. Backend su Render

Web Service collegato al repository GitHub, con:

- **Root Directory:** `backend`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Variabili d'ambiente:**

| Chiave | Valore |
|---|---|
| `DATABASE_URL` | connection string di Neon |
| `RESEND_API_KEY` | chiave generata su resend.com |
| `NOTIFY_EMAIL` | l'indirizzo dove ricevere i messaggi |
| `FROM_EMAIL` | `onboarding@resend.dev` |
| `FRONTEND_URL` | (aggiunta dopo il passo 4) |

### Problema incontrato: versione Python troppo recente

Render usava di default **Python 3.14**, per cui `pydantic-core` non aveva ancora un pacchetto pronto e provava a compilarlo da zero — fallendo per un problema di permessi del filesystem in sandbox.

**Soluzione:** aggiunta variabile d'ambiente per forzare una versione stabile:

| Chiave | Valore |
|---|---|
| `PYTHON_VERSION` | `3.11.9` |

Backend live e funzionante su Render:

![Backend live su Render](deploy-screenshots/02-render-backend-live.png)

---

## 4. Frontend su Vercel

Progetto collegato allo stesso repository GitHub.

- **Framework Preset:** Vite
- **Root Directory:** vuoto (radice del progetto)

**Variabile d'ambiente:**

| Chiave | Valore |
|---|---|
| `VITE_API_URL` | URL del backend Render (es. `https://portfolio-backend-updh.onrender.com`) |

### Problema incontrato: permessi node_modules

Il primo deploy falliva con `sh: tsc: Permission denied`. La causa: la cartella `node_modules` era finita per errore nel repository Git — passando da Windows a Linux, i file eseguibili al suo interno perdevano i permessi corretti.

**Soluzione:**

```bash
git rm -r --cached node_modules
git commit -m "rimuovo node_modules dal repo"
git push
```

Deploy riuscito su Vercel, con l'anteprima live del sito:

![Deploy riuscito su Vercel](deploy-screenshots/03-vercel-deploy-ready.png)

---

## 5. Collegare backend e frontend (CORS)

Tornati su Render, aggiornata la variabile mancante sul backend con l'URL reale del frontend appena deployato:

| Chiave | Valore |
|---|---|
| `FRONTEND_URL` | `https://sito-mio-portfolio.vercel.app` |

Salvando, Render fa ripartire automaticamente il backend con la configurazione CORS corretta.

---

## 6. Test end-to-end

Form di contatto testato sul sito live: messaggio inviato dal browser → salvato nel database Neon → notifica ricevuta via email tramite Resend.

![Email di notifica ricevuta](deploy-screenshots/04-email-notifica-ricevuta.png)

---

## Riepilogo problemi risolti

| Problema | Causa | Soluzione |
|---|---|---|
| Build backend falliva | Python 3.14 troppo recente per `pydantic-core` | Variabile `PYTHON_VERSION=3.11.9` |
| Build frontend falliva (permessi) | `node_modules` tracciata da Git | `git rm -r --cached node_modules` |
| Form di contatto non funzionava | CORS non configurato con l'URL reale | Variabile `FRONTEND_URL` aggiornata |

---

**Live:** https://sito-mio-portfolio.vercel.app
