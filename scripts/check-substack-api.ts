
import * as dotenv from 'dotenv';

// Load environment variables if needed (mostly for fetching)
dotenv.config({ path: '.env.local' });

const SUBSTACK_DOMAIN = 'erichaupt.substack.com';
const API_URL = `https://${SUBSTACK_DOMAIN}/api/v1/archive?sort=new&search=&offset=0&limit=5`;

async function checkApi() {
    console.log(`Fetching from ${API_URL}...`);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(`Found ${data.length} items (requested 5).`);

        if (data.length > 0) {
            const first = data[0];
            console.log('--- Sample Post ---');
            console.log('Title:', first.title);
            console.log('Slug:', first.slug);
            console.log('Has Body HTML?', !!first.body_html);
            if (first.body_html) {
                console.log('Body HTML length:', first.body_html.length);
                console.log('Body HTML preview:', first.body_html.substring(0, 100));
            } else {
                console.warn('WARNING: body_html is missing. Content processing might require scraping.');
            }
        }
    } catch (err) {
        console.error('Error fetching API:', err);
    }
}

checkApi();
