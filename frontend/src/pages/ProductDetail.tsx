import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  MapPin, 
  Calendar,
  Shield,
  ArrowLeft,
  Truck
} from "lucide-react";
import Navbar from "@/components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would come from API based on id
  const product = {
    id: 1,
    title: "Vintage Leather Jacket - Genuine Italian Leather",
    price: 45,
    originalPrice: 120,
    category: "Clothing",
    condition: "Good",
    description: `This beautiful vintage leather jacket is made from genuine Italian leather and has been well-maintained over the years. It features a classic design with:

• Premium Italian leather construction
• Original brass zippers and hardware
• Warm inner lining
• Two front pockets and one inner pocket
• Classic motorcycle jacket style
• Size: Medium (fits like a modern M/L)
• Era: 1980s

The jacket shows some natural patina which adds to its authentic vintage character. There are minor scuff marks on the elbows (shown in photos) but no tears or major damage. This is a rare find for vintage leather enthusiasts!`,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=600&fit=crop"
    ],
    seller: {
      name: "Sarah Mitchell",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b618?w=100&h=100&fit=crop",
      rating: 4.8,
      reviewCount: 156,
      joinDate: "2022",
      location: "Brooklyn, NY"
    },
    stats: {
      views: 234,
      likes: 18,
      posted: "3 days ago"
    },
    specifications: [
      { label: "Size", value: "Medium" },
      { label: "Material", value: "Genuine Leather" },
      { label: "Color", value: "Brown" },
      { label: "Brand", value: "Vintage - No Brand" },
      { label: "Era", value: "1980s" }
    ]
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new": return "bg-success/20 text-success";
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
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/browse">
            <Button variant="ghost" className="hover:bg-secondary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-smooth ${
                    selectedImage === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-border"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="hover:bg-secondary"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-secondary">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge className={getConditionColor(product.condition)}>
                  {product.condition}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{product.stats.views} views</span>
                <span>{product.stats.likes} likes</span>
                <span>Posted {product.stats.posted}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge className="bg-success/20 text-success">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Save ${product.originalPrice - product.price} compared to retail
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full gradient-primary text-primary-foreground">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message Seller
                </Button>
                <Button variant="outline" size="lg">
                  Make Offer
                </Button>
              </div>
            </div>

            {/* Seller Information */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.seller.avatar} alt={product.seller.name} />
                    <AvatarFallback>{product.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.seller.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {product.seller.rating} ({product.seller.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Joined {product.seller.joinDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {product.seller.location}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust & Safety */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Trust & Safety</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                    Verified seller with excellent ratings
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                    30-day return policy
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line text-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Specifications */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Ships from {product.seller.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Protected by EcoFinds guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;