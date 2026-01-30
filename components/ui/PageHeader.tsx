import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    highlight: string;
    description: string;
    bgImage?: string;
    parentLink?: string;
    parentText?: string;
}

export function PageHeader({
    title,
    highlight,
    description,
    bgImage = "/new-hero-bg.png",
    parentLink = "/",
    parentText = "Home"
}: PageHeaderProps) {
    return (
        <section className="relative min-h-[450px] w-full overflow-hidden flex items-center rounded-b-[60px] z-10 shadow-2xl shadow-slate-200 mb-16">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-40 pb-20">
                <div className="max-w-4xl space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in pl-2">

                    {/* Breadcrumb / Back Link */}
                    <div className="mb-4">
                        <Link
                            href={parentLink}
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium backdrop-blur-md bg-white/10 px-4 py-2 rounded-full border border-white/10"
                        >
                            <ArrowLeft size={14} />
                            Back to {parentText}
                        </Link>
                    </div>

                    {/* Typography */}
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold font-serif text-white leading-[1.1] tracking-tight drop-shadow-xl mb-4">
                            {title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-100 to-white font-serif italic">
                                {highlight}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed font-light drop-shadow-md border-l-2 border-blue-400 pl-6">
                            {description}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
