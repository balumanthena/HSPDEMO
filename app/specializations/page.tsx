import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InfoCard } from '@/components/ui/InfoCard';
import { Baby, Stethoscope, Heart, Bone, Brain, Eye, UserCog, Activity, Pill, PlusSquare } from 'lucide-react';
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Specializations & Departments | Stork Multispecialty Hospital',
    description: 'Comprehensive medical services including Cardiology, Pediatrics, Gynecology, and more.',
};

const iconMap: Record<string, any> = {
    'Baby': Baby,
    'Stethoscope': Stethoscope,
    'Heart': Heart,
    'Bone': Bone,
    'Brain': Brain,
    'Eye': Eye,
    'UserCog': UserCog,
    'Activity': Activity,
    'Pill': Pill,
    'default': PlusSquare
};

const MOCK_SPECIALIZATIONS = [
    { title: 'Obstetrics & Gynecology', description: 'Comprehensive women’s health and maternity care services.', icon_name: 'Baby' },
    { title: 'Pediatrics', description: 'Expert care for newborns, children, and adolescents.', icon_name: 'Stethoscope' },
    { title: 'Cardiology', description: 'Advanced heart care, diagnostics, and cardiac surgeries.', icon_name: 'Heart' },
    { title: 'Orthopedics', description: 'Bone, joint, and spine care solutions including replacements.', icon_name: 'Bone' },
    { title: 'Neurology', description: 'Treatment for disorders of the nervous system and brain.', icon_name: 'Brain' },
    { title: 'Ophthalmology', description: 'Advanced eye care covering cataracts, glaucoma, and more.', icon_name: 'Eye' },
    { title: 'General Surgery', description: 'Minimally invasive and laparoscopic surgical procedures.', icon_name: 'UserCog' },
    { title: 'Internal Medicine', description: 'Diagnosis and treatment of adult diseases and chronic conditions.', icon_name: 'Activity' },
    { title: 'Pharmacy', description: '24/7 Pharmacy with home delivery options.', icon_name: 'Pill' },
];

export const revalidate = 60;

async function getSpecializations() {
    if (!supabase) return MOCK_SPECIALIZATIONS;

    try {
        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .order('title');

        if (error || !data || data.length === 0) return MOCK_SPECIALIZATIONS;
        return data;
    } catch (e) {
        return MOCK_SPECIALIZATIONS;
    }
}

export default async function SpecializationsPage() {
    const specializations = await getSpecializations();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="bg-white pt-32 pb-16 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold text-text-primary mb-6">Our Specializations</h1>
                    <p className="max-w-3xl mx-auto text-text-muted text-lg">
                        We offer a comprehensive range of medical services to ensure that you and your family receive the best possible care under one roof.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specializations.map((spec: any, i: number) => {
                        const Icon = iconMap[spec.icon_name] || iconMap['default'];
                        return <InfoCard key={i} title={spec.title} description={spec.description} icon={Icon} className="h-64" />;
                    })}
                </div>
            </div>

            <Footer />
        </main>
    );
}
