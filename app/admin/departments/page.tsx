'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Loader2, Baby, Stethoscope, Heart, Bone, Brain, Activity, ShieldCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Icon mapping for display
const iconMap: Record<string, any> = {
    'Baby': Baby,
    'Stethoscope': Stethoscope,
    'Heart': Heart,
    'Bone': Bone,
    'Brain': Brain,
    'Activity': Activity
};

export default function AdminDepartmentsPage() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [iconName, setIconName] = useState('Activity');

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchDepartments();

        const channel = supabase
            .channel('departments-list')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'departments' }, fetchDepartments)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setDepartments(data);
        setLoading(false);
    };

    const handleAddDepartment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsAdding(true);

        const { error } = await supabase
            .from('departments')
            .insert([{ title, description, icon_name: iconName }]);

        if (!error) {
            setTitle('');
            setDescription('');
            fetchDepartments();
        } else {
            alert('Failed to add department');
        }
        setIsAdding(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this department?')) return;

        const { error } = await supabase
            .from('departments')
            .delete()
            .eq('id', id);

        if (!error) {
            setDepartments(departments.filter(dept => dept.id !== id));
        } else {
            alert('Failed to delete department');
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-slate-900 mb-2">Medical Departments</h1>
                <p className="text-slate-500 text-sm">Organize hospital specialties and services.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add New Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                <Plus className="w-5 h-5 text-slate-400" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Add Department</h2>
                        </div>

                        <form onSubmit={handleAddDepartment} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50 text-slate-900 font-medium"
                                    placeholder="e.g. Dermatology"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50 text-slate-900 text-sm"
                                    placeholder="Brief description of services..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Display Icon</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {Object.keys(iconMap).map((name) => {
                                        const Icon = iconMap[name];
                                        const isSelected = iconName === name;
                                        return (
                                            <button
                                                key={name}
                                                type="button"
                                                onClick={() => setIconName(name)}
                                                className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${isSelected
                                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                                                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                title={name}
                                            >
                                                <Icon size={20} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/10 mt-2" disabled={isAdding}>
                                {isAdding ? <Loader2 className="animate-spin" /> : 'Create Department'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="animate-spin text-primary" size={40} />
                                <p className="text-slate-400 text-sm animate-pulse">Loading departments...</p>
                            </div>
                        </div>
                    ) : departments.length === 0 ? (
                        <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Activity className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-1">No Departments</h3>
                            <p className="text-slate-400 text-sm">Add your first medical department to get started.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {departments.map((dept) => {
                                const Icon = iconMap[dept.icon_name] || Activity;
                                return (
                                    <div key={dept.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                                                <Icon size={24} />
                                            </div>
                                            <button
                                                onClick={() => handleDelete(dept.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <h3 className="font-bold text-slate-900 text-lg mb-2">{dept.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{dept.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
