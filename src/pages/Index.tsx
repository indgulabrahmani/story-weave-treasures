import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SellItemSection } from "@/components/SellItemSection";
import { 
  Heart, 
  Search, 
  ShoppingBag, 
  Recycle, 
  Users, 
  BookOpen, 
  Shirt, 
  Smartphone, 
  Home, 
  Gem, 
  Palette,
  Star,
  MapPin,
  MessageCircle,
  LogOut,
  Eye,
  Calendar,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Item {
  id: number;
  title: string;
  story: string;
  fullStory: string;
  price: number;
  category: string;
  condition: string;
  sellerName: string;
  sellerRating: number;
  sellerImage: string;
  location: string;
  listedDate: string;
  isFavorite: boolean;
  image: string;
  views: number;
}

const featuredItems: Item[] = [
  {
    id: 1,
    title: "Grandmother's Poetry Collection",
    story: "These leather-bound volumes hold 40 years of my grandmother's original poetry. Each page whispers of Sunday afternoons spent in her garden...",
    fullStory: "These leather-bound volumes hold 40 years of my grandmother's original poetry. Each page whispers of Sunday afternoons spent in her garden, where she'd write verses about the changing seasons. She passed down her love of words through these books, reading them aloud during family gatherings. The margins are filled with her notes about life, love, and the beauty she saw in everyday moments. I'm moving across the country and hope these find someone who will treasure them as much as she did. They're not just books – they're a piece of a beautiful soul who believed poetry could heal the world.",
    price: 85,
    category: "Books & Literature", 
    condition: "Good",
    sellerName: "Emma Chen",
    sellerRating: 4.9,
    sellerImage: "/placeholder.svg",
    location: "Portland, OR",
    listedDate: "2 days ago",
    isFavorite: false,
    image: "/placeholder.svg",
    views: 127
  },
  {
    id: 2,
    title: "Vintage Wedding Teacups Set",
    story: "Six delicate porcelain teacups from my 1960s wedding. They hosted countless conversations, celebrations, and quiet morning moments...",
    fullStory: "Six delicate porcelain teacups from my 1960s wedding. They hosted countless conversations, celebrations, and quiet morning moments between my husband and me over 58 years of marriage. Each cup has served tea to grandchildren learning to hold grown-up cups, friends sharing secrets, and Sunday visits with family. The roses painted on each one have faded slightly, but their beauty remains. After my husband's passing, I'm downsizing but want these to continue creating moments of connection. They deserve a table where love is shared daily.",
    price: 120,
    category: "Home & Decor",
    condition: "Excellent", 
    sellerName: "Margaret Foster",
    sellerRating: 5.0,
    sellerImage: "/placeholder.svg", 
    location: "Charleston, SC",
    listedDate: "5 days ago",
    isFavorite: false,
    image: "/placeholder.svg",
    views: 89
  },
  {
    id: 3,
    title: "Dad's Film Camera Collection",
    story: "My father's prized Nikon FM from 1978. It captured my childhood, family vacations, and his artistic journey through black and white photography...",
    fullStory: "My father's prized Nikon FM from 1978. It captured my childhood, family vacations, and his artistic journey through black and white photography. He spent hours in his darkroom, teaching me about light, composition, and patience. This camera documented births, graduations, holidays, and ordinary Tuesday evenings that felt extraordinary through his lens. The leather is worn smooth from decades of adventures, and it still works perfectly. Dad would love knowing it will help someone else discover the magic of film photography and slow, intentional image-making.",
    price: 350,
    category: "Electronics",
    condition: "Good",
    sellerName: "David Park", 
    sellerRating: 4.8,
    sellerImage: "/placeholder.svg",
    location: "Austin, TX", 
    listedDate: "1 week ago",
    isFavorite: false,
    image: "/placeholder.svg",
    views: 203
  },
  {
    id: 4, 
    title: "Hand-Knitted Baby Blanket",
    story: "Lovingly crafted during my pregnancy, this soft wool blanket kept my daughter warm through countless nights and adventures...",
    fullStory: "Lovingly crafted during my pregnancy, this soft wool blanket kept my daughter warm through countless nights and adventures. I knitted every stitch with hopes and dreams, choosing colors that would grow with her. It traveled to grandparents' houses, provided comfort during illness, and was dragged to every sleepover until she was ten. Now she's heading to college, and this blanket needs a new little one to love. The wool is still incredibly soft, and it carries so much love in every fiber. Perfect for a family expecting their own miracle.",
    price: 45,
    category: "Handmade", 
    condition: "Like New",
    sellerName: "Sarah Mitchell",
    sellerRating: 4.9,
    sellerImage: "/placeholder.svg",
    location: "Denver, CO",
    listedDate: "3 days ago", 
    isFavorite: false,
    image: "/placeholder.svg",
    views: 156
  }
];

const categories = [
  { name: "Books & Literature", icon: BookOpen, color: "text-emerald-600", count: 324 },
  { name: "Vintage Fashion", icon: Shirt, color: "text-pink-600", count: 189 },
  { name: "Electronics", icon: Smartphone, color: "text-blue-600", count: 156 },
  { name: "Home & Decor", icon: Home, color: "text-orange-600", count: 267 },
  { name: "Collectibles", icon: Gem, color: "text-purple-600", count: 98 },
  { name: "Handmade", icon: Palette, color: "text-red-600", count: 143 }
];

const Index = () => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("storyswap-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Load user from localStorage
    const savedUser = localStorage.getItem("storyswap-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("storyswap-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      
      toast({
        title: newFavorites.includes(itemId) ? "Added to favorites! ❤️" : "Removed from favorites",
        description: newFavorites.includes(itemId) 
          ? "You can find this story in your saved items." 
          : "Item removed from your collection."
      });
      
      return newFavorites;
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignIn = (email: string, password: string) => {
    // Mock sign in
    const mockUser = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      avatar: "/placeholder.svg",
      joinDate: "January 2024",
      trustScore: 4.8,
      itemsSold: 12,
      storiesShared: 18
    };
    
    setUser(mockUser);
    localStorage.setItem("storyswap-user", JSON.stringify(mockUser));
    setIsSignInOpen(false);
    
    toast({
      title: "Welcome back! 🎉",
      description: "Ready to discover more amazing stories?"
    });
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    // Mock sign up
    const mockUser = {
      id: 2,
      name: name,
      email: email,
      avatar: "/placeholder.svg", 
      joinDate: "September 2024",
      trustScore: 5.0,
      itemsSold: 0,
      storiesShared: 0
    };
    
    setUser(mockUser);
    localStorage.setItem("storyswap-user", JSON.stringify(mockUser));
    setIsSignUpOpen(false);
    
    toast({
      title: "Welcome to StorySwap! 🌟",
      description: "Start sharing and discovering amazing stories."
    });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("storyswap-user");
    toast({
      title: "Signed out successfully",
      description: "See you again soon!"
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    
    if (searchQuery.trim()) {
      // Scroll to featured items section to show search results
      scrollToSection('featured-items');
      toast({
        title: "Search Results",
        description: `Showing stories for "${searchQuery}"`
      });
    }
  };

  const handleContactSeller = (item: Item) => {
    toast({
      title: "Message sent! ✉️",
      description: `${item.sellerName} will receive your inquiry about "${item.title}"`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-warm rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold text-primary">StorySwap</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Button 
              variant="ghost" 
              onClick={() => scrollToSection('categories')}
            >
              Browse
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('featured-items')}
            >
              Discover
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('sell-item')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Sell
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {favorites.length}
                </Badge>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{user.trustScore} Trust Score</span>
                    </div>
                  </div>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => setIsSignUpOpen(true)}>
                  Join
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

{/* Hero Section */}
      <section className="py-32 bg-gradient-to-b from-cream via-warm-50 to-sage-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <Badge variant="secondary" className="mb-8 px-6 py-3 text-base shadow-lg">
            <Heart className="w-5 h-5 mr-3 text-accent-warm" />
            Where Stories Find New Homes Since 2024
          </Badge>
          <h1 className="text-6xl md:text-8xl font-serif text-primary mb-8 leading-tight">
            Every Item Has a{' '}
            <span className="block text-accent-warm bg-gradient-to-r from-accent-warm to-primary bg-clip-text text-transparent animate-pulse">
              Beautiful Story
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform forgotten treasures into cherished finds. Connect hearts through stories, 
            not just shopping. Because every pre-loved item deserves a new chapter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="text-xl px-12 py-6 bg-gradient-warm hover:shadow-elegant transform hover:scale-105 transition-all duration-300" 
              onClick={() => scrollToSection('featured-items')}
            >
              <Search className="w-6 h-6 mr-3" />
              Discover Amazing Stories
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-xl px-12 py-6 border-2 border-primary hover:bg-primary/5 transform hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection('sell-item')}
            >
              <Heart className="w-6 h-6 mr-3" />
              Share Your Treasure's Story
            </Button>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15,420</div>
              <div className="text-muted-foreground flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Stories Shared
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-warm mb-2">2,847</div>
              <div className="text-muted-foreground flex items-center justify-center gap-2">
                <Recycle className="w-4 h-4" />
                Items Saved from Landfills
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">8,392</div>
              <div className="text-muted-foreground flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Community Members
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse by Category
            </Badge>
            <h2 className="text-4xl font-serif text-primary mb-4">
              Find Stories That Speak to You
            </h2>
            <p className="text-xl text-muted-foreground">
              Each category holds treasures with unique tales waiting to be discovered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 transform hover:scale-105"
                onClick={() => scrollToSection('featured-items')}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center ${category.color}`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="outline" className="mb-2">
                    {category.count} items
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Stories waiting to find their next chapter
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured-items" className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Star className="w-4 h-4 mr-2" />
              Story Spotlight
            </Badge>
            <h2 className="text-4xl font-serif text-primary mb-4">
              Treasures with Heartfelt Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Each item carries memories, love, and a story waiting to continue
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-elegant transition-all duration-300 overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Badge variant="secondary" className="absolute bottom-2 left-2">
                    {item.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-lg font-bold text-primary">
                      ${item.price}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.story}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.listedDate}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={item.sellerImage} />
                        <AvatarFallback>{item.sellerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-medium">{item.sellerName}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{item.sellerRating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Read Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Item Section */}
      <SellItemSection />

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Stories
            </DialogTitle>
            <DialogDescription>
              Find treasures by story keywords, category, or location
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              placeholder="Search for items, stories, or sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-base"
            />
            <Button type="submit" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Search Stories
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Item Detail Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-24 h-24 rounded-lg object-cover bg-gradient-to-br from-secondary to-muted"
                />
                <div className="flex-1">
                  <DialogTitle className="text-xl mb-2">{selectedItem.title}</DialogTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{selectedItem.category}</Badge>
                    <Badge variant="outline">{selectedItem.condition}</Badge>
                    <span className="font-bold text-primary text-lg">${selectedItem.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={selectedItem.sellerImage} />
                      <AvatarFallback>{selectedItem.sellerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedItem.sellerName}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{selectedItem.sellerRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent-warm" />
                  The Story Behind This Treasure
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedItem.fullStory}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedItem.location}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedItem.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Listed {selectedItem.listedDate}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1"
                  onClick={() => handleContactSeller(selectedItem)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toggleFavorite(selectedItem.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(selectedItem.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Sign In Modal */}
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome Back to StorySwap</DialogTitle>
            <DialogDescription>
              Sign in to save favorites and share your own stories
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSignIn(
              formData.get('email') as string, 
              formData.get('password') as string
            );
          }} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsSignInOpen(false);
                  setIsSignUpOpen(true);
                }}
              >
                Join StorySwap
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join the StorySwap Community</DialogTitle>
            <DialogDescription>
              Start sharing and discovering meaningful stories
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSignUp(
              formData.get('name') as string,
              formData.get('email') as string, 
              formData.get('password') as string
            );
          }} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">Join StorySwap</Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button 
                type="button"
                className="text-primary hover:underline"
                onClick={() => {
                  setIsSignUpOpen(false);
                  setIsSignInOpen(true);
                }}
              >
                Sign in
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;