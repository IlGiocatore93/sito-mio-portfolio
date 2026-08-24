import "./HealthDots.css";

interface HealthDotsProps {
  count: number;
  current: number;
  onSelect: (index: number) => void;
}

export default function HealthDots({ count, current, onSelect }: HealthDotsProps) {
  return (
    <div className="healthDots" role="tablist" aria-label="Indicatore sezione">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`healthDots__segment ${i === current ? "is-active" : ""} ${
            i < current ? "is-passed" : ""
          }`}
          onClick={() => onSelect(i)}
          role="tab"
          aria-selected={i === current}
          aria-label={`Vai alla sezione ${i + 1}`}
        />
      ))}
    </div>
  );
}
