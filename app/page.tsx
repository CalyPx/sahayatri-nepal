import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import ImpactMap from "@/components/ImpactMap";
import ImpactNumbers from "@/components/ImpactNumbers";
import Programs from "@/components/Programs";
import NewsletterStrip from "@/components/NewsletterStrip";
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
        <NewsletterStrip />
        <StudentStory />
        <Reports />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}
