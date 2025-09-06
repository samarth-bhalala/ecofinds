import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  Camera,
  ArrowLeft,
  Leaf,
  ShoppingCart,
  User
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
    quantity: 1,
    year_of_manufacture: "",
    brand: "",
    model: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    material: "",
    color: "",
    has_original_packaging: false,
    has_manual_instructions: false,
    working_condition_description: "",
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
        console.log('Fetching categories...');
        const response = await categoriesAPI.getCategories();
        console.log('Categories response:', response.data);
        
        // Deduplicate categories by name
        const uniqueCategories = response.data.categories.reduce((acc: Array<{id: number, name: string}>, category: any) => {
          if (!acc.find(c => c.name === category.name)) {
            acc.push({ id: category.id, name: category.name });
          }
          return acc;
        }, []);
        
        console.log('Unique categories:', uniqueCategories);
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        // Check file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: "Please select only image files.",
            variant: "destructive",
          });
          return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: "Please select images smaller than 5MB.",
            variant: "destructive",
          });
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result && images.length < 5) {
            setImages(prev => [...prev, e.target!.result as string]);
          } else if (images.length >= 5) {
            toast({
              title: "Maximum images reached",
              description: "You can only upload up to 5 images.",
              variant: "destructive",
            });
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
        quantity: formData.quantity,
        category_id: selectedCategory.id,
        condition_type: formData.condition,
        year_of_manufacture: formData.year_of_manufacture ? parseInt(formData.year_of_manufacture) : undefined,
        brand: formData.brand || undefined,
        model: formData.model || undefined,
        length: formData.length ? parseFloat(formData.length) : undefined,
        width: formData.width ? parseFloat(formData.width) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        material: formData.material || undefined,
        color: formData.color || undefined,
        has_original_packaging: formData.has_original_packaging,
        has_manual_instructions: formData.has_manual_instructions,
        working_condition_description: formData.working_condition_description || undefined,
        location: formData.location || undefined
      };

      console.log('Submitting product data:', productData);
      console.log('Selected category:', selectedCategory);

      // Create the product
      const response = await productsAPI.createProduct(productData);
      console.log('Product creation response:', response.data);
      
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
        quantity: 1,
        year_of_manufacture: "",
        brand: "",
        model: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        material: "",
        color: "",
        has_original_packaging: false,
        has_manual_instructions: false,
        working_condition_description: "",
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
      {/* Header matching wireframe */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/browse">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Logo</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                1
              </div>
            </div>
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Add a new Product</h2>

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
            {/* Image Upload Section */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Add product Image</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="mt-2">
                        Choose Files
                      </Button>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Upload up to 5 images (max 5MB each)
                    </p>
                  </div>

                  {/* Display Uploaded Images */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                          <img 
                            src={image} 
                            alt={`Upload ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
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
                            <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs">
                              Cover
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Details Form */}
            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Product Title */}
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter product title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>

                {/* Product Category */}
                <div>
                  <Label>Product Category *</Label>
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

                {/* Product Description */}
                <div>
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product in detail"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm font-medium">₹</span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="pl-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <Label>Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleSelectChange("condition", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Year of Manufacture */}
                <div>
                  <Label htmlFor="year_of_manufacture">Year of Manufacture (if applicable)</Label>
                  <Input
                    id="year_of_manufacture"
                    name="year_of_manufacture"
                    type="number"
                    placeholder="e.g., 2020"
                    value={formData.year_of_manufacture}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="mt-1"
                  />
                </div>

                {/* Brand and Model */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      placeholder="e.g., Apple, Nike"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="e.g., iPhone 12, Air Max"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <Label>Dimensions</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Input
                        name="length"
                        placeholder="Length"
                        value={formData.length}
                        onChange={handleInputChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Input
                        name="width"
                        placeholder="Width"
                        value={formData.width}
                        onChange={handleInputChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <Input
                        name="height"
                        placeholder="Height"
                        value={formData.height}
                        onChange={handleInputChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight in kg/lbs"
                    value={formData.weight}
                    onChange={handleInputChange}
                    step="0.01"
                    className="mt-1"
                  />
                </div>

                {/* Material and Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      name="material"
                      placeholder="e.g., Wood, Metal, Plastic"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      placeholder="e.g., Black, White, Red"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_original_packaging"
                      checked={formData.has_original_packaging}
                      onCheckedChange={(checked) => handleCheckboxChange("has_original_packaging", checked as boolean)}
                    />
                    <Label htmlFor="has_original_packaging">Original Packaging</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_manual_instructions"
                      checked={formData.has_manual_instructions}
                      onCheckedChange={(checked) => handleCheckboxChange("has_manual_instructions", checked as boolean)}
                    />
                    <Label htmlFor="has_manual_instructions">Manual/Instructions Included</Label>
                  </div>
                </div>

                {/* Working Condition Description */}
                <div>
                  <Label htmlFor="working_condition_description">Working Condition Description</Label>
                  <Textarea
                    id="working_condition_description"
                    name="working_condition_description"
                    placeholder="Describe the working condition of the item"
                    value={formData.working_condition_description}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                {/* Location */}
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
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding Item...</span>
                </div>
              ) : (
                "Add Item"
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Sell;