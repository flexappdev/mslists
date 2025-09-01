
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599511880-8dfe8de8fb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 mb-4">
            <Star className="w-4 h-4 mr-1" />
            Curated Cinema
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Top Movies, Shows, and
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            {" "}Media Makers
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover cinema's finest through expertly curated lists, director spotlights, and insightful reviews.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg group">
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Explore the Top 100
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-zinc-900 px-8 py-6 text-lg">
            Browse Directors
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
