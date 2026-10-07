import Link from 'next/link';
import type { Metadata } from 'next';
import './information.css';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
    },
};

export default function PersonalOSLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="personal-os-info mx-auto max-w-3xl px-6 py-16 md:py-24">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Personal AI OS · Eric Haupt
            </p>
            <nav aria-label="Personal AI OS information" className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-200 pb-5 font-sans text-sm">
                <Link href="/personal-ai-os" className="underline decoration-slate-300 underline-offset-4 hover:decoration-deep-slate">Overview</Link>
                <Link href="/personal-ai-os/privacy" className="underline decoration-slate-300 underline-offset-4 hover:decoration-deep-slate">Privacy</Link>
                <Link href="/personal-ai-os/terms" className="underline decoration-slate-300 underline-offset-4 hover:decoration-deep-slate">Terms</Link>
            </nav>
            <div className="prose prose-slate max-w-none font-sans prose-headings:font-serif prose-headings:text-deep-slate prose-a:underline-offset-4">
                {children}
            </div>
            <p className="mt-12 border-t border-slate-200 pt-6 font-sans text-sm text-slate-500">
                Questions about Personal AI OS? <a href="mailto:eric@erichaupt.com" className="underline underline-offset-4">Contact Eric Haupt</a>.
            </p>
        </main>
    );
}
