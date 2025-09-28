import { motion } from "framer-motion";
import data from "../data/data.json";
import bgFallback from "../background/kremlin.jpg";
import { Link } from "react-router-dom";

export default function PageIntroHero() {
  const sections = data.sections || [];
  const intro = sections.find((s) => s.id === "I") || { title: "", paragraphs: [] };

  return (
    <div className="min-h-screen w-full bg-white text-[#1C1C1C] flex flex-col items-center">
      {/* Tabs trên cùng */}
      {/* <div className="sticky top-0 z-20 flex items-center justify-center py-4">
        <nav className="flex items-center gap-3 rounded-full bg-[#F5F5F5] px-3 py-2 shadow-sm">
          {sections.map((s, idx) => (
            <button
              key={s.id}
              className={`px-4 py-2 rounded-full text-sm transition ${
                s.id === "I"
                  ? "bg-white shadow text-[#1C1C1C] border border-[#E0E0E0]"
                  : "text-[#666] hover:text-[#1C1C1C]"
              }`}
              type="button"
            >
              {idx === 0 ? "Introduction" : s.title}
            </button>
          ))}
        </nav>
      </div> */}

      {/* Hero content */}
      <section className="relative max-w-7xl w-full px-6 pt-8 pb-20 mx-auto">
  {/* BG ảnh, rộng & ít mờ hơn, căn giữa, chừa viền trắng */}
  <div className="absolute inset-x-0 top-36 flex justify-center">
  <img
    src={bgFallback}
    alt="background"
    className="w-[98%] max-w-[1600px] h-[625px] rounded-xl object-cover"
  />
</div>

  {/* Headline */}
  <motion.h1
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative text-center font-extrabold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl"
    style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
  >
    {/* TỪ&nbsp;Ý THỨC&nbsp;XÃ HỘI
    <span className="mx-2 text-[#8B0000]">*</span>
    ĐẾN&nbsp; */}
    
    Ý THỨC&nbsp;DÂN TỘC
<span className="block mx-auto mt-3 h-1 w-[220px] rounded-full bg-[#FFD700]" />
  </motion.h1>

  {/* 2 ô text so le chéo & cách xa headline */}
  <div className="relative mt-24 flex flex-col gap-16 w-full">
  {/* Box 1: nằm dòng riêng, lệch trái */}
  <motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className="self-start max-w-3xl ml-4 md:ml-12 rounded-2xl border border-[#E0E0E0] bg-white/95 p-6 md:pl-12 shadow-xl"
  style={{ fontFamily: "'Roboto','Open Sans','Inter',sans-serif" }}
>
    <h2
    className="mb-3 font-bold text-xl md:text-2xl text-left text-[#1C1C1C]"
    style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
  >
      Ý nghĩa của ý thức dân tộc
    </h2>
    <p className="text-base leading-relaxed text-[#1C1C1C]">
      {intro.paragraphs?.[0]}
    </p>
  </motion.div>

  {/* Box 2: nằm dòng riêng, lệch phải */}
  <motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, delay: 0.05 }}
  className="self-end max-w-3xl mr-4 md:mr-12 rounded-2xl border border-[#E0E0E0] bg-white/95 p-6 md:pr-12 shadow-xl"
  style={{ fontFamily: "'Roboto','Open Sans','Inter',sans-serif" }}
>
    <h2
    className="mb-3 font-bold text-xl md:text-2xl text-right text-[#1C1C1C]"
    style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
  >
      {intro.title}
    </h2>
    <p className="text-base leading-relaxed text-[#1C1C1C]">
      {intro.paragraphs?.[1]}
    </p>
  </motion.div>
</div>

  {/* Nút Bắt đầu – đậm hơn */}
  <div className="mt-16 flex items-center justify-center">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full 
               bg-gradient-to-r from-[#8B0000] to-[#B22222] px-12 py-4 
               text-lg font-bold text-white shadow-lg transition-all duration-300"
  >
    <Link to="/quiz" className="inline-flex items-center gap-2">
      <span className="absolute inset-0 h-full w-full rounded-full border-2 border-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      Bắt đầu Test
    </Link>
  </motion.button>
</div>

</section>
    </div>
  );
}
