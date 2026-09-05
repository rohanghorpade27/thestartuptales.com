import { LucideIcon } from 'lucide-react';

export interface StatItem {
  id: number;
  value: string;
  label: string;
  description?: string;
}

export interface ProgramItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface EventItem {
  id: number;
  "event name": string;
  host: string;
  "date and time": string;
  venue: string;
  "registration link": string;
  "image url": string;
  city?: string;
  coords?: [number, number];
  isTBA?: boolean;
}

export interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
}