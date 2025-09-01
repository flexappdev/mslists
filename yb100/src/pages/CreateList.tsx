
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Image, Save } from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/data/sampleData';

interface ListItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const CreateList = () => {
  const [listData, setListData] = useState({
    title: '',
    description: '',
    category: '',
    coverImage: ''
  });
  const [items, setItems] = useState<ListItem[]>([]);
  const [currentItem, setCurrentItem] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleListDataChange = (field: string, value: string) => {
    setListData(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrentItemChange = (field: string, value: string) => {
    setCurrentItem(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!currentItem.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for the item.",
        variant: "destructive"
      });
      return;
    }

    if (items.length >= 100) {
      toast({
        title: "Maximum items reached",
        description: "You can only add up to 100 items to a list.",
        variant: "destructive"
      });
      return;
    }

    const newItem: ListItem = {
      id: Date.now().toString(),
      ...currentItem,
      imageUrl: currentItem.imageUrl || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop'
    };

    setItems(prev => [...prev, newItem]);
    setCurrentItem({ title: '', description: '', imageUrl: '' });

    toast({
      title: "Item added",
      description: `"${newItem.title}" has been added to your list.`,
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your list.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!listData.title.trim() || !listData.category || items.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and add at least one item.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "List created!",
        description: "Your list has been created successfully and is pending review.",
      });
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const progress = Math.min((items.length / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Create Your List</h1>
            <p className="text-neutral-muted">Share your expertise with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* List Information */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">List Information</h2>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">List Title *</Label>
                <Input
                  id="title"
                  value={listData.title}
                  onChange={(e) => handleListDataChange('title', e.target.value)}
                  placeholder="e.g., Best Sci-Fi Movies of All Time"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={listData.description}
                  onChange={(e) => handleListDataChange('description', e.target.value)}
                  placeholder="Describe what makes this list special and what criteria you used..."
                  className="mt-1"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => handleListDataChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={listData.coverImage}
                  onChange={(e) => handleListDataChange('coverImage', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-white rounded-xl card-shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">List Items</h2>
              <div className="text-sm text-neutral-muted">
                {items.length} / 100 items
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-neutral-muted mt-2">
                {progress < 10 ? 'Just getting started!' : 
                 progress < 50 ? 'Making good progress!' :
                 progress < 90 ? 'Almost there!' : 'List is complete!'}
              </p>
            </div>

            {/* Add Item Form */}
            <div className="bg-neutral-section rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-4">Add New Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="itemTitle">Item Title *</Label>
                  <Input
                    id="itemTitle"
                    value={currentItem.title}
                    onChange={(e) => handleCurrentItemChange('title', e.target.value)}
                    placeholder="e.g., Blade Runner 2049"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="itemImageUrl">Image URL</Label>
                  <Input
                    id="itemImageUrl"
                    value={currentItem.imageUrl}
                    onChange={(e) => handleCurrentItemChange('imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="itemDescription">Description</Label>
                <Textarea
                  id="itemDescription"
                  value={currentItem.description}
                  onChange={(e) => handleCurrentItemChange('description', e.target.value)}
                  placeholder="Why does this item deserve to be on the list?"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <Button 
                type="button" 
                onClick={addItem}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Your Items</h3>
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-neutral-muted mt-1">{item.description}</p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {items.length === 0 && (
              <div className="text-center py-8 text-neutral-muted">
                <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No items added yet. Start building your list above!</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link to="/">Cancel</Link>
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !listData.title || !listData.category || items.length === 0}
              className="btn-primary"
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create List
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateList;
