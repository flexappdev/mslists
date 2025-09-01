
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Book } from 'lucide-react';

const featuredBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    rating: 4.8,
    summary: "Transform your life with tiny changes that compound into remarkable results.",
    keyTakeaway: "1% better every day leads to 37x improvement in a year",
    category: "Habits"
  },
  {
    id: 2,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    rating: 4.7,
    summary: "The timeless blueprint for achieving wealth and success through mindset.",
    keyTakeaway: "Whatever the mind can conceive and believe, it can achieve",
    category: "Mindset"
  },
  {
    id: 3,
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.6,
    summary: "Build successful businesses by learning what customers actually want.",
    keyTakeaway: "Build-Measure-Learn feedback loop accelerates innovation",
    category: "Business"
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    rating: 4.5,
    summary: "Master the skill of focused success in a distracted world.",
    keyTakeaway: "Deep work is becoming increasingly rare and valuable",
    category: "Productivity"
  }
];

const FeaturedBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Habits', 'Mindset', 'Business', 'Productivity'];

  const filteredBooks = selectedCategory === 'All' 
    ? featuredBooks 
    : featuredBooks.filter(book => book.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked titles that have transformed countless lives and careers
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-900 to-primary-600 text-white shadow-lg'
                  : 'border-primary-200 text-primary-900 hover:bg-primary-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <Card 
              key={book.id} 
              className="book-card-hover border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={book.cover} 
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-accent-600 fill-current" />
                  <span className="text-sm font-semibold">{book.rating}</span>
                </div>
                <div className="absolute top-4 left-4 bg-primary-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  {book.category}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{book.title}</h3>
                <p className="text-primary-600 font-medium mb-3">by {book.author}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{book.summary}</p>
                
                <div className="bg-accent-50 border-l-4 border-accent-400 p-3 mb-4">
                  <p className="text-sm font-medium text-accent-800">
                    💡 {book.keyTakeaway}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-primary-200 text-primary-900 hover:bg-primary-50"
                >
                  <Book className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary-900 to-primary-600 hover:from-primary-800 hover:to-primary-500 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Complete Book List
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
