import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { mockProducts, mockEntrepreneurs } from '@/data/mockData';
import { IndianRupee, MapPin, Eye, ShoppingBag } from 'lucide-react';

const MarketplacePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-background via-secondary/30 to-primary/5">
          <div className="container-main text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-slide-up">
              Marketplace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
              Discover unique handmade products crafted with love by women artisans across India.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container-main">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => {
                const entrepreneur = mockEntrepreneurs.find(e => e.id === product.userId);
                
                return (
                  <article key={product.id} className="card-interactive group overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden bg-secondary">
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                      {product.status === 'in_review' && (
                        <div className="absolute top-3 left-3 bg-warning/90 text-warning-foreground px-2 py-1 rounded text-xs font-medium">
                          In Review
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-primary font-medium">{product.category}</span>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center text-foreground font-bold">
                          <IndianRupee className="w-4 h-4" />
                          {product.price.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          {product.views}
                        </div>
                      </div>

                      {entrepreneur && (
                        <div className="flex items-center gap-2 pt-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-xs font-medium">
                              {entrepreneur.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">{entrepreneur.name}</span>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Empty state indicator */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                More products coming soon as more women entrepreneurs join our platform.
              </p>
              <Button variant="outline">Browse All Categories</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MarketplacePage;
