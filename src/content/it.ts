export interface Project {
  id: string;
  name: string;
  tag: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
}

export interface Section {
  id: string;
  navLabel: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  projects?: Project[];
  isContact?: boolean;
}

export const it = {
  meta: {
    siteName: "Giovanni Biancoli",
    langToggleLabel: "EN",
    levelLabel: "Livello",
    roleTag: "Fullstack Developer in formazione",
    locationTag: "Castel San Pietro Terme, IT",
  },
  sections: [
    {
      id: "singleplayer",
      navLabel: "Singleplayer",
      title: "Singleplayer",
      subtitle: "🕹️ Il mio percorso, un livello alla volta",
      paragraphs: [
        `La curiosità è nata presto: da bambino guardavo mia madre lavorare al computer, i miei cugini scaricare giochi e film, montare i loro PC pezzo per pezzo — e mi chiedevo come funzionasse tutto quel mondo dietro lo schermo. Da lì è cresciuta una passione per i videogiochi che con gli anni si è trasformata in qualcosa di più tecnico: volevo capire davvero come si costruisce un'applicazione, come "gira" sul computer, come un videogioco viene creato e messo online.`,
        `Il percorso verso lo sviluppo, però, non è stato diretto. Prima di scrivere la mia prima riga di codice ho passato anni in magazzino, in logistica, dietro un banco commerciale — lavori concreti, fatti di scadenze vere e problemi da risolvere sul momento.`,
        `La svolta è arrivata quando ho deciso di tornare a scuola: prima un diploma da Ragioniere, poi l'ITS come Tecnico Cloud DevOps — 2000 ore tra teoria e 800 di stage sul campo, tra reti, configurazioni, deploy e cloud. Nel frattempo ho iniziato a lavorare già in ambito IT, tra assistenza clienti e gestione di sistemi di rete.`,
        `Oggi sto costruendo le basi per diventare Fullstack Developer: quella curiosità di bambino su "come funziona" è diventata un mestiere.`,
      ],
    },
    {
      id: "multiplayer",
      navLabel: "Multiplayer",
      title: "Multiplayer",
      subtitle: "🤝 Nessuno vince una partita da solo",
      paragraphs: [
        `Il lavoro di squadra è stato fondamentale fin dall'inizio della mia carriera, in ogni ruolo che ho ricoperto.`,
        `Gli anni passati in magazzino mi hanno insegnato il rispetto per gli orari e il senso di responsabilità: in un team che lavora su turni, ogni ritardo o mancanza pesa su chi ti sta vicino.`,
        `Nell'assistenza clienti in filiale, durante lo stage, ho imparato l'umiltà — trattare tutti alla pari, senza mai sentirsi al di sopra di nessuno, mantenendo sempre un approccio professionale.`,
        `Ma la lezione più importante l'ho portata con me sin dall'inizio: ascoltare prima di agire. Capire davvero cosa viene chiesto, invece di procedere di testa mia, rispettando il ruolo di chi ha più esperienza. È un atteggiamento che considero la base di qualsiasi lavoro di squadra, in ufficio come in un team di sviluppo.`,
      ],
    },
    {
      id: "capture-the-flag",
      navLabel: "Capture the Flag",
      title: "Capture the Flag",
      subtitle: "🚩 I progetti conquistati",
      paragraphs: [],
      projects: [
        {
          id: "game-tracker",
          name: "Game Tracker",
          tag: "il progetto principale",
          description:
            "App fullstack per tracciare i videogiochi posseduti e giocati, con un sistema di achievement ispirato ai trofei PlayStation. Backend in FastAPI e PostgreSQL, frontend in React e TypeScript, ricerca titoli integrata con IGDB, autenticazione JWT, deploy live su Render con pipeline CI/CD su GitHub Actions.",
          demoUrl: "https://gametracker-frontend-wpzb.onrender.com",
          repoUrl: "https://github.com/IlGiocatore93/game-tracker-app",
        },
        {
          id: "gallery-categories",
          name: "Galleria - Tipologie",
          tag: "secondo progetto scolastico",
          description:
            "Applicazione desktop con backend a microservizi (Flask, containerizzati in Docker) e MongoDB, per gestire e classificare gallerie di immagini. Include riconoscimento automatico di oggetti tramite YOLO e OpenCV, autenticazione JWT, sincronizzazione client-server e script di setup completamente automatizzati.",
          repoUrl:
            "https://github.com/IlGiocatore93/Project-Work---SECONDO-ANNO---GIOVANNI-BIANCOLI",
        },
        {
          id: "gallery-movies",
          name: "Galleria - Film Preferiti",
          tag: "primo progetto scolastico",
          description:
            "Il mio primo progetto personale: un'applicazione desktop in Python (Tkinter, Pillow) per organizzare una galleria di poster dei film preferiti, con ricerca automatica per nome, filtri per genere e formato, interfaccia responsive.",
          repoUrl: "https://github.com/IlGiocatore93/Project-Work---GIOVANNI-BIANCOLI",
        },
        {
          id: "portfolio",
          name: "Portfolio",
          tag: "un livello a parte",
          description:
            "Anche questo sito, quello che stai guardando proprio ora, è uno dei miei progetti: pensato e costruito per raccontare chi sono, non solo cosa so fare.",
        },
      ],
    },
    {
      id: "deathmatch",
      navLabel: "Deathmatch",
      title: "Deathmatch",
      subtitle: "🐛 Ogni bug è un avversario da capire",
      paragraphs: [
        `Sviluppare in autonomia significa anche passare ore a caccia di un errore che sembra non avere senso. Qualche esempio da ricordare:`,
        `**🐛 Il progetto che funzionava sul mio PC ma non sul server.** Sviluppando su Windows, dove il filesystem non distingue tra maiuscole e minuscole, avevo alcuni file importati con un nome leggermente diverso da quello reale (login.tsx invece di Login.tsx). In locale nessun problema — ma il server di deploy gira su Linux, dove maiuscole e minuscole contano, e la build falliva senza un errore immediatamente chiaro. Ho dovuto capire che il problema non era nel codice, ma nella differenza tra i due sistemi operativi.`,
        `**🐛 Il frontend che non parlava col backend.** Un classico "Failed to fetch" in produzione: mancava la configurazione CORS nel backend, e anche dopo averla aggiunta serviva aggiornarla con l'URL reale del frontend deployato, diverso da quello locale. Un problema che ogni sviluppatore incontra prima o poi passando dal proprio computer a un server pubblico.`,
        `**🐛 L'autenticazione che si rompeva senza un motivo chiaro.** Il sistema di login si basava su bcrypt e passlib per gestire le password in modo sicuro — ma un conflitto tra le versioni delle due librerie mandava in errore l'hashing, con messaggi che non indicavano subito la causa reale. Ho dovuto scavare nella documentazione e capire come le due dipendenze si aspettavano di collaborare tra loro, prima di trovare la combinazione di versioni corretta. Una lezione su quanto, in un progetto reale, anche i "mattoncini" più basilari — come autenticare un utente — nascondano più complessità di quanta se ne veda in superficie.`,
        `Ogni bug risolto è stato un pezzo di autonomia in più — nel debug, nel deploy, nella lettura degli errori.`,
      ],
    },
    {
      id: "survival",
      navLabel: "Survival",
      title: "Survival",
      subtitle: "🌱 La crescita non si ferma mai",
      paragraphs: [
        `Il Game Tracker non è stato solo il progetto che ho portato a termine, ma anche il terreno dove ho imparato di più. TypeScript, che conoscevo solo superficialmente, l'ho approfondito nella pratica, non solo sulla carta. FastAPI, SQLAlchemy, Docker e le pipeline CI/CD con GitHub Actions erano strumenti nuovi, imparati sul campo, un problema alla volta.`,
        `Il percorso, però, non si ferma qui. Sto continuando ad allenarmi anche fuori dai progetti principali, ad esempio scrivendo codice in C# per tenere allenata la logica e la sintassi anche fuori dall'ecosistema web.`,
        `I prossimi passi che ho in vista: approfondire librerie come Zustand per la gestione dello stato e Chakra UI per le interfacce, oltre a muovere i primi passi in React Native ed Expo per lo sviluppo mobile — tecnologie che per ora ho scelto di lasciare da parte per concentrarmi sulle basi, ma che voglio integrare presto nel mio percorso.`,
        `Restare fermi non è mai stata un'opzione: ogni progetto è un livello nuovo da affrontare.`,
      ],
    },
    {
      id: "extra-life",
      navLabel: "Extra Life",
      title: "Extra Life",
      subtitle: "❤️ Un giocatore in più fa sempre comodo",
      paragraphs: [
        `Se sei arrivato fin qui, la partita ti ha incuriosito — forse è il momento di iniziarne una nuova insieme.`,
        `Sono sempre aperto a nuove opportunità, collaborazioni e chiacchierate su progetti, tecnologie o semplicemente su come si affronta il prossimo debug. Scrivimi, raccontami cosa hai in mente: non serve nessun invito speciale, basta un messaggio.`,
      ],
      isContact: true,
    },
  ] as Section[],
  form: {
    nameLabel: "Nome",
    emailLabel: "Email",
    messageLabel: "Messaggio",
    submitLabel: "Invia",
    sendingLabel: "Invio…",
    sentLabel: "Inviato ✓",
    errorMessage: "Qualcosa è andato storto. Riprova, o scrivimi direttamente via email.",
    contactsHeading: "Oppure trovami qui:",
    copyEmailLabel: "Copia indirizzo",
    copiedLabel: "Copiato ✓",
  },
  cv: {
    heading: "Scarica il mio CV",
    complete: "CV completo (PDF)",
    slim: "CV sintetico",
    europass: "CV formato Europeo",
  },
  footer: {
    contactCta: "Contattami",
  },
  quiz: {
    triggerLabel: "Sfida lampo",
    badgeUnlockedLabel: "Achievement sbloccato",
    introTitle: "5 domande, 12 secondi a testa.",
    introText: "Rispondi bene ad almeno 4 su 5 per sbloccare qualcosa.",
    startButton: "Inizia",
    questionLabel: "Domanda",
    calculatingLabel: "Calcolo del risultato…",
    closeLabel: "Chiudi quiz",
    questions: [
      {
        q: "Cosa indica l'errore HTTP 404?",
        options: ["Risorsa non trovata", "Server in errore", "Accesso negato", "Richiesta troppo grande"],
        correct: 0,
      },
      {
        q: "In un videogioco, cos'è una 'hitbox'?",
        options: [
          "Un tasto di scelta rapida",
          "L'area che rileva le collisioni",
          "Un tipo di achievement",
          "Un salvataggio automatico",
        ],
        correct: 1,
      },
      {
        q: "Cosa fa il comando git status?",
        options: [
          "Elimina i file non tracciati",
          "Mostra lo stato dei file modificati",
          "Crea un nuovo branch",
          "Fa il push sul remoto",
        ],
        correct: 1,
      },
      {
        q: "Cosa significa 'respawn' in un gioco?",
        options: ["Salvare la partita", "Uscire dal gioco", "Ricomparire dopo la morte", "Cambiare livello"],
        correct: 2,
      },
      {
        q: "A cosa serve principalmente Docker?",
        options: [
          "Scrivere codice più velocemente",
          "Containerizzare applicazioni",
          "Disegnare interfacce",
          "Gestire il database",
        ],
        correct: 1,
      },
    ],
  },
  unlock: {
    eyebrow: "Extra Life sbloccata",
    titleLine1: "Grazie per il tempo",
    titleLine2: "che mi hai dedicato.",
    body: "Hai completato la sfida ed esplorato questo portfolio fino in fondo. Non era scontato, e significa molto.",
    closeLabel: "Chiudi",
  },
  emailModal: {
    title: "Scrivimi",
    subtitle: "Scegli come preferisci contattarmi, o copia direttamente l'indirizzo.",
    copyLabel: "Copia",
    copiedLabel: "Copiato ✓",
    closeLabel: "Chiudi",
  },
};
