import { UserPlus, Package, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Register & List Products',
    description: 'Create your profile in minutes. Add your handmade products with photos and pricing. No technical skills needed.',
    step: '01',
  },
  {
    icon: Package,
    title: 'Get Support & Funding',
    description: 'Connect with NGOs and funding partners who believe in your craft. Access microloans and mentorship programs.',
    step: '02',
  },
  {
    icon: TrendingUp,
    title: 'Grow Skills & Income',
    description: 'Receive personalized skill recommendations. Track your growth and expand your customer base nationwide.',
    step: '03',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container-main">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your entrepreneurial journey in three simple steps. We've made it easy for you to focus on what you do best – creating beautiful products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="card-interactive relative bg-background text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
