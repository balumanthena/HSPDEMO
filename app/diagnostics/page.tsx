'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Microscope, Scan, FileText, CheckCircle2 } from 'lucide-react';

const packages = [
    {
        name: "Basic Health Checkup",
        price: "₹1,499",
        tests: ["CBC & ESR", "Blood Sugar (F/PP)", "Lipid Profile", "Liver Function Test", "Kidney Function Test"],
        color: "bg-blue-50 border-blue-100"
    },
    {
        name: "Comprehensive Care",
        price: "₹3,999",
        tests: ["Basic Checkup +", "Thyroid Profile", "Vitamin D & B12", "Hba1c", "ECG", "Chest X-Ray"],
        popular: true,
        color: "bg-primary text-white"
    },
    {
        name: "Senior Citizen Package",
        price: "₹2,999",
        tests: ["Complete Blood Count", "Diabetes Screening", "Cardiac Risk Maker", "Bone Health", "Doctor Consultation"],
        color: "bg-green-50 border-green-100"
    }
];

export default function DiagnosticsPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <PageHeader
                title="Advanced Diagnostics"
                highlight="& Labs"
                description="State-of-the-art diagnostic services ensuring 100% accurate results for better treatment planning."
            />

            <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-12 md:-mt-24 mb-12 md:mb-24">
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                            <Microscope size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Pathology Lab</h3>
                        <p className="text-slate-500 leading-relaxed">High-precision automated analyzers for blood, chemical, and fluid analysis.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <Scan size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Radiology & Imaging</h3>
                        <p className="text-slate-500 leading-relaxed">3 Tesla MRI, low-dose CT Scan, 4D Ultrasound, and Digital X-Ray services.</p>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Home Sample Collection</h3>
                        <p className="text-slate-500 leading-relaxed">Safe and hygienic sample collection from the comfort of your home.</p>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                        Health Packages
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Popular Health Packages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {packages.map((pkg, i) => (
                        <div key={i} className={`rounded-[2rem] p-8 relative transition-all duration-300 ${pkg.popular ? 'bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-105 z-10' : 'bg-white border border-slate-100 shadow-lg hover:shadow-xl'}`}>
                            {pkg.popular && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-[1.8rem] uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
                            <div className="text-4xl font-serif font-bold mb-6">{pkg.price}</div>

                            <ul className="space-y-4 mb-8">
                                {pkg.tests.map(test => (
                                    <li key={test} className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className={pkg.popular ? 'text-blue-400' : 'text-primary'} />
                                        <span className={pkg.popular ? 'text-slate-300' : 'text-slate-500'}>{test}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                fullWidth
                                variant={pkg.popular ? 'secondary' : 'primary'}
                                className={`h-12 rounded-xl text-base font-medium ${pkg.popular ? 'bg-white text-slate-900 border-none hover:bg-blue-50' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                            >
                                Book Checkup
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
