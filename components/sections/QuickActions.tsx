import Link from 'next/link';
import { Calendar, UserSearch, Microscope, Siren, ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
    {
        icon: Calendar,
        title: 'Book Appointment',
        desc: 'Schedule a visit',
        href: '/book',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        hoverBorder: 'hover:border-blue-200'
    },
    {
        icon: UserSearch,
        title: 'Find Doctors',
        desc: 'Search by specialist',
        href: '/doctors',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        hoverBorder: 'hover:border-indigo-200'
    },
    {
        icon: Microscope,
        title: 'Diagnostics',
        desc: 'Book lab tests',
        href: '/diagnostics',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        hoverBorder: 'hover:border-purple-200'
    },
    {
        icon: Siren,
        title: 'Emergency',
        desc: '24/7 Rapid support',
        href: '/contact',
        color: 'text-red-500',
        bg: 'bg-red-50',
        hoverBorder: 'hover:border-red-200',
        isEmergency: true,
    },
];

export function QuickActions() {
    return (
        <section className="py-12 bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {actions.map((action, i) => (
                        <Link
                            key={i}
                            href={action.href}
                            className={cn(
                                "group flex items-center gap-4 bg-white p-5 rounded-2xl shadow-xl shadow-slate-900/10 border border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
                                action.hoverBorder
                            )}
                        >
                            {/* Icon Box */}
                            <div className={cn(
                                "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300",
                                action.bg,
                                action.color
                            )}>
                                <action.icon size={26} strokeWidth={2} />
                            </div>

                            {/* Text Content */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                                    {action.title}
                                </h3>
                                <p className="text-slate-500 text-sm mt-1 font-medium">
                                    {action.desc}
                                </p>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                                <ChevronRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
