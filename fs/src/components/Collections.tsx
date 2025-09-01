
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Book, Star as StarIcon } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: "Books That Changed My Career",
    description: "The essential reads that transformed how I think about work, leadership, and professional growth.",
    bookCount: 12,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    featured: true,
    tags: ["Career", "Leadership", "Professional Growth"]
  },
  {
    id: 2,
    title: "Top Reads of 2024",
    description: "This year's standout books that are shaping conversations in business and personal development.",
    bookCount: 8,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
    featured: false,
    tags: ["New Releases", "Trending", "2024"]
  },
  {
    id: 3,
    title: "The Entrepreneur's Library",
    description: "Must-read books for anyone building a business, from startup fundamentals to scaling strategies.",
    bookCount: 15,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600",
    featured: true,
    tags: ["Entrepreneurship", "Business", "Startups"]
  },
  {
    id: 4,
    title: "Psychology of Success",
    description: "Dive deep into the mental models and psychological principles that drive achievement.",
    bookCount: 10,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
    featured: false,
    tags: ["Psychology", "Mindset", "Mental Models"]
  }
];

const Collections = () => {
  return (
    <section id="collections" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Curated Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Themed book lists carefully assembled to accelerate your learning in specific areas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <Card 
              key={collection.id} 
              className="book-card-hover border-0 shadow-lg overflow-hidden relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {collection.featured && (
                <div className="absolute top-4 left-4 z-10 bg-accent-500 text-accent-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <StarIcon className="h-3 w-3 fill-current" />
                  <span>FEATURED</span>
                </div>
              )}
              
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Book className="h-4 w-4 text-primary-900" />
                  <span className="text-sm font-semibold text-primary-900">{collection.bookCount} books</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{collection.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{collection.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {collection.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary-900 to-primary-600 hover:from-primary-800 hover:to-primary-500"
                  >
                    View Collection
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary-200 text-primary-900 hover:bg-primary-50"
                  >
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary-200 text-primary-900 hover:bg-primary-50 px-8 py-4 rounded-xl"
          >
            Browse All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Collections;
