import { useState } from "react";
import { FiMail, FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import "./EmailChoiceModal.css";

const EMAIL_ADDRESS = "b_giova93@hotmail.com";
const SUBJECT = "Contatto dal portfolio";

const PROVIDERS = [
  {
    id: "gmail",
    label: "Gmail",
    url: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent(
      SUBJECT
    )}`,
  },
  {
    id: "outlook",
    label: "Outlook",
    url: `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL_ADDRESS}&subject=${encodeURIComponent(
      SUBJECT
    )}`,
  },
  {
    id: "yahoo",
    label: "Yahoo",
    url: `https://compose.mail.yahoo.com/?to=${EMAIL_ADDRESS}&subject=${encodeURIComponent(SUBJECT)}`,
  },
];

interface EmailChoiceContent {
  title: string;
  subtitle: string;
  copyLabel: string;
  copiedLabel: string;
  closeLabel: string;
}

interface EmailChoiceModalProps {
  content: EmailChoiceContent;
  onClose: () => void;
}

export default function EmailChoiceModal({ content, onClose }: EmailChoiceModalProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // nessun fallback necessario, il campo resta comunque leggibile/selezionabile
    }
  }

  return (
    <div className="emailModal" role="dialog" aria-modal="true" aria-label={content.title}>
      <div className="emailModal__card">
        <button className="emailModal__close" onClick={onClose} aria-label={content.closeLabel}>
          ×
        </button>

        <div className="emailModal__icon">
          <FiMail aria-hidden="true" />
        </div>
        <h2 className="emailModal__title">{content.title}</h2>
        <p className="emailModal__subtitle">{content.subtitle}</p>

        <div className="emailModal__field">
          <input type="text" readOnly value={EMAIL_ADDRESS} onFocus={(e) => e.target.select()} />
          <button className="emailModal__copyBtn" onClick={handleCopy} aria-label={content.copyLabel}>
            {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
            {copied ? content.copiedLabel : content.copyLabel}
          </button>
        </div>

        <div className="emailModal__providers">
          {PROVIDERS.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="emailModal__providerBtn"
            >
              {p.label} <FiExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
