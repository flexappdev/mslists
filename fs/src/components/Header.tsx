import { Link } from "react-router-dom";
import { Book, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6" />
          <span className="font-bold">Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings" aria-label="Account settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
