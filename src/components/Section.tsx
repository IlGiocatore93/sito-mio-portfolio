import type { Section as SectionType } from "../content/it";
import photo from "../assets/giovanni-photo-round.png";
import "./Section.css";

function renderParagraph(text: string, key: number) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <p key={key} className="section__paragraph">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </p>
  );
}

const KEY_SKILLS = ["Python", "React", "TypeScript", "Docker", "FastAPI"];

export default function Section({
  section,
  index,
  total,
  levelLabel,
  roleTag,
  locationTag,
}: {
  section: SectionType;
  index: number;
  total: number;
  levelLabel: string;
  roleTag: string;
  locationTag: string;
}) {
  const isSingleplayer = section.id === "singleplayer";
  const eyebrow = (
    <p className="section__eyebrow">
      {levelLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </p>
  );

  if (isSingleplayer) {
    return (
      <div className="section">
        {eyebrow}
        <div className="section--intro">
          <div className="section--intro__sidebar">
            <img src={photo} alt="Giovanni Biancoli" className="section__photoLarge" />
            <p className="profileRibbon__role">{roleTag}</p>
            <p className="profileRibbon__location">{locationTag}</p>
            <div className="profileRibbon__tags">
              {KEY_SKILLS.map((s) => (
                <span key={s} className="profileRibbon__tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="section--intro__textCol">
            <h1 className="section__title">{section.title}</h1>
            <p className="section__subtitle">{section.subtitle}</p>
            <div className="section__body">
              {section.paragraphs.map((p, i) => renderParagraph(p, i))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      {eyebrow}
      <h1 className="section__title">{section.title}</h1>
      <p className="section__subtitle">{section.subtitle}</p>
      <div className="section__body">
        {section.paragraphs.map((p, i) => renderParagraph(p, i))}
      </div>
    </div>
  );
}
