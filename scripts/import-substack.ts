import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: Missing Supabase environment variables.');
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const SUBSTACK_URL = 'https://erichaupt.substack.com/feed';

async function importSubstack() {
    // Assert non-null because we check above
    if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error('Missing Supabase keys');
    }
    console.log(`Create Client for ${SUPABASE_URL}...`);
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const parser = new Parser();

    console.log(`Fetching RSS feed from ${SUBSTACK_URL}...`);
    const feed = await parser.parseURL(SUBSTACK_URL);

    console.log(`Found ${feed.items.length} posts.`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const item of feed.items) {
        try {
            const title = item.title;
            const link = item.link;
            const pubDate = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
            const content = item['content:encoded'] || item.content || '';
            const excerpt = item.contentSnippet || '';

            // Extract slug from link
            // Format: https://erichaupt.substack.com/p/slug-name
            let slug = '';
            if (link) {
                const parts = link.split('/p/');
                if (parts.length > 1) {
                    slug = parts[1].split('?')[0]; // Remove query params
                } else {
                    // Fallback using title
                    slug = title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
                }
            }

            if (!slug) {
                console.warn(`Skipping item without slug: ${title}`);
                continue;
            }

            // Check if exists
            const { data: existing } = await supabase
                .from('posts')
                .select('id')
                .eq('slug', slug)
                .single();

            if (existing) {
                // console.log(`Skipping existing post: ${slug}`);
                skipCount++;
                continue;
            }

            // Insert
            const { error } = await supabase
                .from('posts')
                .insert({
                    title,
                    slug,
                    excerpt,
                    content,
                    published_at: pubDate,
                    status: 'published',
                    category: 'Sunday Musing', // Default category
                });

            if (error) {
                console.error(`Failed to insert ${slug}:`, error.message);
                failCount++;
            } else {
                console.log(`Imported: ${title} (${slug})`);
                successCount++;
            }

        } catch (err) {
            console.error('Error processing item:', err);
            failCount++;
        }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Total Found: ${feed.items.length}`);
    console.log(`Imported: ${successCount}`);
    console.log(`Skipped (Exists): ${skipCount}`);
    console.log(`Failed: ${failCount}`);
}

importSubstack().catch(console.error);
