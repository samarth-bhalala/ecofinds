import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recycle, Heart, Users, Leaf, ShoppingBag, Star, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "10K+" },
    { icon: ShoppingBag, label: "Items Sold", value: "50K+" },
    { icon: Recycle, label: "CO₂ Saved", value: "2.5T" },
    { icon: Heart, label: "Happy Customers", value: "98%" },
  ];

  const categories = [
    { name: "Clothing", count: "2.5K+ items", color: "bg-primary/10 text-primary" },
    { name: "Electronics", count: "1.8K+ items", color: "bg-accent/30 text-accent-foreground" },
    { name: "Home & Garden", count: "3.2K+ items", color: "bg-success/10 text-success" },
    { name: "Furniture", count: "950+ items", color: "bg-warning/20 text-warning-foreground" },
    { name: "Books", count: "1.5K+ items", color: "bg-secondary text-secondary-foreground" },
    { name: "Sports", count: "800+ items", color: "bg-primary/20 text-primary" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      rating: 5,
      text: "Found amazing vintage pieces and helped reduce waste. Love the community here!",
      location: "San Francisco, CA"
    },
    {
      name: "Mike Rodriguez",
      rating: 5,
      text: "Sold my old furniture quickly and easily. Great platform for sustainable living.",
      location: "Austin, TX"
    },
    {
      name: "Emma Thompson",
      rating: 5,
      text: "The quality verification process gives me confidence in every purchase.",
      location: "Portland, OR"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur">
            <Leaf className="h-3 w-3 mr-1" />
            Sustainable Shopping Revolution
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Unique
            <span className="block gradient-text bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Second-Hand Treasures
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join our eco-conscious community where every purchase makes a difference. 
            Buy and sell pre-owned goods while reducing environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/browse">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-soft">
                <Search className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Sell Your Items
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur rounded-lg p-4">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated categories of sustainable, pre-owned items from our trusted community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} to={`/browse?category=${category.name.toLowerCase()}`}>
                <Card className="text-center hover:shadow-eco transition-smooth cursor-pointer group">
                  <CardContent className="p-6">
                    <Badge className={`mb-3 ${category.color}`}>
                      {category.name}
                    </Badge>
                    <p className="text-sm text-muted-foreground group-hover:text-primary transition-smooth">
                      {category.count}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EcoFinds?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a marketplace - we're a community committed to sustainable living
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card hover:shadow-eco transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Eco-Friendly Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every purchase extends product lifecycles and reduces waste, contributing to a healthier planet
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-eco transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Trusted Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join thousands of verified users who share your commitment to sustainable consumption
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-eco transition-smooth">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quality Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All items are verified for quality and authenticity, ensuring you get value for your purchase
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-muted-foreground">Real stories from our eco-conscious users</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of eco-conscious shoppers making sustainable choices every day
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Join EcoFinds Today
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-primary-glow" />
                <span className="text-xl font-bold">EcoFinds</span>
              </div>
              <p className="text-sm text-background/80">
                Building a sustainable future through conscious consumption and community.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/browse" className="hover:text-primary-glow transition-smooth">Browse Products</Link></li>
                <li><Link to="/sell" className="hover:text-primary-glow transition-smooth">Sell Items</Link></li>
                <li><Link to="/categories" className="hover:text-primary-glow transition-smooth">Categories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/help" className="hover:text-primary-glow transition-smooth">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-primary-glow transition-smooth">Safety Guidelines</Link></li>
                <li><Link to="/contact" className="hover:text-primary-glow transition-smooth">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/about" className="hover:text-primary-glow transition-smooth">About Us</Link></li>
                <li><Link to="/sustainability" className="hover:text-primary-glow transition-smooth">Sustainability</Link></li>
                <li><Link to="/privacy" className="hover:text-primary-glow transition-smooth">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            <p>&copy; 2024 EcoFinds. All rights reserved. Building a sustainable future together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;