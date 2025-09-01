const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🎄</div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-christmas-pink to-christmas-red bg-clip-text text-transparent">
                XMAS Best Sellers
              </h3>
            </div>
            <p className="text-muted-foreground">
              Discover the most popular Christmas gifts and trending products of 2025.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Christmas Gifts</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Books</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Entertainment</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 XMAS Best Sellers. All rights reserved. Made with ❤️ for the holidays.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;