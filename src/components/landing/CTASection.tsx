import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container-main relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Join Our Growing Community</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Craft into a Business?
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Whether you're a woman artisan looking to grow your business, or an organization wanting to make a difference – we're here to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth?mode=register&role=entrepreneur">
              <Button 
                size="xl" 
                className="w-full sm:w-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth?mode=register&role=ngo">
              <Button 
                size="xl" 
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
