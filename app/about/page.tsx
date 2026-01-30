'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from '@/components/ui/PageHeader';
import Image from 'next/image';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <PageHeader
                title="About"
                highlight="Stork Hospital"
                description="A premier healthcare destination dedicated to providing world-class medical care with compassion and expertise."
            />

            {/* Mission Vision */}
            <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-12 md:-mt-24 mb-12 md:mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-6">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Mission</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            To provide accessible, affordable, and high-quality healthcare to every individual with dignity and empathy.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-6">
                            <Lightbulb size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Vision</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            To be the most trusted healthcare partner, known for clinical excellence and patient-centric care.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-6">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Our Values</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                            Integrity, Compassion, Innovation, and Excellence in everything we do.
                        </p>
                    </div>
                </div>

                {/* Infrastructure */}
                <div>
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                            Infrastructure
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">World-Class Facilities</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative h-72 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                <Image
                                    src={`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80`}
                                    alt="Infrastructure"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                                    <p className="text-white font-bold text-lg">Advanced Operation Theater</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
