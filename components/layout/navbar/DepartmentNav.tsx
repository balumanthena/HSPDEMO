import { NAV_DATA } from '@/lib/nav_data';
import { DesktopNavDropdown } from './DesktopNavDropdown';

export function DepartmentNav() {
    return (
        <div className="bg-white border-b border-gray-100 hidden md:block sticky top-0 z-40 shadow-sm/50">
            <div className="container mx-auto px-2 md:px-4">
                <nav className="flex items-center justify-between w-full overflow-visible py-0 font-medium text-[13px] text-slate-700 gap-3">
                    {NAV_DATA.map((dept, index) => (
                        <DesktopNavDropdown
                            key={dept.slug}
                            title={dept.title}
                            slug={dept.slug}
                            items={dept.dropdown}
                            align={index >= NAV_DATA.length - 2 ? 'right' : 'left'}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
}
