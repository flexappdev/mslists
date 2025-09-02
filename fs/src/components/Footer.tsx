import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background">
      <div className="container flex h-14 items-center justify-center gap-4 text-sm">
        <Button variant="link" asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button variant="link" onClick={() => navigate("/feed")}>Scroller</Button>
        <Button variant="link" asChild>
          <Link to="/">Tiles</Link>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
