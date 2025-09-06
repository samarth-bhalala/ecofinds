import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { productsAPI, categoriesAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

// Product interface matching database schema
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  seller_id: number;
  condition_type: 'excellent' | 'good' | 'fair' | 'poor';
  images: string[] | string;
  location: string;
  is_available: boolean;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  seller_name: string;
  seller_image?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const conditions = ["All", "Excellent", "Good", "Fair", "Poor"];

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getProducts(),
          categoriesAPI.getCategories()
        ]);
        
        setProducts(productsResponse.data.products);
        
        // Deduplicate categories by name
        const uniqueCategories = categoriesResponse.data.categories.reduce((acc: Category[], category: Category) => {
          if (!acc.find(c => c.name === category.name)) {
            acc.push(category);
          }
          return acc;
        }, []);
        setCategories(uniqueCategories);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again.');
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const toggleLike = (productId: number) => {
    // TODO: Implement actual favorite functionality with API
    console.log('Toggle like for product:', productId);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "excellent": return "bg-success/20 text-success-foreground";
      case "good": return "bg-primary/20 text-primary";
      case "fair": return "bg-warning/20 text-warning-foreground";
      case "poor": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           product.category_name.toLowerCase() === selectedCategory.toLowerCase();
    const matchesCondition = selectedCondition === "all" || 
                            product.condition_type.toLowerCase() === selectedCondition.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesCondition && product.is_available;
  });

  // Get product image URL
  const getProductImage = (product: Product) => {
    try {
      // Parse images if it's a JSON string
      let images = product.images;
      if (typeof images === 'string') {
        images = JSON.parse(images);
      }
      
      if (images && Array.isArray(images) && images.length > 0) {
        // If images are stored as filenames, construct the full URL
        return `/uploads/${images[0]}`;
      }
    } catch (error) {
      console.error('Error parsing images:', error);
    }
    
    // Fallback to placeholder image
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Sustainable Finds</h1>
          <p className="text-muted-foreground">Discover unique pre-owned treasures from our eco-conscious community</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8 shadow-card">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search Products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for sustainable finds..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="min-w-[150px]">
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name.toLowerCase()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="min-w-[150px]">
              <label className="text-sm font-medium mb-2 block">Condition</label>
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="All Conditions" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition.toLowerCase()}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="min-w-[100px]">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} sustainable finds
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-eco transition-smooth overflow-hidden">
              <div className="relative">
                <img
                  src={getProductImage(product)}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
                  onClick={() => toggleLike(product.id)}
                >
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Badge className={`absolute top-2 left-2 ${getConditionColor(product.condition_type)}`}>
                  {product.condition_type}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm mb-2 hover:text-primary transition-smooth line-clamp-2">
                    {product.title}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">4.5</span>
                  <span className="text-xs text-muted-foreground">• {product.seller_name || 'Seller'}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{product.location}</p>
                <Badge variant="secondary" className="text-xs mb-2">
                  {product.category_name || 'Uncategorized'}
                </Badge>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹{product.price}</span>
                <Link to={`/product/${product.id}`}>
                  <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          </div>
        )}

        {/* Load More */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;