'use client';

import { createBrowserClient } from '@supabase/ssr';
import { FileText, Youtube, Users, Activity, ExternalLink, Plus, ArrowRight, Video, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ blogs: 0, videos: 0, doctors: 0 });
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        async function fetchStats() {
            const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
            const { count: videoCount } = await supabase.from('videos').select('*', { count: 'exact', head: true });
            const { count: doctorCount } = await supabase.from('doctors').select('*', { count: 'exact', head: true });

            setStats({
                blogs: blogCount || 0,
                videos: videoCount || 0,
                doctors: doctorCount || 0
            });
        }

        fetchStats();

        // Realtime Subscription
        const channel = supabase
            .channel('dashboard-stats')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchStats)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, fetchStats)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, fetchStats)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-slate-900 mb-2">Dashboard Overview</h1>
                <p className="text-slate-500 text-sm">Welcome back, Dr. Admin. Here is your daily practice summary.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                        <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Articles</p>
                        <p className="text-3xl font-serif text-slate-900">{stats.blogs}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Youtube className="w-8 h-8 text-rose-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Video Library</p>
                        <p className="text-3xl font-serif text-slate-900">{stats.videos}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                        <Users className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Doctors</p>
                        <p className="text-3xl font-serif text-slate-900">{stats.doctors}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <h3 className="font-serif text-xl text-slate-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/admin/doctors/new" className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Add New Specialist</h4>
                                <p className="text-xs text-slate-500">Create a new doctor profile</p>
                            </div>
                        </Link>

                        <Link href="/admin/blogs/new" className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Write an Article</h4>
                                <p className="text-xs text-slate-500">Publish health insights</p>
                            </div>
                        </Link>

                        <Link href="/admin/videos" className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Video size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Manage Videos</h4>
                                <p className="text-xs text-slate-500">Update video content</p>
                            </div>
                        </Link>

                        <Link href="/admin/departments" className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Stethoscope size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Departments</h4>
                                <p className="text-xs text-slate-500">Manage medical units</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* System Status */}
                <div>
                    <h3 className="font-serif text-xl text-slate-900 mb-6">System Status</h3>
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                        <Activity className="text-white/20 w-32 h-32 absolute -right-6 -bottom-6" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Operational</span>
                            </div>
                            <h4 className="text-xl font-bold mb-2">All Systems Go</h4>
                            <p className="text-slate-400 text-sm mb-6">Database connections and server API endpoints are functioning normally.</p>

                            <div className="flex gap-4 text-xs font-medium text-slate-300">
                                <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                                    Latency: 24ms
                                </div>
                                <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                                    Uptime: 99.9%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
