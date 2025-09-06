import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  DollarSign, 
  Camera,
  ArrowLeft,
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { productsAPI, categoriesAPI } from "@/services/api";
import Navbar from "@/components/Navbar";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    location: ""
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Array<{id: number, name: string}>>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getCategories();
        // Deduplicate categories by name
        const uniqueCategories = response.data.categories.reduce((acc: Array<{id: number, name: string}>, category: any) => {
          if (!acc.find(c => c.name === category.name)) {
            acc.push({ id: category.id, name: category.name });
          }
          return acc;
        }, []);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  const conditions = [
    { value: "new", label: "New", description: "Never used, in original packaging" },
    { value: "like-new", label: "Like New", description: "Gently used, minimal signs of wear" },
    { value: "good", label: "Good", description: "Used with minor imperfections" },
    { value: "fair", label: "Fair", description: "Heavily used but still functional" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && images.length < 5) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to create a listing.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the selected category ID
      const selectedCategory = categories.find(cat => cat.name.toLowerCase() === formData.category.toLowerCase());
      if (!selectedCategory) {
        throw new Error("Please select a valid category");
      }

      // Prepare product data
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: selectedCategory.id,
        condition_type: formData.condition,
        location: formData.location || null
      };

      // Create the product
      const response = await productsAPI.createProduct(productData);
      
      toast({
        title: "Listing created successfully!",
        description: "Your item is now live on EcoFinds marketplace.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        condition: "",
        price: "",
        location: ""
      });
      setImages([]);
      
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.message || "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "new": return "bg-success/20 text-success";
      case "like-new": return "bg-primary/20 text-primary";
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
          <Link to="/browse">
            <Button variant="ghost" className="mb-4 hover:bg-secondary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
          
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Sell Your Items</h1>
            </div>
            <p className="text-muted-foreground">
              Give your items a second life and help others shop sustainably. 
              It's easy to list and we'll help you every step of the way.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {!isAuthenticated ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">Login Required</h3>
                  <p className="text-muted-foreground mb-4">
                    You need to be logged in to create a listing.
                  </p>
                  <Link to="/login">
                    <Button>Go to Login</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading categories...</p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photos Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Photos</span>
                  </CardTitle>
                  <CardDescription>
                    Add up to 5 photos. First photo will be your cover image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
                        <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground text-xs">
                            Cover
                          </Badge>
                        )}
                      </div>
                    ))}
                    
                    {images.length < 5 && (
                      <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex flex-col items-center justify-center bg-secondary/30 hover:bg-secondary/50">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground text-center">
                          Add Photo
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Item Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                  <CardDescription>
                    Provide clear, accurate information to help buyers find your item.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Vintage Leather Jacket - Size Medium"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your item's condition, features, size, brand, etc. Be honest and detailed to build trust with buyers."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name.toLowerCase()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Condition *</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleSelectChange("condition", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition.value} value={condition.value}>
                              <div className="flex items-center space-x-2">
                                <Badge className={`${getConditionColor(condition.value)} text-xs`}>
                                  {condition.label}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          className="pl-10"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full gradient-primary text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Creating Listing...</span>
                  </div>
                ) : (
                  "Create Listing"
                )}
              </Button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Environmental Impact */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Eco Impact</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  By selling your item, you're helping extend its lifecycle and 
                  preventing it from ending up in a landfill. Every sale makes a difference!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;