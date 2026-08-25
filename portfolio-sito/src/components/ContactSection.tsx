import { useState } from "react";
import { FiMail, FiLinkedin, FiGithub, FiChevronDown, FiSend, FiSearch } from "react-icons/fi";
import type { Section as SectionType } from "../content/it";
import PdfPreviewModal from "./PdfPreviewModal";
import EmailChoiceModal from "./EmailChoiceModal";
import "./Section.css";
import "./ContactSection.css";

const CONTACT_LINKS = {
  linkedin: "https://linkedin.com/in/biancoli",
  github: "https://github.com/IlGiocatore93",
};

const CV_FILES = {
  complete: "/cv/CV-Giovanni-Biancoli-Completo.pdf",
  slim: "/cv/CV-Giovanni-Biancoli-Sintetico.pdf",
  europass: "/cv/CV-Giovanni-Biancoli-Europeo.pdf",
};

// URL del backend: in locale punta a uvicorn (porta 8000), in produzione
// va sostituito con l'URL reale una volta deployato (es. su Render).
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface FormLabels {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  submitLabel: string;
  sendingLabel: string;
  sentLabel: string;
  errorMessage: string;
  contactsHeading: string;
  copyEmailLabel: string;
  copiedLabel: string;
}

interface CvLabels {
  heading: string;
  complete: string;
  slim: string;
  europass: string;
}

interface EmailModalLabels {
  title: string;
  subtitle: string;
  copyLabel: string;
  copiedLabel: string;
  closeLabel: string;
}

export default function ContactSection({
  section,
  index,
  total,
  formLabels,
  cvLabels,
  levelLabel,
  emailModalLabels,
}: {
  section: SectionType;
  index: number;
  total: number;
  formLabels: FormLabels;
  cvLabels: CvLabels;
  levelLabel: string;
  emailModalLabels: EmailModalLabels;
}) {
  const [cvOpen, setCvOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ src: string; title: string } | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
      form.reset();
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="section">
      <p className="section__eyebrow">
        {levelLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h1 className="section__title">{section.title}</h1>
      <p className="section__subtitle">{section.subtitle}</p>

      <div className="section__body">
        {section.paragraphs.map((p, i) => (
          <p key={i} className="section__paragraph">
            {p}
          </p>
        ))}
      </div>

      <div className="contactGrid">
        <form className="contactForm" onSubmit={handleSubmit}>
          <label className="contactForm__field">
            <span>{formLabels.nameLabel}</span>
            <input type="text" name="name" required />
          </label>
          <label className="contactForm__field">
            <span>{formLabels.emailLabel}</span>
            <input type="email" name="email" required />
          </label>
          <label className="contactForm__field">
            <span>{formLabels.messageLabel}</span>
            <textarea name="message" rows={4} required />
          </label>
          <button type="submit" className="contactForm__submit" disabled={sending}>
            <FiSend aria-hidden="true" />
            {sent ? formLabels.sentLabel : sending ? formLabels.sendingLabel : formLabels.submitLabel}
          </button>
          {error && <p className="contactForm__error">{formLabels.errorMessage}</p>}
        </form>

        <div className="contactGrid__divider" aria-hidden="true" />

        <div className="contactChannels">
          <p className="contactChannels__heading">{formLabels.contactsHeading}</p>
          <button
            type="button"
            className="contactChannels__link contactChannels__copyBtn"
            onClick={() => setEmailModalOpen(true)}
          >
            <FiMail aria-hidden="true" /> Email
          </button>
          <a
            className="contactChannels__link"
            href={CONTACT_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin aria-hidden="true" /> LinkedIn
          </a>
          <a
            className="contactChannels__link"
            href={CONTACT_LINKS.github}
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>

      <div className="cvBlock">
        <button className="cvBlock__toggle" onClick={() => setCvOpen((v) => !v)}>
          <span>📄 {cvLabels.heading}</span>
          <FiChevronDown className={cvOpen ? "is-open" : ""} aria-hidden="true" />
        </button>
        {cvOpen && (
          <div className="cvBlock__options">
            <div className="cvBlock__row">
              <a href={CV_FILES.complete} download className="cvBlock__option">
                {cvLabels.complete}
              </a>
              <button
                className="cvBlock__preview"
                onClick={() => setPreviewFile({ src: CV_FILES.complete, title: cvLabels.complete })}
                aria-label={`${cvLabels.complete} — preview`}
              >
                <FiSearch aria-hidden="true" />
              </button>
            </div>
            <div className="cvBlock__row">
              <a href={CV_FILES.slim} download className="cvBlock__option">
                {cvLabels.slim}
              </a>
              <button
                className="cvBlock__preview"
                onClick={() => setPreviewFile({ src: CV_FILES.slim, title: cvLabels.slim })}
                aria-label={`${cvLabels.slim} — preview`}
              >
                <FiSearch aria-hidden="true" />
              </button>
            </div>
            <div className="cvBlock__row">
              <a href={CV_FILES.europass} download className="cvBlock__option">
                {cvLabels.europass}
              </a>
              <button
                className="cvBlock__preview"
                onClick={() => setPreviewFile({ src: CV_FILES.europass, title: cvLabels.europass })}
                aria-label={`${cvLabels.europass} — preview`}
              >
                <FiSearch aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      {previewFile && (
        <PdfPreviewModal
          src={previewFile.src}
          title={previewFile.title}
          onClose={() => setPreviewFile(null)}
        />
      )}
      {emailModalOpen && (
        <EmailChoiceModal content={emailModalLabels} onClose={() => setEmailModalOpen(false)} />
      )}
    </div>
  );
}
