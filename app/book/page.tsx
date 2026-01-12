'use client';

import { useState } from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from '@/components/ui/Button';
import { Calendar, CheckCircle2, ShieldCheck, Clock, User } from 'lucide-react';

export default function BookAppointment() {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic
        alert('Appointment request submitted!');
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
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Department</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white">
                                        <option value="">Select Department</option>
                                        <option value="cardiology">Cardiology</option>
                                        <option value="pediatrics">Pediatrics</option>
                                        <option value="gynecology">Gynecology</option>
                                        <option value="orthopedics">Orthopedics</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Doctor (Optional)</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white">
                                        <option value="">Any Available Doctor</option>
                                        <option value="dr-sarah">Dr. Sarah Wilson</option>
                                        <option value="dr-james">Dr. James Chen</option>
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
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary">Preferred Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                        <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none bg-white">
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
                                ></textarea>
                            </div>

                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                    required
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
