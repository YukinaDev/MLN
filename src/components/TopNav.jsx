// src/components/TopNav.jsx
import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

export default function TopNav({ items = [], activeId, onSelect }) {
  const [active, setActive] = useState(activeId || items?.[0]?.id);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  // đồng bộ active khi nhận prop activeId
  useEffect(() => {
    if (activeId) setActive(activeId);
  }, [activeId]);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Move underline indicator to active tab
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const btn = nav.querySelector(`button[data-tab-id="${active}"]`);
    if (!btn) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - navRect.left + 16;
    const width = btnRect.width - 32;

    anime({
      targets: indicator,
      left,
      width,
      duration: 450,
      easing: "easeOutQuad",
      opacity: 1,
    });
  }, [active]);

  return (
    <div className="sticky top-0 z-50 flex justify-center py-4 bg-transparent">
      <nav ref={navRef} className="relative flex items-center gap-3 rounded-full bg-[#F5F5F5] px-3 py-2 shadow-sm">
        <span
          ref={indicatorRef}
          className="absolute bottom-1 h-1 rounded-full bg-[#8B0000]"
          style={{ left: 8, width: 0, opacity: 0.8 }}
        />
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => (onSelect ? onSelect(it.id) : go(it.id))}
            className={`px-4 py-2 rounded-full text-sm transition ${active === it.id
              ? "bg-white shadow text-[#1C1C1C] border border-[#E0E0E0]"
              : "text-[#666] hover:text-[#1C1C1C]"
              }`}
            type="button"
            data-tab-id={it.id}
          >
            {it.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
