import { Quote } from 'lucide-react';

export function MissionStats() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#E3F2FD] via-[#F0F8FF] to-white text-center relative overflow-hidden -mt-20 pt-32 z-10">
            <div className="container mx-auto px-4 md:px-6">

                {/* Mission Statement */}
                <div className="max-w-5xl mx-auto relative mb-24 px-4">
                    <Quote className="absolute -top-10 -left-10 w-16 h-16 text-[#0F4C81] fill-current transform scale-x-[-1] opacity-20 hidden md:block" />

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0B3B66] leading-tight tracking-tight">
                        As the First Stork
                        Multispecialty Hospital, Our Mission is to Provide You with <span className="italic text-[#0F4C81]">Simpler, Smarter, and Personalized</span> Healthcare, Ensuring Better Outcomes and Transparent Costs.
                    </h2>

                    <Quote className="absolute -bottom-10 -right-10 w-16 h-16 text-[#0F4C81] fill-current opacity-20 hidden md:block" />
                </div>

            </div>
        </section>
    );
}
