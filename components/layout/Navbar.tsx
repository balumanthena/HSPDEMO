'use client';

import { useState, useEffect } from 'react';
import { TopBar } from './navbar/TopBar';
import { DepartmentNav } from './navbar/DepartmentNav';
import { MobileMenu } from './navbar/MobileMenu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex flex-col font-sans">
            {/* Level 1: Utility Bar - Always Visible */}
            <TopBar isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

            {/* Level 2: Navigation - Sticky & Responsive */}
            <div className={cn(
                "transition-all duration-300",
                isScrolled ? "-mt-[0px] shadow-lg" : ""
            )}>
                <DepartmentNav />
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </header>
    );
}
