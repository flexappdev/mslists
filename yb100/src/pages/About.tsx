import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">About YourBest100</h1>
        <p className="text-neutral-muted mb-4">
          YourBest100 is a community-driven platform for discovering and sharing top-100 lists on any topic. Explore curated lists, vote on your favorites and create your own rankings.
        </p>
        <p className="text-neutral-muted">
          This project is built with modern web technologies and aims to provide a fun, engaging experience for list lovers everywhere.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
