// src/components/TopNav.jsx
import { useEffect, useState } from "react";

export default function TopNav({ items = [] }) {
  const [active, setActive] = useState(items?.[0]?.id);

  // highlight tab theo section đang nằm trong viewport
  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      // top 40% – bottom 55% để bắt 'đúng' section
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="sticky top-0 z-50 flex justify-center py-4 bg-transparent">
      <nav className="flex items-center gap-3 rounded-full bg-[#F5F5F5] px-3 py-2 shadow-sm">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => go(it.id)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              active === it.id
                ? "bg-white shadow text-[#1C1C1C] border border-[#E0E0E0]"
                : "text-[#666] hover:text-[#1C1C1C]"
            }`}
            type="button"
          >
            {it.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
