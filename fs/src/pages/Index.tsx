
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedBooks from '@/components/FeaturedBooks';
import IdeasHub from '@/components/IdeasHub';
import Collections from '@/components/Collections';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedBooks />
      <IdeasHub />
      <Collections />
      <Footer />
    </div>
  );
};

export default Index;
