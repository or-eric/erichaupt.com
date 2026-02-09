import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cheerio from 'cheerio';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: Missing Supabase environment variables.');
    process.exit(1);
}

const EXPORT_DIR = path.join(process.cwd(), 'posts_export');

async function importExport() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    if (!fs.existsSync(EXPORT_DIR)) {
        console.error(`Error: Export directory not found at ${EXPORT_DIR}`);
        return;
    }

    const files = fs.readdirSync(EXPORT_DIR);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    console.log(`Found ${htmlFiles.length} HTML files to process.`);

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const file of htmlFiles) {
        try {
            // Filename format: [ID].[slug].html
            // Example: 102555449.sunday-musings-eisenhower-matrix.html
            const match = file.match(/^(\d+)\.(.+)\.html$/);
            if (!match) {
                console.warn(`Skipping malformed filename: ${file}`);
                continue;
            }

            const id = match[1];
            const slug = match[2];

            // Derive Title from Slug
            const title = slug
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Read HTML Content
            const filePath = path.join(EXPORT_DIR, file);
            let content = fs.readFileSync(filePath, 'utf-8');

            // Optional: Clean Content with Cheerio
            const $ = cheerio.load(content);

            // Remove Subscription Widget if present
            $('.subscription-widget-wrap-editor').remove();

            // Update Title if H1 exists? (Optional, usage varies)
            // const h1 = $('h1').first().text();
            // if (h1) title = h1;

            content = $.html(); // Get cleaned HTML

            // Find Date from delivers.csv
            // [ID].delivers.csv
            const deliverFile = path.join(EXPORT_DIR, `${id}.delivers.csv`);
            let published_at = new Date().toISOString(); // Default

            if (fs.existsSync(deliverFile)) {
                const csvContent = fs.readFileSync(deliverFile, 'utf-8');
                const lines = csvContent.split('\n');
                if (lines.length > 1) {
                    // Line 2: post_id,timestamp,...
                    const cols = lines[1].split(',');
                    if (cols.length > 1 && cols[1]) {
                        published_at = cols[1]; // Timestamp
                    }
                }
            }

            // Excerpt (First paragraph)
            const excerpt = $('p').first().text().substring(0, 200) + '...';

            // Check if exists
            const { data: existing } = await supabase
                .from('posts')
                .select('id')
                .eq('slug', slug)
                .single();

            if (existing) {
                // console.log(`Skipping existing: ${slug}`);
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
                    published_at,
                    status: 'published',
                    category: 'Sunday Musing',
                });

            if (error) {
                console.error(`Failed to insert ${slug}:`, error.message);
                failCount++;
            } else {
                console.log(`Imported: ${title} (${published_at})`);
                successCount++;
            }

        } catch (err) {
            console.error(`Error processing ${file}:`, err);
            failCount++;
        }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Total Files: ${htmlFiles.length}`);
    console.log(`Imported: ${successCount}`);
    console.log(`Skipped: ${skipCount}`);
    console.log(`Failed: ${failCount}`);
}

importExport().catch(console.error);
