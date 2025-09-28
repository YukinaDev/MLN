// src/components/ConclusionPage.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ConclusionPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="grid grid-cols-12 gap-10 items-start">
        {/* LEFT: Headline xếp dòng lớn */}
        <div className="col-span-12 md:col-span-5">
          <div
            className="leading-[0.9] font-extrabold tracking-tight text-[#1C1C1C]"
            style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
          >
            <h1 className="text-[18vw] md:text-[110px]">KẾT</h1>
            <h1 className="text-[18vw] md:text-[110px]">LUẬN</h1>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#FFD700] bg-[#1C1C1C] px-6 py-3 text-white shadow-md hover:shadow-lg"
          > 
          <Link to="/quiz" className="inline-flex items-center gap-2">
              Tiếp tục
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.button>
        </div>

        {/* RIGHT: Nội dung kết luận */}
        <div className="col-span-12 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#8B0000]"
              style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
            >
              Kết luận
            </h2>

            <p
              className="text-[17px] leading-8 text-[#1C1C1C]"
              style={{ fontFamily: "'Inter','Roboto','Open Sans',sans-serif" }}
            >
              <span className="font-semibold">Ý thức dân tộc</span> là một
              <span className="font-semibold"> sức mạnh tinh thần to lớn</span>.
              Nó có tính hai mặt: vừa là <span className="font-semibold">động lực tiến bộ</span> giúp quy tụ và thúc đẩy phát triển,
              vừa tiềm ẩn <span className="font-semibold">nguy cơ phản động</span> nếu bị lợi dụng, tuyệt đối hoá.
            </p>

            {/* Thanh nhấn vàng */}
            <div className="h-1 w-28 rounded-full bg-[#FFD700]" />

            {/* Checklist */}
            <div className="rounded-2xl border border-[#E0E0E0] bg-white/95 p-6 shadow-md">
              <h3
                className="mb-4 text-xl font-semibold text-[#1C1C1C]"
                style={{ fontFamily: "'Merriweather','Noto Serif',serif" }}
              >
                Chỉ phát huy khi gắn với:
              </h3>

              <ul className="space-y-4">
                {[
                  "Xu hướng phát triển xã hội",
                  "Lợi ích dân tộc + lợi ích nhân loại",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {/* icon check */}
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#FFD700]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <p
                      className="text-[16px] leading-7 text-[#1C1C1C]"
                      style={{ fontFamily: "'Inter','Roboto','Open Sans',sans-serif" }}
                    >
                      {t}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box tóm tắt hai mặt */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-[#888]">Mặt tích cực</p>
                <p className="mt-2 text-[15px] leading-7 text-[#1C1C1C]">
                  Đoàn kết, khơi dậy nội lực, bảo vệ chủ quyền, tạo sinh lực cho phát triển.
                </p>
              </div>
              <div className="rounded-xl border border-[#E0E0E0] bg-white p-5 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-[#888]">Mặt tiêu cực</p>
                <p className="mt-2 text-[15px] leading-7 text-[#1C1C1C]">
                  Bị lợi dụng để kích động chủ nghĩa dân tộc hẹp hòi, bài ngoại; thao túng quần chúng.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
