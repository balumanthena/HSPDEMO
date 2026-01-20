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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stork Multispecialty Hospital | Best Hospital in City',
  description: 'Stork Multispecialty Hospital offers world-class healthcare with 24/7 emergency, advanced diagnostics, and expert doctors in Cardiology, Pediatrics, and more.',
  openGraph: {
    title: 'Stork Multispecialty Hospital | Caring for Life',
    description: 'Advanced healthcare services with a patient-centric approach. Book an appointment today.',
    images: ['/og-image.jpg'], // Assuming placeholder or actual
  },
  alternates: {
    canonical: 'https://stork-hospital.com',
  }
};

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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Stork Multispecialty Hospital",
            "url": "https://stork-hospital.com",
            "logo": "https://stork-hospital.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0123",
              "contactType": "emergency",
              "areaServed": "US",
              "availableLanguage": "En"
            },
            "sameAs": [
              "https://facebook.com/storkhospital",
              "https://twitter.com/storkhospital",
              "https://linkedin.com/company/storkhospital"
            ]
          })
        }}
      />
    </main>
  );
}
