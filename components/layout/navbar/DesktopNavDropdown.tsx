'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { NavItem } from '@/lib/nav_data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DesktopNavDropdownProps {
    title: string;
    slug: string;
    items?: NavItem[];
    align?: 'left' | 'right';
}

export function DesktopNavDropdown({ title, slug, items, align = 'left' }: DesktopNavDropdownProps) {
    if (!items || items.length === 0) {
        return (
            <Link
                href={`/specializations/${slug}`}
                className="whitespace-nowrap hover:text-primary hover:underline underline-offset-4 decoration-2 decoration-primary/30 transition-all flex items-center gap-1 py-1 text-[13px]"
            >
                {title}
            </Link>
        );
    }

    return (
        <div className="relative group/dropdown">
            <Link
                href={`/specializations/${slug}`}
                className="whitespace-nowrap hover:text-primary text-slate-700 font-medium text-[13px] flex items-center gap-1 py-4 cursor-pointer"
            >
                {title}
                <ChevronDown size={14} className="text-slate-400 group-hover/dropdown:text-primary transition-colors duration-200" />
            </Link>

            {/* Level 1 Dropdown */}
            <div className={cn(
                "absolute top-full min-w-[260px] bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 transform translate-y-2 group-hover/dropdown:translate-y-0 z-50 p-2",
                align === 'right' ? "right-0" : "left-0"
            )}>
                {items.map((item, idx) => (
                    <div key={idx} className="relative group/submenu">
                        {item.subItems && item.subItems.length > 0 ? (
                            // Item with Submenu (Level 2)
                            <>
                                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg cursor-pointer transition-colors w-full">
                                    <span className="font-medium">{item.label}</span>
                                    <ChevronRight size={14} className="text-slate-400 group-hover/submenu:text-primary" />
                                </div>

                                {/* Level 2 Dropdown (Side Panel) */}
                                <div className={cn(
                                    "absolute top-0 ml-1 min-w-[240px] bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 transform z-50 p-2",
                                    align === 'right'
                                        ? "right-full mr-1 translate-x-3 group-hover/submenu:translate-x-0"
                                        : "left-full ml-1 translate-x-[-8px] group-hover/submenu:translate-x-0"
                                )}>
                                    {item.subItems.map((subItem, subIdx) => (
                                        <Link
                                            key={subIdx}
                                            href="#" // Placeholder as detailed structure usually doesn't have deep linking ready yet in demo
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </>
                        ) : (
                            // Simple Item
                            <Link
                                href="#"
                                className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
