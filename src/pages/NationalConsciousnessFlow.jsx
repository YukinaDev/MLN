// PageI.jsx
import ConclusionPage from "../components/Conculusion";
import PageIntroHero from "../components/FlowPage1";
import StaircaseBullets from "../components/FlowPage2";
import BadInfluenceSection from "../components/FlowPage3";
import BadInfluenceSection2 from "../components/FlowPage4";
import TopNav from "../components/TopNav";


export default function PageI() {
  const navItems = [
    { id: "intro", label: "Introduction" },
    { id: "ii-union", label: "Động lực đoàn kết" },
    { id: "ii-bad", label: "Công cụ chính trị" },
    { id: "iii", label: "Quan điểm DVLS" },
    { id: "conclusion", label: "Kết luận" },
  ];

  return (
    <div className="scroll-smooth"> {/* (tailwind) để bật smooth scroll global */}
      <TopNav items={navItems} />

      {/* scroll-mt để chừa chỗ sticky nav */}
      <section id="intro" className="scroll-mt-28 ">
        <PageIntroHero />
      </section>

      <section id="ii-union" className="scroll-mt-28 mt-8">
        <StaircaseBullets />
      </section>

      <section id="ii-bad" className="scroll-mt-28 mt-8">
        <BadInfluenceSection />
      </section>

      <section id="iii" className="scroll-mt-28 mt-8 mb-16">
        <BadInfluenceSection2 />
      </section>

      <section id="conclusion" className="scroll-mt-28 mt-15 mb-30">
        <ConclusionPage />
      </section>
    </div>
  );
}
