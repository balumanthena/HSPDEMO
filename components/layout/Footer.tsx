import Link from 'next/link';
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                                <HeartPulse size={24} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold leading-tight">Stork</span>
                                <span className="text-[10px] font-medium text-gray-400 tracking-wide uppercase">Multispecialty</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Reliable Hospital & Diagnostic Facility providing world-class healthcare with empathy and expertise.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-primary transition-colors">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Doctors', href: '/doctors' },
                                { label: 'Diagnostics', href: '/diagnostics' },
                                { label: 'Contact', href: '/contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specializations */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Specializations</h4>
                        <ul className="space-y-3">
                            {[
                                'Obstetrics & Gynecology',
                                'Pediatrics',
                                'Cardiology',
                                'Orthopedics',
                                'General Surgery'
                            ].map((spec) => (
                                <li key={spec}>
                                    <Link href="/specializations" className="text-gray-400 hover:text-white transition-colors text-sm">
                                        {spec}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <Phone size={18} className="text-primary mt-0.5" />
                                <span>
                                    Emergency: <strong className="text-white block">+91 1800-123-4567</strong>
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-primary mt-0.5" />
                                <span>support@storkhospital.com</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-primary mt-0.5" />
                                <span>
                                    123 Healthcare Ave, <br />
                                    Medical District, City - 500081
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Stork Multispecialty Hospital. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
