import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useProducts, useIncrementView } from '@/hooks/useProducts';
import { productCategories } from '@/data/mockData';
import {
  IndianRupee, Eye, ShoppingBag, Search, SlidersHorizontal,
  X, Sparkles, TrendingUp, Package, Users, ShieldCheck,
  Truck, HeartHandshake, Star, ArrowRight, Layers, Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// ─── Category icon map ─────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; emoji: string }> = {
  'Textiles & Weaving':     { bg: 'bg-pink-100 dark:bg-pink-900/20',   text: 'text-pink-600',   emoji: '🧵' },
  'Pottery & Ceramics':     { bg: 'bg-amber-100 dark:bg-amber-900/20', text: 'text-amber-600',  emoji: '🏺' },
  'Jewelry & Accessories':  { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600', emoji: '💍' },
  'Food & Organic Products':{ bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600',  emoji: '🌿' },
  'Home Decor':             { bg: 'bg-blue-100 dark:bg-blue-900/20',   text: 'text-blue-600',   emoji: '🏡' },
  'Bags & Accessories':     { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600', emoji: '👜' },
  'Art & Paintings':        { bg: 'bg-rose-100 dark:bg-rose-900/20',   text: 'text-rose-600',   emoji: '🎨' },
  'Other':                  { bg: 'bg-secondary',                       text: 'text-foreground',  emoji: '✨' },
};

// ─── Trust Badges ──────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: ShieldCheck,     title: 'Verified Artisans',    desc: 'Every seller is a real woman entrepreneur personally onboarded to the platform.' },
  { icon: HeartHandshake,  title: 'Social Impact',        desc: '100% of proceeds go directly to the artisan, empowering her livelihood.' },
  { icon: Star,            title: 'Handmade Quality',     desc: 'Each product is unique—crafted by hand using traditional skills and materials.' },
  { icon: Truck,           title: 'Direct from Maker',    desc: 'Buy straight from the source. No middlemen, no markups, real craft.' },
];

// ─── Product Card ──────────────────────────────────────────────────
const ProductCard = ({ product, featured = false }: { product: any; featured?: boolean }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.images && product.images.length > 0 && !imgError;
  const catStyle = CATEGORY_COLORS[product.category] || CATEGORY_COLORS['Other'];
  const cardRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);
  const incrementView = useIncrementView();

  // Local view count — starts at DB value, ticks up instantly when card is seen
  const [localViews, setLocalViews] = useState<number>(product.views || 0);

  // Sync if product.views updates from cache
  useEffect(() => {
    setLocalViews(product.views || 0);
  }, [product.views]);

  // Increment once when ≥50% of card is visible on screen
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          setLocalViews(v => v + 1);        // instant UI update
          incrementView.mutate(product.id); // persist to DB + update cache
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id]);

  return (
    <article ref={cardRef} className={`bg-card rounded-2xl border border-border overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 ${featured ? 'ring-2 ring-primary/20' : ''}`}>
      {featured && (
        <div className="bg-primary px-3 py-1 text-center">
          <span className="text-primary-foreground text-xs font-semibold tracking-wide uppercase">✦ Newest Arrival</span>
        </div>
      )}
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-secondary flex-shrink-0">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-primary/5">
            <span className="text-4xl">{catStyle.emoji}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catStyle.bg} ${catStyle.text}`}>
            {product.category}
          </span>
        </div>
        {product.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            +{product.images.length - 1} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base mb-1 leading-snug">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 min-h-[40px]">
          {product.description?.substring(0, 75)}{product.description?.length > 75 ? '...' : ''}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-foreground font-bold text-xl">
            <IndianRupee className="w-4 h-4" />
            {product.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            <Eye className="w-3 h-3" />
            {localViews}
          </div>
        </div>

        {/* Artisan + View link */}
        <Link
          to={`/marketplace/${product.id}`}
          className="flex items-center gap-2 pt-3 border-t border-border group/link"
          onClick={e => e.stopPropagation()}
        >
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary text-xs font-semibold">
            {product.entrepreneurName?.charAt(0) || '?'}
          </div>
          <span className="text-xs text-muted-foreground flex-1 truncate">{product.entrepreneurName || 'Artisan'}</span>
          <span className="text-xs font-semibold text-primary group-hover/link:gap-2 flex items-center gap-1 transition-all">
            View details <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </article>
  );
};

// ─── Skeleton Card ─────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
    <div className="h-52 bg-secondary" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-secondary rounded w-1/3" />
      <div className="h-5 bg-secondary rounded w-3/4" />
      <div className="h-3 bg-secondary rounded w-full" />
      <div className="h-3 bg-secondary rounded w-4/5" />
      <div className="h-8 bg-secondary rounded w-full mt-2" />
    </div>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────
const MarketplacePage = () => {
  const { data: products, isLoading } = useProducts();
  const { role } = useAuth();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'popular'>('newest');

  // Live stats
  const totalProducts = products?.length ?? 0;
  const totalArtisans = useMemo(() => new Set((products || []).map((p: any) => p.userId)).size, [products]);
  const totalViews = (products || []).reduce((s: number, p: any) => s + (p.views || 0), 0);

  // Category counts from live data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (products || []).forEach((p: any) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [products]);



  // Filtered list
  const filtered = useMemo(() => {
    let list = [...(products || [])];
    if (activeCategory !== 'All') list = list.filter((p: any) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p: any) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.entrepreneurName?.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price_asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'popular':    list.sort((a, b) => (b.views || 0) - (a.views || 0)); break;
    }
    return list;
  }, [products, activeCategory, search, sortBy]);

  const isFiltered = search.trim() !== '' || activeCategory !== 'All';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="container-main relative text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Handcrafted with love across India
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-5 leading-tight">
              Artisan <span className="opacity-80">Marketplace</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Every purchase directly empowers a woman entrepreneur and her family. Shop unique, handmade goods crafted with skill and tradition.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, artisans, categories..."
                className="w-full pl-12 pr-12 py-4 rounded-2xl border-0 bg-card text-foreground placeholder:text-muted-foreground shadow-2xl focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Quick stat pills */}
            {!isLoading && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <span className="bg-white/10 text-primary-foreground text-sm px-4 py-1.5 rounded-full">
                  🛍️ {totalProducts} Products
                </span>
                <span className="bg-white/10 text-primary-foreground text-sm px-4 py-1.5 rounded-full">
                  👩‍🎨 {totalArtisans} Artisans
                </span>
                <span className="bg-white/10 text-primary-foreground text-sm px-4 py-1.5 rounded-full">
                  👁️ {totalViews.toLocaleString()} Total Views
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── TRUST BADGES ─────────────────────────────── */}
        <section className="py-10 bg-secondary/40 border-b border-border">
          <div className="container-main">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOP BY CATEGORY ─────────────────────────── */}
        <section className="py-14 md:py-16">
          <div className="container-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shop by Category</h2>
                <p className="text-muted-foreground mt-1">Browse handmade goods by craft type</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {productCategories.map(cat => {
                const style = CATEGORY_COLORS[cat] || CATEGORY_COLORS['Other'];
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-md ${
                      activeCategory === cat ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'
                    }`}
                  >
                    <span className="text-2xl">{style.emoji}</span>
                    <span className="text-xs font-medium text-foreground text-center leading-tight">{cat}</span>
                    {count > 0 && (
                      <span className="text-xs text-primary font-semibold">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>



        {/* ── FILTERS + FULL GRID ───────────────────────── */}
        <section id="products-grid" className="py-14 border-t border-border">
          <div className="container-main">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                  <Layers className="w-6 h-6 text-primary" />
                  All Products
                </h2>
                {!isLoading && <p className="text-muted-foreground mt-1">{totalProducts} items from {totalArtisans} artisans</p>}
              </div>
            </div>

            {/* Sticky filter bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 py-4 border-y border-border">
              <div className="flex gap-2 flex-wrap items-center">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {['All', ...productCategories].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat} {categoryCounts[cat] ? `(${categoryCounts[cat]})` : cat === 'All' ? `(${totalProducts})` : ''}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="text-sm border border-input bg-background rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                </select>
              </div>
            </div>

            {isFiltered && (
              <div className="mb-4 flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  <strong className="text-foreground">{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}
                  {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                  {search ? ` matching "${search}"` : ''}
                </span>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="text-primary hover:underline text-xs font-medium">
                  Clear all
                </button>
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product: any) => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {isFiltered ? <Search className="w-9 h-9 text-primary/50" /> : <ShoppingBag className="w-9 h-9 text-primary/50" />}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isFiltered ? `No results found` : 'No products yet'}
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  {isFiltered
                    ? 'Try clearing your filters or searching something else.'
                    : 'Our artisans are preparing their first listings. Come back soon!'}
                </p>
                {isFiltered && (
                  <Button variant="outline" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
                    Clear Filters
                  </Button>
                )}
                {!isFiltered && role === 'entrepreneur' && (
                  <Link to="/entrepreneur/products/new">
                    <Button className="gap-2"><Sparkles className="w-4 h-4" /> Add First Product</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── IMPACT BANNER ─────────────────────────────── */}
        <section className="py-14 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container-main">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <IndianRupee className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">100%</p>
                <p className="text-primary-foreground/80 text-sm">Goes to the artisan — no platform cut</p>
              </div>
              <div>
                <HeartHandshake className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">Direct</p>
                <p className="text-primary-foreground/80 text-sm">Buy straight from the maker's hands</p>
              </div>
              <div>
                <Star className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">Unique</p>
                <p className="text-primary-foreground/80 text-sm">Every piece is one of a kind, handcrafted</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ENTREPRENEUR CTA ──────────────────────────── */}
        {role === 'entrepreneur' && (
          <section className="py-10 border-t border-border bg-secondary/30">
            <div className="container-main text-center">
              <p className="text-muted-foreground mb-3">Your handmade product could reach thousands of buyers.</p>
              <Link to="/entrepreneur/products/new">
                <Button className="gap-2"><Sparkles className="w-4 h-4" /> Add a Product Now</Button>
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePage;
