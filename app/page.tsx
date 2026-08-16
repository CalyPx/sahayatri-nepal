import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import SignLanguageWelcome from "@/components/SignLanguageWelcome";
import ImpactMap from "@/components/ImpactMap";
import ImpactNumbers from "@/components/ImpactNumbers";
import QuoteSection from "@/components/QuoteSection";
import Programs from "@/components/Programs";
import TeamGrid from "@/components/TeamGrid";
import StudentStory from "@/components/StudentStory";
import Reports from "@/components/Reports";
import FinancialTransparency from "@/components/FinancialTransparency";
import NewsletterStrip from "@/components/NewsletterStrip";
import FAQ from "@/components/FAQ";
import DonateCTA from "@/components/DonateCTA";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Mission />
        <SignLanguageWelcome />
        <ImpactMap />
        <ImpactNumbers />
        <QuoteSection />
        <Programs />
        <TeamGrid />
        <StudentStory />
        <Reports />
        <FinancialTransparency />
        <NewsletterStrip />
        <FAQ />
        <DonateCTA />
      </main>
      <Footer />
    </>
  );
}
