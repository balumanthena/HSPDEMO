'use client';

import { useState, useEffect, useRef } from 'react';
import { InfoCard } from '@/components/ui/InfoCard';
import { Baby, Activity, Heart, Bone, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DoctorCard, Doctor } from '@/components/ui/DoctorCard';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { cn } from '@/lib/utils';

// Specializations Data
const specializations = [
    { title: 'Obstetrics & Gynecology', description: 'Comprehensive women’s health and maternity care.', icon: Baby, href: '/specializations', animation: 'bounce' },
    { title: 'Pediatrics', description: 'Expert care for newborns, children, and adolescents.', icon: Stethoscope, href: '/specializations', animation: 'wiggle' },
    { title: 'Cardiology', description: 'Advanced heart care and cardiac surgeries.', icon: Heart, href: '/specializations', animation: 'heartbeat' },
    { title: 'Orthopedics', description: 'Bone, joint, and spine care solutions.', icon: Bone, href: '/specializations', animation: 'pulse' },
    { title: 'Diagnostic Services', description: '24/7 Pathology and Imaging services.', icon: Activity, href: '/diagnostics', animation: 'ecg' },
];

const iconVariants = {
    bounce: {
        y: [0, -10, 0],
        transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" as const, ease: "easeOut" as const }
    },
    heartbeat: {
        scale: [1, 1.3, 1],
        transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const }
    },
    ecg: {
        scale: [1, 1, 1.25, 0.9, 1.1, 1, 1],
        opacity: [1, 1, 0.8, 1, 1, 1, 1],
        transition: {
            duration: 1.5,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    },
    wiggle: {
        rotate: [0, 15, -15, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const }
    },
    pulse: {
        scale: [1, 1.15, 1],
        opacity: [1, 0.8, 1],
        transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" as const }
    }
};

