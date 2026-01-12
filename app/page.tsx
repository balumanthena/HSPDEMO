import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MissionStats } from "@/components/sections/MissionStats";
import { QuickActions } from "@/components/sections/QuickActions";
import {
  SpecializationsGrid,
  DoctorsPreview,
  TestimonialsSection,
  FinalCTA
} from "@/components/sections/HomeSections";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Hero />
      <MissionStats />
      <QuickActions />
      <SpecializationsGrid />
      <WhyChooseUs />
      <DoctorsPreview />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
