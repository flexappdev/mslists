
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Film, Star, Users, Award } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeaturedGrid from "@/components/FeaturedGrid";
import StatsSection from "@/components/StatsSection";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturedGrid />
      
      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-zinc-800 to-zinc-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Next Favorite Film?</h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Join thousands of film lovers exploring curated collections of cinema's finest works.
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
            Explore the Top 100
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
