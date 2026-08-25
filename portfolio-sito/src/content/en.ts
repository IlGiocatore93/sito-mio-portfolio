import type { Section } from "./it";

export const en = {
  meta: {
    siteName: "Giovanni Biancoli",
    langToggleLabel: "IT",
    levelLabel: "Level",
    roleTag: "Fullstack Developer in training",
    locationTag: "Castel San Pietro Terme, Italy",
  },
  sections: [
    {
      id: "singleplayer",
      navLabel: "Singleplayer",
      title: "Singleplayer",
      subtitle: "🕹️ My path, one level at a time",
      paragraphs: [
        `The curiosity started early: as a kid I'd watch my mother work at the computer, my cousins download games and movies, build their PCs piece by piece — and I'd wonder how that whole world behind the screen actually worked. That grew into a passion for video games which, over the years, turned into something more technical: I wanted to really understand how an application is built, how it "runs" on a computer, how a video game gets made and shipped online.`,
        `The path to development, though, wasn't a straight line. Before writing my first line of code, I spent years in warehouses, in logistics, behind a sales desk — real jobs, with real deadlines and problems to solve on the spot.`,
        `The turning point came when I decided to go back to school: first an accounting diploma, then a technical program as a Cloud DevOps Technician — 2000 hours between theory and 800 hours of hands-on internship, covering networking, configuration, deployment and cloud. In the meantime, I'd already started working in IT, between customer support and network systems management.`,
        `Today I'm building the foundations to become a Fullstack Developer: that childhood curiosity about "how it works" has turned into a craft.`,
      ],
    },
    {
      id: "multiplayer",
      navLabel: "Multiplayer",
      title: "Multiplayer",
      subtitle: "🤝 No one wins a match alone",
      paragraphs: [
        `Teamwork has been central to my career from the very start, in every role I've held.`,
        `The years spent in warehouse work taught me to respect schedules and take responsibility seriously: on a team working shifts, every delay or slip affects the person next to you.`,
        `In customer support at a branch office, during my internship, I learned humility — treating everyone as equals, never acting above anyone, while staying professional at all times.`,
        `But the most important lesson has stuck with me from the beginning: listen before acting. Really understand what's being asked, instead of running with my own assumptions, and respect the experience of those who've been doing this longer. I consider that the foundation of any teamwork, in an office as much as in a dev team.`,
      ],
    },
    {
      id: "capture-the-flag",
      navLabel: "Capture the Flag",
      title: "Capture the Flag",
      subtitle: "🚩 Projects captured along the way",
      paragraphs: [],
      projects: [
        {
          id: "game-tracker",
          name: "Game Tracker",
          tag: "the flagship project",
          description:
            "A fullstack app for tracking owned and played video games, with an achievement system inspired by PlayStation trophies. FastAPI and PostgreSQL backend, React and TypeScript frontend, game search integrated with IGDB, JWT authentication, live deploy on Render with a CI/CD pipeline on GitHub Actions.",
          demoUrl: "https://gametracker-frontend-wpzb.onrender.com",
          repoUrl: "https://github.com/IlGiocatore93/game-tracker-app",
        },
        {
          id: "gallery-categories",
          name: "Gallery - Categories",
          tag: "second school project",
          description:
            "A desktop application with a microservices backend (Flask, containerized with Docker) and MongoDB, for managing and classifying image galleries. Includes automatic object recognition via YOLO and OpenCV, JWT authentication, client-server sync, and fully automated setup scripts.",
          repoUrl:
            "https://github.com/IlGiocatore93/Project-Work---SECONDO-ANNO---GIOVANNI-BIANCOLI",
        },
        {
          id: "gallery-movies",
          name: "Gallery - Favorite Movies",
          tag: "first school project",
          description:
            "My very first personal project: a Python desktop application (Tkinter, Pillow) for organizing a gallery of favorite movie posters, with automatic search by name, genre and format filters, and a responsive interface.",
          repoUrl: "https://github.com/IlGiocatore93/Project-Work---GIOVANNI-BIANCOLI",
        },
        {
          id: "portfolio",
          name: "Portfolio",
          tag: "a level of its own",
          description:
            "This very site, the one you're looking at right now, is one of my projects too: designed and built to tell you who I am, not just what I can do.",
          demoUrl: "https://sito-mio-portfolio.vercel.app",
          repoUrl: "https://github.com/IlGiocatore93/sito-mio-portfolio",
        },
      ],
    },
    {
      id: "deathmatch",
      navLabel: "Deathmatch",
      title: "Deathmatch",
      subtitle: "🐛 Every bug is an opponent worth understanding",
      paragraphs: [
        `Developing on your own also means spending hours chasing an error that seems to make no sense at all. A few worth remembering:`,
        `**🐛 The project that worked on my machine but not on the server.** Developing on Windows, where the filesystem isn't case-sensitive, I had a few files imported with a slightly different name than the real one (login.tsx instead of Login.tsx). No problem locally — but the deployment server runs on Linux, where case *does* matter, and the build failed without an immediately clear error. I had to realize the problem wasn't in the code, but in the difference between the two operating systems.`,
        `**🐛 The frontend that wouldn't talk to the backend.** A classic "Failed to fetch" in production: the backend was missing CORS configuration, and even after adding it, it needed updating with the real URL of the deployed frontend, different from the local one. A problem every developer runs into sooner or later, moving from their own machine to a public server.`,
        `**🐛 Authentication breaking for no obvious reason.** The login system relied on bcrypt and passlib to handle passwords securely — but a version conflict between the two libraries broke the hashing, with error messages that didn't point to the real cause right away. I had to dig through the documentation and figure out how the two dependencies expected to work together before finding the right version combination. A lesson in how, in a real project, even the most basic building blocks — like authenticating a user — can hide more complexity than meets the eye.`,
        `Every bug fixed was one more piece of independence — in debugging, in deployment, in reading errors.`,
      ],
    },
    {
      id: "survival",
      navLabel: "Survival",
      title: "Survival",
      subtitle: "🌱 Growth never really stops",
      paragraphs: [
        `Game Tracker wasn't just the project I completed — it was also the ground where I learned the most. TypeScript, which I only knew on the surface before, I deepened by actually building with it, not just reading about it. FastAPI, SQLAlchemy, Docker and CI/CD pipelines with GitHub Actions were new tools, learned on the field, one problem at a time.`,
        `The journey doesn't stop here, though. I'm still training outside my main projects too — writing code in C#, for instance, to keep my logic and syntax sharp beyond the web ecosystem.`,
        `Next up: going deeper into libraries like Zustand for state management and Chakra UI for interfaces, plus taking my first steps into React Native and Expo for mobile development — technologies I chose to set aside for now to focus on the fundamentals, but that I want to bring into my path soon.`,
        `Standing still was never an option: every project is a new level to face.`,
      ],
    },
    {
      id: "extra-life",
      navLabel: "Extra Life",
      title: "Extra Life",
      subtitle: "❤️ One more player never hurts",
      paragraphs: [
        `If you've made it this far, the game caught your interest — maybe it's time to start a new one together.`,
        `I'm always open to new opportunities, collaborations, and conversations about projects, technologies, or just how to tackle the next bug. Write to me, tell me what's on your mind: no special invitation needed, just a message.`,
      ],
      isContact: true,
    },
  ] as Section[],
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitLabel: "Send",
    sendingLabel: "Sending…",
    sentLabel: "Sent ✓",
    errorMessage: "Something went wrong. Please try again, or email me directly.",
    contactsHeading: "Or find me here:",
    copyEmailLabel: "Copy address",
    copiedLabel: "Copied ✓",
  },
  cv: {
    heading: "Download my CV",
    complete: "Full CV (PDF)",
    slim: "Short CV",
    europass: "European CV",
  },
  footer: {
    contactCta: "Get in touch",
  },
  quiz: {
    triggerLabel: "Quick challenge",
    badgeUnlockedLabel: "Achievement unlocked",
    introTitle: "5 questions, 12 seconds each.",
    introText: "Get at least 4 out of 5 right to unlock something.",
    startButton: "Start",
    questionLabel: "Question",
    calculatingLabel: "Calculating result…",
    closeLabel: "Close quiz",
    questions: [
      {
        q: "What does the HTTP 404 error mean?",
        options: ["Resource not found", "Server error", "Access denied", "Request too large"],
        correct: 0,
      },
      {
        q: "In a video game, what's a 'hitbox'?",
        options: [
          "A keyboard shortcut",
          "The area that detects collisions",
          "A type of achievement",
          "An autosave",
        ],
        correct: 1,
      },
      {
        q: "What does the git status command do?",
        options: [
          "Deletes untracked files",
          "Shows the status of modified files",
          "Creates a new branch",
          "Pushes to remote",
        ],
        correct: 1,
      },
      {
        q: "What does 'respawn' mean in a game?",
        options: ["Saving the game", "Quitting the game", "Reappearing after death", "Changing level"],
        correct: 2,
      },
      {
        q: "What is Docker mainly used for?",
        options: [
          "Writing code faster",
          "Containerizing applications",
          "Designing interfaces",
          "Managing the database",
        ],
        correct: 1,
      },
    ],
  },
  unlock: {
    eyebrow: "Extra Life unlocked",
    titleLine1: "Thanks for the time",
    titleLine2: "you spent here.",
    body: "You completed the challenge and explored this portfolio all the way through. That wasn't a given, and it means a lot.",
    closeLabel: "Close",
  },
  emailModal: {
    title: "Write to me",
    subtitle: "Choose how you'd like to reach out, or just copy the address.",
    copyLabel: "Copy",
    copiedLabel: "Copied ✓",
    closeLabel: "Close",
  },
};
