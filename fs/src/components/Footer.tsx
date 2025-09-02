import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const handleRandom = () => {
    const links = document.querySelectorAll('#right-sidebar a');
    if (links.length) {
      const target = links[Math.floor(Math.random() * links.length)] as HTMLElement;
      target.click();
    }
  };

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background">
      <div className="container flex h-14 items-center justify-center gap-4 text-sm">
        <Button variant="link" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="link" onClick={handleRandom}>Random</Button>
      </div>
    </footer>
  );
};

export default Footer;
