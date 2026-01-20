'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Clock, Activity, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

const features = [
    {
        icon: ShieldCheck,
        title: "World-Class Accreditation",
        description: "JCI & NABH accredited hospitals ensuring the highest global standards of safety and care.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: UserCheck,
        title: "Expert Specialists",
        description: "Access to board-certified doctors with 15+ years of experience across 30+ specialties.",
        color: "text-teal-600",
        bg: "bg-teal-50"
    },
    {
        icon: Clock,
        title: "24/7 Rapid Care",
        description: "Round-the-clock emergency response and pharmacy services. We are always here for you.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        icon: Activity,
        title: "Advanced Technology",
        description: "State-of-the-art robotic surgery and diagnostic centers for precise and faster recovery.",
        color: "text-rose-600",
        bg: "bg-rose-50"
    }
];

export function WhyChooseUs() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 rounded-l-[5rem] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Heading & Content */}
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6">
                                Why Choose Stork
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.15] mb-6">
                                The Gold Standard in <br />
                                <span className="text-primary italic">Medical Excellence</span>.
                            </h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-10">
                                We combine compassionate care with cutting-edge technology to deliver the best possible outcomes. Your health is our only priority.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/book">
                                    <Button className="h-14 px-8 rounded-full text-base bg-primary hover:bg-blue-800 shadow-xl shadow-blue-900/10">
                                        Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" className="h-14 px-8 rounded-full text-base border-slate-200 text-slate-600 hover:bg-slate-50">
                                        About Us
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Premium Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-[2rem] bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>

                {/* Bottom Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { label: "Patients Served", value: "50k+" },
                        { label: "Expert Doctors", value: "100+" },
                        { label: "Surgeries Done", value: "12k+" },
                        { label: "Patient Satisfaction", value: "99%" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
