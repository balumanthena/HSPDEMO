'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NewBlogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!blogId);
    const [role, setRole] = useState<string | null>(null);
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        seo_title: '',
        seo_description: '',
        status: 'draft'
    });

    useEffect(() => {
        const checkRoleAndFetchBlog = async () => {
            // Fetch Role
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                setRole(profile?.role || 'doctor');
            }

            // Fetch Blog if ID exists
            if (blogId) {
                setFetching(true);
                const { data: blog, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', blogId)
                    .single();

                if (blog) {
                    setFormData({
                        title: blog.title || '',
                        content: blog.content || '',
                        image: blog.image || '',
                        seo_title: blog.seo_title || '',
                        seo_description: blog.seo_description || '',
                        status: blog.status || 'draft'
                    });
                }
                setFetching(false);
            }
        };
        checkRoleAndFetchBlog();
    }, [blogId]);

    const slugify = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const slug = slugify(formData.title);
        const payload = {
            ...formData,
            slug: blogId ? undefined : slug, // Don't update slug on edit to preserve SEO
            ...(blogId ? {} : { created_at: new Date().toISOString() }) // Keep original created_at
        };

        let error;

        if (blogId) {
            const { error: updateError } = await supabase
                .from('blogs')
                .update(payload)
                .eq('id', blogId);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('blogs')
                .insert(payload);
            error = insertError;
        }

        if (error) {
            alert('Error saving blog: ' + error.message);
        } else {
            router.push('/admin/blogs');
        }
        setLoading(false);
    };

    if (fetching) {
        return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading editor...</div>;
    }

    const isAdmin = role === 'admin';
    const isSEO = role === 'seo_editor' || isAdmin;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blogs" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Write New Article</h1>
                    <p className="text-gray-500">Share medical insights with your patients.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
                            <input
                                required
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 text-lg font-medium"
                                placeholder="e.g. 5 Tips for a Healthy Heart"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Main Content (HTML Supported)</label>
                            <textarea
                                required
                                rows={12}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm"
                                placeholder="<p>Write your article content here...</p>"
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                            />
                            <p className="text-xs text-gray-400 mt-2">Basic HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt; are supported.</p>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="https://..."
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>

                        {/* SEO Fields - Protected */}
                        {isSEO && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Title specifically for Google search"
                                        value={formData.seo_title}
                                        onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">SEO Description (Meta)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="Short summary for search results..."
                                        value={formData.seo_description}
                                        onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="draft">Draft</option>
                                <option value="review">Submit for Review</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <Button className="h-12 px-8 rounded-xl text-base" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" size={18} />}
                            {loading ? 'Saving...' : formData.status === 'review' ? 'Submit for Review' : formData.status === 'published' ? 'Publish Article' : 'Save Draft'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
