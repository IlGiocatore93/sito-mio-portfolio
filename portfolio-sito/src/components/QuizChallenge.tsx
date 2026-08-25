import { useEffect, useState } from "react";
import "./QuizChallenge.css";

interface Question {
  q: string;
  options: string[];
  correct: number;
}

interface QuizContent {
  triggerLabel: string;
  introTitle: string;
  introText: string;
  startButton: string;
  questionLabel: string;
  calculatingLabel: string;
  closeLabel: string;
  questions: Question[];
}

const TIME_PER_QUESTION = 12;

interface QuizChallengeProps {
  content: QuizContent;
  onComplete: (passed: boolean) => void;
  onClose: () => void;
}

export default function QuizChallenge({ content, onComplete, onClose }: QuizChallengeProps) {
  const QUESTIONS = content.questions;
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || finished || selected !== null) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, timeLeft, selected, finished]);

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === QUESTIONS[current].correct;
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (current + 1 < QUESTIONS.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setTimeLeft(TIME_PER_QUESTION);
      } else {
        setFinished(true);
        const finalScore = score + (isCorrect ? 1 : 0);
        onComplete(finalScore >= 4);
      }
    }, 700);
  }

  const q = QUESTIONS[current];

  return (
    <div className="quizOverlay" role="dialog" aria-modal="true" aria-label={content.triggerLabel}>
      <div className="quizCard">
        <button className="quizCard__close" onClick={onClose} aria-label={content.closeLabel}>
          ×
        </button>

        {!started ? (
          <div className="quizCard__intro">
            <p className="quizCard__meta">{content.triggerLabel}</p>
            <h2 className="quizCard__question">{content.introTitle}</h2>
            <p className="quizCard__introText">{content.introText}</p>
            <button className="quizCard__startBtn" onClick={() => setStarted(true)}>
              {content.startButton}
            </button>
          </div>
        ) : !finished ? (
          <>
            <p className="quizCard__meta">
              {content.questionLabel} {current + 1} / {QUESTIONS.length} · ⏱ {timeLeft}s
            </p>
            <h2 className="quizCard__question">{q.q}</h2>
            <div className="quizCard__options">
              {q.options.map((opt, i) => {
                let cls = "quizCard__option";
                if (selected !== null) {
                  if (i === q.correct) cls += " is-correct";
                  else if (i === selected) cls += " is-wrong";
                }
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="quizCard__meta">{content.calculatingLabel}</p>
        )}
      </div>
    </div>
  );
}
