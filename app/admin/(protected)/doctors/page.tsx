'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Plus, Trash2, Loader2, Star, Calendar, Pencil, Search, Filter, MoreHorizontal, Clock, ShieldCheck, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDoctorsPage() {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchDoctors();

        const channel = supabase
            .channel('doctors-list')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'doctors' }, fetchDoctors)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('doctors')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setDoctors(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;

        const { error } = await supabase
            .from('doctors')
            .delete()
            .eq('id', id);

        if (!error) {
            setDoctors(doctors.filter(d => d.id !== id));
        } else {
            alert('Failed to delete doctor');
        }
    };

    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
    const [updating, setUpdating] = useState(false);

    const handleStatusUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctor) return;
        setUpdating(true);

        const { error } = await supabase
            .from('doctors')
            .update({
                availability: selectedDoctor.availability,
                next_available: selectedDoctor.next_available
            })
            .eq('id', selectedDoctor.id);

        if (!error) {
            setDoctors(doctors.map(d => d.id === selectedDoctor.id ? selectedDoctor : d));
            setSelectedDoctor(null);
        } else {
            alert('Failed to update status');
        }
        setUpdating(false);
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Busy': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'In Surgery': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'On Leave': return 'bg-orange-100 text-orange-700 border-orange-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 mb-2">Medical Specialists</h1>
                    <p className="text-slate-500 text-sm">Manage doctor profiles, availability, and schedules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search doctors..."
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/10 w-64 shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Link href="/admin/doctors/new">
                        <Button className="h-11 px-6 bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-lg shadow-slate-900/10">
                            <Plus size={18} className="mr-2" /> Add Specialist
                        </Button>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-slate-400 text-sm animate-pulse">Loading directory...</p>
                    </div>
                </div>
            ) : filteredDoctors.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No Doctors Found</h3>
                    <p className="text-slate-400 mb-6 text-sm">Get started by adding your first medical specialist.</p>
                    <Link href="/admin/doctors/new">
                        <Button variant="secondary">Add Doctor</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <div className="col-span-5 pl-4">Doctor Profile</div>
                        <div className="col-span-3">Status & Availability</div>
                        <div className="col-span-2 text-center">Metrics</div>
                        <div className="col-span-2 text-right pr-4">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-50">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50/80 transition-colors group">

                                {/* Profile Column */}
                                <div className="col-span-5 flex items-center gap-4 pl-4">
                                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 shrink-0">
                                        {doctor.image ? (
                                            <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                <User className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base mb-0.5">{doctor.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 font-medium">{doctor.specialization}</span>
                                            <span>•</span>
                                            <span>{doctor.experience}+ Years Exp.</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Column */}
                                <div className="col-span-3">
                                    <button
                                        onClick={() => setSelectedDoctor(doctor)}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all hover:scale-105 active:scale-95 cursor-pointer ${getStatusColor(doctor.availability)}`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                                        {doctor.availability}
                                    </button>
                                    <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 pl-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Next: {doctor.next_available || 'TBD'}</span>
                                    </div>
                                </div>

                                {/* Metrics Column */}
                                <div className="col-span-2 flex items-center justify-center gap-6">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-slate-900 font-bold">
                                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                            {doctor.rating}
                                        </div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Rating</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-slate-900 font-bold">{doctor.view_count || 0}</div>
                                        <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Views</div>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="col-span-2 flex items-center justify-end gap-2 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        onClick={() => setSelectedDoctor(doctor)}
                                        className="h-9 px-3 text-xs bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                                    >
                                        Update
                                    </Button>
                                    <Link href={`/admin/doctors/${doctor.id}`}>
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                            <Pencil size={18} />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(doctor.id)}
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

            {/* Status Update Modal (Redesigned) */}
            {selectedDoctor && (
                <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200 max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-serif font-bold text-slate-900">Update Status</h2>
                                <p className="text-sm text-slate-500">Manage visibility for Dr. {selectedDoctor.name}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <form onSubmit={handleStatusUpdate} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Current Availability</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['Available', 'Busy', 'On Leave', 'In Surgery'].map((status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            onClick={() => setSelectedDoctor({ ...selectedDoctor, availability: status })}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${selectedDoctor.availability === status
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20'
                                                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Next Slot</label>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <input
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/10 text-sm bg-slate-50/50"
                                        onChange={(e) => {
                                            const date = new Date(e.target.value);
                                            const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                                            const currentVal = selectedDoctor.next_available || '';
                                            const timePart = currentVal.includes('-') ? currentVal.split('-')[1].trim() : '09:00 AM';
                                            setSelectedDoctor({ ...selectedDoctor, next_available: `${formattedDate} - ${timePart}` });
                                        }}
                                    />
                                    <input
                                        type="time"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/10 text-sm bg-slate-50/50"
                                        onChange={(e) => {
                                            const time = e.target.value;
                                            if (!time) return;
                                            const [h, m] = time.split(':');
                                            const hour = parseInt(h);
                                            const ampm = hour >= 12 ? 'PM' : 'AM';
                                            const hour12 = hour % 12 || 12;
                                            const formattedTime = `${hour12}:${m} ${ampm}`;

                                            const currentVal = selectedDoctor.next_available || '';
                                            let datePart = currentVal.includes('-') ? currentVal.split('-')[0].trim() : '';
                                            if (!datePart || datePart === 'Today') {
                                                datePart = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                                            }
                                            setSelectedDoctor({ ...selectedDoctor, next_available: `${datePart} - ${formattedTime}` });
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-slate-900/10 bg-white text-slate-700 font-medium placeholder:text-slate-300 transition-all"
                                        placeholder="e.g. Mon, Jan 22 - 10:00 AM"
                                        value={selectedDoctor.next_available || ''}
                                        onChange={e => setSelectedDoctor({ ...selectedDoctor, next_available: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                                    onClick={() => setSelectedDoctor(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center"
                                >
                                    {updating ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
