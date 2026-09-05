import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://adarshkp73.github.io/public_events/events.json';
const FALLBACK_STRING = 'data not provided/will be shared upon signup';
const EVENTS_DIR = path.join(__dirname, '../public/events');

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${destPath}`);
  } catch (error) {
    console.error(`❌ Error downloading ${url}:`, error.message);
  }
}

async function run() {
  console.log('Fetching events from API...');
  
  if (!fs.existsSync(EVENTS_DIR)) {
    fs.mkdirSync(EVENTS_DIR, { recursive: true });
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    const events = Array.isArray(data) ? data : (data.events || []);
    
    console.log(`Found ${events.length} events. Starting downloads...`);
    
    for (const event of events) {
      const imageUrl = event['image url'];
      if (imageUrl && imageUrl !== FALLBACK_STRING) {
        // Extract real URL if wrapped in markdown like "[link](link)"
        let actualUrl = imageUrl;
        const mdMatch = imageUrl.match(/\]\((.*?)\)/);
        if (mdMatch) {
          actualUrl = mdMatch[1];
        }

        const ext = path.extname(new URL(actualUrl).pathname) || '.jpg';
        const destPath = path.join(EVENTS_DIR, `${event.id}${ext}`);
        
        // Skip if already exists
        if (!fs.existsSync(destPath)) {
          await downloadImage(actualUrl, destPath);
        } else {
          console.log(`⏭️ Skipped (already exists): ${destPath}`);
        }
      }
    }
    console.log('Done downloading posters.');
  } catch (err) {
    console.error('Failed to run poster script:', err);
  }
}

run();
