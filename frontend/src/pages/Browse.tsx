import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    price: 45,
    category: "Clothing",
    condition: "Good",
    seller: "Sarah M.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    isLiked: false,
    location: "New York, NY"
  },
  {
    id: 2,
    title: "Sustainable Bamboo Desk Organizer",
    price: 25,
    category: "Home & Garden",
    condition: "Like New",
    seller: "EcoStudio",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    isLiked: true,
    location: "Portland, OR"
  },
  {
    id: 3,
    title: "Refurbished iPhone 12",
    price: 320,
    category: "Electronics",
    condition: "Excellent",
    seller: "TechReuse Co.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    isLiked: false,
    location: "Austin, TX"
  },
  {
    id: 4,
    title: "Handmade Ceramic Mug Set",
    price: 18,
    category: "Home & Garden",
    condition: "New",
    seller: "ArtisanCrafts",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    isLiked: false,
    location: "San Francisco, CA"
  },
  {
    id: 5,
    title: "Second-hand Mountain Bike",
    price: 280,
    category: "Sports & Outdoors",
    condition: "Good",
    seller: "Mike's Bikes",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    isLiked: true,
    location: "Denver, CO"
  },
  {
    id: 6,
    title: "Upcycled Wooden Bookshelf",
    price: 85,
    category: "Furniture",
    condition: "Refurbished",
    seller: "WoodWorkers United",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1594736797933-d0c7c6ef6729?w=400&h=300&fit=crop",
    isLiked: false,
    location: "Seattle, WA"
  }
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [products, setProducts] = useState(mockProducts);

  const categories = ["All", "Clothing", "Electronics", "Home & Garden", "Furniture", "Sports & Outdoors", "Books"];
  const conditions = ["All", "New", "Like New", "Good", "Fair"];

  const toggleLike = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isLiked: !product.isLiked }
        : product
    ));
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new": return "bg-success/20 text-success-foreground";
      case "like new": return "bg-primary/20 text-primary";
      case "good": return "bg-warning/20 text-warning-foreground";
      case "fair": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
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
            Showing {products.length} sustainable finds
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-eco transition-smooth overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
                  onClick={() => toggleLike(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      product.isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <Badge className={`absolute top-2 left-2 ${getConditionColor(product.condition)}`}>
                  {product.condition}
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
                  <span className="text-xs text-muted-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">• {product.seller}</span>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{product.location}</p>
                <Badge variant="secondary" className="text-xs mb-2">
                  {product.category}
                </Badge>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">${product.price}</span>
                <Link to={`/product/${product.id}`}>
                  <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Browse;