// src/components/StaircaseBullets.jsx
import { motion, useReducedMotion } from "framer-motion";
import data from "../data/data.json";
import topImg1 from "../background/bg1.webp";
import bottomImg1 from "../background/cilvilian.jpg";


const widths = ["w-2/3", "w-3/4", "w-5/6", "w-[92%]", "w-full"];

// variants cho container & step
const listVariants = {
  hidden: {},
  show: i => ({
    transition: { staggerChildren: 0.12, delayChildren: 0.05 * (i || 0) },
  }),
};
const stepVariants = (prefersReduced) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : -18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
});
const imageVariants = (prefersReduced) => ({
  hidden: { opacity: 0, y: prefersReduced ? 0 : 24, rotate: prefersReduced ? 0 : -2 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55 } },
});

export default function StaircaseBullets({ topImg = topImg1, bottomImg = bottomImg1 }) {
  const prefersReduced = useReducedMotion();

  const sectionII = (data.sections || []).find((s) => s.id === "II");
  const unionSub =
    sectionII?.subsections?.find(
      (s) => s.subtitle === "Ý thức dân tộc là động lực đoàn kết"
    ) || { subtitle: "", bullets: [] };

  const subtitle = unionSub.subtitle;
  const bullets = unionSub.bullets || [];

  return (
    <div className="relative min-h-[80vh] w-full overflow-hidden" style={{ background: "transparent" }}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--page-bg)] via-[var(--page-bg)] to-[#DCCDB8]/40" />

      <section className="relative mx-auto max-w-7xl px-6 pt-10 pb-16">
        {/* Subtitle */}
        <div className="mb-10 text-center">
          <h2
            className="text-6xl md:text-3xl font-bold text-[#8B0000] tracking-tight mb-6"
            style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
          >
            {subtitle}
          </h2>
          <span className="mt-2 inline-block h-1 w-40 md:w-56 rounded-full bg-[#FFD700]" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT: 2 ảnh – chỉ animate khi vào viewport */}
          <div className="relative h-[460px] md:h-[520px]">
            {/* Ảnh trên (lệch phải) */}
            <motion.div
              variants={imageVariants(prefersReduced)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="absolute right-8 top-0 h-56 w-56 md:h-72 md:w-72
               rounded-3xl bg-[#1C1C1C] p-2 shadow-2xl"
            >
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={
                    topImg ||
                    "https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="absolute -top-2 -left-2 h-5 w-5 rounded-full border-2 border-[#FFD700]" />
            </motion.div>

            {/* Ảnh dưới (lệch trái, hạ xuống chút) */}
            <motion.div
              variants={imageVariants(prefersReduced)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="absolute left-8 top-32 h-56 w-56 md:h-72 md:w-72
               rounded-3xl bg-[#1C1C1C] p-2 shadow-2xl"
            >
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <img
                  src={
                    bottomImg ||
                    "https://images.unsplash.com/photo-1558980394-0c0c5d0d0b9b?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt=""
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full border-2 border-[#8B0000]" />
            </motion.div>
          </div>


          {/* RIGHT: bậc thang – load dần khi scroll tới */}
          <div className="relative">
            <div className="absolute -left-6 top-0 hidden h-full w-1 rounded-full bg-[#8B0000] md:block" />
            <motion.ul
              variants={listVariants}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }} // kích hoạt khi ~30% vùng này vào khung nhìn
              className="flex flex-col gap-5"
            >
              {bullets.slice(0, 5).map((text, i) => (
                <motion.li
                  key={i}
                  variants={stepVariants(prefersReduced)}
                  className={`ml-auto ${widths[i] || "w-full"}`}
                >
                  <div className="group relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-[#E0E0E0] px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8B0000] to-[#B22222]" />
                    <span className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl" />
                    <div className="relative flex items-start gap-3">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#8B0000]" />
                      <p
                        className="text-[15px] md:text-base leading-relaxed text-[#1C1C1C]"
                        style={{ fontFamily: "'Roboto','Open Sans','Inter',sans-serif" }}
                      >
                        {text}
                      </p>
                    </div>
                    <div className="mt-3 h-[3px] w-20 rounded-full bg-[#FFD700] transition-all duration-300 group-hover:w-28" />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </div>
  );
}
