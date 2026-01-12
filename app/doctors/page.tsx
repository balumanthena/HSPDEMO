'use client';

import { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DoctorCard, Doctor } from '@/components/ui/DoctorCard';
import { Search } from 'lucide-react';

const allDoctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Wilson', specialization: 'Cardiology', experience: 15, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 5.0, nextAvailable: 'Today, 2:00 PM' },
    { id: '2', name: 'Dr. James Chen', specialization: 'Pediatrics', experience: 10, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop', availability: 'Busy', rating: 4.8, nextAvailable: 'Tomorrow, 10:00 AM' },
    { id: '3', name: 'Dr. Emily Brooks', specialization: 'Gynecology', experience: 12, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 4.9, nextAvailable: 'Today, 5:30 PM' },
    { id: '4', name: 'Dr. Michael Ross', specialization: 'Orthopedics', experience: 18, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.7, nextAvailable: 'Today, 11:00 AM' },
    { id: '5', name: 'Dr. Anita Roy', specialization: 'Dermatology', experience: 8, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.6, nextAvailable: 'Tomorrow, 9:00 AM' },
    { id: '6', name: 'Dr. Robert Fox', specialization: 'General Surgery', experience: 22, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.9, nextAvailable: 'Today, 4:00 PM' },
];

const specializations = ['All', 'Cardiology', 'Pediatrics', 'Gynecology', 'Orthopedics', 'Dermatology', 'General Surgery'];

export default function DoctorsPage() {
    const [selectedSpec, setSelectedSpec] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDoctors = allDoctors.filter(doc => {
        const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec;
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSpec && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="bg-primary/5 pt-32 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl font-bold text-text-primary mb-4 text-center">Find a Doctor</h1>
                    <p className="text-center text-text-muted max-w-2xl mx-auto mb-8">
                        Browse our team of expert specialists. dedicated to providing the best medical care.
                    </p>

                    {/* Search & Filter */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by name or specialization..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border shadow-sm focus:ring-2 focus:ring-primary outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center">
                            {specializations.map(spec => (
                                <button
                                    key={spec}
                                    onClick={() => setSelectedSpec(spec)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSpec === spec
                                        ? 'bg-primary text-white shadow-md'
                                        : 'bg-white text-text-muted hover:bg-gray-100 border border-gray-200'
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
