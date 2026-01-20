'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Edit, Loader2, FileText, Eye, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchBlogs();

        const channel = supabase
            .channel('blogs-list')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchBlogs)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function fetchBlogs() {
        const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
        if (data) setBlogs(data);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        await supabase.from('blogs').delete().eq('id', id);
        fetchBlogs();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 mb-2">Health Articles</h1>
                    <p className="text-slate-500 text-sm">Manage educational content and insights.</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="h-11 px-6 bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10">
                        <Plus size={18} className="mr-2" /> Write Article
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-slate-400 text-sm animate-pulse">Loading library...</p>
                    </div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No Articles Found</h3>
                    <p className="text-slate-400 mb-6 text-sm">Start sharing knowledge with your patients.</p>
                    <Link href="/admin/blogs/new">
                        <Button variant="secondary">Create First Post</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="col-span-6 pl-4">Article Details</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3 text-right pr-4">Actions</div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50/80 transition-colors group">

                                {/* Article Details */}
                                <div className="col-span-6 pl-4">
                                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-primary transition-colors">{blog.title}</h3>
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={12} />
                                            {blog.view_count || 0} views
                                        </span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${blog.status === 'published'
                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                        : 'bg-amber-100 text-amber-700 border-amber-200'
                                        }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${blog.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                                        {blog.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="col-span-3 flex items-center justify-end gap-2 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/blogs/new?id=${blog.id}`} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
