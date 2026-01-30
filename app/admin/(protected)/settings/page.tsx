'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { User, Lock, Bell, Shield, LogOut, Mail, Phone, MapPin, Loader2, FileText, CheckCircle2, AlertCircle, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminSettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [doctorProfile, setDoctorProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    // Password state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Doctor Change Request State
    const [changeRequest, setChangeRequest] = useState({
        name: '',
        specialization: '',
        about: '',
        opd_start_time: '',
        opd_end_time: ''
    });

    // Site Settings State (Logo)
    const [siteLogo, setSiteLogo] = useState<string | null>(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);

    // Refs for file inputs
    const photoInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchUserData();
    }, []);

    async function fetchUserData() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/admin/login');
            return;
        }
        setUser(user);

        // Fetch Role & Linked Data
        const { data: profile } = await supabase.from('profiles').select('role, doctor_id').eq('id', user.id).single();
        const userRole = profile?.role || 'doctor';
        setRole(userRole);

        if (profile?.doctor_id) {
            // Fetch Doctor Data irrespective of role if doctor_id is present
            const { data: doctor } = await supabase.from('doctors').select('*').eq('id', profile.doctor_id).single();
            if (doctor) {
                setDoctorProfile(doctor);
                setChangeRequest({
                    name: doctor.name || '',
                    specialization: doctor.specialization || '',
                    about: doctor.about || '',
                    opd_start_time: doctor.opd_start_time || '',
                    opd_end_time: doctor.opd_end_time || ''
                });
            }
        }

        // Fetch Site Settings (Logo)
        const { data: settings } = await supabase.from('site_settings').select('value').eq('key', 'site_logo').single();
        if (settings?.value?.url) {
            setSiteLogo(settings.value.url);
        }

        setLoading(false);
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setIsUploadingPhoto(true);

        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // 3. Update Database or User Metadata
            if (doctorProfile) {
                // Update doctor record
                const { error: dbError } = await supabase
                    .from('doctors')
                    .update({ image: publicUrl })
                    .eq('id', doctorProfile.id);

                if (dbError) throw dbError;
                setDoctorProfile({ ...doctorProfile, image: publicUrl });
            } else {
                // Update auth user metadata for admins
                const { error: authError } = await supabase.auth.updateUser({
                    data: { avatar_url: publicUrl }
                });

                if (authError) throw authError;
                // Refresh local user state to reflect change
                const { data: { user: updatedUser } } = await supabase.auth.getUser();
                setUser(updatedUser);
            }

            alert("Profile photo updated successfully!");
        } catch (error: any) {
            console.error("Error uploading photo:", error);
            alert("Failed to upload photo: " + error.message);
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setIsUploadingLogo(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `site-logo-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Upload to assets bucket
            const { error: uploadError } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            // 3. Update site_settings table
            const { error: dbError } = await supabase
                .from('site_settings')
                .upsert({
                    key: 'site_logo',
                    value: { url: publicUrl, updated_at: new Date().toISOString() }
                });

            if (dbError) throw dbError;

            setSiteLogo(publicUrl);
            alert("Site logo updated successfully! Reload the page to see changes.");
        } catch (error: any) {
            console.error("Error uploading logo:", error);
            alert("Failed to upload logo: " + error.message);
        } finally {
            setIsUploadingLogo(false);
        }
    };

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

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!doctorProfile) return;

        setIsUpdating(true);
        // Identify changed fields
        const changes: any = {};
        if (changeRequest.name !== doctorProfile.name) changes.name = changeRequest.name;
        if (changeRequest.specialization !== doctorProfile.specialization) changes.specialization = changeRequest.specialization;
        if (changeRequest.about !== doctorProfile.about) changes.about = changeRequest.about;
        if (changeRequest.opd_start_time !== doctorProfile.opd_start_time) changes.opd_start_time = changeRequest.opd_start_time;
        if (changeRequest.opd_end_time !== doctorProfile.opd_end_time) changes.opd_end_time = changeRequest.opd_end_time;

        if (Object.keys(changes).length === 0) {
            alert("No changes detected.");
            setIsUpdating(false);
            return;
        }

        const { error } = await supabase
            .from('doctors')
            .update(changes)
            .eq('id', doctorProfile.id);

        if (!error) {
            // Update local state
            setDoctorProfile({ ...doctorProfile, ...changes });
            alert("Profile updated successfully");
        } else {
            alert("Error updating profile: " + error.message);
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

    if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading settings...</div>;

    const isDoctor = role === 'doctor';

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
                                    {isDoctor ? 'Public Profile' : 'Personal Information'}
                                </h2>

                                {/* Identity Section */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer" onClick={() => photoInputRef.current?.click()}>
                                        {doctorProfile?.image
                                            ? <img src={doctorProfile.image} alt={doctorProfile.name} className="w-full h-full object-cover" />
                                            : (user?.user_metadata?.avatar_url
                                                ? <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                                : (user?.email?.[0].toUpperCase() || 'DR'))
                                        }
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {doctorProfile ? doctorProfile.name || 'Doctor Name' : 'Administrator'}
                                        </h3>
                                        <p className="text-slate-500 text-sm">{user?.email}</p>
                                        {doctorProfile && <p className="text-xs text-blue-600 font-medium mt-1 uppercase tracking-wide">{doctorProfile.specialization || 'General'}</p>}
                                    </div>
                                    <input
                                        type="file"
                                        ref={photoInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                    />
                                    <Button
                                        onClick={() => photoInputRef.current?.click()}
                                        disabled={isUploadingPhoto}
                                        className="ml-auto h-10 px-4 text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                                    >
                                        {isUploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Change Photo'}
                                    </Button>
                                </div>

                                {/* Form Section */}
                                {doctorProfile ? (
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Display Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                    value={changeRequest.name}
                                                    onChange={e => setChangeRequest({ ...changeRequest, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Specialization</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                    value={changeRequest.specialization}
                                                    onChange={e => setChangeRequest({ ...changeRequest, specialization: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Start Time & End Time</label>
                                                <div className="flex gap-4">
                                                    <input
                                                        type="time"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                        value={changeRequest.opd_start_time}
                                                        onChange={e => setChangeRequest({ ...changeRequest, opd_start_time: e.target.value })}
                                                    />
                                                    <input
                                                        type="time"
                                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                        value={changeRequest.opd_end_time}
                                                        onChange={e => setChangeRequest({ ...changeRequest, opd_end_time: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 space-y-1">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biography</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                                                    value={changeRequest.about}
                                                    onChange={e => setChangeRequest({ ...changeRequest, about: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <Button
                                                disabled={isUpdating}
                                                className="bg-slate-900 text-white rounded-xl px-8 shadow-lg shadow-slate-900/20"
                                            >
                                                {isUpdating ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="email" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" defaultValue={user?.email || ''} readOnly />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role</label>
                                            <div className="relative">
                                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10" defaultValue="Administrator" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Appearance Options (Site Logo) */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                                <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                    Appearance & Branding
                                </h2>

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center relative overflow-hidden group">
                                        {siteLogo ? (
                                            <img src={siteLogo} alt="Site Logo" className="w-full h-full object-contain p-2" />
                                        ) : (
                                            <span className="text-xs text-slate-400 font-medium text-center px-2">No Logo</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                            {/* Overlay if needed */}
                                        </div>
                                    </div>

                                    <div className="space-y-2 flex-1">
                                        <h3 className="text-sm font-bold text-slate-900">Website Logo</h3>
                                        <p className="text-xs text-slate-500 max-w-sm">
                                            Upload your hospital's logo. This will be displayed in the navigation bar and footer. Recommended size: 200x200px (PNG or SVG).
                                        </p>
                                        <div className="flex gap-3 pt-2">
                                            <input
                                                type="file"
                                                ref={logoInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                            />
                                            <Button
                                                onClick={() => logoInputRef.current?.click()}
                                                disabled={isUploadingLogo}
                                                className="h-9 px-4 text-xs bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                                            >
                                                {isUploadingLogo ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Upload className="w-3 h-3 mr-2" />}
                                                {siteLogo ? 'Replace Logo' : 'Upload Logo'}
                                            </Button>
                                            {siteLogo && (
                                                <Button
                                                    onClick={() => setSiteLogo(null)}
                                                    variant="outline"
                                                    className="h-9 px-4 text-xs border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Session Management */}
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
        </div >
    );
}
