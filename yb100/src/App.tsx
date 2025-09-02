
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ListDetail from "./pages/ListDetail";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import CreateList from "./pages/CreateList";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Scroller from "./pages/Scroller";
import StickyFooter from "@/components/Layout/StickyFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lists/:slug" element={<ListDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create" element={<CreateList />} />
          <Route path="/about" element={<About />} />
          <Route path="/scroller" element={<Scroller />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <StickyFooter />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
