import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SuccessStory, NewsUpdate, Event, FeaturedAlumni } from '../../types';

interface ContentState {
  successStories: SuccessStory[];
  newsUpdates: NewsUpdate[];
  upcomingEvents: Event[];
  featuredAlumni: FeaturedAlumni[];
  loading: boolean;
}

const initialState: ContentState = {
  successStories: [
    {
      id: '1',
      alumni: {
        id: 'a1',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        role: 'alumni',
        verified: true,
        company: 'Google',
        position: 'Senior Software Engineer',
        graduationYear: 2019,
        department: 'Computer Science',
        experience: 5,
        skills: ['React', 'Python', 'Machine Learning'],
        employed: true,
      },
      title: 'From Campus to Silicon Valley',
      story: 'After graduating in 2019, I joined a startup and eventually landed my dream job at Google. The mentorship from our alumni network was invaluable.',
      achievements: ['Promoted twice in 3 years', 'Led team of 8 developers', 'Published 3 research papers'],
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      alumni: {
        id: 'a2',
        name: 'Michael Rodriguez',
        email: 'michael@example.com',
        role: 'alumni',
        verified: true,
        company: 'Microsoft',
        position: 'Product Manager',
        graduationYear: 2018,
        department: 'Business Administration',
        experience: 6,
        skills: ['Product Strategy', 'Analytics', 'Leadership'],
        employed: true,
      },
      title: 'Building Products That Matter',
      story: 'My journey from a business student to a product manager at Microsoft has been incredible. The alumni connections opened doors I never imagined.',
      achievements: ['Launched 2 major products', 'Managed $50M budget', 'Team of 15 professionals'],
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ],
  newsUpdates: [
    {
      id: '1',
      title: 'Record Breaking Placement Season 2024',
      content: 'Our college achieved 95% placement rate with average package of $85,000. Top companies including Google, Microsoft, and Amazon participated.',
      date: '2024-01-20',
      category: 'placement',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      title: 'Alumni Entrepreneurship Summit 2024',
      content: 'Join us for the biggest alumni gathering featuring successful entrepreneurs sharing their startup journeys and investment insights.',
      date: '2024-01-18',
      category: 'event',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '3',
      title: 'New Mentorship Program Launch',
      content: 'We are excited to announce our structured 1-on-1 mentorship program connecting current students with industry professionals.',
      date: '2024-01-15',
      category: 'announcement',
      image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ],
  upcomingEvents: [
    {
      id: '1',
      title: 'AI and Machine Learning Career Workshop',
      description: 'Learn about the latest trends in AI/ML and career opportunities from industry experts.',
      date: '2024-02-15',
      time: '2:00 PM EST',
      type: 'webinar',
      speaker: 'Dr. Jane Smith, AI Research Lead at Meta',
      registrationRequired: true,
      maxParticipants: 500,
      currentParticipants: 234,
    },
    {
      id: '2',
      title: 'Resume Building & Interview Prep',
      description: 'Interactive session on crafting compelling resumes and acing technical interviews.',
      date: '2024-02-20',
      time: '4:00 PM EST',
      type: 'training',
      speaker: 'Alumni Panel from FAANG Companies',
      registrationRequired: true,
      maxParticipants: 200,
      currentParticipants: 156,
    },
    {
      id: '3',
      title: 'Virtual Career Fair 2024',
      description: 'Connect with 50+ companies actively hiring fresh graduates and experienced professionals.',
      date: '2024-02-25',
      time: '10:00 AM EST',
      type: 'career_fair',
      registrationRequired: true,
      maxParticipants: 1000,
      currentParticipants: 678,
    },
  ],
  featuredAlumni: [
    {
      id: '1',
      name: 'David Thompson',
      company: 'Tesla',
      position: 'Lead Engineer',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600',
      quote: 'The foundation I built here opened doors to innovations in sustainable technology.',
      achievements: ['12 Patents Filed', 'Led Autopilot Team', '$2M Cost Savings'],
      graduationYear: 2017,
    },
    {
      id: '2',
      name: 'Priya Patel',
      company: 'Goldman Sachs',
      position: 'VP Investment Banking',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      quote: 'From classroom theories to Wall Street realities - this journey has been transformational.',
      achievements: ['$500M Deals Closed', 'Forbes 30 Under 30', 'Team Leader of Year'],
      graduationYear: 2016,
    },
    {
      id: '3',
      name: 'James Wilson',
      company: 'Founder, TechStart',
      position: 'CEO',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      quote: 'The entrepreneurial spirit fostered here led to building a $50M company.',
      achievements: ['$50M Valuation', '200+ Employees', 'Series B Funding'],
      graduationYear: 2015,
    },
  ],
  loading: false,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSuccessStories: (state, action: PayloadAction<SuccessStory[]>) => {
      state.successStories = action.payload;
    },
    setNewsUpdates: (state, action: PayloadAction<NewsUpdate[]>) => {
      state.newsUpdates = action.payload;
    },
    setUpcomingEvents: (state, action: PayloadAction<Event[]>) => {
      state.upcomingEvents = action.payload;
    },
    setFeaturedAlumni: (state, action: PayloadAction<FeaturedAlumni[]>) => {
      state.featuredAlumni = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSuccessStories, setNewsUpdates, setUpcomingEvents, setFeaturedAlumni, setLoading } = contentSlice.actions;
export default contentSlice.reducer;