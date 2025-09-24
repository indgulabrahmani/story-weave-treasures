import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Camera, Heart, DollarSign, MapPin, Tag, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SellItemForm {
  title: string;
  story: string;
  category: string;
  condition: string;
  price: string;
  location: string;
  whyLettingGo: string;
  description: string;
  photos: FileList | null;
}

const categories = [
  "Books & Literature",
  "Vintage Fashion", 
  "Electronics",
  "Home & Decor",
  "Collectibles",
  "Handmade"
];

const conditions = [
  "Like New",
  "Excellent", 
  "Good",
  "Fair",
  "Well-Loved"
];

export const SellItemSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SellItemForm>({
    title: "",
    story: "",
    category: "",
    condition: "",
    price: "",
    location: "",
    whyLettingGo: "",
    description: "",
    photos: null
  });

  const [storyLength, setStoryLength] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof SellItemForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "story") {
      setStoryLength(value.length);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, photos: files }));
      toast({
        title: "Photos uploaded!",
        description: `${files.length} photo${files.length > 1 ? 's' : ''} ready to share your story.`
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, photos: e.dataTransfer.files }));
      toast({
        title: "Photos uploaded!",
        description: `${e.dataTransfer.files.length} photo${e.dataTransfer.files.length > 1 ? 's' : ''} ready to share your story.`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (storyLength < 150) {
      toast({
        title: "Story too short",
        description: "Stories must be at least 150 characters. Help buyers connect with your item!",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category || !formData.condition) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields to share your story.",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful submission
    toast({
      title: "Story Shared Successfully! 🎉",
      description: "Your item is now live. Someone will love giving it a new chapter!"
    });

    // Reset form
    setFormData({
      title: "",
      story: "",
      category: "",
      condition: "",
      price: "",
      location: "",
      whyLettingGo: "",
      description: "",
      photos: null
    });
    setStoryLength(0);
  };

  return (
    <section id="sell-item" className="py-24 bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Share Your Story
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            Give Your Treasures a New Chapter
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every item you no longer need could be someone's perfect find. Share the story behind your treasure and help it continue its journey.
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-serif">Tell Your Item's Story</CardTitle>
            <CardDescription>
              Help buyers connect with your item by sharing its history and meaning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Photo Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Item Photos *
                </Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg mb-2">Drop photos here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Upload up to 8 photos (JPG, PNG, WebP)</p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="max-w-xs mx-auto"
                  />
                  {formData.photos && (
                    <p className="mt-2 text-sm text-primary">
                      {formData.photos.length} photo{formData.photos.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>
              </div>

              {/* Item Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">Item Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Grandmother's Hand-Knitted Wool Sweater"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg"
                  required
                />
              </div>

              {/* Category and Condition */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Condition *
                  </Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price and Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="25.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Brooklyn, NY"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </div>

              {/* Story - The Heart of StorySwap */}
              <div className="space-y-2">
                <Label htmlFor="story" className="text-base font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent-warm" />
                  Your Item's Story * (Minimum 150 characters)
                </Label>
                <Textarea
                  id="story"
                  placeholder="Share the memories, history, and emotional connection you have with this item. Who gave it to you? What moments did you share together? Why is it special? Help the next owner understand what makes this item truly meaningful..."
                  value={formData.story}
                  onChange={(e) => handleInputChange("story", e.target.value)}
                  className="min-h-32 text-base"
                  required
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Stories help buyers connect emotionally with your item
                  </p>
                  <span className={`text-sm ${storyLength < 150 ? 'text-destructive' : 'text-primary'}`}>
                    {storyLength}/150 minimum
                  </span>
                </div>
              </div>

              {/* Why Letting Go */}
              <div className="space-y-2">
                <Label htmlFor="whyLettingGo" className="text-base font-medium">
                  Why Are You Letting It Go?
                </Label>
                <Textarea
                  id="whyLettingGo"
                  placeholder="Moving to a new city, decluttering, kids have outgrown it, found a new hobby..."
                  value={formData.whyLettingGo}
                  onChange={(e) => handleInputChange("whyLettingGo", e.target.value)}
                  className="min-h-24"
                />
              </div>

              {/* Additional Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Additional Details
                </Label>
                <Textarea
                  id="description"
                  placeholder="Size, materials, care instructions, any flaws or wear, included accessories..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-24"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg font-medium bg-gradient-warm hover:shadow-lg transition-all duration-300"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Share Your Story & List Item
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By listing, you agree to our community guidelines of honest storytelling
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};