import Link from 'next/link';
import { X, ChevronRight, ChevronDown, Globe, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NAV_DATA } from '@/lib/nav_data';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [expandedDept, setExpandedDept] = useState<string | null>(null);

    const toggleDept = (slug: string) => {
        setExpandedDept(expandedDept === slug ? null : slug);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col pt-20 pb-6 px-4 md:hidden animate-in slide-in-from-top-5 duration-200 h-screen overflow-hidden">

            <div className="flex-1 overflow-y-auto space-y-6 pb-20 no-scrollbar">

                {/* CTA Section */}
                <div className="grid gap-3">
                    <Link href="/book" onClick={onClose}>
                        <Button fullWidth className="h-12 text-base font-bold bg-primary text-white">
                            Book Free Appointment
                        </Button>
                    </Link>
                    <button className="flex items-center justify-center gap-2 h-12 w-full border border-gray-200 rounded-xl font-semibold text-slate-700">
                        <Phone size={18} /> Emergency: 1066
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Departments</h3>

                    {NAV_DATA.map((dept) => {
                        const isExpanded = expandedDept === dept.slug;
                        const hasSubItems = dept.dropdown && dept.dropdown.length > 0;

                        return (
                            <div key={dept.slug} className="border-b border-gray-50 last:border-0">
                                <div
                                    className={cn(
                                        "flex items-center justify-between py-3 font-medium transition-all select-none cursor-pointer",
                                        isExpanded ? "text-primary" : "text-slate-700"
                                    )}
                                    onClick={() => toggleDept(dept.slug)}
                                >
                                    <span className="text-base">{dept.title}</span>
                                    {hasSubItems ? (
                                        isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} className="text-slate-300" />
                                    ) : null}
                                </div>

                                {hasSubItems && isExpanded && (
                                    <div className="bg-gray-50 rounded-lg p-2 mb-2 animate-in slide-in-from-top-2 duration-200">
                                        {dept.dropdown!.map((subItem, idx) => (
                                            <div key={idx} className="mb-1 last:mb-0">
                                                {/* Check if item has children (Level 2) - like Gynecology */}
                                                {subItem.subItems && subItem.subItems.length > 0 ? (
                                                    <>
                                                        <div className="px-3 py-2 text-sm font-semibold text-slate-800">
                                                            {subItem.label}
                                                        </div>
                                                        <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-3 mb-2">
                                                            {subItem.subItems.map((child, cIdx) => (
                                                                <Link
                                                                    key={cIdx}
                                                                    href="#"
                                                                    onClick={onClose}
                                                                    className="block py-1.5 px-3 text-sm text-slate-500 hover:text-primary rounded-md transition-colors"
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : (
                                                    // Simple Link Item (Level 1 is the link) - like General Surgery
                                                    <Link
                                                        href="#"
                                                        onClick={onClose}
                                                        className="block px-3 py-2 text-sm text-slate-600 hover:text-primary hover:bg-white rounded-md transition-colors font-medium"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <Link
                        href="/specializations"
                        onClick={onClose}
                        className="flex items-center justify-between py-3 text-primary font-bold hover:underline mt-4"
                    >
                        View All Departments
                    </Link>
                </div>

                {/* Company Links */}
                <div className="space-y-1 pt-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Company</h3>
                    {[
                        { name: 'About Us', href: '/about' },
                        { name: 'Doctors', href: '/doctors' },
                        { name: 'Blog', href: '/blog' },
                        { name: 'Contact', href: '/contact' }
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className="block py-2 text-slate-600 font-medium hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Global Options */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-slate-600">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50">
                        <Globe size={16} />
                        <span className="text-sm font-medium">English</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
