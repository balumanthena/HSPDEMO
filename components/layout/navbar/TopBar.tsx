import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, ChevronDown, User, HeartPulse, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TopBarProps {
    onMenuToggle: () => void;
    isMenuOpen: boolean;
}

export function TopBar({ onMenuToggle, isMenuOpen }: TopBarProps) {
    return (
        <div className="bg-white text-slate-800 py-3 relative z-50 border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="w-full md:w-auto flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <Image
                            src="/c06d2292-c0f5-47ea-9456-7069e85be4bd_20260130_131840_0000.png"
                            alt="Stork Hospital Logo"
                            width={220}
                            height={55}
                            className="object-contain h-14 w-auto"
                        />
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={onMenuToggle}
                        className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Search Bar - Center */}
                <div className="hidden md:block flex-1 max-w-xl w-full px-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search disease, doctors, treatments..."
                            className="w-full h-10 pl-4 pr-10 rounded-full text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-100 text-slate-800 placeholder:text-slate-500 border border-transparent focus:bg-white focus:border-primary/30 transition-all font-medium"
                        />
                        <Search className="absolute right-3 top-2.5 text-primary w-5 h-5 cursor-pointer" />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4 md:gap-6 shrink-0 text-sm font-medium text-slate-600">

                    {/* Company Dropdown */}
                    <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                        <span>Our Company</span>
                        <ChevronDown size={14} />
                    </div>

                    {/* Language Selector */}
                    <div className="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
                        <Globe size={16} />
                        <span>English</span>
                        <ChevronDown size={14} />
                    </div>

                    {/* CTA Button */}
                    <Link href="/book">
                        <Button className="bg-primary text-white hover:bg-primary/90 font-bold px-6 h-10 rounded-full shadow-md shadow-primary/20">
                            Book Free Appointment
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
