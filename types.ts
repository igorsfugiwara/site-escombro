
export interface Album {
  id: string;
  title: string;
  year: string;
  cover: string;
  link: string;
}

export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  ticketLink: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
