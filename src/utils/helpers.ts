export function deriveEventType(title: string): string | null {
  if (!title) return null;
  const lowerTitle = title.toLowerCase();
  
  // Formats / Event Styles
  if (lowerTitle.includes('hackathon')) return 'Hackathon';
  if (lowerTitle.includes('founders meet') || lowerTitle.includes('founder meet')) return 'Founders Meet';
  if (lowerTitle.includes('meetup') || lowerTitle.includes('mixer') || lowerTitle.includes('networking')) return 'Meetup';
  if (lowerTitle.includes('workshop') || lowerTitle.includes('masterclass') || lowerTitle.includes('master class') || lowerTitle.includes('bootcamp')) return 'Workshop';
  if (lowerTitle.includes('pitch') || lowerTitle.includes('demo day')) return 'Pitch';
  if (lowerTitle.includes('conference') || lowerTitle.includes('summit') || lowerTitle.includes('conclave')) return 'Conference';
  if (lowerTitle.includes('panel') || lowerTitle.includes('talk') || lowerTitle.includes('fireside') || lowerTitle.includes('roast') || lowerTitle.includes('ama')) return 'Talk';
  
  // Tech Domains / Topics
  if (lowerTitle.includes('agentic') || lowerTitle.includes('genai') || lowerTitle.includes('gen-ai') || lowerTitle.includes('ai tools') || lowerTitle.match(/\bai\b/)) return 'AI & GenAI';
  if (lowerTitle.includes('robotic')) return 'Robotics';
  if (lowerTitle.includes('securit') || lowerTitle.includes('cyber')) return 'Security';
  if (lowerTitle.includes('automat')) return 'Automation';
  if (lowerTitle.includes('design') || lowerTitle.includes('ui/ux')) return 'Design';
  if (lowerTitle.includes('web3') || lowerTitle.includes('crypto') || lowerTitle.includes('blockchain')) return 'Web3 & Crypto';
  if (lowerTitle.includes('saas')) return 'SaaS';
  if (lowerTitle.includes('fintech')) return 'Fintech';

  return null;
}

/**
 * Cross-browser safe date parsing.
 * Firefox and Safari often return Invalid Date (NaN) for formats like "YYYY-MM-DD HH:mm:ss".
 * Replacing hyphens with slashes creates a universally parsable string "YYYY/MM/DD HH:mm:ss".
 */
export function parseSafeDate(dateString: string | undefined | null): Date {
  if (!dateString) return new Date(NaN);
  
  // Attempt standard parsing first
  let d = new Date(dateString);
  if (!isNaN(d.getTime())) return d;
  
  // Fallback for Safari/Firefox
  let safeStr = dateString.replace(/-/g, '/');
  d = new Date(safeStr);
  
  return d;
}
