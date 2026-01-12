'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, UserCheck, Stethoscope, HeartPulse, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const features = [
    {
        id: 1,
        title: "One-Stop Healthcare Solution",
        description: "Everything you need for your health journey under one roof. From diagnostics to complex surgeries, we have it all.",
        bullets: [
            "Expert Doctors with 15+ Years Experience",
            "Top JCI & NABH Accredited Hospitals",
            "Advanced Robotic Surgery Centers",
            "24/7 Pharmacy & Diagnostics"
        ],
        cta: "Explore Services",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Expert Second Opinion",
        description: "Get peace of mind with a second opinion from our board-certified specialists. Make informed decisions about your health.",
        bullets: [
            "Video Consultations Available",
            "Detailed Case Review",
            "Unbiased Treatment Recommendations",
            "Multi-disciplinary Board Review"
        ],
        cta: "Get Second Opinion",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Dedicated Personal Health Assistant",
        description: "Never walk alone. A dedicated health buddy will guide you through admissions, insurance, and discharge processes.",
        bullets: [
            "24/7 Personal Coordination",
            "Hassle-free Admissions",
            "Insurance & Paperwork Assistance",
            "Single Point of Contact"
        ],
        cta: "Meet Our Team",
        image: "https://images.unsplash.com/photo-1576091160550-217358c7e618?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Post-Surgery Recovery & Care",
        description: "Our care doesn't end at the hospital exit. We provide comprehensive follow-up plans to ensure your complete recovery.",
        bullets: [
            "Customized Diet & Physio Plans",
            "Remote Vitals Monitoring",
            "Home Care Nurse Visits",
            "Lifetime Digital Health Records"
        ],
        cta: "View Care Plans",
        image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=800&auto=format&fit=crop"
    }
];

export function WhyChooseUs() {
    const [activeFeature, setActiveFeature] = useState(0);

    // Scroll functionality to update active image
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.feature-card');
            const viewportMiddle = window.innerHeight / 2;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardMiddle = rect.top + rect.height / 2;

                // Threshold: Switch when card middle is near viewport middle
                if (cardMiddle >= viewportMiddle - 300 && cardMiddle <= viewportMiddle + 300) {
                    setActiveFeature(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="bg-white relative">
            <div className="container mx-auto px-4 md:px-6">

                {/* Mobile: Stacked Layout */}
                <div className="lg:hidden py-16 space-y-20">
                    <div className="text-center mb-10">
                        <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Why Choose Stork</span>
                        <h2 className="text-3xl font-bold text-slate-900">Healthcare Simplified</h2>
                    </div>

                    {features.map((feature) => (
                        <div key={feature.id} className="space-y-6">
                            <div className="relative h-64 w-full rounded-3xl overflow-hidden shadow-lg">
                                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                <ul className="space-y-3">
                                    {feature.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full mt-4 bg-primary text-white">{feature.cta}</Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Split Sticky Layout */}
                <div className="hidden lg:flex w-full">

                    {/* Left Column: Sticky Visuals */}
                    {/* Width: 45% */}
                    <div className="w-[45%] relative">
                        <div className="sticky top-0 h-screen flex items-center justify-center p-8">
                            {/* Decorative Background Blob */}
                            <div className="absolute w-[120%] h-[80%] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60"></div>

                            <div className="relative w-full max-w-[500px] aspect-[4/5] max-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-100/50 border-[6px] border-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeFeature}
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src={features[activeFeature].image}
                                            alt="Feature Visual"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Subtle Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scrollable Content */}
                    {/* Width: 55% */}
                    <div className="w-[55%] py-32 pl-16">
                        <div className="mb-32">
                            <span className="text-teal-600 font-bold tracking-widest text-sm uppercase mb-3 block">Why Choose Stork</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                                Redefining Healthcare <br />
                                <span className="italic text-primary">Experience</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-[30vh]">
                            {features.map((feature, i) => (
                                <div
                                    key={feature.id}
                                    className={cn(
                                        "feature-card transition-all duration-500",
                                        activeFeature === i ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[2px]"
                                    )}
                                >
                                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100">
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                        <p className="text-lg text-slate-500 font-light leading-relaxed mb-8">
                                            {feature.description}
                                        </p>

                                        <div className="space-y-4 mb-10">
                                            {feature.bullets.map((bullet, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{bullet}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/book">
                                            <Button className="h-14 px-8 text-lg rounded-full bg-[#0F4C81] hover:bg-[#0B3B66] hover:gap-4 transition-all">
                                                {feature.cta} <ArrowRight className="ml-2 w-5 h-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Extra spacer at bottom to allow last card to scroll up */}
                        <div className="h-[20vh]"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
