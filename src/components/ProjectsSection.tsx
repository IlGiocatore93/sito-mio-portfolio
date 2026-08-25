import type { Section as SectionType } from "../content/it";
import gtDashboard from "../assets/screenshots/gametracker-dashboard.png";
import gtAchievement from "../assets/screenshots/gametracker-achievement.png";
import filmShot1 from "../assets/screenshots/film-galleria-1.png";
import filmShot2 from "../assets/screenshots/film-galleria-2.png";
import tipologieShot1 from "../assets/screenshots/tipologie-1.png";
import tipologieShot2 from "../assets/screenshots/tipologie-2.png";
import portfolioShot1 from "../assets/screenshots/portfolio-singleplayer.png";
import portfolioShot2 from "../assets/screenshots/portfolio-ctf.png";
import portfolioShot3 from "../assets/screenshots/portfolio-extralife.png";
import "./Section.css";
import "./ProjectsSection.css";

const SCREENSHOTS: Record<string, { src: string; alt: string }[]> = {
  "game-tracker": [
    { src: gtDashboard, alt: "Dashboard della libreria giochi in Game Tracker" },
    { src: gtAchievement, alt: "Pannello achievement con trofei sbloccati in Game Tracker" },
  ],
  "gallery-movies": [
    { src: filmShot1, alt: "Interfaccia della galleria film con informazioni immagine" },
    { src: filmShot2, alt: "Popup istruzioni della galleria film" },
  ],
  "gallery-categories": [
    { src: tipologieShot1, alt: "Rilevamento oggetti con YOLO su un'immagine di auto" },
    { src: tipologieShot2, alt: "Finestra Esplora tipologie con galleria immagini aerei" },
  ],
  portfolio: [
    { src: portfolioShot1, alt: "Sezione Singleplayer del portfolio" },
    { src: portfolioShot2, alt: "Sezione Capture the Flag del portfolio" },
    { src: portfolioShot3, alt: "Sezione Extra Life del portfolio" },
  ],
};

export default function ProjectsSection({
  section,
  index,
  total,
  levelLabel,
}: {
  section: SectionType;
  index: number;
  total: number;
  levelLabel: string;
}) {
  return (
    <div className="section">
      <p className="section__eyebrow">
        {levelLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h1 className="section__title">{section.title}</h1>
      <p className="section__subtitle">{section.subtitle}</p>

      <div className="projects">
        {section.projects?.map((p) => (
          <article key={p.id} className="projectCard">
            <div className="projectCard__head">
              <h2 className="projectCard__name">{p.name}</h2>
              <span className="projectCard__tag">{p.tag}</span>
            </div>
            <p className="projectCard__desc">{p.description}</p>

            {SCREENSHOTS[p.id] && (
              <div className="projectCard__shots">
                {SCREENSHOTS[p.id].map((shot) => (
                  <img
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    className="projectCard__shot"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            {(p.demoUrl || p.repoUrl) && (
              <div className="projectCard__links">
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="projectCard__link">
                    Demo live ↗
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noreferrer" className="projectCard__link">
                    Repository ↗
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
