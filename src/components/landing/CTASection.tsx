import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Background accent shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container-main relative">
        {/* Main CTA box */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-10 md:p-16 text-center shadow-2xl">
          {/* Dot grid overlay */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-2 rounded-full text-sm font-semibold mb-7">
              <Heart className="w-4 h-4" /> Join Our Growing Community
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform<br />Your Craft into a Business?
            </h2>

            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you're a woman artisan looking to grow your business, or an organization wanting to make a real difference — EmpowerHer is built for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?mode=register&role=entrepreneur">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-white text-primary hover:bg-white/90 font-bold shadow-2xl">
                  <Sparkles className="w-5 h-5" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=register&role=ngo">
                <Button size="xl" className="w-full sm:w-auto border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-primary font-bold transition-all">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Three reassurance cards below */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: ShieldCheck,    title: 'Safe & Trusted',    body: 'Every artisan is personally verified. Your data and earnings are always secure.' },
            { icon: HeartHandshake, title: 'NGO Backed',        body: 'Supported by leading NGOs and social enterprises committed to women empowerment.' },
            { icon: Sparkles,       title: 'Free to Start',     body: 'Zero fees to create your profile and list your first products. Start today.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-background hover:bg-secondary/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
