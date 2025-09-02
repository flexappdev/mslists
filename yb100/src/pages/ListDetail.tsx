
import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, TrendingUp, Calendar, User } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { sampleLists, TopList, ListItem } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ListDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [list, setList] = useState<TopList | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const foundList = sampleLists.find(l => l.slug === slug);
    setTimeout(() => {
      setList(foundList || null);
      setLoading(false);
    }, 500);
  }, [slug]);

  useEffect(() => {
    if (!list) return;
    const itemId = searchParams.get('item');
    if (itemId) {
      const el = document.getElementById(itemId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [list, searchParams]);

  const handleVote = (itemId: string) => {
    if (!list) return;

    const updatedItems = list.items.map(item => {
      if (item.id === itemId) {
        const hasVoted = item.hasVoted;
        return {
          ...item,
          votes: hasVoted ? item.votes - 1 : item.votes + 1,
          hasVoted: !hasVoted
        };
      }
      return item;
    });

    setList({
      ...list,
      items: updatedItems,
      totalVotes: list.totalVotes + (list.items.find(i => i.id === itemId)?.hasVoted ? -1 : 1)
    });

    toast({
      title: list.items.find(i => i.id === itemId)?.hasVoted ? "Vote removed" : "Vote added",
      description: `Your vote for "${list.items.find(i => i.id === itemId)?.title}" has been recorded.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The list URL has been copied to your clipboard.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List Not Found</h1>
          <p className="text-neutral-muted mb-8">The list you're looking for doesn't exist.</p>
          <Button asChild className="btn-primary">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lists</span>
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img 
            src={list.coverImage} 
            alt={list.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {list.category}
              </Badge>
              {list.featured && (
                <Badge className="bg-brand-aqua text-white">Featured</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{list.title}</h1>
            <p className="text-lg opacity-90 mb-4">{list.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {list.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(list.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {list.totalVotes.toLocaleString()} votes
                </div>
              </div>
              
              <Button 
                onClick={handleShare}
                variant="secondary" 
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* List Items */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Top 100</h2>
          
          {list.items.map((item, index) => (
            <ListItemCard 
              key={item.id} 
              item={item} 
              onVote={() => handleVote(item.id)}
            />
          ))}
          
          {/* Load More Placeholder */}
          {list.items.length < 100 && (
            <div className="text-center py-8">
              <Button variant="outline" className="btn-secondary">
                Load More Items
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ListItemCard = ({ item, onVote }: { item: ListItem; onVote: () => void }) => {
  return (
    <div id={item.id} className="bg-white rounded-xl card-shadow p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Rank */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center font-bold text-lg">
            {item.rank}
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-neutral-muted mb-4">
            {item.description}
          </p>
          
          {/* Vote Button */}
          <Button
            onClick={onVote}
            variant={item.hasVoted ? "default" : "outline"}
            size="sm"
            className={`flex items-center space-x-2 ${
              item.hasVoted 
                ? "bg-brand-aqua text-white hover:bg-brand-aqua/90" 
                : "btn-secondary"
            }`}
          >
            <Heart className={`w-4 h-4 ${item.hasVoted ? "fill-current" : ""}`} />
            <span>{item.votes.toLocaleString()}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
