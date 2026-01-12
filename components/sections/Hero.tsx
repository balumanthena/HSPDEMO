import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronDown, ArrowRight, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
    return (
        <section className="relative min-h-[750px] w-full overflow-hidden flex items-center rounded-b-[80px] z-20 shadow-2xl shadow-slate-200">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/team-young-specialist-doctors-standing-corridor-hospital.jpg"
                    alt="Stork Hospital Team"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 pb-24">
                <div className="max-w-4xl space-y-10 animate-in slide-in-from-left-10 duration-700 fade-in pl-2">

                    {/* Rating Badge - Minimalist */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/90 text-sm font-medium">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                        </div>
                        <span className="h-4 w-px bg-white/20"></span>
                        <span className="tracking-wide">Trusted by 2000+ Families</span>
                    </div>

                    {/* Typography - Classy & Bold */}
                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                            The Next Generation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white">
                                Healthcare
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light">
                            Experience personalized care powered by advanced intelligence and deep empathy.
                            We are defining the future of medical excellence.
                        </p>
                    </div>

                    {/* Unified Search Bar - Premium Look */}
                    <div className="bg-white rounded-2xl p-2 flex flex-col md:flex-row shadow-2xl shadow-blue-900/20 max-w-3xl">
                        {/* Location */}
                        <div className="relative md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100">
                            <button className="w-full h-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 rounded-xl transition-colors group outline-none">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-primary rounded-full group-hover:bg-blue-100 transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block text-[11px] text-text-muted font-bold uppercase tracking-wider">Location</span>
                                        <span className="block text-sm font-bold text-text-primary">Hyderabad</span>
                                    </div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative flex-grow">
                            <div className="flex items-center h-full px-4 rounded-xl focus-within:bg-gray-50 transition-colors">
                                <Search className="text-gray-400 w-5 h-5 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Search doctors, specializations, symptoms..."
                                    className="w-full bg-transparent border-none text-text-primary placeholder-gray-400 focus:ring-0 text-base h-full py-4 outline-none"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="p-1">
                            <Button className="h-full w-full md:w-auto px-8 rounded-xl bg-primary hover:bg-[#0B3B66] text-white shadow-lg shadow-blue-900/20">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
