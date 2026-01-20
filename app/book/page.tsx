'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from '@/components/ui/Button';
import { Calendar, CheckCircle2, ShieldCheck, Clock, User } from 'lucide-react';

export default function BookAppointment() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        notes: '',
        consent: false
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const fetchData = async () => {
            const { data: deptData } = await supabase.from('departments').select('*');
            if (deptData) setDepartments(deptData);

            const { data: docData } = await supabase.from('doctors').select('*');
            if (docData) setDoctors(docData);
        };
        fetchData();

        // Realtime Subscription for Doctors
        const channel = supabase
            .channel('public:doctors')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'doctors' },
                (payload) => {
                    setDoctors((currentDoctors) =>
                        currentDoctors.map((doc) =>
                            doc.id === payload.new.id ? payload.new : doc
                        )
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Filter doctors when department changes
    useEffect(() => {
        if (formData.department) {
            setFilteredDoctors(doctors.filter(doc => doc.specialization === formData.department));
        } else {
            setFilteredDoctors(doctors);
        }
    }, [formData.department, doctors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const message = `*New Appointment Request*
        
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Department:* ${formData.department}
*Doctor:* ${formData.doctor || 'Any Available'}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Symptoms:* ${formData.notes}

Please confirm my appointment.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919494408050?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 pt-32 pb-12">
                <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">Book an Appointment</h1>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Form Section */}
                    <div className="flex-grow bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Department</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value, doctor: '' })}
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.title}>{dept.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Doctor (Optional)</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white"
                                        value={formData.doctor}
                                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                    >
                                        <option value="">Any Available Doctor</option>
                                        {filteredDoctors.map(doc => (
                                            <option key={doc.id} value={doc.name}>
                                                {doc.name} {doc.availability && doc.availability !== 'Available' ? `(${doc.availability})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Preferred Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                        <input
                                            type="date"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Preferred Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                        <select
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="">Select Time Slot</option>
                                            <option value="morning">Morning (9 AM - 12 PM)</option>
                                            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                            <option value="evening">Evening (4 PM - 8 PM)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-primary">Reason for Visit / Symptoms</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none resize-none"
                                    placeholder="Briefly describe your health concern..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    required
                                    checked={formData.consent}
                                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                />
                                <label htmlFor="consent" className="text-sm text-text-muted">
                                    I confirm that the information provided is accurate and I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> & <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <Button fullWidth className="h-14 text-lg">Confirm Appointment</Button>
                        </form>
                    </div>

                    {/* Trust Panel (Sticky) */}
                    <div className="lg:w-80 space-y-6">
                        <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg lg:sticky lg:top-24">
                            <h3 className="font-bold text-xl mb-6">Why Trust Stork?</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start">
                                    <ShieldCheck className="w-6 h-6 shrink-0 text-blue-200" />
                                    <div>
                                        <p className="font-semibold">Safe & Sanitized</p>
                                        <p className="text-sm text-blue-100">Frequency protocols followed strictly.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Clock className="w-6 h-6 shrink-0 text-blue-200" />
                                    <div>
                                        <p className="font-semibold">Zero Wait Time</p>
                                        <p className="text-sm text-blue-100">Pre-booked slots ensured.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <CheckCircle2 className="w-6 h-6 shrink-0 text-blue-200" />
                                    <div>
                                        <p className="font-semibold">Verified Doctors</p>
                                        <p className="text-sm text-blue-100">Only board-certified specialists.</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-blue-500">
                                <p className="text-sm font-medium text-blue-200 mb-2">Need Help?</p>
                                <p className="text-2xl font-bold">+91 99999 00000</p>
                                <p className="text-xs text-blue-200">24/7 Support Line</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
