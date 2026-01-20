import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function logActivity(
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    details: any = {}
) {
    try {
        await supabase.from('activity_logs').insert({
            user_id: userId,
            action,
            entity_type: entityType,
            entity_id: entityId,
            details
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
}
