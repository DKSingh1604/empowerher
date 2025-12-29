import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productCategories } from '@/data/mockData';
import { Upload, IndianRupee, Save, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: productCategories[0],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock save
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: asDraft ? 'Draft saved' : 'Product submitted',
      description: asDraft 
        ? 'Your product has been saved as a draft.' 
        : 'Your product has been submitted for review.',
    });

    setIsLoading(false);
    navigate('/entrepreneur/products');
  };

  return (
    <EntrepreneurLayout title="Add New Product">
      <div className="max-w-2xl">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="title">Product Name *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Handwoven Bandhani Dupatta"
              className="mt-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-2 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
              required
            >
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product, materials used, dimensions, special features..."
              rows={5}
              className="mt-2"
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              A good description helps buyers understand the value of your handmade product.
            </p>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <div className="relative mt-2">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1200"
                className="pl-9"
                min="1"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Product Images</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">
                Click to upload images
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB (max 5 images)
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Good photos help sell your products. Use natural lighting and show details.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2"
              onClick={(e) => handleSubmit(e as any, true)}
              disabled={isLoading}
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={isLoading}
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </div>
        </form>
      </div>
    </EntrepreneurLayout>
  );
};

export default AddProductPage;
