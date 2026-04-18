import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { useEntrepreneurProducts } from '@/hooks/useProducts';
import { useAuth } from '@/contexts/AuthContext';
import {
  Package, Eye, ShoppingBag, TrendingUp, Lightbulb,
  BookOpen, Camera, Tag, ArrowRight, IndianRupee, Star, Zap
} from 'lucide-react';
import { SkillRecommendation } from '@/types';
import { Link } from 'react-router-dom';

// Rule-based recommendations
const getSkillRecommendations = (category: string, sales: number): SkillRecommendation[] => {
  const all: SkillRecommendation[] = [
    {
      id: '1', skillName: 'Product Photography', priority: 'high',
      description: 'Learn to take professional photos of your products using just your smartphone.',
      reason: 'Good photos can increase your product views by up to 40%.',
    },
    {
      id: '2', skillName: 'Smart Pricing Strategy', priority: 'medium',
      description: 'Understand how to price handmade products to attract buyers while keeping profits healthy.',
      reason: 'Well-priced products convert 3× more views into sales.',
    },
    {
      id: '3', skillName: 'Writing Product Descriptions', priority: 'low',
      description: 'Craft compelling descriptions that tell the story of your product and its making.',
      reason: 'Stories help buyers connect emotionally with your craft.',
    },
    {
      id: '4', skillName: 'Natural Dyeing Techniques', priority: 'medium',
      description: 'Explore eco-friendly natural dyes to create unique colors for conscious consumers.',
      reason: 'Eco-friendly products command premium prices among urban buyers.',
    },
    {
      id: '5', skillName: 'Packaging for Fragile Items', priority: 'high',
      description: 'Learn safe packaging to ensure your pottery reaches customers intact.',
      reason: 'Good packaging reduces returns and increases repeat orders.',
    },
  ];
  const relevant = category === 'Textiles & Weaving' ? [all[0], all[1], all[3]]
    : category === 'Pottery & Ceramics' ? [all[0], all[4], all[2]]
    : sales < 5 ? [all[0], all[1], all[2]]
    : [all[1], all[2], all[0]];
  return relevant.slice(0, 3);
};

const PRIORITY_CONFIG = {
  high:   { label: 'High Impact', bg: 'bg-accent/10',   text: 'text-accent',          border: 'border-accent/20',   dot: 'bg-accent',   icon: Camera },
  medium: { label: 'Helpful',     bg: 'bg-primary/10',  text: 'text-primary',         border: 'border-primary/20', dot: 'bg-primary',  icon: Tag },
  low:    { label: 'Optional',    bg: 'bg-secondary',   text: 'text-muted-foreground', border: 'border-border',     dot: 'bg-muted-foreground', icon: BookOpen },
};

const GrowthPage = () => {
  const { user } = useAuth();
  const { data: userProducts, isLoading } = useEntrepreneurProducts(user?.id);

  if (isLoading) {
    return (
      <EntrepreneurLayout title="My Growth">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-card rounded-2xl border border-border" />
          ))}
        </div>
      </EntrepreneurLayout>
    );
  }

  const products = userProducts || [];
  const totalViews  = products.reduce((s, p) => s + (p.views || 0), 0);
  const totalSales  = products.reduce((s, p) => s + ((p as any).sales || 0), 0);
  const totalRevenue = products.reduce((s, p) => s + (p.price * ((p as any).sales || 0)), 0);
  const conversionRate = totalViews > 0 ? ((totalSales / totalViews) * 100).toFixed(1) : '0.0';
  const primaryCategory = products[0]?.category || 'Textiles & Weaving';
  const recommendations = getSkillRecommendations(primaryCategory, totalSales);

  const stats = [
    { icon: Package,      label: 'Products',    value: products.length,            sub: 'listed',       color: 'text-primary', bg: 'bg-primary/10',  border: 'border-primary/20' },
    { icon: Eye,          label: 'Views',       value: totalViews,                 sub: 'total',        color: 'text-accent',  bg: 'bg-accent/10',   border: 'border-accent/20' },
    { icon: ShoppingBag,  label: 'Sales',       value: totalSales,                 sub: 'completed',    color: 'text-success', bg: 'bg-success/10',  border: 'border-success/20' },
    { icon: TrendingUp,   label: 'Conversion',  value: `${conversionRate}%`,       sub: 'view → sale',  color: 'text-warning', bg: 'bg-warning/10',  border: 'border-warning/20' },
  ];

  return (
    <EntrepreneurLayout title="My Growth">

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, sub, color, bg, border }) => (
          <div key={label} className={`bg-card rounded-2xl border ${border} p-5 group hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}>
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Revenue row ── */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 mb-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <IndianRupee className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-white/75 text-sm">Total Revenue Earned</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
          <span className="text-white/80 text-sm">Keep listing products to grow faster!</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Skill Recommendations ── */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Recommended Skills for You</h2>
              <p className="text-sm text-muted-foreground">Based on your category: <strong>{primaryCategory}</strong></p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map(rec => {
              const cfg = PRIORITY_CONFIG[rec.priority as keyof typeof PRIORITY_CONFIG];
              const Icon = cfg.icon;
              return (
                <div key={rec.id} className={`p-5 rounded-2xl border ${cfg.border} ${cfg.bg} group hover:-translate-y-0.5 transition-all`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                      <span className={`text-xs font-bold uppercase tracking-wide ${cfg.text}`}>{cfg.label}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-card flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${cfg.text}`} />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">{rec.skillName}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{rec.description}</p>
                  <div className="flex items-start gap-2 bg-card/70 rounded-xl p-3 text-xs">
                    <Zap className="w-3.5 h-3.5 text-warning flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80"><strong>Why this helps:</strong> {rec.reason}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-secondary/50 rounded-xl text-sm text-muted-foreground">
            <strong className="text-foreground">How this works:</strong> Our system analyzes your product category and sales data to suggest skills that have helped other artisans grow their income.
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Quick actions */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Add a new product',  href: '/entrepreneur/products/new',  color: 'bg-primary/10 text-primary' },
                { label: 'View my products',   href: '/entrepreneur/products',       color: 'bg-accent/10 text-accent' },
                { label: 'Update my profile',  href: '/entrepreneur/profile',        color: 'bg-success/10 text-success' },
              ].map(({ label, href, color }) => (
                <Link key={href} to={href} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Growth tips */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl border border-primary/10 p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary fill-primary" /> Growth Tips
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📸 Products with <strong className="text-foreground">3+ photos</strong> get 60% more views.</p>
              <p>🏷️ Adding a <strong className="text-foreground">detailed description</strong> doubles buyer trust.</p>
              <p>🔄 <strong className="text-foreground">Update your listing</strong> regularly to stay relevant.</p>
            </div>
          </div>
        </div>
      </div>
    </EntrepreneurLayout>
  );
};

export default GrowthPage;
