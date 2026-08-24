import { useEffect, useRef } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import "./Slider.css";

interface SliderProps {
  current: number;
  direction: number;
  onNext: () => void;
  onPrev: () => void;
  children: React.ReactNode[];
}

const SWIPE_THRESHOLD = 60;

export default function Slider({ current, direction, onNext, onPrev, children }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext, onPrev]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) onNext();
    else if (info.offset.x > SWIPE_THRESHOLD) onPrev();
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="slider" ref={containerRef}>
      <button
        className="slider__arrow slider__arrow--prev"
        onClick={onPrev}
        aria-label="Sezione precedente"
      >
        ‹
      </button>

      <div className="slider__viewport">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            className="slider__panel"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 320, damping: 34 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {children[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="slider__arrow slider__arrow--next"
        onClick={onNext}
        aria-label="Sezione successiva"
      >
        ›
      </button>
    </div>
  );
}
