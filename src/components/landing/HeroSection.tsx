import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container-main relative py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Empowering 100+ Women Entrepreneurs</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
              Empowering Women to Build{' '}
              <span className="text-gradient">Sustainable Businesses</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-1">
              Connect with buyers, access funding, and grow your skills. EmpowerHer helps rural and semi-urban women artisans transform their crafts into thriving enterprises.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up stagger-2">
              <Link to="/auth?mode=register&role=entrepreneur">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
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
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in stagger-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join 100+ women already growing their business
              </p>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-hover">
              <img 
                src={heroImage} 
                alt="Women artisans creating handmade products together" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-hover border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success text-xl">📈</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹5L+</p>
                  <p className="text-sm text-muted-foreground">Trade Enabled</p>
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
