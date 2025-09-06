import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Search, Menu, X, Leaf, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: "Browse", path: "/browse" },
    { name: "Sell", path: "/sell" },
    { name: "Categories", path: "/categories" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logoImage} alt="EcoFinds" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              EcoFinds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-smooth hover:text-primary ${
                  isActive(item.path) ? "text-primary font-medium" : "text-foreground/80"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search sustainable finds..."
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Welcome, {user?.full_name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button size="sm" className="hidden md:flex gradient-primary text-primary-foreground">
                    Join EcoFinds
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search sustainable finds..."
                  className="pl-10 bg-secondary/50"
                />
              </div>
              
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-2 px-3 rounded-md transition-smooth ${
                    isActive(item.path) 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                  </Button>
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Favorites
                    </Button>
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      Welcome, {user?.full_name}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm" className="w-full gradient-primary text-primary-foreground">
                        Join EcoFinds
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;