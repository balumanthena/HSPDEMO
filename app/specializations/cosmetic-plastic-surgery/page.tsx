import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone, CalendarCheck, Sparkles, ShieldCheck, Heart, Star, ChevronDown } from 'lucide-react';

export const metadata = {
    title: 'Cosmetic & Plastic Surgery | Stork Multispecialty Hospital',
    description: 'Expert cosmetic and reconstructive surgery services at Stork Hospital. Enhance your appearance and restore function with our board-certified specialists.',
};

export default function CosmeticSurgeryPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
                {/* Background Pattern - Optional */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <Link href="/specializations" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-2" /> Back to Departments
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-sm mb-6">
                            <Sparkles size={32} className="text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Cosmetic & Plastic Surgery
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-2xl leading-relaxed">
                            Redefining beauty with precision, safety, and artistry.
                            {/* Placeholder tag line if not provided */}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/book">
                                <Button className="h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-slate-100 shadow-xl shadow-black/10 rounded-xl">
                                    Book Consultation
                                </Button>
                            </Link>
                            <Link href="#services">
                                <Button variant="outline" className="h-14 px-8 text-lg font-bold text-white border-white/30 hover:bg-white/10 rounded-xl">
                                    View Treatments
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Introduction Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Enhance Your Natural Beauty
                    </h2>
                    <div className="prose prose-lg mx-auto text-slate-600 leading-relaxed">
                        <p>
                            {/* PLACEHOLDER: WAITING FOR CONTENT */}
                            [Introduction content regarding Stork Hospital’s Department of Cosmetic & Plastic Surgery.
                            Narrative about enhancing appearance, restoring function, and board-certified expertise.]
                        </p>
                        <p>
                            [Second paragraph about safety, privacy, and personalized care.]
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Stork */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Stork?</h2>
                        <p className="text-lg text-slate-600">World-class expertise meets compassionate care.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Placeholder Items based on previous data - waiting for exact content if different */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <Star size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Surgeons</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Board-certified specialists with global training in aesthetic procedures.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Safety First</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Strict adherence to international safety protocols and sterilization standards.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized Plans</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Customized treatment plans tailored to your unique anatomical goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Services Section */}
            <section id="services" className="py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Comprehensive Treatments</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Block A: Cosmetic Surgery */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                                Cosmetic Surgery
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Rhinoplasty (Nose Reshaping)',
                                    'Liposuction & Body Contouring',
                                    'Breast Augmentation & Reduction',
                                    'Facelifts & Anti-aging Treatments',
                                    'Tummy Tuck (Abdominoplasty)',
                                    'Mommy Makeovers'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                        </div>
                                        <span className="text-lg text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Block B: Reconstructive Surgery */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                                Reconstructive Surgery
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Trauma & Accident Reconstruction',
                                    'Burn Reconstruction & Scar Revision',
                                    'Hand Surgery',
                                    'Congenital Defect Correction',
                                    'Skin Cancer Removal & Reconstruction',
                                    'Microsurgery'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        </div>
                                        <span className="text-lg text-slate-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Our Approach */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 pattern-grid-lg opacity-10"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Approach</h2>
                    <div className="prose prose-lg prose-invert mx-auto leading-relaxed text-slate-300">
                        <p>
                            {/* PLACEHOLDER: WAITING FOR CONTENT */}
                            [Content describing the philosophy of care, emphasis on safety, natural results, and patient empowerment.]
                        </p>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {/* Placeholder FAQs - Structure ready for content */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <details className="group">
                                    <summary className="list-none flex justify-between items-center font-bold text-lg text-slate-800 cursor-pointer">
                                        <span>[Question Placeholder {i}]</span>
                                        <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <div className="mt-4 text-slate-600 leading-relaxed pl-1 pt-2 border-t border-slate-50">
                                        [Answer content goes here. Waiting for text provided by user.]
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-primary rounded-[3rem] p-12 md:p-16 text-center text-white shadow-2xl shadow-primary/30 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
                            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
                                Schedule a confidential consultation with our experts today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <Link href="/book">
                                    <Button className="h-14 px-10 text-lg font-bold bg-white text-primary hover:bg-slate-100 rounded-xl shadow-lg w-full sm:w-auto">
                                        Book Consultation
                                    </Button>
                                </Link>
                                <a href="tel:1800-STORK-HSP">
                                    <Button variant="outline" className="h-14 px-10 text-lg font-bold text-white border-white/30 hover:bg-white/10 rounded-xl w-full sm:w-auto">
                                        Call 1800-STORK-HSP
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
