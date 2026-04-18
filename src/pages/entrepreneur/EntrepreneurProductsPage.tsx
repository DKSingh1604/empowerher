import { useState } from 'react';
import { Link } from 'react-router-dom';
import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEntrepreneurProducts, useDeleteProduct } from '@/hooks/useProducts';
import {
  Plus, IndianRupee, Eye, ShoppingBag, Edit, Trash,
  TrendingUp, Package, BarChart3, Sparkles, MoreVertical,
  Search, Grid3X3, List, AlertCircle, ExternalLink
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// ─── Status config ─────────────────────────────────────────────────


// ─── Product Card ──────────────────────────────────────────────────
const ProductCard = ({ product, onDelete }: { product: any; onDelete: (id: string) => void }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = product.images?.length > 0 && !imgError;
  const isDraft = product.status === 'draft';

  return (
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/20">
      {/* Image area */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-secondary to-primary/5 flex-shrink-0">
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <ShoppingBag className="w-12 h-12 text-primary/20" />
            <span className="text-xs text-muted-foreground">No image added</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />



        {/* Actions menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-card/80 backdrop-blur-sm hover:bg-card transition-colors border border-border/50 shadow-sm">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link to={`/marketplace/${product.id}`} className="cursor-pointer">
                  <ExternalLink className="w-4 h-4 mr-2 text-primary" />
                  View Live
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/entrepreneur/products/edit/${product.id}`} className="cursor-pointer">
                  <Edit className="w-4 h-4 mr-2 text-accent" />
                  Edit Product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (window.confirm('Delete this product? This cannot be undone.')) {
                    onDelete(product.id);
                  }
                }}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Multiple images indicator */}
        {product.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            +{product.images.length - 1} more
          </div>
        )}
      </div>

      {/* Draft warning — only for unpublished products */}
      {isDraft && (
        <div className="flex items-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2.5">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-700 font-medium">
            Not visible to buyers yet — <Link to={`/entrepreneur/products/edit/${product.id}`} className="underline">publish it</Link>
          </p>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <span className="text-xs font-semibold text-primary bg-primary/8 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mt-2 leading-snug line-clamp-1">
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>

        {/* Price + Stats row */}
        <div className="flex items-center justify-between py-3 border-t border-border mb-4">
          <div className="flex items-center gap-0.5 text-foreground font-bold text-xl">
            <IndianRupee className="w-4 h-4" />
            {product.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 bg-secondary px-2.5 py-1.5 rounded-md">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="font-semibold text-foreground">{product.views || 0}</span> views
            </span>
            <span className="flex items-center gap-1 bg-secondary px-2.5 py-1.5 rounded-md">
              <ShoppingBag className="w-3.5 h-3.5 text-primary" />
              <span className="font-semibold text-foreground">{product.sales || 0}</span> sold
            </span>
          </div>
        </div>

        {/* Edit CTA */}
        <Link to={`/entrepreneur/products/edit/${product.id}`} className="block">
          <Button variant="outline" size="sm" className="w-full gap-2 font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
            <Edit className="w-4 h-4" />
            Edit Product
          </Button>
        </Link>
      </div>
    </article>
  );
};

// ─── Stat card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, bg }: any) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border border-border bg-card`}>
    <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  </div>
);

// ─── Empty State ───────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-card rounded-2xl border border-dashed border-border">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
      <Package className="w-10 h-10 text-primary/50" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-2">No products yet</h3>
    <p className="text-muted-foreground max-w-xs mb-8">
      Start listing your handmade products and reach buyers across India.
    </p>
    <Link to="/entrepreneur/products/new">
      <Button className="gap-2">
        <Plus className="w-4 h-4" />
        Add Your First Product
      </Button>
    </Link>
  </div>
);

// ─── Main Page ─────────────────────────────────────────────────────
const EntrepreneurProductsPage = () => {
  const { user } = useAuth();
  const { data: userProducts, isLoading } = useEntrepreneurProducts(user?.id);
  const deleteProductMutation = useDeleteProduct();
  const [search, setSearch] = useState('');

  const products = userProducts || [];

  const filtered = products.filter(p => {
    return !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
  });

  const totalViews = products.reduce((s, p) => s + (p.views || 0), 0);
  const totalSales = products.reduce((s, p) => s + ((p as any).sales || 0), 0);
  const totalRevenue = products.reduce((s, p) => s + (p.price * ((p as any).sales || 0)), 0);

  const handleDelete = (id: string) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => toast({ title: 'Product deleted', description: 'Your product has been removed.' }),
    });
  };

  if (isLoading) {
    return (
      <EntrepreneurLayout title="My Products">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="h-52 bg-secondary" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-secondary rounded w-1/3" />
                <div className="h-5 bg-secondary rounded w-2/3" />
                <div className="h-3 bg-secondary rounded w-full" />
                <div className="h-9 bg-secondary rounded w-full mt-3" />
              </div>
            </div>
          ))}
        </div>
      </EntrepreneurLayout>
    );
  }

  return (
    <EntrepreneurLayout title="My Products">

      {/* ── Stats row ── */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Package}     label="Total Products" value={products.length}             color="text-primary"  bg="bg-primary/10" />
          <StatCard icon={Eye}         label="Total Views"    value={totalViews}                  color="text-accent"   bg="bg-accent/10" />
          <StatCard icon={ShoppingBag} label="Total Sales"    value={totalSales}                  color="text-success"  bg="bg-success/10" />
          <StatCard icon={IndianRupee} label="Revenue (₹)"   value={totalRevenue.toLocaleString()} color="text-warning"  bg="bg-warning/10" />
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        {/* Search only */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Add button */}
        <Link to="/entrepreneur/products/new">
          <Button className="gap-2 shadow-md hover:shadow-primary/20 hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* ── Result count ── */}
      {search && (
        <p className="text-sm text-muted-foreground mb-4">
          <span className="font-semibold text-foreground">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for "{search}"
        </p>
      )}

      {/* ── Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0
          ? filtered.map(product => (
              <ProductCard key={product.id} product={product} onDelete={handleDelete} />
            ))
          : products.length > 0
          ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No products match your search.</p>
              <button onClick={() => { setSearch(''); setFilterStatus('all'); }} className="text-primary text-sm mt-2 hover:underline">Clear filters</button>
            </div>
          )
          : <EmptyState />
        }
      </div>
    </EntrepreneurLayout>
  );
};

export default EntrepreneurProductsPage;
