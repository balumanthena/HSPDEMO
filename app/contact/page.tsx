'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from '@/components/ui/Button';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="bg-primary text-white pt-32 pb-12">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="opacity-90">We are here to help you 24/7. Reach out to us for any queries.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary"><Phone size={24} /></div>
                                    <div>
                                        <p className="font-semibold text-text-primary">Emergency</p>
                                        <p className="text-xl font-bold text-red-600">+91 1800-123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary"><Mail size={24} /></div>
                                    <div>
                                        <p className="font-semibold text-text-primary">Email</p>
                                        <p className="text-text-muted">support@storkhospital.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary"><MapPin size={24} /></div>
                                    <div>
                                        <p className="font-semibold text-text-primary">Location</p>
                                        <p className="text-text-muted">123 Healthcare Ave, Medical District, City - 500081</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-500 font-medium">
                            Google Map Embed Placeholder
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" placeholder="Your Phone" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?"></textarea>
                            </div>
                            <Button fullWidth>SendMessage</Button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
