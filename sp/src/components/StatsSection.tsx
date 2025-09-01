
import { Film, Users, Award, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Film,
      number: "500+",
      label: "Curated Films",
      description: "Handpicked classics and modern masterpieces"
    },
    {
      icon: Users,
      number: "100+",
      label: "Featured Directors",
      description: "From legendary auteurs to rising talents"
    },
    {
      icon: Award,
      number: "50+",
      label: "Award Winners",
      description: "Oscar, Cannes, and festival champions"
    },
    {
      icon: Star,
      number: "25+",
      label: "Top Lists",
      description: "Genre-specific and decade collections"
    }
  ];

  return (
    <section className="py-20 bg-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Cinema at Your Fingertips</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Explore our carefully curated collection of films, directors, and cinematic insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4 group-hover:bg-orange-500/30 transition-colors">
                <stat.icon className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-zinc-300 mb-2">{stat.label}</div>
              <div className="text-sm text-zinc-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
