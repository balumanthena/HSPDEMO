'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UserPlus, Calendar, PlusCircle, LayoutGrid, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Experts', href: '/doctors', icon: UserPlus },
    { name: 'Book', href: '/book', icon: Calendar, isFab: true },
    { name: 'Services', href: '/specializations', icon: Stethoscope },
    { name: 'More', href: '/about', icon: LayoutGrid },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-end justify-between px-6 pb-2 pt-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    if (item.isFab) {
                        return (
                            <div key={item.name} className="relative -top-5 flex flex-col items-center justify-end h-full">
                                <Link href={item.href} className="group flex flex-col items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-primary text-white shadow-lg shadow-blue-500/40 flex items-center justify-center transform transition-all duration-300 group-active:scale-95 group-hover:scale-105 border-4 border-white/50 backdrop-blur-sm">
                                        <PlusCircle size={26} strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[10px] font-semibold text-primary/80 mt-1">{item.name}</span>
                                </Link>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center py-2 h-full justify-end min-w-[48px] transition-colors relative group",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <div className="relative">
                                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-300 group-active:scale-90" />
                                {isActive && (
                                    <motion.div
                                        layoutId="mobile-nav-active"
                                        className="absolute -top-3 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-medium mt-1 transition-all duration-200",
                                isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
