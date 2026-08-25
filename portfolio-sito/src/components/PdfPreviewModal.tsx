import "./PdfPreviewModal.css";

interface PdfPreviewModalProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function PdfPreviewModal({ src, title, onClose }: PdfPreviewModalProps) {
  return (
    <div className="pdfPreview" role="dialog" aria-modal="true" aria-label={title}>
      <div className="pdfPreview__panel">
        <div className="pdfPreview__bar">
          <span className="pdfPreview__title">{title}</span>
          <button className="pdfPreview__close" onClick={onClose} aria-label="Chiudi anteprima">
            ×
          </button>
        </div>
        <iframe src={src} title={title} className="pdfPreview__frame" />
      </div>
    </div>
  );
}
