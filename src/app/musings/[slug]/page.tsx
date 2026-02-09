import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
    id: string;
    title: string;
    content: string;
    published_at: string;
    excerpt: string;
    slug: string;
    category: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Eric Haupt`,
        description: post.excerpt,
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-bone px-4 py-24 text-deep-slate font-mono">
            <article className="container mx-auto max-w-3xl">
                {/* Back Link */}
                <Link
                    href="/musings"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-deep-slate/60 transition-colors hover:text-emerald-600"
                >
                    <ArrowLeft size={16} />
                    Back to Laboratory
                </Link>

                {/* Header */}
                <header className="mb-12 border-b border-deep-slate/10 pb-12">
                    <div className="mb-4 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-emerald-600">
                        <span className="rounded-full bg-emerald-100 px-3 py-1">
                            {post.category || 'Sunday Musing'}
                        </span>
                        {post.published_at && (
                            <time className="flex items-center gap-2 text-deep-slate/40">
                                <Calendar size={14} />
                                {format(new Date(post.published_at), 'MMMM d, yyyy')}
                            </time>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl lg:leading-tight text-deep-slate">
                        {post.title}
                    </h1>
                </header>

                {/* Content */}
                <div
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-deep-slate prose-code:text-emerald-700 prose-pre:bg-slate-100"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer / Signature? */}
                <div className="mt-16 border-t border-deep-slate/10 pt-8 text-center text-sm text-deep-slate/40">
                    <p>End of transmission.</p>
                </div>
            </article>
        </main>
    );
}
