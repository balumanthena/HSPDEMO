import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronDown, ArrowRight, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
    return (
        <section className="relative min-h-[600px] md:min-h-[750px] w-full overflow-hidden flex items-center rounded-b-[50px] md:rounded-b-[80px] z-20 shadow-2xl shadow-slate-200">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/new-hero-bg.png"
                    alt="Stork Hospital Advanced Care"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-16 md:pt-36 md:pb-24 top-0 md:top-10">
                <div className="max-w-3xl space-y-6 md:space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in pl-2">

                    {/* Rating Badge - Minimalist */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-lg">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                        </div>
                        <span className="h-4 w-px bg-white/20"></span>
                        <span className="tracking-wide text-white/90 text-xs md:text-sm">Trusted by 2000+ Families</span>
                    </div>

                    {/* Typography - Classy & Bold */}
                    <div className="space-y-4 md:space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-white leading-[1.1] tracking-tight drop-shadow-lg">
                            The Next Generation <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-white font-serif italic">
                                Healthcare
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-gray-100 max-w-xl leading-relaxed font-light drop-shadow-md">
                            Experience personalized care powered by advanced intelligence and deep empathy.
                            We are defining the future of medical excellence.
                        </p>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button className="h-12 md:h-14 px-8 rounded-full bg-white text-blue-900 hover:bg-blue-50 font-semibold text-base md:text-lg shadow-xl shadow-black/10 transition-all hover:scale-105">
                            Book Appointment
                        </Button>
                        <Button variant="outline" className="h-12 md:h-14 px-8 rounded-full border-white/30 text-white hover:bg-white/10 font-medium text-base md:text-lg backdrop-blur-sm transition-all">
                            Explore Services
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
