import { Users, Package, IndianRupee, Building } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '100+',
    label: 'Women Onboarded',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Package,
    value: '50+',
    label: 'Products Listed',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: IndianRupee,
    value: '₹5L+',
    label: 'Trade Enabled',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: Building,
    value: '10+',
    label: 'NGO Partners',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
];

const ImpactSection = () => {
  return (
    <section className="py-16 md:py-24 gradient-warm">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real change, real numbers. See how EmpowerHer is transforming lives across rural India.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-interactive bg-card text-center py-8"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
