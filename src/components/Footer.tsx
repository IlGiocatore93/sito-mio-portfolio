import { useState } from "react";
import { FiMail, FiLinkedin, FiGithub, FiDownload } from "react-icons/fi";
import EmailChoiceModal from "./EmailChoiceModal";
import "./Footer.css";

interface EmailModalLabels {
  title: string;
  subtitle: string;
  copyLabel: string;
  copiedLabel: string;
  closeLabel: string;
}

interface FooterProps {
  onContactClick: () => void;
  ctaLabel: string;
  emailModalLabels: EmailModalLabels;
}

const CONTACT_LINKS = {
  linkedin: "https://linkedin.com/in/biancoli",
  github: "https://github.com/IlGiocatore93",
  cv: "/cv/CV-Giovanni-Biancoli-Completo.pdf",
};

function HeartPlusIcon() {
  return (
    <span className="footerHeart">
      <svg viewBox="0 0 40 36" width="18" height="18" aria-hidden="true">
        <path
          d="M20 34 C6 25 1 17 1 10 C1 4 6 0 12 0 C16 0 19 2 20 7 C21 2 24 0 28 0 C34 0 39 4 39 10 C39 17 34 25 20 34 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
        />
      </svg>
      <span className="footerHeart__badge" aria-hidden="true">
        <span className="footerHeart__plusH" />
        <span className="footerHeart__plusV" />
      </span>
    </span>
  );
}

export default function Footer({ onContactClick, ctaLabel, emailModalLabels }: FooterProps) {
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  return (
    <footer className="footer">
      <div className="footer__links">
        <button
          type="button"
          className="footer__iconBtn"
          onClick={() => setEmailModalOpen(true)}
          aria-label="Email"
          title="Email"
        >
          <FiMail />
        </button>
        <a href={CONTACT_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <FiLinkedin />
        </a>
        <a href={CONTACT_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <FiGithub />
        </a>
        <a href={CONTACT_LINKS.cv} download aria-label="Scarica CV">
          <FiDownload />
        </a>
      </div>

      <button className="footer__cta" onClick={onContactClick}>
        <HeartPlusIcon />
        {ctaLabel}
      </button>

      {emailModalOpen && (
        <EmailChoiceModal content={emailModalLabels} onClose={() => setEmailModalOpen(false)} />
      )}
    </footer>
  );
}
