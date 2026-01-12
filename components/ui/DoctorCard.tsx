import Image from 'next/image';
import Link from 'next/link';
import { Clock, Star, Award, Stethoscope, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    experience: number; // years
    image: string;
    availability: 'Available' | 'Busy';
    isFeatured?: boolean;
    nextAvailable?: string; // e.g. "Today, 4:00 PM"
    rating?: number;
    reviewCount?: number;
}

interface DoctorCardProps {
    doctor: Doctor;
    className?: string;
}

export function DoctorCard({ doctor, className }: DoctorCardProps) {
    return (
        <div className={cn(
            "group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 flex flex-col h-full",
            className
        )}>
            {/* Image Container */}
            <div className="relative h-72 w-full overflow-hidden bg-gray-50">
                <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-4 right-4 z-10">
                    {doctor.availability === 'Available' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-lg border border-emerald-400/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse" />
                            Available
                        </span>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/90 text-white backdrop-blur-md shadow-lg">
                            Busy
                        </span>
                    )}
                </div>

                {doctor.isFeatured && (
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-primary shadow-lg backdrop-blur-md">
                        <Award size={12} className="mr-1" /> Top Rated
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow relative">
                {/* Floating Rating Pill */}
                <div className="absolute -top-5 right-6 bg-white px-3 py-1.5 rounded-full shadow-lg border border-gray-50 flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Star size={12} className="text-yellow-400 fill-current" /> {doctor.rating || '4.9'}
                </div>

                <div className="mb-4">
                    <p className="text-secondary font-semibold text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Stethoscope size={12} /> {doctor.specialization}
                    </p>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                        {doctor.name}
                    </h3>
                </div>

                <div className="flex items-center gap-4 text-xs text-text-muted mb-6">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        <span>{doctor.experience}+ Years Exp.</span>
                    </div>
                    {doctor.nextAvailable && (
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <span className="text-blue-600 font-medium">Next: {doctor.nextAvailable}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
                    <Link href={`/doctors/${doctor.id}`} className="text-text-muted hover:text-primary text-sm font-medium transition-colors">
                        View Profile
                    </Link>
                    <Link href={`/book?doctor=${doctor.id}`}>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 text-text-primary text-sm font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            Book Visit <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
