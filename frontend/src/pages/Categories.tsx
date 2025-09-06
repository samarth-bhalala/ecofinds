import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shirt, 
  Smartphone, 
  Home, 
  Sofa, 
  BookOpen, 
  Bike,
  Gamepad2,
  Palette,
  Watch,
  MoreHorizontal,
  TrendingUp,
  Leaf,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";

const Categories = () => {
  const mainCategories = [
    {
      name: "Clothing",
      icon: Shirt,
      count: "2,543",
      description: "Fashion, accessories, and vintage clothing",
      trending: true,
      subcategories: ["Women's", "Men's", "Kids", "Vintage", "Accessories"],
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      name: "Electronics",
      icon: Smartphone,
      count: "1,867",
      description: "Phones, laptops, gaming gear, and tech accessories",
      trending: true,
      subcategories: ["Phones", "Computers", "Gaming", "Audio", "Cameras"],
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      name: "Home & Garden",
      icon: Home,
      count: "3,234",
      description: "Decor, kitchenware, gardening tools, and more",
      trending: false,
      subcategories: ["Decor", "Kitchen", "Garden", "Tools", "Storage"],
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      name: "Furniture",
      icon: Sofa,
      count: "956",
      description: "Chairs, tables, storage, and home furniture",
      trending: false,
      subcategories: ["Seating", "Tables", "Storage", "Bedroom", "Office"],
      color: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      name: "Books",
      icon: BookOpen,
      count: "1,523",
      description: "Fiction, non-fiction, textbooks, and rare books",
      trending: false,
      subcategories: ["Fiction", "Non-fiction", "Textbooks", "Comics", "Rare"],
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      name: "Sports & Outdoors",
      icon: Bike,
      count: "834",
      description: "Exercise equipment, outdoor gear, and sporting goods",
      trending: false,
      subcategories: ["Fitness", "Outdoor", "Team Sports", "Water Sports", "Winter Sports"],
      color: "bg-orange-50 text-orange-600 border-orange-200"
    },
    {
      name: "Toys & Games",
      icon: Gamepad2,
      count: "645",
      description: "Board games, toys, puzzles, and collectibles",
      trending: false,
      subcategories: ["Board Games", "Action Figures", "Puzzles", "Educational", "Collectibles"],
      color: "bg-pink-50 text-pink-600 border-pink-200"
    },
    {
      name: "Art & Collectibles",
      icon: Palette,
      count: "423",
      description: "Artwork, antiques, and unique collectible items",
      trending: false,
      subcategories: ["Paintings", "Sculptures", "Antiques", "Prints", "Crafts"],
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      name: "Jewelry & Accessories",
      icon: Watch,
      count: "789",
      description: "Watches, jewelry, bags, and fashion accessories",
      trending: true,
      subcategories: ["Watches", "Necklaces", "Rings", "Bags", "Sunglasses"],
      color: "bg-rose-50 text-rose-600 border-rose-200"
    }
  ];

  const trendingItems = [
    {
      category: "Clothing",
      item: "Vintage Denim",
      growth: "+25%"
    },
    {
      category: "Electronics",
      item: "Refurbished Phones",
      growth: "+18%"
    },
    {
      category: "Jewelry",
      item: "Vintage Watches",
      growth: "+32%"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover unique second-hand treasures organized by category. 
            Every purchase helps create a more sustainable future.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Leaf className="h-4 w-4 text-primary" />
            <span>Over 12,000 sustainable items available</span>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span>Trending This Week</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {trendingItems.map((item, index) => (
              <Card key={index} className="bg-primary/5 border-primary/20 hover:shadow-eco transition-smooth">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{item.item}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge className="bg-success/20 text-success text-xs">
                      {item.growth}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className={`group hover:shadow-eco transition-smooth cursor-pointer border-2 ${category.color}`}>
                <Link to={`/browse?category=${category.name.toLowerCase()}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${category.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                            {category.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">{category.count} items</span>
                            {category.trending && (
                              <Badge className="bg-success/20 text-success text-xs">
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-smooth" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 4).map((sub, subIndex) => (
                        <Badge key={subIndex} variant="secondary" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          <MoreHorizontal className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Browse All Section */}
        <div className="text-center bg-secondary/30 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse all items or use our advanced search to find exactly what you need. 
            New items are added daily by our sustainable community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" className="gradient-primary text-primary-foreground">
                Browse All Items
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                Sell Your Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;