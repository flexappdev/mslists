import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="text-2xl">🎄</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-christmas-red to-christmas-green bg-clip-text text-transparent">
            XMAS Best Sellers
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </a>
          <a href="#products" className="text-foreground hover:text-primary transition-colors">
            Products
          </a>
          <a href="#deals" className="text-foreground hover:text-primary transition-colors">
            Deals
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            🛒 Cart
          </Button>
          <Button variant="christmas" size="sm">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;