import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Package, ShoppingBag, User, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { productsAPI, authAPI, purchasesAPI } from '@/services/api';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  condition_type: string;
  location: string;
  images: string;
  created_at: string;
  category_id: number;
}

interface Purchase {
  id: number;
  product_id: number;
  seller_id: number;
  buyer_id: number;
  price: number;
  status: string;
  created_at: string;
  product: Product;
}

const UserDashboard = () => {
  const { user, updateProfile } = useAuth();
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: user?.display_name || '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
      setEditForm({
        display_name: user.display_name || '',
        phone: '',
        address: ''
      });
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's products
      const productsResponse = await productsAPI.getUserProducts(user?.id.toString() || '');
      setUserProducts(productsResponse.data.products || []);
      
      // Fetch user's purchases
      try {
        const purchasesResponse = await purchasesAPI.getPurchases();
        setPurchases(purchasesResponse.data.purchases || []);
      } catch (error) {
        // Purchases API might not be implemented yet, show empty state
        console.log('Purchases API not available yet');
        setPurchases([]);
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(editForm);
      setIsEditDialogOpen(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-64 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">User Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile, listings, and purchases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.profile_image} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(user?.display_name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{user?.display_name}</h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>

                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="display_name">Display Name</Label>
                          <Input
                            id="display_name"
                            value={editForm.display_name}
                            onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            value={editForm.address}
                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                            placeholder="123 Main St, City, State 12345"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleProfileUpdate}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Member since {formatDate(user?.created_at || new Date().toISOString())}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* My Listings */}
              <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span>My Listings</span>
                    <Badge variant="secondary" className="ml-auto">
                      {userProducts.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Manage your product listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userProducts.length > 0 ? (
                      userProducts.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product.title}</p>
                            <p className="text-xs text-muted-foreground">
                              ${product.price} • {product.condition_type}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.status || 'Active'}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No listings yet</p>
                        <Button size="sm" className="mt-2" variant="outline">
                          Create Listing
                        </Button>
                      </div>
                    )}
                    
                    {userProducts.length > 3 && (
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Listings ({userProducts.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* My Purchases */}
              <Card className="shadow-card hover:shadow-soft transition-smooth cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span>My Purchases</span>
                    <Badge variant="secondary" className="ml-auto">
                      {purchases.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    View your purchase history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {purchases.length > 0 ? (
                      purchases.slice(0, 3).map((purchase) => (
                        <div key={purchase.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{purchase.product.title}</p>
                            <p className="text-xs text-muted-foreground">
                              ${purchase.price} • {formatDate(purchase.created_at)}
                            </p>
                          </div>
                          <Badge 
                            variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No purchases yet</p>
                        <Button size="sm" className="mt-2" variant="outline">
                          Browse Products
                        </Button>
                      </div>
                    )}
                    
                    {purchases.length > 3 && (
                      <Button variant="ghost" size="sm" className="w-full">
                        View All Purchases ({purchases.length})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card className="mt-6 shadow-card">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>
                  Your marketplace activity summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userProducts.length}</div>
                    <div className="text-sm text-muted-foreground">Listings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{purchases.length}</div>
                    <div className="text-sm text-muted-foreground">Purchases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${userProducts.reduce((sum, product) => sum + product.price, 0).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Listed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${purchases.reduce((sum, purchase) => sum + purchase.price, 0).toFixed(0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Spent</div>
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

export default UserDashboard;
