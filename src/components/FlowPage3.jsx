// src/components/BadInfluenceSection.jsx
import { motion, useReducedMotion } from "framer-motion";
import data from "../data/data.json";
import bottomImg from "../background/bot3img.jpg";
import topImg from "../background/top3img.jpg";



export default function BadInfluenceSection() {
  const prefersReduced = useReducedMotion();

  // Lấy mục II và subsection "Ý thức dân tộc bị lợi dụng làm công cụ chính trị"
  const sectionII = (data.sections || []).find((s) => s.id === "II");
  const badSub =
    sectionII?.subsections?.find(
      (s) => s.subtitle === "Ý thức dân tộc bị lợi dụng làm công cụ chính trị"
    ) || { subtitle: "", bullets: [] };

  const subtitle = badSub.subtitle;
  const bullets = badSub.bullets || [];

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden" style={{ background: "transparent" }}>
      <section className="relative mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* RIGHT (cũ) -> giờ sang LEFT */}
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-[#8B0000] tracking-tight mb-6"
            style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
          >
            {subtitle}
          </h2>

          <ul className="flex flex-col gap-5">
            {bullets.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-[#E0E0E0] px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8B0000] to-[#B22222]" />
                <span className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#8B0000]" />
                  <p
                    className="text-[15px] md:text-base leading-relaxed text-[#1C1C1C]"
                    style={{
                      fontFamily: "'Roboto','Open Sans','Inter',sans-serif",
                    }}
                  >
                    {text}
                  </p>
                </div>
                <div className="mt-3 h-[3px] w-20 rounded-full bg-[#FFD700] transition-all duration-300 group-hover:w-28" />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* LEFT (cũ) -> giờ sang RIGHT: 2 ảnh */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="h-56 md:h-72 w-full rounded-3xl overflow-hidden shadow-2xl bg-[#1C1C1C]"
          >
            <img src={topImg}
              alt="https://images.unsplash.com/photo-1581093588401-22d9f8d3c1d7?q=80&w=1200&auto=format&fit=crop"
              className="h-full w-full object-cover grayscale"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="h-56 md:h-72 w-full rounded-3xl overflow-hidden shadow-2xl bg-[#1C1C1C]"
          >
            <img
              src={bottomImg}
              alt="https://images.unsplash.com/photo-1504714146340-959ca07b7bbf?q=80&w=1200&auto=format&fit=crop"
              className="h-full w-full object-cover grayscale"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
