
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Book } from 'lucide-react';

const ideas = [
  {
    id: 1,
    title: "The Compound Effect",
    description: "Small, consistent actions create massive results over time. Success isn't about grand gestures—it's about daily habits.",
    books: ["Atomic Habits", "The Slight Edge", "The 7 Habits"],
    tags: ["Habits", "Growth", "Consistency"],
    icon: "📈"
  },
  {
    id: 2,
    title: "Systems Thinking",
    description: "Focus on building systems rather than setting goals. Systems are what create sustainable, long-term success.",
    books: ["Atomic Habits", "The Lean Startup", "Good Strategy Bad Strategy"],
    tags: ["Strategy", "Process", "Mindset"],
    icon: "⚙️"
  },
  {
    id: 3,
    title: "Deep Work Philosophy",
    description: "The ability to focus without distraction is becoming increasingly rare—and therefore increasingly valuable.",
    books: ["Deep Work", "Cal Newport", "Digital Minimalism"],
    tags: ["Focus", "Productivity", "Technology"],
    icon: "🎯"
  },
  {
    id: 4,
    title: "Growth Mindset",
    description: "Believing that abilities can be developed through dedication and hard work creates a love of learning and resilience.",
    books: ["Mindset", "Grit", "The Power of Yet"],
    tags: ["Psychology", "Learning", "Resilience"],
    icon: "🧠"
  },
  {
    id: 5,
    title: "Network Effects",
    description: "Your network is your net worth. Strategic relationship building accelerates every aspect of success.",
    books: ["Never Eat Alone", "The Tipping Point", "Influence"],
    tags: ["Networking", "Relationships", "Influence"],
    icon: "🤝"
  },
  {
    id: 6,
    title: "The 80/20 Principle",
    description: "80% of results come from 20% of efforts. Identifying and focusing on high-impact activities transforms productivity.",
    books: ["The 80/20 Principle", "Essentialism", "The ONE Thing"],
    tags: ["Productivity", "Focus", "Efficiency"],
    icon: "⭐"
  }
];

const IdeasHub = () => {
  return (
    <section id="ideas" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Ideas Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Big concepts and breakthrough insights extracted from the world's most influential books
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea, index) => (
            <Card 
              key={idea.id} 
              className="hover-lift border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{idea.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{idea.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{idea.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-primary-900 mb-2">Featured in:</p>
                  <div className="flex flex-wrap gap-1">
                    {idea.books.slice(0, 2).map((book, idx) => (
                      <span key={idx} className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                        <Book className="h-3 w-3 inline mr-1" />
                        {book}
                      </span>
                    ))}
                    {idea.books.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{idea.books.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-accent-100 text-accent-800 px-2 py-1 rounded-full font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-primary-200 text-primary-900 hover:bg-primary-50"
                >
                  Explore This Idea
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-accent-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Browse All Ideas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IdeasHub;
