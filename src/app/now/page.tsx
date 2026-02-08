import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import TelemetryHUD from '@/components/TelemetryHUD';

export const metadata = {
    title: 'Now | Eric Haupt',
    description: 'What I am currently focused on.',
};

export const runtime = 'edge';

export default async function NowPage() {
    let content = "Focused on building the Obsidian Rowe platform and refining my personal digital garden.";
    let lastUpdated = new Date().toISOString();

    try {
        const supabase = await createClient();
        const { data } = await supabase
            .from('now_updates')
            .select('content, created_at')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (data) {
            content = data.content;
            lastUpdated = data.created_at;
        }
    } catch {
        // Fallback to default
    }

    return (
        <main className="container mx-auto max-w-2xl px-4 py-24">
            <TelemetryHUD />

            <h1 className="mb-4 font-serif text-4xl font-bold text-deep-slate md:text-5xl">
                What I’m Doing Now
            </h1>
            <p className="mb-12 font-sans text-lg text-slate-600">
                A snapshot of my current professional focus, personal pursuits, and the gear that gets me there.
            </p>

            <div className="prose prose-slate prose-lg mb-12 font-sans text-slate-600">
                <h3 className="font-serif text-2xl font-bold text-deep-slate">Professional Focus</h3>
                <ul className="list-none space-y-4 pl-0">
                    <li>
                        <strong className="text-deep-slate">Obsidian Rowe:</strong> Scaling &quot;Decision Advantage&quot; frameworks for strategic partners.
                    </li>
                    <li>
                        <strong className="text-deep-slate">Project ARES:</strong> Architecting the next phase of automated threat intelligence.
                    </li>
                    <li>
                        <strong className="text-deep-slate">Sunday Musings:</strong> Reflecting on the intersection of Stoicism and Cyber Operations.
                    </li>
                </ul>

                <h3 className="mt-8 font-serif text-2xl font-bold text-deep-slate">Personal Pursuits</h3>
                <ul className="list-none space-y-4 pl-0">
                    <li>
                        <strong className="text-deep-slate">Family Logistics:</strong> Navigating the &quot;Tactical Minivan&quot; (Honda Odyssey) through school runs and Jiu-Jitsu practice.
                    </li>
                    <li>
                        <strong className="text-deep-slate">Jiu-Jitsu:</strong> Training with my kids; learning that discipline is a shared family value.
                    </li>
                    <li>
                        <strong className="text-deep-slate">Formula 1:</strong> Following the McLaren trajectory and analyzing the data behind the podiums, that bending wing, and RedBull&apos;s growing and shrinking engine cylinders.
                    </li>
                </ul>

                <h3 className="mt-8 font-serif text-2xl font-bold text-deep-slate">Currently Learning</h3>
                <ul className="list-none space-y-4 pl-0">
                    <li>
                        <strong className="text-deep-slate">Technical:</strong> Deep-diving into Next.js 16 and AI-driven development workflows.
                    </li>
                    <li>
                        <strong className="text-deep-slate">Philosophical:</strong> Re-reading Seneca’s <em>Letters from a Stoic</em> for the nth time.
                    </li>
                </ul>
            </div>

            <div className="border-t border-deep-slate/10 pt-8 font-mono text-xs text-slate-400">
                Last Updated: <time dateTime={updatedAt}>{format(new Date(updatedAt), 'MMMM dd, yyyy')}</time>
            </div>
        </main>
    );
}
