import type { Section } from "../content/it";
import photo from "../assets/giovanni-photo-round.png";
import "./Header.css";

interface HeaderProps {
  sections: Section[];
  current: number;
  onNavigate: (index: number) => void;
  lang: "it" | "en";
  onToggleLang: () => void;
  siteName: string;
  badgeUnlocked: boolean;
  onOpenQuiz: () => void;
  quizLabel: string;
  badgeLabel: string;
}

export default function Header({
  sections,
  current,
  onNavigate,
  lang,
  onToggleLang,
  siteName,
  badgeUnlocked,
  onOpenQuiz,
  quizLabel,
  badgeLabel,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__identity">
        <img src={photo} alt="Giovanni Biancoli" className="header__photo" />
        <span className="header__brand">{siteName}</span>
      </div>

      <nav className="header__nav" aria-label="Navigazione sezioni">
        {sections.map((s, i) => (
          <button
            key={s.id}
            className={`header__navItem ${i === current ? "is-active" : ""}`}
            onClick={() => onNavigate(i)}
            aria-current={i === current ? "true" : undefined}
          >
            {s.navLabel}
          </button>
        ))}
      </nav>

      <button
        className={`header__questBtn ${badgeUnlocked ? "is-unlocked" : ""}`}
        onClick={onOpenQuiz}
        aria-label={quizLabel}
        title={badgeUnlocked ? badgeLabel : quizLabel}
      >
        {badgeUnlocked ? "🏆" : "🎮"}
      </button>

      <button
        className="header__langToggle"
        onClick={onToggleLang}
        aria-label="Cambia lingua"
      >
        <span className={lang === "it" ? "is-active" : ""}>IT</span>
        <span className="header__langDivider">/</span>
        <span className={lang === "en" ? "is-active" : ""}>EN</span>
      </button>
    </header>
  );
}
