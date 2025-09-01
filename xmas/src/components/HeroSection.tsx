import { Button } from "@/components/ui/button";
import christmasHero from "@/assets/christmas-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] bg-gradient-to-br from-primary/95 to-secondary/95 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${christmasHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Top 100 Best Sellers
            <span className="block text-christmas-pink">of 2025</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Discover the most popular Christmas gifts and trending products across all categories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="christmas" size="lg" className="text-lg px-8 py-6">
              Explore Best Sellers
            </Button>
            <Button variant="winter" size="lg" className="text-lg px-8 py-6">
              View Gift Guides
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-christmas-pink/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-winter-blue/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-christmas-red/20 rounded-full blur-lg animate-pulse" />
    </section>
  );
};

export default HeroSection;