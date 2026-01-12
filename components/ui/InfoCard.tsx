import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
    className?: string;
}

export function InfoCard({ title, description, icon: Icon, href, className }: InfoCardProps) {
    const content = (
        <div className={cn(
            "flex flex-col h-full p-6 bg-white rounded-xl border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group",
            className
        )}>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={24} strokeWidth={2} />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-4 flex-grow">
                {description}
            </p>
            {href ? (
                <div className="flex items-center text-primary font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight size={16} className="ml-1" />
                </div>
            ) : (
                <div className="mt-auto pt-2" />
            )}
        </div>
    );

    if (href) {
        return <Link href={href} className="block h-full">{content}</Link>;
    }

    return content;
}
