import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Sunday Musings Archive | Eric Haupt',
    description: 'A collection of thoughts on productivity, technology, and leadership.',
};

export default async function MusingsIndex() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, slug, published_at, excerpt, category')
        .order('published_at', { ascending: false });

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-24 text-bone font-mono">
            <div className="container mx-auto max-w-4xl">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-emerald-400"
                >
                    <ArrowLeft size={16} />
                    Return to Base
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Sunday Musings Archive</h1>
                    <p className="text-bone/60 text-lg">
                        Processing signal from noise. {posts?.length || 0} transmissions stored.
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-1">
                    {posts?.map((post) => (
                        <Link
                            key={post.id}
                            href={`/musings/${post.slug}`}
                            className="group block rounded-lg border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-emerald-500/30"
                        >
                            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-wider text-bone/40">
                                <time>{format(new Date(post.published_at), 'MMMM d, yyyy')}</time>
                                <span className="text-emerald-500/80 group-hover:text-emerald-400 transition-colors">
                                    Read Transmission &rarr;
                                </span>
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-bone/70 line-clamp-2">
                                {post.excerpt}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
