import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productCategories } from '@/data/mockData';
import { Upload, IndianRupee, Save, Sparkles, X, ImagePlus, CheckCircle, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useAddProduct } from '@/hooks/useProducts';

const TIPS = [
  { icon: '📸', text: 'Use natural daylight for the best product photos.' },
  { icon: '✍️', text: 'Descriptions with materials & dimensions sell faster.' },
  { icon: '💰', text: 'Check competitor prices before setting yours.' },
];

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const addProductMutation = useAddProduct();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: productCategories[0] });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(f => f.type === 'image/jpeg' || f.type === 'image/png');
      setImages(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeImage = (i: number) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent, asDraft = false) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    try {
      await addProductMutation.mutateAsync({
        userId: user.id, title: formData.title, description: formData.description,
        price: Number(formData.price), category: formData.category,
        images, status: asDraft ? 'draft' : 'active',
      });
      toast({ title: asDraft ? '📄 Draft saved' : '🎉 Product Published!', description: asDraft ? 'Saved as draft — not visible to buyers yet.' : 'Your product is now live on the marketplace.' });
      navigate('/entrepreneur/products');
    } catch {
      // handled globally
    } finally {
      setIsLoading(false);
    }
  };

  const filled = [formData.title, formData.description, formData.price].filter(Boolean).length;

  return (
    <EntrepreneurLayout title="Add New Product">
      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Main Form ── */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8">

            {/* Progress */}
            <div className="mb-8 pb-6 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Product Details
                </h3>
                <span className="text-xs text-muted-foreground">{filled}/3 filled</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300" style={{ width: `${(filled / 3) * 100}%` }} />
              </div>
            </div>

            <form onSubmit={e => handleSubmit(e, false)} className="space-y-6">

              {/* Title */}
              <div>
                <Label htmlFor="title">Product Name *</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Handwoven Bandhani Dupatta" className="mt-1.5" required />
              </div>

              {/* Category + Price */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select id="category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1.5 w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" required>
                    {productCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="relative mt-1.5">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="1200" className="pl-9" min="1" required />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="flex items-center justify-between">
                  <span>Description *</span>
                  <span className="text-xs text-muted-foreground font-normal">{formData.description.length} chars</span>
                </Label>
                <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your product — materials used, dimensions, special features, how it's made…" rows={5} className="mt-1.5" required />
              </div>

              {/* Image Upload */}
              <div>
                <Label className="flex items-center gap-2">
                  <ImagePlus className="w-4 h-4" /> Product Photos
                  <span className="text-xs text-muted-foreground font-normal">({images.length}/5)</span>
                </Label>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-3 mb-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                        <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                        {idx === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-[10px] text-center py-0.5 font-semibold">Main</div>
                        )}
                        <button type="button" onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <div onClick={() => fileInputRef.current?.click()}
                    className="mt-2 border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:bg-primary/2 transition-all cursor-pointer group">
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} multiple accept="image/png,image/jpeg" className="hidden" />
                    <Upload className="w-10 h-10 mx-auto text-primary/40 group-hover:text-primary/70 transition-colors mb-3" />
                    <p className="text-sm font-semibold text-foreground">Click to upload photos</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5 MB · Max 5 images</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-border">
                <Button type="button" variant="outline" className="flex-1 gap-2" onClick={e => handleSubmit(e as any, true)} disabled={isLoading}>
                  <Save className="w-4 h-4" /> Save as Draft
                </Button>
                <Button type="submit" className="flex-1 gap-2 shadow-lg hover:shadow-primary/20 transition-all" disabled={isLoading}>
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? 'Publishing…' : 'Publish to Marketplace'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Sidebar Tips ── */}
        <div className="space-y-5">
          {/* Tips card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" /> Tips for Selling More
            </h3>
            <div className="space-y-4">
              {TIPS.map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What happens next */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl border border-primary/10 p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">What happens after publishing?</h3>
            <div className="space-y-3">
              {[
                { step: '1', text: 'Your product becomes visible on the Marketplace instantly.' },
                { step: '2', text: 'Buyers across India can view and contact you.' },
                { step: '3', text: 'NGO partners may feature your product for funding.' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">{step}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EntrepreneurLayout>
  );
};

export default AddProductPage;
