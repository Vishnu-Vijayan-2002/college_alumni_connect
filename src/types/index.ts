export interface User {
  id: string;
  name: string;
  email: string;
  role: 'alumni' | 'student' | 'placement_cell' | 'chapter_head' | 'admin';
  verified: boolean;
  profileImage?: string;
}

export interface AlumniProfile extends User {
  role: 'alumni';
  company: string;
  position: string;
  graduationYear: number;
  department: string;
  experience: number;
  skills: string[];
  employed: boolean;
}

export interface SuccessStory {
  id: string;
  alumni: AlumniProfile;
  title: string;
  story: string;
  achievements: string[];
  date: string;
  image?: string;
}

export interface NewsUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'placement' | 'event' | 'achievement' | 'announcement';
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'webinar' | 'training' | 'networking' | 'career_fair';
  speaker?: string;
  registrationRequired: boolean;
  maxParticipants?: number;
  currentParticipants: number;
}

export interface FeaturedAlumni {
  id: string;
  name: string;
  company: string;
  position: string;
  image: string;
  quote: string;
  achievements: string[];
  graduationYear: number;
}