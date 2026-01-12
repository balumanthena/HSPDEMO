'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

function AccordionItem({ title, content, isOpen, onToggle, className }: AccordionItemProps) {
    return (
        <div className={cn("border-b border-gray-100 last:border-0", className)}>
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full py-4 text-left group transition-colors"
            >
                <span className={cn(
                    "text-lg font-medium transition-colors",
                    isOpen ? "text-primary" : "text-text-primary group-hover:text-primary"
                )}>
                    {title}
                </span>
                <ChevronDown
                    className={cn(
                        "w-5 h-5 text-gray-400 transition-transform duration-300",
                        isOpen ? "rotate-180 text-primary" : "group-hover:text-primary"
                    )}
                />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 text-text-muted leading-relaxed">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface AccordionProps {
    items: { title: string; content: string }[];
    className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className={cn("rounded-2xl bg-white p-6 shadow-sm border border-border", className)}>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(index === openIndex ? null : index)}
                />
            ))}
        </div>
    );
}
