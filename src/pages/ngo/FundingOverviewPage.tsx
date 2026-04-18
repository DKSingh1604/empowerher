import NGOLayout from '@/components/layout/NGOLayout';
import { useProducts } from '@/hooks/useProducts';
import { useEntrepreneurs } from '@/hooks/useProfiles';
import { IndianRupee, TrendingUp, BarChart3, Activity, Package, Users, Zap, ArrowUpRight, Star } from 'lucide-react';
import { useMemo } from 'react';

const CATEGORY_COLORS = [
  'from-primary to-primary/60',
  'from-accent to-accent/60',
  'from-success to-success/60',
  'from-warning to-warning/60',
  'from-purple-500 to-purple-300',
  'from-rose-500 to-rose-300',
  'from-cyan-500 to-cyan-300',
  'from-orange-500 to-orange-300',
];

const FundingOverviewPage = () => {
  const { data: allProducts, isLoading: pLoad } = useProducts();
  const { data: entrepreneurs, isLoading: eLoad } = useEntrepreneurs();

  const validProducts = allProducts || [];

  const totalGMV        = validProducts.reduce((s, p) => s + (p.price * (p.sales || 0)), 0);
  const totalProducts   = validProducts.length;
  const activeProducts  = validProducts.filter(p => p.status === 'active').length;
  const itemsSold       = validProducts.reduce((s, p) => s + (p.sales || 0), 0);
  const totalArtisans   = entrepreneurs?.length || 0;
  const avgPrice        = totalProducts > 0 ? Math.round(validProducts.reduce((s, p) => s + p.price, 0) / totalProducts) : 0;

  const revenueByCategory = useMemo(() =>
    validProducts.reduce((acc: Record<string, { revenue: number; count: number; sales: number }>, p) => {
      if (!acc[p.category]) acc[p.category] = { revenue: 0, count: 0, sales: 0 };
      acc[p.category].revenue += p.price * (p.sales || 0);
      acc[p.category].count   += 1;
      acc[p.category].sales   += (p.sales || 0);
      return acc;
    }, {}),
    [validProducts]
  );

  const categories = Object.entries(revenueByCategory).sort((a, b) => b[1].revenue - a[1].revenue);
  const sellingArtisans = entrepreneurs?.filter(e => validProducts.some(p => p.userId === e.userId)).length || 0;
  const efficiencyRate  = itemsSold > 0 && totalProducts > 0 ? (itemsSold / totalProducts).toFixed(1) : '0';
  const topCategory     = categories[0]?.[0] || '—';

  if (pLoad || eLoad) {
    return (
      <NGOLayout title="Funding Overview">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-card rounded-2xl border border-border" />
          ))}
        </div>
      </NGOLayout>
    );
  }

  return (
    <NGOLayout title="Funding Overview">

      {/* ── Intro ── */}
      <div className="mb-8">
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          Real-time economic impact of the EmpowerHer platform. All figures are calculated live from marketplace data — no estimates, no dummy numbers.
        </p>
      </div>

      {/* ── Hero GMV Banner ── */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent/70 rounded-2xl p-7 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Zap className="w-3 h-3" /> Live Market Data
            </div>
            <p className="text-white/70 text-sm mb-1">Total Gross Market Value (GMV)</p>
            <p className="text-5xl font-bold text-white mb-2">₹{totalGMV.toLocaleString()}</p>
            <p className="text-white/60 text-sm">Enabled through {itemsSold} artisan product sales</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg Product Price', value: `₹${avgPrice.toLocaleString()}` },
              { label: 'Conversion Rate',   value: `${efficiencyRate}x` },
              { label: 'Active Listings',   value: activeProducts },
              { label: 'Selling Artisans',  value: sellingArtisans },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15">
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-white/60 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Users,        label: 'Registered Artisans',  value: totalArtisans,  sub: 'on platform',        color: 'text-primary',  bg: 'bg-primary/10'  },
          { icon: Package,      label: 'Products Listed',       value: totalProducts,  sub: 'on marketplace',     color: 'text-accent',   bg: 'bg-accent/10'   },
          { icon: TrendingUp,   label: 'Units Sold',            value: itemsSold,      sub: 'by artisans',        color: 'text-success',  bg: 'bg-success/10'  },
          { icon: BarChart3,    label: 'Categories Active',     value: categories.length, sub: 'craft types',    color: 'text-warning',  bg: 'bg-warning/10'  },
        ].map(({ icon: Icon, label, value, sub, color, bg }) => (
          <div key={label} className="bg-card rounded-2xl border border-border p-5 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-lg transition-all">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">

        {/* ── Revenue by Category ── */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">Revenue by Craft Category</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Live breakdown of marketplace GMV</p>
            </div>
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full">{categories.length} active</span>
          </div>

          {categories.length > 0 ? (
            <div className="space-y-5">
              {categories.map(([cat, data], i) => {
                const pct = totalGMV > 0 ? (data.revenue / totalGMV) * 100 : 0;
                const gradient = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {i === 0 && <Star className="w-3.5 h-3.5 text-warning fill-warning" />}
                        <span className="text-sm font-semibold text-foreground">{cat}</span>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{data.count} products</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-foreground">₹{data.revenue.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-2">{pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{data.sales} units sold</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-20" />
              No revenue data yet — entrepreneurs need to make sales first.
            </div>
          )}
        </div>

        {/* ── Insights Sidebar ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Market insights */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Market Insights
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Market Efficiency',   value: `${efficiencyRate}x`,  desc: 'avg sales per product' },
                { label: 'Active Seller Rate',  value: `${totalArtisans > 0 ? Math.round((sellingArtisans / totalArtisans) * 100) : 0}%`, desc: 'artisans are selling' },
                { label: 'Top Performing',      value: topCategory.split(' ')[0], desc: 'craft category by GMV' },
              ].map(({ label, value, desc }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Funding recommendations */}
          <div className="bg-gradient-to-br from-primary/8 to-accent/5 rounded-2xl border border-primary/15 p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-primary" /> Funding Recommendations
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>💡 Direct grants toward artisans <strong className="text-foreground">lacking inventory</strong> in high-demand categories.</p>
              <p>📊 Use marketplace engagement logs to <strong className="text-foreground">verify financial stability</strong> before offering scaling capital.</p>
              <p>🎯 <strong className="text-foreground">{topCategory !== '—' ? topCategory : 'High-performing categories'}</strong> shows the highest ROI for micro-loans.</p>
            </div>
          </div>

          {/* Platform health */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-3">Platform Health</h3>
            {[
              { label: 'Entrepreneurs', val: totalArtisans,     max: Math.max(totalArtisans, 10), color: 'bg-primary' },
              { label: 'Selling',       val: sellingArtisans,    max: Math.max(totalArtisans, 10), color: 'bg-success' },
              { label: 'Products',      val: totalProducts,      max: Math.max(totalProducts, 10), color: 'bg-accent' },
            ].map(({ label, val, max, color }) => (
              <div key={label} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{val}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min((val / max) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NGOLayout>
  );
};

export default FundingOverviewPage;
