import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put, list } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://adarshkp73.github.io/public_events/events.json';
const FALLBACK_STRING = 'data not provided/will be shared upon signup';
const EVENTS_DIR = path.join(__dirname, '../public/event-images/scraped');
const POSTERS_JSON_PATH = path.join(__dirname, '../src/data/posters.json');

// Simple sleep function for rate-limiting
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to generate a safe filename from a URL
function getSlug(urlStr) {
  try {
    const urlObj = new URL(urlStr);
    const slug = urlObj.pathname.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return slug || 'event';
  } catch (e) {
    return 'event';
  }
}

async function scrapeOgImage(url) {
  try {
    console.log(`\n🔍 Scraping: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`❌ Failed to fetch HTML: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const html = await response.text();
    
    // Lightweight Regex to find <meta property="og:image" content="...">
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["'](.*?)["'][^>]*>/i) ||
                         html.match(/<meta[^>]*content=["'](.*?)["'][^>]*property=["']og:image["'][^>]*>/i) ||
                         html.match(/<meta[^>]*name=["']og:image["'][^>]*content=["'](.*?)["'][^>]*>/i) ||
                         html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']og:image["'][^>]*>/i);
                         
    if (ogImageMatch && ogImageMatch[1]) {
      let imageUrl = ogImageMatch[1];
      // Decode HTML entities if present (e.g. &amp;)
      imageUrl = imageUrl.replace(/&amp;/g, '&');
      console.log(`✅ Found og:image: ${imageUrl}`);
      return imageUrl;
    } else {
      console.log(`⚠️ No og:image found on ${url}`);
      return null;
    }
  } catch (err) {
    console.error(`❌ Error scraping ${url}:`, err.message);
    return null;
  }
}

async function uploadToBlob(url, slug) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`❌ Failed to download image for upload: ${response.statusText}`);
      return null;
    }
    const buffer = await response.arrayBuffer();
    
    // Upload to Vercel Blob
    const blob = await put(`${slug}.jpg`, buffer, {
      access: 'public',
      addRandomSuffix: false
    });
    
    console.log(`📥 Uploaded image to Vercel Blob: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`❌ Error uploading image to Blob:`, error.message);
    return null;
  }
}

async function run() {
  console.log('Fetching events from GitHub API...');
  
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('⚠️ WARNING: BLOB_READ_WRITE_TOKEN is not set. Script will fail if attempting to upload to Vercel Blob.');
  }

  // Ensure src/data exists
  const DATA_DIR = path.dirname(POSTERS_JSON_PATH);
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  try {
    // 1. Fetch existing blobs to avoid re-uploading
    let existingBlobs = {};
    try {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        console.log('📦 Fetching existing blobs from Vercel...');
        const { blobs } = await list();
        blobs.forEach(b => {
          // b.pathname is like "event-slug.jpg"
          const slug = b.pathname.replace('.jpg', '');
          existingBlobs[slug] = b.url;
        });
        console.log(`✅ Found ${Object.keys(existingBlobs).length} existing posters in Blob storage.`);
      } else {
        console.log('⚠️ Skipping Blob list fetch because token is missing.');
      }
    } catch (e) {
      console.log(`⚠️ Could not list blobs. Proceeding anyway...`, e.message);
    }

    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    const githubEvents = Array.isArray(data) ? data : (data.events || []);
    
    // Also fetch FounderCal events
    const CITIES = ['bangalore', 'pune', 'hyderabad', 'delhi', 'mumbai'];
    let founderCalEvents = [];
    try {
      const fetchPromises = CITIES.map(async (city) => {
        const response = await fetch(`https://foundercal.com/api/events.json?city=${city}`);
        return response.ok ? response.json() : { events: [] };
      });
      const results = await Promise.all(fetchPromises);
      founderCalEvents = results.flatMap(result => result.events || []).map(ev => ({
        'event name': ev.title || '',
        'registration link': ev.register_url || '',
        'image url': '' // Force scraping
      }));
    } catch (e) {
      console.log('Failed to fetch FounderCal APIs:', e.message);
    }
    
    const events = [...githubEvents, ...founderCalEvents];
    console.log(`Found ${events.length} events. Checking for missing posters...`);
    
    const postersMap = { ...existingBlobs };

    for (const event of events) {
      const imageUrl = event['image url'];
      const regLink = event['registration link'];
      
      // If the event doesn't have a valid image, but HAS a registration link
      if ((!imageUrl || imageUrl === FALLBACK_STRING) && regLink && regLink !== FALLBACK_STRING && regLink.startsWith('http')) {
        const slug = getSlug(regLink);
        
        if (postersMap[slug]) {
          console.log(`\n⏭️ Skipped (already in Blob): ${slug}`);
          continue;
        }
        
        // Scrape the og:image
        const ogImageUrl = await scrapeOgImage(regLink);
        
        if (ogImageUrl) {
          // Add a 1000ms delay BEFORE downloading to be nice to servers
          await sleep(1000);
          
          if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blobUrl = await uploadToBlob(ogImageUrl, slug);
            if (blobUrl) {
              postersMap[slug] = blobUrl;
            }
          } else {
            console.log(`⚠️ Skipping upload for ${slug} (missing token)`);
          }
        }
        
        // Add a 1500ms delay between scraping events to avoid getting blocked
        await sleep(1500);
      }
    }
    
    // Write out the posters.json mapping
    fs.writeFileSync(POSTERS_JSON_PATH, JSON.stringify(postersMap, null, 2));
    console.log(`\n📝 Wrote mapping of ${Object.keys(postersMap).length} posters to src/data/posters.json`);
    
    console.log('\n🎉 Done scraping posters!');
  } catch (err) {
    console.error('❌ Failed to run poster script:', err.message);
  }
}

run();
