'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Youtube, Loader2, PlayCircle, Video as VideoIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminVideosPage() {
    const [videos, setVideos] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Form State
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [description, setDescription] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [isPublished, setIsPublished] = useState(true);

    useEffect(() => {
        fetchResources();

        const channel = supabase
            .channel('videos-list')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, fetchResources)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function fetchResources() {
        // Fetch videos with simple join (if supported by postgrest immediately, otherwise we relying on ID)
        // Note: For simple UI, we might just fetch departments separately
        const { data: videosData } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        if (videosData) setVideos(videosData);

        const { data: deptsData } = await supabase.from('departments').select('id, title');
        if (deptsData) setDepartments(deptsData);

        setLoading(false);
    }

    async function handleAddVideo(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const selectedDept = departments.find(d => d.id === departmentId);
        const categoryName = selectedDept ? selectedDept.title : '';

        const { error } = await supabase.from('videos').insert({
            title,
            youtube_url: url,
            department_id: departmentId || null,
            category: categoryName, // Keep for backward compatibility/display
            description,
            seo_title: seoTitle,
            seo_description: seoDescription,
            is_published: isPublished
        });

        if (!error) {
            setIsAdding(false);
            resetForm();
            fetchResources();
        } else {
            alert('Error adding video: ' + error.message);
        }
        setLoading(false);
    }

    function resetForm() {
        setUrl('');
        setTitle('');
        setDepartmentId('');
        setDescription('');
        setSeoTitle('');
        setSeoDescription('');
        setIsPublished(true);
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this video?')) return;
        await supabase.from('videos').delete().eq('id', id);
        fetchResources();
    }

    const getDepartmentName = (id: string) => {
        return departments.find(d => d.id === id)?.title || 'General';
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 mb-2">Video Library</h1>
                    <p className="text-slate-500 text-sm">Manage educational videos and hospital tours.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className="h-11 px-6 bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10"
                >
                    <Plus size={18} className="mr-2" /> {isAdding ? 'Cancel' : 'Add Video'}
                </Button>
            </div>

            {isAdding && (
                <div className="mb-10 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                            <Youtube className="w-5 h-5 text-rose-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Add New Media</h3>
                    </div>

                    <form onSubmit={handleAddVideo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* URL */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">YouTube URL</label>
                            <input
                                required
                                type="url"
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                            />
                        </div>

                        {/* Basic Info */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Video Title</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Heart Surgery Recovery Guide"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Department</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50 appearance-none"
                                    value={departmentId}
                                    onChange={e => setDepartmentId(e.target.value)}
                                >
                                    <option value="">Select Department...</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.id}>{dept.title}</option>
                                    ))}
                                </select>
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                            <textarea
                                rows={2}
                                placeholder="Brief description of the video content..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        {/* SEO Section (Collapsible visual style) */}
                        <div className="md:col-span-2 p-6 rounded-xl bg-slate-50 border border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                                <Search className="w-4 h-4 text-slate-400" />
                                SEO & Visibility
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SEO Title</label>
                                    <input
                                        type="text"
                                        placeholder="Optimized title for search engines"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white"
                                        value={seoTitle}
                                        onChange={e => setSeoTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">SEO Description</label>
                                    <input
                                        type="text"
                                        placeholder="Meta description for search results"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white"
                                        value={seoDescription}
                                        onChange={e => setSeoDescription(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-md border-slate-300 text-slate-900 focus:ring-slate-900"
                                            checked={isPublished}
                                            onChange={e => setIsPublished(e.target.checked)}
                                        />
                                        <span className="text-sm font-medium text-slate-700">Publish Immediately</span>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="md:col-span-2 flex justify-end gap-3">
                            <Button type="button" onClick={() => setIsAdding(false)} className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl h-12 px-8">
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 px-8" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : 'Save Video'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-slate-400 text-sm animate-pulse">Loading videos...</p>
                    </div>
                </div>
            ) : videos.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <VideoIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No Videos Added</h3>
                    <p className="text-slate-400 text-sm">Add your first educational video to the library.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div key={video.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="aspect-video bg-slate-900 relative flex items-center justify-center shrink-0">
                                {video.youtube_url ? (
                                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                                        <Youtube size={48} className="text-white/20 group-hover:text-red-500 transition-colors duration-300" />
                                    </div>
                                ) : (
                                    <VideoIcon size={32} className="text-slate-700" />
                                )}

                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="flex gap-2">
                                        {/* Edit button placeholder - future TODO */}
                                        <button
                                            onClick={() => handleDelete(video.id)}
                                            className="p-2 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-rose-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    <PlayCircle size={48} className="text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300" />
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                        {video.category || getDepartmentName(video.department_id)}
                                    </span>
                                    {!video.is_published && (
                                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                                            Draft
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">{video.title}</h3>
                                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4 flex-grow">{video.description}</p>

                                {(video.seo_title || video.view_count > 0) && (
                                    <div className="pt-4 mt-auto border-t border-slate-50 text-[10px] text-slate-400 flex items-center justify-between">
                                        <span>{video.view_count || 0} views</span>
                                        {video.seo_title && <span title="SEO Optimized" className="text-green-600 font-medium">SEO Ready</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
