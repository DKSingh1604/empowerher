import { Link } from 'react-router-dom';
import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';
import { Plus, IndianRupee, Eye, ShoppingBag, Edit, MoreVertical } from 'lucide-react';

const statusColors = {
  active: 'bg-success/10 text-success',
  in_review: 'bg-warning/10 text-warning',
  draft: 'bg-muted text-muted-foreground',
};

const statusLabels = {
  active: 'Active',
  in_review: 'In Review',
  draft: 'Draft',
};

const EntrepreneurProductsPage = () => {
  // Filter products for current user (mock: userId '1')
  const userProducts = mockProducts.filter(p => p.userId === '1');

  return (
    <EntrepreneurLayout title="My Products">
      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p className="text-muted-foreground">
          You have <span className="font-semibold text-foreground">{userProducts.length}</span> products listed.
        </p>
        <Link to="/entrepreneur/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userProducts.map((product) => (
          <article key={product.id} className="card-interactive group overflow-hidden">
            {/* Image placeholder */}
            <div className="relative h-40 -mx-6 -mt-6 mb-4 bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
              <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${statusColors[product.status]}`}>
                {statusLabels[product.status]}
              </div>
              <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/80 hover:bg-card transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {product.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4" />
                    {product.sales}
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2">
                <Edit className="w-4 h-4" />
                Edit Product
              </Button>
            </div>
          </article>
        ))}
      </div>

      {userProducts.length === 0 && (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products yet</h3>
          <p className="text-muted-foreground mb-6">Start listing your handmade products to reach customers.</p>
          <Link to="/entrepreneur/products/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Product
            </Button>
          </Link>
        </div>
      )}
    </EntrepreneurLayout>
  );
};

export default EntrepreneurProductsPage;
