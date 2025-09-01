
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Clock } from "lucide-react";

const FeaturedGrid = () => {
  const featuredContent = [
    {
      type: "Director Spotlight",
      title: "Christopher Nolan",
      subtitle: "Master of Time and Space",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Featured Director",
      rating: "9.2"
    },
    {
      type: "Top List",
      title: "Best Sci-Fi Films of All Time",
      subtitle: "25 Mind-Bending Masterpieces",
      image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Curated List",
      rating: "8.8"
    },
    {
      type: "Review",
      title: "Dune: A Visual Masterpiece",
      subtitle: "Denis Villeneuve's Epic Adaptation",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Latest Review",
      rating: "8.5"
    }
  ];

  return (
    <section className="py-20 px-4 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Content</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Discover our latest director spotlights, curated lists, and in-depth reviews.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredContent.map((content, index) => (
            <Card 
              key={index} 
              className="bg-zinc-800 border-zinc-700 overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="relative">
                <img 
                  src={content.image} 
                  alt={content.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                    {content.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-black/60 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{content.rating}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
                    {content.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {content.title}
                </h3>
                <p className="text-zinc-400 mb-4">{content.subtitle}</p>
                <Button 
                  variant="ghost" 
                  className="text-orange-500 hover:text-white hover:bg-orange-500 p-0 h-auto font-medium"
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Categories Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Classic Cinema", count: "150+ films" },
            { name: "Modern Masterpieces", count: "100+ films" },
            { name: "International Cinema", count: "80+ films" },
            { name: "Documentary Features", count: "50+ films" }
          ].map((category, index) => (
            <Card 
              key={index}
              className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {category.name}
                </h4>
                <p className="text-sm text-zinc-400">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;
