import { Handshake, Rocket, Mic, Calendar, Users, Megaphone } from 'lucide-react';
import { StatItem, ProgramItem, EventItem, MediaItem } from './types';
import pitchCircuit3 from './assets/images/pitch-circult-3.avif';
import DSC01204 from './assets/images/DSC01204.JPG';
import DSC02103 from './assets/images/DSC02103.JPG';
import DSC02127 from './assets/images/DSC02127.jpg';
import DSC01239 from './assets/images/DSC01239.JPG';
import oHkt1SXEi7oHD from './assets/images/oHkt1SXEi7o-HD.jpg';
import Q9_M4kfkj8YHD from './assets/images/Q9_M4kfkj8Y-HD.jpg';
import gyG6AJxlLOoHD from './assets/images/gyG6AJxlLOo-HD.jpg';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Programs', href: '#programs' },
  { name: 'Conference', href: '#conference' },
  { name: 'Events', href: '#events' },
];

export const STATS: StatItem[] = [
  { id: 1, value: '999+', label: 'Startups Gathered', description: 'Across India' },
  // { id: 2, value: '100+', label: 'Startup Stories', description: 'Covered in depth' },
  { id: 3, value: '20+', label: 'Podcasts Hosted', description: 'With industry leaders' },
  { id: 4, value: '30+', label: 'Events Hosted', description: 'Pan-India presence' },
  { id: 5, value: '10000+', label: 'Attendees', description: 'Active participants' },
  { id: 6, value: '100+', label: 'Angel Investors', description: 'In our exclusive pool' },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: 1,
    title: 'Partnerships',
    description: 'Strategic alliances between corporations and agile startups to foster innovation.',
    icon: Handshake,
  },
  {
    id: 2,
    title: 'Startup Accelerator',
    description:
      'An intensive 12-week program designed to take early-stage startups from idea to investment ready.',
    icon: Rocket,
  },
  {
    id: 3,
    title: 'Content & Media',
    description:
      "Documenting the grit and glory of entrepreneurship through blogs, videos, and case studies.",
    icon: Megaphone,
  },
  {
    id: 4,
    title: 'Annual Conference',
    description:
      'Our flagship summit bringing together 1000+ stakeholders for a day of networking and learning.',
    icon: Users,
  },
  {
    id: 5,
    title: 'Local Events',
    description:
      'Monthly meetups across major Indian cities to keep the community connected at a grassroots level.',
    icon: Calendar,
  },
  {
    id: 6,
    title: 'Podcasts',
    description:
      'Deep dives with unicorns and industry disruptors. Candid conversations about the journey.',
    icon: Mic,
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 1,
    title: 'Pitch circuit 3',
    location: 'Bengaluru (shared upon confirmation)',
    date: 'Dec 12, 2024',
    time: '6:00 PM IST',
    image: pitchCircuit3,
    category: '',
    url: 'https://luma.com/qw2y0km8',
  },
];

export const MEDIA_GALLERY: MediaItem[] = [
  { id: 1, type: 'photo', url: DSC01204, caption: 'Pitch Circuit 1' },
  {
    id: 2,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=oHkt1SXEi7o',
    thumbnail: oHkt1SXEi7oHD,
    caption: 'How a College Dropout Hacked His Way to a $100M Company | Podcast',
  },
  { id: 3, type: 'photo', url: DSC02103, caption: 'Pitch Circuit 2' },
  { id: 4, type: 'photo', url: DSC02127, caption: 'Networking Session' },
  {
    id: 5,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=Q9_M4kfkj8Y',
    thumbnail: Q9_M4kfkj8YHD,
    caption: "Built STAN - A Gaming Founder's Wild Ride | Podcast",
  },
  { id: 6, type: 'photo', url: DSC01239, caption: 'Team Building' },
  {
    id: 7,
    type: 'video',
    url: 'https://www.youtube.com/watch?v=gyG6AJxlLOo',
    thumbnail: gyG6AJxlLOoHD,
    caption: 'Why You Should Start a Microgreens Business in India',
  },
];
