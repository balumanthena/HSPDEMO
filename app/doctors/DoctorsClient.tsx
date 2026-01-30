'use client';

import { useState } from 'react';
import { DoctorCard, Doctor } from '@/components/ui/DoctorCard';
import { Search } from 'lucide-react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Fallback is passed from parent, but we can keep types here or import them.

import { PageHeader } from '@/components/ui/PageHeader';

// ... existing imports ...

export default function DoctorsClient({ initialDoctors }: { initialDoctors: Doctor[] }) {
    const [selectedSpec, setSelectedSpec] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique specializations from data
    const specializations = ['All', ...Array.from(new Set(initialDoctors.map(d => d.specialization)))];

    const filteredDoctors = initialDoctors.filter(doc => {
        const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec;
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSpec && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <PageHeader
                title="Find a"
                highlight="Specialist"
                description="Browse our team of expert doctors dedicated to providing world-class medical care."
            />

            {/* Search & Filter Section */}
            <div className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-20 mb-12 md:mb-16">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name or specialization..."
                                className="w-full pl-14 pr-6 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 justify-center">
                            {specializations.map(spec => (
                                <button
                                    key={spec}
                                    onClick={() => setSelectedSpec(spec)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${selectedSpec === spec
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                                        }`}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 flex-grow">
                {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDoctors.map(doc => (
                            <DoctorCard key={doc.id} doctor={doc} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-text-muted">
                        <p className="text-lg">No doctors found matching your criteria.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
