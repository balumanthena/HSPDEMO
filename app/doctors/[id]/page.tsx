import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Stethoscope, Star, Calendar, Clock, Award, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Metadata } from "next";

// Fallback data (must match Listing page mocks mostly)
const MOCK_DOCTORS: Record<string, any> = {
    '1': { id: '1', name: 'Dr. Sarah Wilson', specialization: 'Cardiology', experience: 15, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 5.0, nextAvailable: 'Today, 2:00 PM', about: 'Dr. Sarah Wilson is a leading cardiologist with over 15 years of experience in treating complex heart conditions. She specializes in preventative cardiology and heart failure management.' },
    '2': { id: '2', name: 'Dr. James Chen', specialization: 'Pediatrics', experience: 10, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop', availability: 'Busy', rating: 4.8, nextAvailable: 'Tomorrow, 10:00 AM', about: 'Dr. James Chen loves working with children and is dedicated to providing compassionate care for your little ones.' },
    '3': { id: '3', name: 'Dr. Emily Brooks', specialization: 'Gynecology', experience: 12, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', isFeatured: true, rating: 4.9, nextAvailable: 'Today, 5:30 PM', about: 'Dr. Emily Brooks provides comprehensive women’s health services including prenatal care and gynecological surgeries.' },
    '4': { id: '4', name: 'Dr. Michael Ross', specialization: 'Orthopedics', experience: 18, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.7, nextAvailable: 'Today, 11:00 AM', about: 'Dr. Michael Ross is an expert in joint replacement and sports injuries.' },
    '5': { id: '5', name: 'Dr. Anita Roy', specialization: 'Dermatology', experience: 8, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.6, nextAvailable: 'Tomorrow, 9:00 AM', about: 'Dr. Anita Roy specializes in medical and cosmetic dermatology.' },
    '6': { id: '6', name: 'Dr. Robert Fox', specialization: 'General Surgery', experience: 22, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop', availability: 'Available', rating: 4.9, nextAvailable: 'Today, 4:00 PM', about: 'Dr. Robert Fox performs a wide range of surgical procedures with a focus on minimally invasive techniques.' },
};

export const revalidate = 60;

type Props = {
    params: Promise<{ id: string }>;
};

async function getDoctor(id: string) {
    if (!supabase) return MOCK_DOCTORS[id] || null;

    try {
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return MOCK_DOCTORS[id] || null;
        return data;
    } catch (e) {
        return MOCK_DOCTORS[id] || null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const doctor = await getDoctor(id);

    if (!doctor) return { title: 'Doctor Not Found' };

    return {
        title: `${doctor.name} - ${doctor.specialization} | Stork Hospital`,
        description: `Book an appointment with ${doctor.name}, specialist in ${doctor.specialization} at Stork Multispecialty Hospital.`,
        openGraph: {
            title: `${doctor.name} - ${doctor.specialization}`,
            description: doctor.about,
            images: [doctor.image]
        }
    };
}

export default async function DoctorDetailPage({ params }: Props) {
    const { id } = await params;
    const doctor = await getDoctor(id);

    if (!doctor) return notFound();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="pt-32 pb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <Link href="/doctors" className="inline-flex items-center text-text-muted hover:text-primary mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Doctors
                    </Link>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            {/* Image Section */}
                            <div className="md:w-1/3 relative h-[400px] md:h-auto bg-gray-100">
                                <Image
                                    src={doctor.image}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Info Section */}
                            <div className="md:w-2/3 p-8 md:p-12 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                                            <Stethoscope size={14} /> {doctor.specialization}
                                        </span>
                                        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                                            {doctor.name}
                                        </h1>
                                        <div className="flex items-center gap-2 text-text-muted">
                                            <ShieldCheck size={16} className="text-emerald-500" />
                                            <span>{doctor.experience}+ Years Experience</span>
                                            <span className="text-gray-300">•</span>
                                            <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                                <Star size={14} fill="currentColor" /> {doctor.rating || 5.0}
                                            </div>
                                        </div>
                                    </div>
                                    {doctor.isFeatured && (
                                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
                                            <Award size={14} /> Top Rated
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-text-primary mb-3">About Doctor</h3>
                                <p className="text-text-muted leading-relaxed mb-8 text-lg">
                                    {doctor.about || `${doctor.name} is a dedicated expert in ${doctor.specialization}, providing compassionate care with a focus on patient well-being and advanced medical treatments.`}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Availability</p>
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold">
                                            <Calendar size={18} />
                                            {doctor.availability || 'Available'}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Next Slot</p>
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <Clock size={18} />
                                            {doctor.nextAvailable || 'Today'}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <Link href={`/book?doctor=${doctor.id}`} className="flex-1">
                                        <Button className="w-full h-12 text-lg rounded-xl">Book Appointment</Button>
                                    </Link>
                                    <Link href="/contact" className="flex-1">
                                        <Button variant="secondary" className="w-full h-12 text-lg rounded-xl">Contact Clinic</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
