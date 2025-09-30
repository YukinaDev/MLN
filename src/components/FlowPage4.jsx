// src/components/Page3Grid.jsx
import data from "../data/data.json";
import topImg from "../background/community.webp";
import bottom from "../background/article.jpg";


export default function Page3Grid() {
  // Lấy mục III → Quan điểm của chủ nghĩa duy vật lịch sử
  const sectionIII = (data.sections || []).find((s) => s.id === "III");
  const positive =
    sectionIII?.subsections?.find((s) => s.subtitle === "Vai trò tích cực") || {
      subtitle: "",
      bullets: [],
    };
  const limit =
    sectionIII?.subsections?.find((s) => s.subtitle === "Giới hạn") || {
      subtitle: "",
      bullets: [],
    };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* GRID cha: 12 cột */}
      <div className="grid grid-cols-12 gap-8">
        {/* Row 1 - LEFT (5/12): headline khổ lớn */}
        <div className="col-span-12 md:col-span-5">
          <h1 className="text-[9vw] md:text-[84px] leading-[0.9] font-extrabold tracking-tight text-[#1C1C1C]">
            Quan điểm của chủ nghĩa  <br />
            duy vật lịch sử
          </h1>
        </div>

        {/* Row 1 - RIGHT (7/12): banner ảnh */}
        <div className="col-span-12 md:col-span-7">
          <div className="h-[260px] md:h-[320px] w-full overflow-hidden rounded-2xl bg-[#1C1C1C]">
            <img
              src={topImg}
              alt="https://images.unsplash.com/photo-1530110740864-502a952d01e1?q=80&w=1400&auto=format&fit=crop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 - LEFT (5/12): ảnh lớn */}
        <div className="col-span-12 md:col-span-5">
          <div className="h-[320px] md:h-[380px] w-full overflow-hidden rounded-2xl bg-[#1C1C1C]">
            <img
              src={bottom}
              alt="https://images.unsplash.com/photo-1606761568499-6d2451b23c24?q=80&w=1400&auto=format&fit=crop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Row 2 - RIGHT (7/12): Vai trò tích cực | Giới hạn */}
        <div className="col-span-12 md:col-span-7">
          {/* Hàng tiêu đề */}
          <div className="mb-6 flex items-end gap-8">
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#1C1C1C]"
              style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
            >
              {positive.subtitle}
            </h2>
            <span className="text-4xl md:text-5xl text-[#FFD700]">|</span>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#8B0000]"
              style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
            >
              {limit.subtitle}
            </h2>
          </div>

          {/* Lưới con 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vai trò tích cực */}
            <div>
              <ul className="space-y-5">
                {positive.bullets.map((t, i) => (
                  <li key={i} className="group relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-[#E0E0E0] px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8B0000] to-[#B22222]" />
                    <span className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl" />
                    <div className="relative flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#8B0000]" />
                      <p className="text-[15px] md:text-base leading-relaxed text-[#1C1C1C]" style={{ fontFamily: "'Roboto','Open Sans','Inter',sans-serif" }}>{t}</p>
                    </div>
                    <div className="mt-3 h-[3px] w-20 rounded-full bg-[#FFD700] transition-all duration-300 group-hover:w-28" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Giới hạn */}
            <div>
              <ul className="space-y-5">
                {limit.bullets.map((t, i) => (
                  <li key={i} className="group relative overflow-hidden rounded-2xl bg-white/95 ring-1 ring-[#E0E0E0] px-6 py-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#8B0000] to-[#B22222]" />
                    <span className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#FFD700]/10 blur-2xl" />
                    <div className="relative flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#8B0000]" />
                      <p className="text-[15px] md:text-base leading-relaxed text-[#1C1C1C]" style={{ fontFamily: "'Roboto','Open Sans','Inter',sans-serif" }}>{t}</p>
                    </div>
                    <div className="mt-3 h-[3px] w-20 rounded-full bg-[#FFD700] transition-all duration-300 group-hover:w-28" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
