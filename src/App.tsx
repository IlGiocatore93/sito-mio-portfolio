import { useState } from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Section from "./components/Section";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import HealthDots from "./components/HealthDots";
import Footer from "./components/Footer";
import QuizChallenge from "./components/QuizChallenge";
import UnlockReveal from "./components/UnlockReveal";
import { it } from "./content/it";
import { en } from "./content/en";
import "./styles/tokens.css";
import "./App.css";

function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lang, setLang] = useState<"it" | "en">("it");
  const [quizOpen, setQuizOpen] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);

  const content = lang === "it" ? it : en;
  const sections = content.sections;
  const lastIndex = sections.length - 1;

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(lastIndex, index));
    setDirection(clamped > current ? 1 : -1);
    setCurrent(clamped);
  }

  function goNext() {
    setDirection(1);
    setCurrent((c) => (c + 1) % sections.length);
  }

  function goPrev() {
    setDirection(-1);
    setCurrent((c) => (c - 1 + sections.length) % sections.length);
  }

  function handleQuizComplete(passed: boolean) {
    setQuizOpen(false);
    if (passed) {
      setBadgeUnlocked(true);
      setShowUnlock(true);
    }
  }

  const panels = sections.map((section, index) => {
    if (section.id === "capture-the-flag") {
      return (
        <ProjectsSection
          key={section.id}
          section={section}
          index={index}
          total={sections.length}
          levelLabel={content.meta.levelLabel}
        />
      );
    }
    if (section.isContact) {
      return (
        <ContactSection
          key={section.id}
          section={section}
          index={index}
          total={sections.length}
          formLabels={content.form}
          cvLabels={content.cv}
          levelLabel={content.meta.levelLabel}
          emailModalLabels={content.emailModal}
        />
      );
    }
    return (
      <Section
        key={section.id}
        section={section}
        index={index}
        total={sections.length}
        levelLabel={content.meta.levelLabel}
        roleTag={content.meta.roleTag}
        locationTag={content.meta.locationTag}
      />
    );
  });

  return (
    <div className="app">
      <Header
        sections={sections}
        current={current}
        onNavigate={goTo}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === "it" ? "en" : "it"))}
        siteName={content.meta.siteName}
        badgeUnlocked={badgeUnlocked}
        onOpenQuiz={() => setQuizOpen(true)}
        quizLabel={content.quiz.triggerLabel}
        badgeLabel={content.quiz.badgeUnlockedLabel}
      />

      <Slider current={current} direction={direction} onNext={goNext} onPrev={goPrev}>
        {panels}
      </Slider>

      <HealthDots count={sections.length} current={current} onSelect={goTo} />

      <Footer
        onContactClick={() => goTo(lastIndex)}
        ctaLabel={content.footer.contactCta}
        emailModalLabels={content.emailModal}
      />

      {quizOpen && (
        <QuizChallenge
          content={content.quiz}
          onComplete={handleQuizComplete}
          onClose={() => setQuizOpen(false)}
        />
      )}
      {showUnlock && <UnlockReveal content={content.unlock} onClose={() => setShowUnlock(false)} />}
    </div>
  );
}

export default App;
