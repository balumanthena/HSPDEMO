'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

            <section className="bg-primary text-white pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl font-bold mb-4">Advanced Diagnostics & Labs</h1>
                    <p className="text-xl opacity-90 max-w-2xl">
                        State-of-the-art diagnostic services ensuring 100% accurate results for better treatment planning.
                    </p>
                </div>
            </section>

            <section className="py-16 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
                            <Microscope size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Pathology Lab</h3>
                        <p className="text-text-muted">High-precision automated analyzers for blood, chemical, and fluid analysis.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <Scan size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Radiology & Imaging</h3>
                        <p className="text-text-muted">3 Tesla MRI, low-dose CT Scan, 4D Ultrasound, and Digital X-Ray services.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Home Sample Collection</h3>
                        <p className="text-text-muted">Safe and hygienic sample collection from the comfort of your home.</p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-12">Popular Health Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {packages.map((pkg, i) => (
                        <div key={i} className={`rounded-3xl p-8 relative ${pkg.popular ? 'bg-primary text-white shadow-xl scale-105 z-10' : 'bg-white border border-gray-200'}`}>
                            {pkg.popular && (
                                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-text-primary'}`}>{pkg.name}</h3>
                            <div className="text-3xl font-bold mb-6">{pkg.price}</div>

                            <ul className="space-y-4 mb-8">
                                {pkg.tests.map(test => (
                                    <li key={test} className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className={pkg.popular ? 'text-blue-200' : 'text-primary'} />
                                        <span className={pkg.popular ? 'text-blue-50' : 'text-text-muted'}>{test}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                fullWidth
                                variant={pkg.popular ? 'secondary' : 'primary'}
                                className={pkg.popular ? 'bg-white text-primary border-none hover:bg-gray-100' : ''}
                            >
                                Book Now
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
