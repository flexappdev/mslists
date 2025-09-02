
import { Button } from "@/components/ui/button";
import { Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-white">Siems Production</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-zinc-300 hover:text-orange-500 transition-colors font-medium">
              Top 100
            </a>
            <a href="#" className="text-zinc-300 hover:text-orange-500 transition-colors font-medium">
              Directors
            </a>
            <a href="#" className="text-zinc-300 hover:text-orange-500 transition-colors font-medium">
              Reviews
            </a>
            <a href="#" className="text-zinc-300 hover:text-orange-500 transition-colors font-medium">
              About
            </a>
            <ModeToggle />
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-zinc-800 rounded-lg mt-2">
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-orange-500 transition-colors">
                Top 100
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-orange-500 transition-colors">
                Directors
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-orange-500 transition-colors">
                Reviews
              </a>
              <a href="#" className="block px-3 py-2 text-zinc-300 hover:text-orange-500 transition-colors">
                About
              </a>
              <Button variant="outline" className="w-full mt-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Contact
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
