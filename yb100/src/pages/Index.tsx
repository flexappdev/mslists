
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, Calendar, Users } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { sampleLists, categories, TopList } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [filteredLists, setFilteredLists] = useState<TopList[]>(sampleLists);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = sampleLists;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(list => list.category === selectedCategory);
    }

    // Filter by search query (with debounce effect)
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        filtered = filtered.filter(list => 
          list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          list.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLists(filtered);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredLists(filtered);
    }
  }, [selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const featuredLists = filteredLists.filter(list => list.featured);
  const regularLists = filteredLists.filter(list => !list.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold brand-primary mb-6">
            Discover the Best of Everything
          </h1>
          <p className="text-xl text-neutral-muted mb-8 max-w-3xl mx-auto">
            Explore curated top-100 lists, vote on your favorites, and create your own rankings. 
            Join the community that celebrates the best in every category.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link to="/create">Create Your List</Link>
            </Button>
            <Button variant="outline" className="btn-secondary">
              Explore Featured Lists
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="mb-2"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Lists */}
        {featuredLists.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="w-6 h-6 brand-aqua mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Lists</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLists.map(list => (
                <ListCard key={list.id} list={list} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Lists */}
        <section>
          <div className="flex items-center mb-8">
            <Heart className="w-6 h-6 brand-secondary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">All Lists</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularLists.map(list => (
              <ListCard key={list.id} list={list} />
            ))}
          </div>
        </section>

        {/* Empty State */}
        {filteredLists.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No lists found</h3>
            <p className="text-neutral-muted mb-8">
              Try adjusting your search or category filter to find what you're looking for.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/create">Create the First List</Link>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

const ListCard = ({ list, featured = false }: { list: TopList; featured?: boolean }) => {
  return (
    <Link 
      to={`/lists/${list.slug}`}
      className="group block bg-white rounded-xl card-shadow hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="relative">
        <img 
          src={list.coverImage} 
          alt={list.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-brand-aqua text-white">
            Featured
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-4 right-4">
          {list.category}
        </Badge>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:brand-primary transition-colors">
          {list.title}
        </h3>
        <p className="text-neutral-muted mb-4 line-clamp-2">
          {list.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-neutral-muted">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {list.totalVotes.toLocaleString()}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(list.createdAt).toLocaleDateString()}
            </div>
          </div>
          <span className="font-medium">by {list.author}</span>
        </div>
      </div>
    </Link>
  );
};

export default Index;
