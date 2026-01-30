import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import { DEPARTMENTS } from '@/lib/departments_data';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone, CalendarCheck } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return DEPARTMENTS.map((dept) => ({
        slug: dept.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const department = DEPARTMENTS.find((d) => d.slug === slug);

    if (!department) {
        return {
            title: 'Department Not Found',
        };
    }

    return {
        title: `${department.title} | Stork Multispecialty Hospital`,
        description: department.overview.substring(0, 160),
    };
}

export default async function DepartmentPage({ params }: Props) {
    const { slug } = await params;
    const department = DEPARTMENTS.find((d) => d.slug === slug);

    if (!department) {
        notFound();
    }

    // Dynamic Icon
    const IconComponent = (LucideIcons as any)[department.iconName || 'Activity'] || LucideIcons.Activity;

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-primary text-white pt-32 pb-16 md:pb-24">
                <div className="container mx-auto px-4 md:px-6">
                    <Link href="/specializations" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Departments
                    </Link>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <IconComponent size={48} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{department.title}</h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
                                {department.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Services Section */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Services & Treatments
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {department.services.map((service, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <CheckCircle2 size={20} className="text-accent mt-0.5 shrink-0" />
                                        <span className="font-medium text-slate-700">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Facilities Section */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Facilities & Technology
                            </h2>
                            <ul className="space-y-3">
                                {department.facilities.map((facility, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                        <span className="text-lg text-slate-700">{facility}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Why Choose Us Section */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                                <span className="w-1.5 h-8 bg-secondary rounded-full"></span>
                                Why Choose Stork for {department.title}?
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {department.whyChooseUs.map((item, idx) => (
                                    <div key={idx} className="border-l-4 border-slate-200 pl-4 py-1">
                                        <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                                        <p className="text-slate-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 sticky top-24 border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">Need Expert Care?</h3>
                            <p className="text-slate-600 mb-6">
                                Our specialists are here to help. Book an appointment or contact us for emergency assistance.
                            </p>

                            <div className="space-y-4">
                                <Link href="/book" className="block">
                                    <Button fullWidth className="h-14 font-bold text-lg rounded-xl shadow-lg shadow-primary/20">
                                        <CalendarCheck className="mr-2" /> Book Appointment
                                    </Button>
                                </Link>

                                <a href="tel:1800-STORK-HSP" className="block">
                                    <Button variant="secondary" fullWidth className="h-14 font-bold text-lg rounded-xl">
                                        <Phone className="mr-2" /> 1800-STORK-HSP
                                    </Button>
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <p className="text-sm text-slate-500 text-center">
                                    For medical emergencies, please visit our ER immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
