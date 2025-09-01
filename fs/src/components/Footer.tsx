
import { Book, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-accent-500 p-2 rounded-lg">
                <Book className="h-6 w-6 text-accent-900" />
              </div>
              <span className="text-xl font-bold">Funky Success</span>
            </div>
            <p className="text-primary-100 leading-relaxed">
              Curating the world's most influential books and ideas to accelerate your journey to success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-primary-100">
              <li><a href="#books" className="hover:text-accent-400 transition-colors">Book List</a></li>
              <li><a href="#ideas" className="hover:text-accent-400 transition-colors">Ideas Hub</a></li>
              <li><a href="#collections" className="hover:text-accent-400 transition-colors">Collections</a></li>
              <li><a href="#about" className="hover:text-accent-400 transition-colors">About</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-primary-100">
              <li><a href="#" className="hover:text-accent-400 transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Psychology</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Productivity</a></li>
              <li><a href="#" className="hover:text-accent-400 transition-colors">Leadership</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-primary-100 mb-4">Get weekly book recommendations and insights.</p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 rounded-lg bg-primary-800 border border-primary-600 text-white placeholder-primary-300 focus:outline-none focus:border-accent-400"
              />
              <button className="bg-accent-500 text-accent-900 px-4 py-2 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-200 text-sm">
            © 2024 Funky Success. Built with passion for knowledge seekers.
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-primary-200 text-sm">Made with</span>
            <Star className="h-4 w-4 text-accent-400 fill-current" />
            <span className="text-primary-200 text-sm">for readers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
