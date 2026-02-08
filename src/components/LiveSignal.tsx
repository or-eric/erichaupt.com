import { createClient } from '@/utils/supabase/server';

export default async function LiveSignal() {
    let status = 'Deep Work'; // Default fallback
    let color = 'bg-amber-500';

    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('now_updates')
            .select('activity_type')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (data?.activity_type) {
            status = data.activity_type;
            // Simple logic to map status to color
            if (status.toLowerCase().includes('writing') || status.toLowerCase().includes('online')) {
                color = 'bg-emerald-500';
            } else if (status.toLowerCase().includes('offline') || status.toLowerCase().includes('sleeping')) {
                color = 'bg-slate-500';
            }
        }
    } catch {
        // Ignore error, keep fallback
    }

    return (
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="uppercase tracking-wider">Current Status:</span>
            <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-emerald-400">
                <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color.replace('bg-', 'bg-')} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`}></span>
                </span>
                <span className="font-bold text-bone">{status}</span>
            </div>
        </div>
    );
}