export function SpecializationsGrid() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track Mobile State
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-scroll logic (Mobile Only)
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            if (containerRef.current) {
                const nextIndex = (activeIndex + 1) % specializations.length;
                setActiveIndex(nextIndex);

                const container = containerRef.current;
                const card = container.children[nextIndex] as HTMLElement;

                if (card) {
                    const scrollLeft = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds interval

        return () => clearInterval(interval);
    }, [activeIndex, isMobile]);

    // Sync active state on manual scroll
    const handleScroll = () => {
        if (!isMobile || !containerRef.current) return;

        if (containerRef.current) {
            const container = containerRef.current;
            const center = container.scrollLeft + container.offsetWidth / 2;

            let closestIndex = 0;
            let minDistance = Infinity;

            Array.from(container.children).forEach((child, index) => {
                const htmlChild = child as HTMLElement;
                const childCenter = htmlChild.offsetLeft + htmlChild.offsetWidth / 2;
                const distance = Math.abs(childCenter - center);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            if (closestIndex !== activeIndex) {
                setActiveIndex(closestIndex);
            }
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F4C81_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-2 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-text-primary leading-tight">
                            Clinical <span className="italic text-primary">Excellence</span>
                        </h2>
                        <p className="text-text-muted text-lg mt-4 font-light">
                            Combining specialized skills with advanced technology to deliver precision healthcare.
                        </p>
                    </div>
                    <Link href="/specializations">
                        <Button variant="secondary" className="rounded-full px-8 hover:bg-primary hover:text-white transition-all duration-300">
                            View All Departments
                        </Button>
                    </Link>
                </div>

                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6 md:pb-0 md:mx-0 md:px-0 md:overflow-visible no-scrollbar"
                >
                    {specializations.map((spec, i) => {
                        const isActive = isMobile && i === activeIndex;
                        return (
                            <Link key={i} href={spec.href} className="group relative h-80 perspective-1000 min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
                                <motion.div
                                    className={cn(
                                        "absolute inset-0 rounded-[20px] transition-all duration-500 ease-out overflow-hidden flex flex-col p-8 border",
                                        isActive
                                            ? "bg-primary -translate-y-2 shadow-2xl border-primary"
                                            : "bg-gray-50 shadow-gray-200 border-gray-100 group-hover:bg-primary group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-primary"
                                    )}
                                    whileHover="hover"
                                >
                                    {/* Icon Background Blob */}
                                    <div className={cn(
                                        "absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl transition-colors duration-500",
                                        isActive ? "bg-white/10" : "bg-blue-100/50 group-hover:bg-white/10"
                                    )}></div>

                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary mb-6 relative z-10">
                                        <motion.div
                                            variants={{
                                                hover: iconVariants[spec.animation as keyof typeof iconVariants]
                                            }}
                                        >
                                            <spec.icon size={28} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    <h3 className={cn(
                                        "text-xl font-bold mb-3 transition-colors duration-300 leading-snug",
                                        isActive ? "text-white" : "text-text-primary group-hover:text-white"
                                    )}>
                                        {spec.title}
                                    </h3>

                                    <p className={cn(
                                        "text-sm leading-relaxed transition-colors duration-300",
                                        isActive ? "text-white/80" : "text-text-muted group-hover:text-white/80"
                                    )}>
                                        {spec.description}
                                    </p>

                                    <div className={cn(
                                        "mt-auto flex items-center font-semibold text-sm transition-all duration-300 delay-100",
                                        isActive
                                            ? "text-white opacity-100 translate-y-0"
                                            : "text-primary opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:text-white"
                                    )}>
                                        Explore <ArrowRight size={16} className="ml-2" />
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Doctors Preview
const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Smith', specialization: 'Neurologist', experience: 15, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 5.0, nextAvailable: 'Today 5:00 PM' },
    { id: '2', name: 'Dr. John Doe', specialization: 'Cardiologist', experience: 12, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop', availability: 'Busy', rating: 4.8 },
    { id: '3', name: 'Dr. Emily Davis', specialization: 'Pediatrician', experience: 8, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop', availability: 'Available', nextAvailable: 'Tomorrow 10:00 AM', rating: 4.9 },
    { id: '4', name: 'Dr. Michael Brown', specialization: 'Orthopedic', experience: 20, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', availability: 'Available', rating: 4.9 },
];

export function DoctorsPreview() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track Mobile State
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-scroll logic (Mobile Only)
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            if (containerRef.current) {
                const nextIndex = (activeIndex + 1) % doctors.length;
                setActiveIndex(nextIndex);

                const container = containerRef.current;
                const card = container.children[nextIndex] as HTMLElement;
                if (card) {
                    const scrollLeft = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [activeIndex, isMobile]);

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-2 block">Top Specialists</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Meet Our <span className="italic text-primary">Experts</span>
                        </h2>
                    </div>
                    <Link href="/doctors">
                        <div className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300">
                            View All Doctors <ArrowRight size={20} />
                        </div>
                    </Link>
                </div>

                <div
                    ref={containerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible no-scrollbar"
                >
                    {doctors.map(doc => (
                        <div key={doc.id} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
                            <DoctorCard doctor={doc} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials
const testimonials: any[] = [
    { id: '1', name: 'Priya Sharma', treatment: 'Maternity Care', rating: 5, story: "The care I received at Stork was beyond my expectations. The nurses were so attentive and Dr. Smith was amazing throughout my pregnancy." },
    { id: '2', name: 'Rahul Verma', treatment: 'Knee Surgery', rating: 5, story: "State of the art facilities and a very professional team. My recovery was faster than expected thanks to their physio department." },
    { id: '3', name: 'Anjali Gupta', treatment: 'Pediatrics', rating: 4, story: "Great experience for my child's checkup. The waiting area is kid-friendly and the staff is very polite." },
];

export function TestimonialsSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[radial-gradient(#0F4C81_1px,transparent_1px)] [background-size:24px_24px]"></div>

            {/* Subtle Gradient Orbs */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-primary/60 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Trusted Feedback</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight mb-6">
                        Real Stories, <br />
                        <span className="italic text-primary">Real Impact</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        Hearing about healing journeys from our patients inspires us to continually raise the bar in medical excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 px-4">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Final CTA
export function FinalCTA() {
    return (
        <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-bold mb-6">Ready to prioritize your health?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Book an appointment today and experience the future of healthcare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/book">
                        <Button variant="secondary" className="h-14 px-8 text-lg rounded-full">Book Now</Button>
                    </Link>
                    <Link href="/contact">
                        <Button className="h-14 px-8 text-lg bg-white/10 hover:bg-white/20 border-white/20 rounded-full backdrop-blur-sm">Contact Us</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
