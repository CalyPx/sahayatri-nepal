import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import ImpactMap from "@/components/ImpactMap";
import ImpactNumbers from "@/components/ImpactNumbers";
import Programs from "@/components/Programs";
import StudentStory from "@/components/StudentStory";
import Reports from "@/components/Reports";
import DonateCTA from "@/components/DonateCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Mission />
        <ImpactMap />
        <ImpactNumbers />
        <Programs />
        <StudentStory />
        <Reports />
        <DonateCTA />
        <div
          aria-hidden="true"
          style={{ background: "#0D1B2A", lineHeight: 0, display: "block" }}
        >
          <svg
            viewBox="0 0 1440 48"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "48px" }}
          >
            <path
              d="M0 48 L0 38 L80 22 L160 34 L240 14 L320 28 L400 6 L480 20 L560 2 L640 18 L720 0 L800 14 L880 26 L960 4 L1040 16 L1120 30 L1200 8 L1280 24 L1360 32 L1440 18 L1440 48 Z"
              fill="#091426"
            />
          </svg>
        </div>
      </main>
      <Footer />
    </>
  );
}
