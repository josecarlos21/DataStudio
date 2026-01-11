export interface Event {
  id: string;
  location: string;
  title: string;
  tag?: string;
  track: 'community' | 'beefdip' | 'vip' | 'social';
  isFeatured?: boolean;
  progress?: number; 
  dress?: string;
  color?: string;
  image?: string;
  description?: string;
  start: string;
  end?: string;
  speaker?: {
    name: string;
    imageUrl: string;
  };
}

export interface UserNearby {
  id: number;
  name: string;
  age: number;
  dist: string;
  img: string;
  online: boolean;
}

export interface DistrictMoment {
  id: string;
  type: 'tip' | 'moment' | 'info';
  title: string;
  content: string;
  img: string;
}