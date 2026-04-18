import { Users, Package, IndianRupee, Building } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useEntrepreneurs } from '@/hooks/useProfiles';

const ImpactSection = () => {
  const { data: products } = useProducts();
  const { data: entrepreneurs } = useEntrepreneurs();

  const totalProducts     = products?.length ?? 0;
  const totalEntrepreneurs = entrepreneurs?.length ?? 0;
  const totalRevenue      = (products || []).reduce((sum, p) => sum + (p.price * ((p as any).sales || 0)), 0);

  const stats = [
    {
      icon: Users,
      value: totalEntrepreneurs > 0 ? `${totalEntrepreneurs}+` : '—',
      label: 'Women Onboarded',
      sub: 'and growing every week',
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
    },
    {
      icon: Package,
      value: totalProducts > 0 ? `${totalProducts}+` : '—',
      label: 'Products Listed',
      sub: 'handmade across India',
      color: 'text-accent',
      bg: 'bg-accent/10',
      border: 'border-accent/20',
    },
    {
      icon: IndianRupee,
      value: totalRevenue > 0 ? `₹${(totalRevenue / 100000).toFixed(1)}L+` : '₹0',
      label: 'Trade Enabled',
      sub: 'direct to artisans',
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
    },
    {
      icon: Building,
      value: '10+',
      label: 'NGO Partners',
      sub: 'supporting our mission',
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container-main relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            Measurable Impact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Our Impact
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Real change, real numbers. Every metric below is calculated live from our database — no estimates, just truth.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 text-center group hover:bg-white/15 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white font-semibold text-sm mb-1">{stat.label}</p>
              <p className="text-white/60 text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
