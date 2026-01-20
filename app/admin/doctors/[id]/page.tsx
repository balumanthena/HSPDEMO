'use client';

import { useState, useEffect, use } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Loader2, ArrowLeft, Upload, Save, Trash2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditDoctorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        image: '',
        availability: 'Available',
        next_available: '',
        opd_start_time: '',
        opd_end_time: '',
        about: '',
        rating: '5.0',
        is_featured: false
    });

    const [departments, setDepartments] = useState<string[]>([]);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Departments
            const { data: deptData } = await supabase.from('departments').select('title');
            if (deptData) setDepartments(deptData.map(d => d.title));

            // Fetch Doctor Details
            const { data: doctor, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                alert('Error fetching doctor details');
                router.push('/admin/doctors');
                return;
            }

            if (doctor) {
                setFormData({
                    name: doctor.name,
                    specialization: doctor.specialization,
                    experience: doctor.experience.toString(),
                    image: doctor.image || '',
                    availability: doctor.availability || 'Available',
                    next_available: doctor.next_available || '',
                    opd_start_time: doctor.opd_start_time || '',
                    opd_end_time: doctor.opd_end_time || '',
                    about: doctor.about || '',
                    rating: doctor.rating.toString(),
                    is_featured: doctor.is_featured
                });
            }
            setIsFetching(false);
        };
        fetchData();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, is_featured: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase
            .from('doctors')
            .update({
                ...formData,
                experience: parseInt(formData.experience) || 0,
                rating: parseFloat(formData.rating) || 5.0
            })
            .eq('id', id);

        if (error) {
            alert('Error updating doctor: ' + error.message);
        } else {
            alert('Doctor updated successfully');
            router.push('/admin/doctors');
        }
        setIsLoading(false);
    };

    if (isFetching) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/doctors" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft size={20} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Edit Doctor</h1>
                    <p className="text-gray-500">Update availability and profile details.</p>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Availability Section - Highlighted */}
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
                        <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Availability Status
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-2">Current Status</label>
                                <select
                                    name="availability"
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                                    value={formData.availability}
                                    onChange={handleChange}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy (In Surgery/Rounds)</option>
                                    <option value="On Leave">On Leave</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-2">Next Available Slot</label>
                                <input
                                    name="next_available"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    placeholder="e.g. Mon, 10:00 AM"
                                    value={formData.next_available}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-blue-200/50">
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-2">OPD Start Time</label>
                                <input
                                    name="opd_start_time"
                                    type="time"
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.opd_start_time || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-800 mb-2">OPD End Time</label>
                                <input
                                    name="opd_end_time"
                                    type="time"
                                    className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    value={formData.opd_end_time || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                            <select
                                name="specialization"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                                value={formData.specialization}
                                onChange={handleChange}
                            >
                                <option value="">Select Specialization</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                                <option value="General Medicine">General Medicine</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                            <input
                                name="experience"
                                type="number"
                                required
                                min="0"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                            <input
                                name="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
                        <div className="relative">
                            <Upload className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                name="image"
                                type="url"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                        <textarea
                            name="about"
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={formData.about}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                            type="checkbox"
                            id="is_featured"
                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                            checked={formData.is_featured}
                            onChange={handleCheckbox}
                        />
                        <label htmlFor="is_featured" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                            Feature this doctor on the home page
                        </label>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button fullWidth className="h-12 text-base" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : <><Save size={18} className="mr-2" /> Save Changes</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
