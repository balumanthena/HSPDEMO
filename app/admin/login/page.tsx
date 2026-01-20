'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { HeartPulse, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
                },
            });

            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send magic link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HeartPulse size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Doctor Login</h1>
                    <p className="text-gray-500 mt-2">Enter your email to receive a magic link</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle size={16} />
                        Check your email for the magic link!
                    </div>
                )}

                {!success && (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                placeholder="doctor@hospital.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button className="w-full h-12 text-base rounded-xl" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2" /> : 'Send Magic Link'}
                        </Button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Protected Area. Authorized Personnel Only.
                    </p>
                </div>
            </div>
        </main>
    );
}
