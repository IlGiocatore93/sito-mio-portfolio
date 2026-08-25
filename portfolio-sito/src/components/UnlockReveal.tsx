import "./UnlockReveal.css";

interface UnlockContent {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  closeLabel: string;
}

interface UnlockRevealProps {
  content: UnlockContent;
  onClose: () => void;
}

export default function UnlockReveal({ content, onClose }: UnlockRevealProps) {
  return (
    <div className="unlockOverlay" role="dialog" aria-modal="true" aria-label={content.eyebrow}>
      <div className="unlockCard">
        <button className="unlockCard__close" onClick={onClose} aria-label={content.closeLabel}>
          ×
        </button>

        <div className="flagScene" aria-hidden="true">
          <div className="flagScene__ground" />
          <div className="flagScene__runner">
            <div className="runner__head" />
            <div className="runner__body" />
            <div className="runner__legL" />
            <div className="runner__legR" />
            <div className="runner__armL" />
            <div className="runner__armR" />
          </div>
          <div className="flagScene__pole">
            <div className="flagScene__flag">GG</div>
          </div>
        </div>

        <div className="unlockCard__text">
          <p className="unlockCard__eyebrow">{content.eyebrow}</p>
          <h2 className="unlockCard__title">
            {content.titleLine1}
            <br />
            {content.titleLine2}
          </h2>
          <p className="unlockCard__body">{content.body}</p>
        </div>
      </div>
    </div>
  );
}
