import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useSingleProduct, useIncrementView } from '@/hooks/useProducts';
import {
  IndianRupee, Eye, ShoppingBag, ArrowLeft,
  ChevronLeft, ChevronRight, Share2, Heart, CheckCircle,
  Package, Truck, ShieldCheck, MessageCircle, Sparkles, Mail, Edit
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { isProductLiked, toggleLike } from '@/utils/likedProducts';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, profile: authProfile } = useAuth();
  const { data: product, isLoading, error } = useSingleProduct(id);
  const isOwner = authProfile?.user_id === product?.userId;
  const incrementView = useIncrementView();
  const [activeImg, setActiveImg] = useState(0);
  const [imgError, setImgError] = useState(false);
  // Initialise from localStorage so like persists across page visits
  const [wishlist, setWishlist] = useState<boolean>(() =>
    id ? isProductLiked(id) : false
  );
  const [localViews, setLocalViews] = useState<number | null>(null);

  // Increment view count once when product data is loaded
  useEffect(() => {
    if (!product?.id) return;
    // Set initial local count from DB immediately
    setLocalViews((product.views || 0) + 1);
    // Persist the increment to DB silently
    incrementView.mutate(product.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  // Keep local views in sync if cache updates
  useEffect(() => {
    if (product?.views !== undefined && localViews === null) {
      setLocalViews(product.views + 1);
    }
  }, [product?.views]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-main py-12">
          <div className="grid md:grid-cols-2 gap-10 animate-pulse">
            <div className="aspect-square rounded-2xl bg-secondary" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-1/4" />
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-full" />
              <div className="h-4 bg-secondary rounded w-2/3" />
              <div className="h-12 bg-secondary rounded w-full mt-6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Product not found</h2>
            <p className="text-muted-foreground mb-6">This product may have been removed.</p>
            <Link to="/marketplace"><Button>← Back to Marketplace</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [];
  const hasImages = images.length > 0 && !imgError;

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out this handmade product on EmpowerHer: ${product.title}`;
    // Try native share (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, text, url });
        return;
      } catch { /* user cancelled */ }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: '🔗 Link copied!', description: 'Product link copied to clipboard. Share it anywhere!' });
    } catch {
      toast({ title: 'Share', description: url });
    }
  };

  const handleWishlist = () => {
    if (!id) return;
    const nowLiked = toggleLike(id);
    setWishlist(nowLiked);
    toast({
      title: nowLiked ? '❤️ Added to wishlist' : '💔 Removed from wishlist',
      description: nowLiked
        ? 'You can find your liked products in your wishlist.'
        : 'Product removed from your wishlist.',
    });
  };

  const handleEmail = () => {
    if (!isAuthenticated) {
      toast({ title: 'Sign in required', description: 'Please sign in to contact the artisan.', variant: 'destructive' });
      navigate('/auth');
      return;
    }
    
    // @ts-ignore - entrepreneurEmail and Name are added in the updated hook
    const email = product.entrepreneurEmail;
    // @ts-ignore
    const name = product.entrepreneurName || 'Artisan';
    
    if (!email) {
      toast({ title: 'Email unavailable', description: 'This artisan has not provided an email address.', variant: 'destructive' });
      return;
    }

    const subject = encodeURIComponent(`Inquiry about your product: ${product.title}`);
    const body = encodeURIComponent(`Hi ${name},\n\nI saw your handmade product "${product.title}" on the EmpowerHer Marketplace and I am interested in purchasing it.\n\nCould you please let me know about the availability and how to proceed?\n\nThank you!`);
    
    // Open user's default email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    
    toast({ title: '✅ Email app opened!', description: 'Drafting message to the artisan...' });
  };

  const handleWhatsApp = () => {
    if (!isAuthenticated) {
      toast({ title: 'Sign in required', description: 'Please sign in to contact the artisan.', variant: 'destructive' });
      navigate('/auth');
      return;
    }
    
    // @ts-ignore
    const name = product.entrepreneurName || 'Artisan';
    
    // Note: Since real phone numbers aren't in the DB yet, using a dummy demo number.
    const dummyPhone = "919876543210";
    const text = encodeURIComponent(`Hi ${name}, I saw your product "${product.title}" on EmpowerHer and I'm interested in buying it!`);
    
    // Opens WhatsApp Web or App
    window.open(`https://wa.me/${dummyPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ── Breadcrumb ── */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container-main py-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/marketplace" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Marketplace
            </Link>
            <span>/</span>
            <span className="text-primary font-medium line-clamp-1">{product.category}</span>
            <span>/</span>
            <span className="text-foreground line-clamp-1 max-w-[200px]">{product.title}</span>
          </div>
        </div>

        {/* ── Main content ── */}
        <section className="py-10 md:py-14">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

              {/* ── Image Gallery ── */}
              <div className="space-y-4">
                {/* Main image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-primary/5 border border-border shadow-lg">
                  {hasImages ? (
                    <img
                      src={images[activeImg]}
                      alt={product.title}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-20 h-20 text-primary/20" />
                    </div>
                  )}

                  {/* Prev/Next arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setActiveImg(i => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-card transition-colors shadow"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {activeImg + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImg === i ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Product Info ── */}
              <div className="flex flex-col">
                {/* Category + actions */}
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleWishlist}
                      title={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        wishlist
                          ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/30 dark:border-rose-800'
                          : 'border-border hover:bg-secondary text-muted-foreground'
                      }`}
                    >
                      <Heart className={`w-4 h-4 transition-all ${wishlist ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
                      {wishlist ? 'Liked' : 'Like'}
                    </button>
                    <button
                      onClick={handleShare}
                      title="Share this product"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border hover:bg-secondary text-muted-foreground text-xs font-semibold transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
                  {product.title}
                </h1>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{localViews ?? (product.views || 0)}</span>
                    <span>views</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{product.sales || 0}</span>
                    <span>sold</span>
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6 p-4 bg-secondary/40 rounded-2xl border border-border">
                  <IndianRupee className="w-5 h-5 text-foreground" />
                  <span className="text-4xl font-bold text-foreground">{product.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">Direct from artisan</span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">About this Product</h3>
                  <p className="text-muted-foreground leading-[1.8] text-sm">{product.description}</p>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: CheckCircle, label: 'Verified Artisan' },
                    { icon: Truck,       label: 'Direct Shipping' },
                    { icon: ShieldCheck, label: 'Secure Purchase' },
                    { icon: Sparkles,    label: '100% Handmade' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 rounded-xl px-3 py-2">
                      <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mt-auto">
                  {isOwner ? (
                    // Entrepreneur viewing their own product
                    <Link to={`/entrepreneur/products/edit/${product.id}`}>
                      <Button size="lg" className="gap-2 w-full text-base">
                        <Edit className="w-5 h-5" />
                        Edit Product
                      </Button>
                    </Link>
                  ) : (
                    // Not the owner (buyer, NGO, or logged out)
                    <>
                      <Button 
                        size="lg" 
                        className="gap-2 w-full text-base bg-[#25D366] hover:bg-[#20BE5A] text-white border-transparent" 
                        onClick={handleWhatsApp}
                      >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        WhatsApp Artisan
                      </Button>
                      <Button size="lg" variant="outline" className="gap-2 w-full text-base" onClick={handleEmail}>
                        <Mail className="w-5 h-5" />
                        Email Artisan
                      </Button>
                    </>
                  )}
                  <Link to="/marketplace">
                    <Button variant="outline" size="lg" className="gap-2 w-full">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Marketplace
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
