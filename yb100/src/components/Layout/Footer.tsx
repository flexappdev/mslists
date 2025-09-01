
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-section border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">100</span>
              </div>
              <span className="text-xl font-bold brand-primary">YourBest100</span>
            </div>
            <p className="text-neutral-muted mb-4">
              The definitive platform for top-100 lists. Discover, vote, and create 
              the best lists on any topic.
            </p>
            <p className="text-sm text-neutral-muted">
              © 2024 YourBest100. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Featured Lists
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Create List
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-muted hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
