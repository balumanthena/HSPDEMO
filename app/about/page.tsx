'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from 'next/image';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">About Stork Hospital</h1>
                    <p className="max-w-3xl mx-auto text-text-muted text-lg">
                        A premier healthcare destination dedicated to providing world-class medical care with compassion and expertise.
                    </p>
                </div>
            </section>

            {/* Mission Vision */}
            <section className="py-20 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary mx-auto">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">Our Mission</h3>
                        <p className="text-text-muted">
                            To provide accessible, affordable, and high-quality healthcare to every individual with dignity and empathy.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary mx-auto">
                            <Lightbulb size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">Our Vision</h3>
                        <p className="text-text-muted">
                            To be the most trusted healthcare partner, known for clinical excellence and patient-centric care.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-primary mx-auto">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-bold">Our Values</h3>
                        <p className="text-text-muted">
                            Integrity, Compassion, Innovation, and Excellence in everything we do.
                        </p>
                    </div>
                </div>
            </section>

            {/* Infrastructure */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">World-Class Infrastructure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <Image
                                    src={`https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&h=400&q=80`} // Placeholder reuse
                                    alt="Infrastructure"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
