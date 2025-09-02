import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { sampleLists } from '@/data/sampleData';

const Scroller = () => {
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sampleLists.length);
    const el = itemRefs.current[randomIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const getRandomItemLink = (slug: string) => {
    const list = sampleLists.find(l => l.slug === slug);
    if (!list || list.items.length === 0) return `/lists/${slug}`;
    const randomItem = list.items[Math.floor(Math.random() * list.items.length)];
    return `/lists/${slug}?item=${randomItem.id}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {sampleLists.map((list, index) => (
          <div
            key={list.id}
            ref={el => {
              if (el) itemRefs.current[index] = el;
            }}
            className="bg-white dark:bg-gray-800 rounded-xl card-shadow p-4 hover:shadow-md transition-shadow"
          >
            <Link to={getRandomItemLink(list.slug)} className="text-xl font-semibold">
              {list.title}
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Scroller;
