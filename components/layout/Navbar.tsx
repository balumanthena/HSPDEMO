'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Specializations', href: '/specializations' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Diagnostics', href: '/diagnostics' },
    { name: 'About', href: '/about' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isNavActive = isScrolled || !isHome;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                isNavActive
                    ? 'bg-white/80 backdrop-blur-md shadow-lg py-2'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                            isNavActive ? "bg-primary text-white" : "bg-white text-primary shadow-lg"
                        )}>
                            <HeartPulse size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "text-xl font-bold leading-tight transition-colors duration-300",
                                isNavActive ? "text-primary" : "text-white drop-shadow-md"
                            )}>
                                Stork
                            </span>
                            <span className={cn(
                                "text-[10px] font-medium tracking-wide uppercase transition-colors duration-300",
                                isNavActive ? "text-text-muted" : "text-white/90 drop-shadow-sm"
                            )}>
                                Multispecialty
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-base font-medium transition-colors relative py-1 hover:opacity-80',
                                    pathname === link.href ? 'font-bold' : '',
                                    isNavActive ? 'text-text-primary hover:text-primary' : 'text-white drop-shadow-sm'
                                )}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                                        isNavActive ? "bg-primary" : "bg-white"
                                    )} />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <Link href="/book">
                                <Button>Book Appointment</Button>
                            </Link>
                        </div>

                        <button
                            className="md:hidden p-2 text-text-primary hover:bg-gray-100 rounded-md"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-lg font-medium w-full text-center py-3 hover:bg-gray-50',
                                pathname === link.href ? 'text-primary bg-blue-50' : 'text-text-primary'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 w-full px-4">
                        <Link href="/book" className="w-full block">
                            <Button fullWidth>Book Appointment</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
