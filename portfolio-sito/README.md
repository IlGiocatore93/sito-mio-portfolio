# Portfolio — Giovanni Biancoli 🎮

Il mio sito portfolio, pensato per raccontare il mio percorso verso lo sviluppo Fullstack con un parallelismo tra modalità di gioco e sezioni della mia vita/carriera. Il tema gaming è il *packaging*: sotto, i contenuti restano concreti e verificabili — percorso, competenze, progetti veri.

🔗 **Demo live:** https://sito-mio-portfolio.vercel.app

## Screenshot

Singleplayer — il pannello di apertura con foto e stack tecnico
![Singleplayer](screenshots-readme/01-singleplayer.png)

Multiplayer — soft skill e lavoro di squadra
![Multiplayer](screenshots-readme/02-multiplayer.png)

Capture the Flag — i progetti, con screenshot delle app vere
![Capture the Flag](screenshots-readme/03-capture-the-flag.png)

Deathmatch — i bug affrontati, raccontati per esteso
![Deathmatch](screenshots-readme/04-deathmatch.png)

Survival — cosa sto imparando ora
![Survival](screenshots-readme/05-survival.png)

Extra Life — form di contatto, CV, link social
![Extra Life](screenshots-readme/06-extra-life.png)

Il sito è interamente tradotto in inglese, toggle incluso
![Deathmatch in inglese](screenshots-readme/07-deathmatch-en.png)

L'easter egg — un quiz lampo nascosto dietro l'icona del controller nell'header
![Quiz easter egg](screenshots-readme/08-quiz-easter-egg.png)

Il bottone email apre una scelta tra Gmail, Outlook e Yahoo, oltre alla copia diretta dell'indirizzo — nessun accesso a caselle di posta richiesto
![Modal email](screenshots-readme/09-email-modal.png)

I tre CV (completo, sintetico, formato Europeo) si possono anche visualizzare in anteprima prima di scaricarli
![Anteprima CV](screenshots-readme/10-cv-preview.png)

## Perché questo concept

Sono cresciuto con i videogiochi come passione, prima di trasformarla in un mestiere. Invece del solito portfolio a scroll verticale, ho voluto qualcosa che raccontasse anche *come* penso, non solo *cosa* so fare — da qui l'idea di sei sezioni in stile "modalità di gioco", navigabili come pannelli scorrevoli invece che con lo scroll classico.

## Le 6 sezioni

| Modalità | Contenuto |
|---|---|
| 🕹️ **Singleplayer** | Chi sono, il mio percorso, come sono arrivato allo sviluppo |
| 🤝 **Multiplayer** | Soft skill, lavoro di squadra |
| 🚩 **Capture the Flag** | I progetti, con screenshot e link a demo/repository |
| 🐛 **Deathmatch** | Problem solving, i bug veri che ho affrontato e come li ho risolti |
| 🌱 **Survival** | Cosa sto imparando ora, crescita continua |
| ❤️ **Extra Life** | Contatti — form, CV, link social |

## L'easter egg

Un piccolo quiz lampo (5 domande a tema dev/gaming, 12 secondi a testa) nascosto dietro l'icona del controller nell'header. Rispondendo bene ad almeno 4 su 5, si sblocca un piccolo "achievement" — un badge permanente nell'header e un messaggio di ringraziamento con un'animazione a tema (un omino pixel-art che pianta una bandierina "GG").

## Stack

**Frontend**
- React + TypeScript
- Framer Motion (transizioni tra sezioni, swipe su mobile)
- CSS puro con design token (nessun framework CSS esterno)
- Traduzione IT/EN completa, gestita via file di contenuto separati

**Backend** (per il form di contatto)
- FastAPI + SQLAlchemy
- PostgreSQL (Neon, piano gratuito)
- Notifica email automatica via Resend quando arriva un messaggio

**Deploy**
- Frontend su Vercel
- Backend su Render

## Setup in locale

### Frontend

```bash
npm install
npm run dev
```

Crea un file `.env` nella root (vedi `.env.example`) con l'URL del backend:

```
VITE_API_URL=http://localhost:8000
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env       # poi compila le variabili
uvicorn main:app --reload --port 8000
```

Istruzioni complete (incluso il deploy) nel [README del backend](./backend/README.md).

## Problemi affrontati nel deploy (vale la pena ricordarli)

Il deploy in produzione non è mai stato solo "premi un bottone" — qualche esempio:

- **Python troppo recente**: Render usava di default Python 3.14, per cui `pydantic-core` non aveva ancora un pacchetto pronto e provava a compilarlo da zero (fallendo per permessi del filesystem). Risolto forzando Python 3.11 tramite variabile d'ambiente.
- **`node_modules` finita nel repository**: causava errori di permessi in build su Vercel (file eseguibili con permessi persi passando da Windows a Linux). Risolto rimuovendola dal tracciamento Git.
- **Variabili d'ambiente e build Docker**: per i servizi basati su Dockerfile, le variabili configurate su Render non entrano automaticamente nella build — vanno dichiarate esplicitamente con `ARG`/`ENV` nel Dockerfile stesso.

## Cosa manca / prossimi passi

- Dominio email personalizzato per le notifiche (per ora usa il dominio di test di Resend)
- Mini dashboard per consultare lo storico messaggi salvati nel database
- Possibili nuove domande per il quiz, per tenerlo fresco nel tempo

---

Creato da [Giovanni Biancoli](https://github.com/IlGiocatore93)
