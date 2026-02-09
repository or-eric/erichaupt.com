import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Error: Missing Supabase environment variables in .env.local');
    process.exit(1);
}

async function debugAnon() {
    console.log('Testing Anon Key access...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY!);

    // Try to fetch 1 post
    const { data, error } = await supabase
        .from('posts')
        .select('title, status')
        .eq('status', 'published')
        .limit(1);

    if (error) {
        console.error('❌ Anon Access Failed:', error.message);
        console.error('Hint: RLS Policy is likely blocking access.');
    } else if (!data || data.length === 0) {
        console.warn('⚠️ Anon Access Succeeded, but returned NO data.');
        console.warn('Hint: Data might not match filter (status=published) or table is empty.');
    } else {
        console.log('✅ Anon Access Succeeded!');
        console.log('Sample Data:', data[0]);
    }
}

debugAnon();
