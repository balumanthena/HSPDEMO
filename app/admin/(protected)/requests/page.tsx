'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock, User, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        fetchRequests();
    }, []);

    async function fetchRequests() {
        // fetch requests with doctor details
        const { data, error } = await supabase
            .from('doctor_profile_changes')
            .select(`
                *,
                doctors:doctor_id (
                    name,
                    specialization,
                    image
                )
            `)
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (data) setRequests(data);
        setLoading(false);
    }

    async function handleApprove(request: any) {
        if (!confirm('Are you sure you want to approve these changes?')) return;
        setProcessing(request.id);

        // 1. Update the doctors table
        const { error: updateError } = await supabase
            .from('doctors')
            .update(request.changed_fields)
            .eq('id', request.doctor_id);

        if (updateError) {
            alert('Error updating doctor profile: ' + updateError.message);
            setProcessing(null);
            return;
        }

        // 2. Mark request as approved
        const { error: statusError } = await supabase
            .from('doctor_profile_changes')
            .update({ status: 'approved' })
            .eq('id', request.id);

        if (statusError) {
            alert('Error updating request status');
        } else {
            fetchRequests();
        }
        setProcessing(null);
    }

    async function handleReject(id: string) {
        if (!confirm('Reject this request?')) return;
        setProcessing(id);

        const { error } = await supabase
            .from('doctor_profile_changes')
            .update({ status: 'rejected' })
            .eq('id', id);

        if (error) {
            alert('Error rejecting request');
        } else {
            fetchRequests();
        }
        setProcessing(null);
    }

    if (loading) return <div className="p-10 text-center text-slate-400">Loading requests...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-serif text-slate-900 mb-2">Change Requests</h1>
                <p className="text-slate-500 text-sm">Review and approve profile updates requested by doctors.</p>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">All Caught Up</h3>
                    <p className="text-slate-400 text-sm">There are no pending requests to review.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {requests.map((req) => (
                        <div key={req.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 min-w-[200px]">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                    {req.doctors?.image ? (
                                        <img src={req.doctors.image} alt={req.doctors.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-slate-400" size={20} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{req.doctors?.name || 'Unknown Doctor'}</h3>
                                    <p className="text-xs text-slate-500">{req.doctors?.specialization}</p>
                                    <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                        <Clock size={12} />
                                        {new Date(req.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Changes Diff */}
                            <div className="flex-1 w-full bg-slate-50/50 rounded-xl border border-slate-100 p-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Requested Changes</h4>
                                <div className="space-y-3">
                                    {Object.entries(req.changed_fields).map(([key, value]) => (
                                        <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                                            <span className="text-slate-500 font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                                            <span className="sm:col-span-2 font-semibold text-slate-900 break-words">
                                                {String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex md:flex-col gap-3 w-full md:w-auto">
                                <Button
                                    onClick={() => handleApprove(req)}
                                    disabled={processing === req.id}
                                    className="flex-1 md:w-32 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-slate-900/10 h-10 text-sm"
                                >
                                    {processing === req.id ? <Loader2 className="animate-spin" /> : 'Approve'}
                                </Button>
                                <Button
                                    onClick={() => handleReject(req.id)}
                                    disabled={processing === req.id}
                                    className="flex-1 md:w-32 bg-white border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 rounded-xl h-10 text-sm"
                                >
                                    Reject
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
