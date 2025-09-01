
import { useState } from 'react';
import { Book, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary-900 to-primary-600 p-2 rounded-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Funky Success</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-900 transition-colors font-medium">
              Home
            </a>
            <a href="#books" className="text-gray-700 hover:text-primary-900 transition-colors font-medium">
              Book List
            </a>
            <a href="#ideas" className="text-gray-700 hover:text-primary-900 transition-colors font-medium">
              Ideas Hub
            </a>
            <a href="#collections" className="text-gray-700 hover:text-primary-900 transition-colors font-medium">
              Collections
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-900 transition-colors font-medium">
              About
            </a>
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-gray-300">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="bg-gradient-to-r from-primary-900 to-primary-600 hover:from-primary-800 hover:to-primary-500">
              Start Reading
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="block w-full h-0.5 bg-gray-600"></span>
              <span className="block w-full h-0.5 bg-gray-600"></span>
              <span className="block w-full h-0.5 bg-gray-600"></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-primary-900 px-4 py-2">Home</a>
              <a href="#books" className="text-gray-700 hover:text-primary-900 px-4 py-2">Book List</a>
              <a href="#ideas" className="text-gray-700 hover:text-primary-900 px-4 py-2">Ideas Hub</a>
              <a href="#collections" className="text-gray-700 hover:text-primary-900 px-4 py-2">Collections</a>
              <a href="#about" className="text-gray-700 hover:text-primary-900 px-4 py-2">About</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
