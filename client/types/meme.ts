export interface Meme {
  id: string;
  image: string;
  category: string;
  tags: string[];
  keywords: string[];
  created_at?: string;
};