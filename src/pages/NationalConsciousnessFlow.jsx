// PageI.jsx
import ConclusionPage from "../components/Conculusion";
import PageIntroHero from "../components/FlowPage1";
import StaircaseBullets from "../components/FlowPage2";
import BadInfluenceSection from "../components/FlowPage3";
import BadInfluenceSection2 from "../components/FlowPage4";
import TopNav from "../components/TopNav";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


export default function PageI() {
  const navItems = [
    { id: "intro", label: "Giới thiệu" },
    { id: "ii-union", label: "Động lực đoàn kết" },
    { id: "ii-bad", label: "Công cụ chính trị" },
    { id: "iii", label: "Quan điểm DVLS" },
    { id: "conclusion", label: "Kết luận" },
  ];

  const [index, setIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const sections = useMemo(
    () => [
      { id: "intro", node: <PageIntroHero /> },
      { id: "ii-union", node: <StaircaseBullets /> },
      { id: "ii-bad", node: <BadInfluenceSection /> },
      { id: "iii", node: <BadInfluenceSection2 /> },
      { id: "conclusion", node: <ConclusionPage /> },
    ],
    []
  );

  const clamp = (v) => Math.max(0, Math.min(v, sections.length - 1));

  const navigate = useCallback(
    (delta) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setIndex((prev) => clamp(prev + delta));
      setTimeout(() => (isAnimatingRef.current = false), 800);
    },
    [sections.length]
  );

  useEffect(() => {
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 10) return;
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(-1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate]);

  const onSelect = (id) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx >= 0) setIndex(idx);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="fixed inset-0 text-[#1C1C1C]" style={{ background: "var(--page-bg)" }}>
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-center">
        <TopNav items={navItems} activeId={sections[index].id} onSelect={onSelect} />
      </div>
      <div className="absolute inset-0 pt-24 flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={1} mode="popLayout">
          <motion.div
            key={sections[index].id}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full overflow-auto"
          >
            {sections[index].node}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
