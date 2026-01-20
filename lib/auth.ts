import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export type UserRole = 'admin' | 'doctor' | 'seo_editor';

export async function getUserRole(): Promise<UserRole | null> {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Fetch profile to get the role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    return (profile?.role as UserRole) || 'doctor'; // Default to doctor if not found, or modify as needed
}

export async function canAccessAdmin(): Promise<boolean> {
    const role = await getUserRole();
    return role === 'admin' || role === 'doctor' || role === 'seo_editor';
}

export async function canPublish(): Promise<boolean> {
    const role = await getUserRole();
    return role === 'admin';
}

export async function canEditSEO(): Promise<boolean> {
    const role = await getUserRole();
    return role === 'admin' || role === 'seo_editor';
}
