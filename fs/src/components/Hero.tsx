
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-1 bg-accent/20 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-accent-600 fill-current" />
                <span className="text-sm font-medium text-accent-800">Curated Knowledge Hub</span>
                <Star className="h-4 w-4 text-accent-600 fill-current" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              Unlock Success Through 
              <span className="block text-accent-600">Books & Big Ideas</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover influential non-fiction books and transformative concepts that successful entrepreneurs, creators, and thought leaders swear by.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary-900 to-primary-600 hover:from-primary-800 hover:to-primary-500 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore the Book List
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary-200 text-primary-900 hover:bg-primary-50 text-lg px-8 py-4 rounded-xl"
              >
                Start With Top Picks
              </Button>
            </div>
            
            <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">500+</div>
                <div>Curated Books</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">50+</div>
                <div>Big Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-900">10K+</div>
                <div>Knowledge Seekers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
