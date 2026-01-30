'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Youtube, LogOut, Settings, Users } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Departments', href: '/admin/departments', icon: Settings },
    { name: 'Doctors', href: '/admin/doctors', icon: Users },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Videos', href: '/admin/videos', icon: Youtube },
    { name: 'Requests', href: '/admin/requests', icon: FileText },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 h-full z-10">
            <div className="p-6 border-b border-gray-100">
                <Link href="/" target="_blank" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold">
                        S
                    </div>
                    <div>
                        <span className="font-bold text-lg text-gray-900 block leading-none">Admin Panel</span>
                        <span className="text-xs text-gray-400">Stork Hospital</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname.startsWith(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary/5 text-primary"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <Icon size={18} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [doctor, setDoctor] = useState<any>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        if (isLoginPage) return;

        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                // Fetch profile
                const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(profileData);

                if (profileData?.doctor_id) {
                    const { data: doctorData } = await supabase.from('doctors').select('*').eq('id', profileData.doctor_id).single();
                    setDoctor(doctorData);
                }
            }
        }
        fetchData();
    }, [isLoginPage, supabase]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="pl-64">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-gray-800">Doctor Portal</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="font-medium text-gray-900">
                                {doctor?.name || profile?.full_name || user?.email?.split('@')[0] || 'Admin'}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{profile?.role || 'Administrator'}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden border border-slate-200">
                            {(doctor?.image || user?.user_metadata?.avatar_url) ? (
                                <img
                                    src={doctor?.image || user?.user_metadata?.avatar_url}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                (user?.email?.[0].toUpperCase() || 'A')
                            )}
                        </div>
                    </div>
                </header>
                <main className="p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
