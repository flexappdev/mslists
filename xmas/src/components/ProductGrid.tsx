import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock product data for demonstration
const mockProducts = {
  xmas: [
    { id: 1, name: "Premium Christmas Tree", price: "$299.99", rating: 4.8, category: "Decorations", discount: "25% OFF", image: "🎄" },
    { id: 2, name: "Luxury Gift Set", price: "$149.99", rating: 4.9, category: "Gifts", discount: "30% OFF", image: "🎁" },
    { id: 3, name: "Christmas Lights Bundle", price: "$79.99", rating: 4.7, category: "Decorations", discount: "20% OFF", image: "✨" },
    { id: 4, name: "Holiday Cookie Kit", price: "$39.99", rating: 4.6, category: "Food & Treats", discount: "15% OFF", image: "🍪" },
    { id: 5, name: "Festive Wreath", price: "$89.99", rating: 4.8, category: "Decorations", discount: "35% OFF", image: "🎀" },
    { id: 6, name: "Christmas Ornament Set", price: "$59.99", rating: 4.7, category: "Decorations", discount: "40% OFF", image: "🎄" },
  ],
  bestsellers: [
    { id: 1, name: "Wireless Headphones", price: "$199.99", rating: 4.9, category: "Electronics", discount: "50% OFF", image: "🎧" },
    { id: 2, name: "Smart Watch", price: "$299.99", rating: 4.8, category: "Electronics", discount: "30% OFF", image: "⌚" },
    { id: 3, name: "Coffee Maker", price: "$129.99", rating: 4.7, category: "Home & Kitchen", discount: "25% OFF", image: "☕" },
    { id: 4, name: "Yoga Mat", price: "$49.99", rating: 4.6, category: "Sports & Fitness", discount: "20% OFF", image: "🧘" },
  ],
  books: [
    { id: 1, name: "The Psychology of Money", price: "$24.99", rating: 4.9, category: "Business", discount: "15% OFF", image: "📚" },
    { id: 2, name: "Atomic Habits", price: "$19.99", rating: 4.8, category: "Self-Help", discount: "20% OFF", image: "📖" },
    { id: 3, name: "The Silent Patient", price: "$16.99", rating: 4.7, category: "Thriller", discount: "25% OFF", image: "📘" },
    { id: 4, name: "Dune", price: "$22.99", rating: 4.8, category: "Sci-Fi", discount: "10% OFF", image: "📗" },
  ],
  primevideo: [
    { id: 1, name: "The Boys Season 4", price: "Prime", rating: 4.9, category: "Action", discount: "NEW", image: "🎬" },
    { id: 2, name: "The Rings of Power", price: "Prime", rating: 4.7, category: "Fantasy", discount: "TRENDING", image: "🎭" },
    { id: 3, name: "Jack Ryan", price: "Prime", rating: 4.8, category: "Thriller", discount: "POPULAR", image: "🎪" },
    { id: 4, name: "The Marvelous Mrs. Maisel", price: "Prime", rating: 4.9, category: "Comedy", discount: "AWARD WINNER", image: "🎨" },
  ],
  songs: [
    { id: 1, name: "Flowers - Miley Cyrus", price: "$1.29", rating: 4.8, category: "Pop", discount: "TOP CHART", image: "🎵" },
    { id: 2, name: "Anti-Hero - Taylor Swift", price: "$1.29", rating: 4.9, category: "Pop", discount: "#1 HIT", image: "🎶" },
    { id: 3, name: "As It Was - Harry Styles", price: "$1.29", rating: 4.7, category: "Pop", discount: "VIRAL", image: "🎤" },
    { id: 4, name: "Running Up That Hill - Kate Bush", price: "$1.29", rating: 4.8, category: "Rock", discount: "CLASSIC", image: "🎸" },
  ],
  albums: [
    { id: 1, name: "Midnights - Taylor Swift", price: "$12.99", rating: 4.9, category: "Pop", discount: "ALBUM OF THE YEAR", image: "💿" },
    { id: 2, name: "Renaissance - Beyoncé", price: "$11.99", rating: 4.8, category: "R&B", discount: "GRAMMY WINNER", image: "🎼" },
    { id: 3, name: "Harry's House - Harry Styles", price: "$10.99", rating: 4.7, category: "Pop", discount: "PLATINUM", image: "🎹" },
    { id: 4, name: "Un Verano Sin Ti - Bad Bunny", price: "$13.99", rating: 4.8, category: "Reggaeton", discount: "GLOBAL HIT", image: "🎺" },
  ],
  apps: [
    { id: 1, name: "ChatGPT", price: "Free", rating: 4.9, category: "Productivity", discount: "AI POWERED", image: "🤖" },
    { id: 2, name: "Genshin Impact", price: "Free", rating: 4.8, category: "Gaming", discount: "MOST POPULAR", image: "🎮" },
    { id: 3, name: "TikTok", price: "Free", rating: 4.7, category: "Social", discount: "TRENDING", image: "📱" },
    { id: 4, name: "BeReal", price: "Free", rating: 4.6, category: "Social", discount: "RISING STAR", image: "📸" },
  ],
};

interface ProductGridProps {
  category: string;
}

const ProductGrid = ({ category }: ProductGridProps) => {
  const products = mockProducts[category as keyof typeof mockProducts] || mockProducts.xmas;

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            Featured Products
          </h2>
          <Button variant="outline" size="lg">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <Badge variant="secondary" className="mb-2 bg-christmas-gold text-white">
                  {product.discount}
                </Badge>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {product.category} • ⭐ {product.rating}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                </div>
                <Button variant="christmas" className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;