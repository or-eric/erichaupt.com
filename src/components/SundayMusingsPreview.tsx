import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { createClient } from '@/utils/supabase/server';

interface Post {
    id: string;
    title: string;
    excerpt: string | null;
    published_at: string;
    category: string | null;
    slug: string;
}

export default async function SundayMusingsPreview() {
    let posts: Post[] = [];

    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, excerpt, published_at, category, slug')
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(3);

        if (!error && data) {
            posts = data as Post[];
        }
    } catch {
        // Graceful fallback if credentials are missing/invalid
        console.warn('Supabase connection failed or credentials missing.');
    }

    // Optional: Mock data for development if no posts found (comment out for production)
    if (posts.length === 0) {
        return (
            <section className="container mx-auto px-4 py-24">
                <h2 className="mb-12 font-serif text-4xl font-bold text-deep-slate md:text-5xl">
                    Sunday Musings
                </h2>
                <div className="py-8 text-center text-slate-500 font-sans">
                    <p>No recent musings found. Connect Supabase to see posts here.</p>
                </div>
            </section>
        )
    }

    return (
        <section className="container mx-auto px-4 py-24">
            <h2 className="mb-12 font-serif text-4xl font-bold text-deep-slate md:text-5xl">
                Sunday Musings
            </h2>

            <div className="flex flex-col">
                {posts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/musings/${post.slug}`}
                        className="group flex flex-col items-start gap-4 border-b border-deep-slate/10 py-8 transition-colors hover:bg-slate-50 md:flex-row md:items-baseline md:justify-between"
                    >
                        {/* Date / Category */}
                        <div className="w-48 shrink-0 font-sans text-sm font-medium uppercase tracking-wider text-slate-500">
                            {post.published_at
                                ? format(new Date(post.published_at), 'MMM dd, yyyy')
                                : 'Unknown Date'}
                            {post.category && (
                                <span className="block text-deep-slate md:mt-1">
                                    {post.category}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 md:px-8">
                            <h3 className="mb-2 font-serif text-2xl font-bold text-deep-slate transition-colors group-hover:text-blue-900 md:text-3xl">
                                {post.title}
                            </h3>
                            {post.excerpt && (
                                <p className="line-clamp-2 max-w-2xl font-sans text-base text-slate-600">
                                    {post.excerpt}
                                </p>
                            )}
                        </div>

                        {/* Read Arrow */}
                        <div className="flex shrink-0 items-center justify-end md:w-24">
                            <span className="rounded-full border border-deep-slate/20 p-3 text-deep-slate transition-transform group-hover:translate-x-1 group-hover:bg-deep-slate group-hover:text-bone">
                                <ArrowRight size={20} strokeWidth={1.5} />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 flex justify-center md:justify-end">
                <Link
                    href="/musings"
                    className="group relative font-sans text-lg font-medium text-deep-slate"
                >
                    View All Musings
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-deep-slate transition-all duration-300 group-hover:w-full" />
                </Link>
            </div>
        </section>
    );
}
