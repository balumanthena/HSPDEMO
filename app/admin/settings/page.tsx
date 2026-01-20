'use client';

import { createBrowserClient } from '@supabase/ssr';
import { User, Lock, Bell, Shield, LogOut, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    // Password state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        fetchUser();
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setIsUpdating(true);
        const { error } = await supabase.auth.updateUser({ password });
        if (!error) {
            alert("Password updated successfully");
            setPassword('');
            setConfirmPassword('');
        } else {
            alert("Error updating password: " + error.message);
        }
        setIsUpdating(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const tabs = [
        { id: 'profile', name: 'Profile Settings', icon: User },
        { id: 'security', name: 'Security & Password', icon: Lock },
        { id: 'notifications', name: 'Notifications', icon: Bell },
        { id: '2fa', name: 'Two-Factor Auth', icon: Shield },
    ];

    if (loading) return <div className="p-10 text-center">Loading settings...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-slate-900 mb-2">Account Settings</h1>
                <p className="text-slate-500 text-sm">Manage your personal information and security preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {activeTab === 'profile' && (
                        <>
                            {/* Profile Card */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-slate-400" />
                                    Personal Information
                                </h2>

                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 text-2xl font-bold border-4 border-white shadow-lg">
                                        {user?.email?.[0].toUpperCase() || 'Dr'}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Dr. Admin User</h3>
                                        <p className="text-slate-500 text-sm">Administrator • Stork Hospital</p>
                                    </div>
                                    <Button className="ml-auto h-10 px-4 text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm">
                                        Change Photo
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" defaultValue="Dr. Admin User" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" defaultValue={user?.email || ''} readOnly />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="tel" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" placeholder="+91 99999 99999" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" defaultValue="Hyderabad, India" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Button className="bg-slate-900 text-white rounded-xl px-8 shadow-lg shadow-slate-900/20">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>

                            {/* Session Management - Only show in Profile Tab */}
                            <div className="bg-white rounded-[2rem] border border-rose-100 p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <LogOut size={120} className="text-rose-500" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 mb-2">Session Management</h2>
                                <p className="text-slate-500 text-sm mb-6 max-w-md">Log out of all active sessions across all devices. This will require you to sign in again.</p>

                                <Button onClick={handleLogout} className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 rounded-xl px-6">
                                    Log Out All Devices
                                </Button>
                            </div>
                        </>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-slate-400" />
                                Security & Password
                            </h2>

                            <form onSubmit={handlePasswordUpdate} className="max-w-md space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-slate-50/50"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="bg-slate-900 text-white rounded-xl px-8 shadow-lg shadow-slate-900/20"
                                    >
                                        {isUpdating ? 'Updating...' : 'Update Password'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {(activeTab === 'notifications' || activeTab === '2fa') && (
                        <div className="bg-white rounded-[2rem] border border-dashed border-slate-200 p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                {activeTab === 'notifications' ? <Bell className="text-slate-300" /> : <Shield className="text-slate-300" />}
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-1">Coming Soon</h3>
                            <p className="text-slate-400 text-sm">This feature is currently under development.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
