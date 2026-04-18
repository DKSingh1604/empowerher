import { UserPlus, Package, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Register & List Products',
    description: 'Create your profile in minutes. Add your handmade products with photos and pricing. No technical skills needed — we guide you every step.',
    color: 'from-primary/20 to-primary/5',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Package,
    number: '02',
    title: 'Get Support & Funding',
    description: 'Connect with NGOs and funding partners who believe in your craft. Access microloans, grants, and mentorship programs tailored for you.',
    color: 'from-accent/20 to-accent/5',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Grow Skills & Income',
    description: 'Receive personalized growth recommendations. Track your progress, build loyal customers, and expand your business across India.',
    color: 'from-success/20 to-success/5',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container-main relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start your entrepreneurial journey in three simple steps. We've made it easy for you to focus on what you do best — creating beautiful, meaningful products.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line between steps */}
          <div className="hidden md:block absolute top-[72px] left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-0.5 bg-gradient-to-r from-primary/30 via-accent/30 to-success/30" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className={`relative rounded-2xl border border-border bg-gradient-to-b ${step.color} p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}>
                {/* Step number bubble */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-background">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl ${step.iconBg} flex items-center justify-center mt-4`}>
                  <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>

                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/40 rotate-90" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
