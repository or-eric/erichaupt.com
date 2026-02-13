import { MetadataRoute } from 'next';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://erichaupt.com';
    const supabase = await createClient();

    // Fetch all published posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, published_at')
        .eq('status', 'published');

    const musingUrls = posts?.map((post) => ({
        url: `${baseUrl}/musings/${post.slug}`,
        lastModified: new Date(post.published_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || [];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/musings`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/now`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...musingUrls,
    ];
}
