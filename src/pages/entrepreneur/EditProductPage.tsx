import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productCategories } from '@/data/mockData';
import { IndianRupee, Save, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useSingleProduct, useUpdateProduct } from '@/hooks/useProducts';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: product, isLoading: isFetching } = useSingleProduct(id);
  const updateProductMutation = useUpdateProduct();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: productCategories[0],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill the form with fetched product data safely
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent, asDraft: boolean = false) => {
    e.preventDefault();
    if (!user || !id) {
      toast({ title: 'Error', description: 'Cannot update product.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    try {
      await updateProductMutation.mutateAsync({
        id: id,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        status: asDraft ? 'draft' : 'in_review',
      });

      toast({
        title: asDraft ? 'Draft updated' : 'Product updated',
        description: asDraft 
          ? 'Your product draft has been updated.' 
          : 'Your modified product has been submitted for review.',
      });

      navigate('/entrepreneur/products');
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <EntrepreneurLayout title="Edit Product">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </EntrepreneurLayout>
    );
  }

  if (!product) {
    return (
      <EntrepreneurLayout title="Edit Product">
        <div className="text-center py-16 text-muted-foreground">Product not found.</div>
      </EntrepreneurLayout>
    );
  }

  return (
    <EntrepreneurLayout title="Edit Product">
      <div className="max-w-2xl">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          
          {/* Product Name */}
          <div>
            <Label htmlFor="title">Product Name *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              rows={5}
              className="mt-2"
              required
            />
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
                className="pl-9"
                min="1"
                required
              />
            </div>
          </div>

          {/* Read-only Images Disclaimer */}
          {product.images && product.images.length > 0 && (
            <div>
               <Label>Current Images</Label>
               <div className="grid grid-cols-5 gap-4 mt-2">
                 {product.images.map((img, idx) => (
                   <div key={idx} className="aspect-square rounded-md overflow-hidden bg-secondary">
                     <img src={img} alt="Product" className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
               <p className="text-xs text-muted-foreground mt-2">Note: Editing images is currently not supported. To change images, please recreate the product.</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border mt-8">
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2 border-primary/40 text-primary hover:bg-primary/5"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save & Publish Product'}
            </Button>
          </div>

        </form>
      </div>
    </EntrepreneurLayout>
  );
};

export default EditProductPage;
