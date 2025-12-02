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
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  category: string;
  url: string;
}

export interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  caption: string;
}