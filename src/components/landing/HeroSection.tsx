import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-gradient-to-br from-background via-secondary/40 to-primary/5">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary/8 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl translate-x-1/3" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/4 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container-main relative py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Content ── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>India's Premier Women Artisan Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 animate-slide-up">
              Empowering<br />Women to Build{' '}
              <span className="text-gradient">Sustainable<br />Businesses</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-1">
              Connect with buyers, access funding, and grow your skills. EmpowerHer helps rural and semi-urban women artisans transform their crafts into thriving enterprises.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-2">
              <Link to="/auth?mode=register&role=entrepreneur">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2 shadow-xl">
                  <Users className="w-5 h-5" />
                  Join as Entrepreneur
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth?mode=register&role=ngo">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Partner as NGO
                </Button>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-6 mt-12 justify-center lg:justify-start animate-fade-in stagger-3">
              {[
                { icon: ShieldCheck, text: 'Verified Artisans' },
                { icon: TrendingUp,  text: 'Real-time Growth' },
                { icon: Sparkles,    text: 'NGO Backed' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image ── */}
          <div className="relative animate-scale-in hidden lg:block">
            {/* Floating glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-2xl scale-105" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src={heroImage}
                alt="Women artisans creating handmade products together"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
            </div>

            {/* Floating card – trade volume */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-2xl border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <span className="text-success text-xl">📈</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹5L+</p>
                  <p className="text-xs text-muted-foreground">Trade Enabled</p>
                </div>
              </div>
            </div>

            {/* Floating card – women count */}
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-2xl border border-border animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl">👩‍🎨</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100+</p>
                  <p className="text-xs text-muted-foreground">Women Empowered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
