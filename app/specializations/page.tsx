import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from '@/components/ui/PageHeader';
import { InfoCard } from '@/components/ui/InfoCard';
import * as LucideIcons from 'lucide-react';
import { Metadata } from "next";
import { DEPARTMENTS } from "@/lib/departments_data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: 'Specializations & Departments | Stork Multispecialty Hospital',
    description: 'Comprehensive medical services including Cardiology, Pediatrics, Gynecology, and more.',
};

export const revalidate = 60;

export default function SpecializationsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <PageHeader
                title="Our Centers of"
                highlight="Excellence"
                description="We offer a comprehensive range of medical services to ensure that you and your family receive the best possible care under one roof."
            />

            <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-24 -mt-12 md:-mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DEPARTMENTS.map((spec, i) => {
                        const Icon = (LucideIcons as any)[spec.iconName || 'Activity'] || LucideIcons.Activity;
                        return (
                            <div key={i} className="group h-full">
                                <InfoCard
                                    title={spec.title}
                                    description={spec.overview.substring(0, 120) + '...'}
                                    icon={Icon}
                                    href={`/specializations/${spec.slug}`}
                                    className="h-full bg-white border-0 shadow-xl shadow-slate-200/50 rounded-3xl group-hover:shadow-2xl group-hover:shadow-blue-900/10 transition-all duration-300 group-hover:-translate-y-1"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
