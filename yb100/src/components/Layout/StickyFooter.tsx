import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StickyFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center space-x-4">
        <Button variant="ghost" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/scroller">Scroller</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/">Tiles</Link>
        </Button>
      </div>
    </div>
  );
};

export default StickyFooter;
