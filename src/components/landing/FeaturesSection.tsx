import { Smartphone, Globe, HeartHandshake, Zap, Lock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Mobile-First Platform',
    description: 'Designed for women who use smartphones. Easy listing, tracking, and selling — no laptop needed.',
  },
  {
    icon: Globe,
    title: 'Reach Buyers Nationwide',
    description: 'Your handmade products can reach customers from Mumbai to Guwahati without ever leaving your village.',
  },
  {
    icon: HeartHandshake,
    title: 'NGO & Grant Support',
    description: 'Get matched with funding partners, microloans, and NGOs aligned with your craft category.',
  },
  {
    icon: Zap,
    title: 'Instant Product Listing',
    description: 'Go live in minutes. Add photos, set your price, and your product is visible to thousands instantly.',
  },
  {
    icon: Lock,
    title: 'Safe & Secure',
    description: 'Your data, earnings, and profile are protected with enterprise-grade security at all times.',
  },
  {
    icon: BarChart3,
    title: 'Track Your Growth',
    description: 'Real-time dashboards show your views, sales, and revenue so you always know where you stand.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-main">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            Why EmpowerHer
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We built EmpowerHer specifically for Indian women artisans — with the tools, network, and support that traditional marketplaces never offered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="group relative p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
