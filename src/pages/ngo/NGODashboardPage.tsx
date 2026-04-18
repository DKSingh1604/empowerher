import NGOLayout from '@/components/layout/NGOLayout';
import { useEntrepreneurs } from '@/hooks/useProfiles';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import {
  MapPin, TrendingUp, Users, IndianRupee, Package,
  Activity, Search, ShoppingBag, Star, X
} from 'lucide-react';
import { useState, useMemo } from 'react';

// ─── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color, bg }: any) => (
  <div className={`bg-card rounded-2xl border border-border p-5 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-lg transition-all`}>
    <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm font-medium text-foreground">{label}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ─── Entrepreneur Card ─────────────────────────────────────────────
const EntrepreneurCard = ({ entrepreneur, products }: { entrepreneur: any; products: any[] }) => {
  const myProducts = products.filter(p => p.userId === entrepreneur.userId);
  const totalRevenue = myProducts.reduce((s, p) => s + (p.price * (p.sales || 0)), 0);
  const totalViews = myProducts.reduce((s, p) => s + (p.views || 0), 0);
  const isActive = myProducts.length > 0;
  const initials = entrepreneur.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <article className="bg-card rounded-2xl border border-border overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
      {/* Top colored strip */}
      <div className={`h-1.5 w-full ${isActive ? 'bg-gradient-to-r from-success to-primary' : 'bg-secondary'}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-base">{initials}</span>
            </div>
            <div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {entrepreneur.name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {entrepreneur.location || 'Location not set'}
              </p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
            isActive ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-success' : 'bg-warning'}`} />
            {isActive ? 'Has Products' : 'Needs Support'}
          </span>
        </div>

        {/* Skill tag */}
        {entrepreneur.skillCategory && (
          <div className="mb-4">
            <span className="bg-primary/8 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
              {entrepreneur.skillCategory}
            </span>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-foreground">{myProducts.length}</p>
            <p className="text-[10px] text-muted-foreground">Products</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-foreground">{totalViews}</p>
            <p className="text-[10px] text-muted-foreground">Views</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
            <p className="text-sm font-bold text-foreground">₹{totalRevenue > 0 ? `${(totalRevenue/1000).toFixed(1)}k` : '0'}</p>
            <p className="text-[10px] text-muted-foreground">Revenue</p>
          </div>
        </div>

        {/* Bio */}
        {entrepreneur.bio && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">{entrepreneur.bio}</p>
        )}

        {/* Action */}
        <a href="/marketplace" className="block w-full text-center py-2 px-4 rounded-xl bg-primary/8 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
          View Products →
        </a>
      </div>
    </article>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────
const NGODashboardPage = () => {
  const { profile } = useAuth();
  const { data: entrepreneurs, isLoading: isLoadingMakers } = useEntrepreneurs();
  const { data: allProducts, isLoading: isLoadingProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'new'>('all');

  const validEntrepreneurs = useMemo(() =>
    entrepreneurs?.filter(e => e.userId !== profile?.user_id) || [],
    [entrepreneurs, profile]
  );
  const validProducts = allProducts || [];

  const activeCount = validEntrepreneurs.filter(e => validProducts.some(p => p.userId === e.userId)).length;
  const totalRevenue = validProducts.reduce((s, p) => s + (p.price * (p.sales || 0)), 0);
  const totalProducts = validProducts.length;

  const filtered = useMemo(() => {
    let list = validEntrepreneurs;
    if (filter === 'active') list = list.filter(e => validProducts.some(p => p.userId === e.userId));
    if (filter === 'new')    list = list.filter(e => !validProducts.some(p => p.userId === e.userId));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.name?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.skillCategory?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [validEntrepreneurs, validProducts, filter, search]);

  const isLoading = isLoadingMakers || isLoadingProducts;

  return (
    <NGOLayout title="Entrepreneurs">

      {/* ── Stats ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users}       label="Total Entrepreneurs" value={validEntrepreneurs.length} sub="registered on platform" color="text-primary"  bg="bg-primary/10" />
        <StatCard icon={TrendingUp}  label="Actively Selling"    value={activeCount}               sub="have listed products"  color="text-success" bg="bg-success/10" />
        <StatCard icon={Package}     label="Total Products"       value={totalProducts}             sub="on the marketplace"    color="text-accent"  bg="bg-accent/10" />
        <StatCard icon={IndianRupee} label="Trade Volume"         value={`₹${totalRevenue.toLocaleString()}`} sub="total GMV enabled" color="text-warning" bg="bg-warning/10" />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, location, skill…"
              className="pl-9 pr-8 py-2 text-sm rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 w-64"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-secondary">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex gap-1 bg-secondary rounded-xl p-1">
            {(['all', 'active', 'new'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  filter === f ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}>
                {f === 'all' ? `All (${validEntrepreneurs.length})` : f === 'active' ? `Has Products (${activeCount})` : `Needs Support (${validEntrepreneurs.length - activeCount})`}
              </button>
            ))}
          </div>
        </div>

        {search && (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ── Grid ── */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
              <div className="h-1.5 bg-secondary" />
              <div className="p-5 space-y-3">
                <div className="flex gap-3"><div className="w-12 h-12 rounded-xl bg-secondary" /><div className="flex-1 space-y-2"><div className="h-4 bg-secondary rounded w-2/3" /><div className="h-3 bg-secondary rounded w-1/2" /></div></div>
                <div className="grid grid-cols-3 gap-2">{Array.from({ length: 3 }).map((_, j) => <div key={j} className="h-12 bg-secondary rounded-xl" />)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(e => <EntrepreneurCard key={e.id} entrepreneur={e} products={validProducts} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-2xl border border-dashed border-border">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
            <Users className="w-9 h-9 text-primary/50" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            {search ? 'No results found' : 'No entrepreneurs yet'}
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            {search ? 'Try a different search term.' : 'Entrepreneurs will appear here once they register.'}
          </p>
          {search && <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-primary text-sm mt-4 hover:underline">Clear filters</button>}
        </div>
      )}
    </NGOLayout>
  );
};

export default NGODashboardPage;
