
export interface ListItem {
  id: string;
  rank: number;
  title: string;
  description: string;
  imageUrl: string;
  votes: number;
  hasVoted?: boolean;
}

export interface TopList {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  author: string;
  createdAt: string;
  totalVotes: number;
  items: ListItem[];
  featured?: boolean;
}

export const categories = [
  "Movies & TV",
  "Music", 
  "Books",
  "Technology",
  "Travel",
  "Food & Drink",
  "Sports",
  "Gaming",
  "Art & Culture",
  "Science"
];

export const sampleLists: TopList[] = [
  {
    id: "1",
    slug: "best-sci-fi-movies-all-time",
    title: "Best Sci-Fi Movies of All Time",
    description: "The definitive ranking of science fiction cinema that shaped the genre and influenced generations of filmmakers.",
    category: "Movies & TV",
    coverImage: "https://images.unsplash.com/photo-1489599749137-b5e0f4e87f5e?w=800&h=400&fit=crop",
    author: "Cinema Expert",
    createdAt: "2024-01-15",
    totalVotes: 15420,
    featured: true,
    items: [
      {
        id: "1-1",
        rank: 1,
        title: "Blade Runner 2049",
        description: "Denis Villeneuve's masterful sequel that expands the original's themes with stunning visuals.",
        imageUrl: "https://images.unsplash.com/photo-1489599749137-b5e0f4e87f5e?w=200&h=200&fit=crop",
        votes: 3240,
        hasVoted: false
      },
      {
        id: "1-2", 
        rank: 2,
        title: "The Matrix",
        description: "Revolutionary cyberpunk film that redefined action cinema and philosophical sci-fi.",
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop",
        votes: 3180,
        hasVoted: true
      },
      {
        id: "1-3",
        rank: 3,
        title: "Interstellar", 
        description: "Christopher Nolan's epic journey through space, time, and human emotion.",
        imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=200&fit=crop",
        votes: 2950,
        hasVoted: false
      }
    ]
  },
  {
    id: "2",
    slug: "greatest-albums-21st-century",
    title: "Greatest Albums of the 21st Century",
    description: "The albums that defined modern music and will be remembered for generations to come.",
    category: "Music",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    author: "Music Critic",
    createdAt: "2024-01-12",
    totalVotes: 12350,
    featured: true,
    items: [
      {
        id: "2-1",
        rank: 1,
        title: "Kid A - Radiohead",
        description: "Groundbreaking experimental rock that influenced electronic music forever.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
        votes: 2890,
        hasVoted: false
      },
      {
        id: "2-2",
        rank: 2,
        title: "The Blueprint - Jay-Z",
        description: "Hip-hop perfection that established Jay-Z as one of the greatest of all time.",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop",
        votes: 2650,
        hasVoted: false
      }
    ]
  },
  {
    id: "3",
    slug: "must-read-books-2024",
    title: "Must-Read Books of 2024",
    description: "The year's most compelling reads across fiction, non-fiction, and poetry.",
    category: "Books", 
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    author: "Literary Review",
    createdAt: "2024-01-10",
    totalVotes: 8920,
    featured: false,
    items: [
      {
        id: "3-1",
        rank: 1,
        title: "Fourth Wing",
        description: "Fantasy romance that took the world by storm with dragons and drama.",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
        votes: 1840,
        hasVoted: false
      }
    ]
  },
  {
    id: "4",
    slug: "revolutionary-tech-innovations",
    title: "Revolutionary Tech Innovations",
    description: "Technologies that changed how we live, work, and connect with each other.",
    category: "Technology",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    author: "Tech Analyst",
    createdAt: "2024-01-08",
    totalVotes: 11250,
    featured: true,
    items: [
      {
        id: "4-1",
        rank: 1,
        title: "ChatGPT & Large Language Models",
        description: "AI that can understand and generate human-like text, revolutionizing communication.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
        votes: 3420,
        hasVoted: false
      }
    ]
  }
];
