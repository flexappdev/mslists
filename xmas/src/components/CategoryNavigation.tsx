import { Button } from "@/components/ui/button";

const categories = [
  { 
    id: "xmas", 
    title: "Top 100 Xmas", 
    description: "Discover the Best Sellers Top 100 Xmas of 2025",
    gradient: "from-christmas-pink to-christmas-red"
  },
  { 
    id: "bestsellers", 
    title: "Best Sellers", 
    description: "Discover the Best Sellers of 2025: The most popular items",
    gradient: "from-christmas-pink-light to-christmas-pink"
  },
  { 
    id: "books", 
    title: "Top Books", 
    description: "Discover the Best Sellers Top Books of 2025",
    gradient: "from-winter-blue to-secondary"
  },
  { 
    id: "primevideo", 
    title: "Top Prime Video", 
    description: "Discover the Best Sellers Top Prime Video of 2025",
    gradient: "from-primary to-winter-blue"
  },
  { 
    id: "songs", 
    title: "Top Songs", 
    description: "Discover the Best Sellers Top Songs of 2025",
    gradient: "from-christmas-pink to-christmas-gold"
  },
  { 
    id: "albums", 
    title: "Top Music Albums", 
    description: "Discover the Best Sellers Top Music Albums of 2025",
    gradient: "from-christmas-pink-dark to-winter-blue"
  },
  { 
    id: "apps", 
    title: "Top Apps and Games", 
    description: "Discover the Best Sellers Top Apps and Games of 2025",
    gradient: "from-secondary to-christmas-pink"
  },
];

interface CategoryNavigationProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryNavigation = ({ selectedCategory, onCategorySelect }: CategoryNavigationProps) => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elegant ${
                selectedCategory === category.id 
                  ? "ring-2 ring-primary shadow-christmas" 
                  : "hover:shadow-lg"
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;