import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Testimonial {
    id: string;
    name: string;
    treatment: string;
    rating: number;
    story: string;
    date?: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
    className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
    const { name, treatment, rating, story } = testimonial;

    return (
        <div className={cn(
            "group bg-white rounded-[2rem] p-10 shadow-2xl shadow-slate-200/50 hover:shadow-slate-300/50 transition-all duration-500 relative border border-slate-100 flex flex-col h-full hover:-translate-y-2",
            className
        )}>
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-[4rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>

            {/* Quote Icon */}
            <Quote className="absolute top-8 right-8 text-primary/10 w-12 h-12 fill-current" />

            {/* Stars */}
            <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={cn(
                            "fill-current transition-colors duration-300",
                            i < rating ? "text-[#C6A87C]" : "text-gray-100" // Gold color for premium feel
                        )}
                    />
                ))}
            </div>

            <p className="text-gray-700 italic mb-10 leading-loose relative z-10 font-serif text-xl tracking-wide">
                "{story}"
            </p>

            <div className="mt-auto flex items-center gap-5 border-t border-gray-50 pt-8">
                <div className="w-12 h-12 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-serif text-xl italic shadow-md group-hover:scale-110 transition-transform duration-300">
                    {name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-lg leading-tight">{name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="h-px w-8 bg-blue-200"></span>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest">{treatment}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
