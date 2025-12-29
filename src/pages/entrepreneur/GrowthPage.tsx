import EntrepreneurLayout from '@/components/layout/EntrepreneurLayout';
import { mockProducts } from '@/data/mockData';
import { Package, Eye, ShoppingBag, TrendingUp, Lightbulb, BookOpen, Camera, Tag } from 'lucide-react';
import { SkillRecommendation } from '@/types';

// Rule-based AI recommendations (MVP level)
const getSkillRecommendations = (category: string, sales: number): SkillRecommendation[] => {
  const recommendations: SkillRecommendation[] = [];

  // Rule 1: Low sales in any category
  if (sales < 10) {
    recommendations.push({
      id: '1',
      skillName: 'Product Photography',
      description: 'Learn to take professional photos of your products using just your smartphone.',
      reason: 'Good photos can increase your product views by up to 40%.',
      priority: 'high',
    });
    recommendations.push({
      id: '2',
      skillName: 'Pricing Strategies',
      description: 'Understand how to price your handmade products competitively while maintaining profit margins.',
      reason: 'Your current pricing might need adjustment to attract more buyers.',
      priority: 'medium',
    });
  }

  // Rule 2: Category-specific recommendations
  if (category === 'Textiles & Weaving') {
    recommendations.push({
      id: '3',
      skillName: 'Natural Dyeing Techniques',
      description: 'Explore eco-friendly natural dyes to create unique colors that appeal to conscious consumers.',
      reason: 'Eco-friendly products are in high demand among urban buyers.',
      priority: 'medium',
    });
  }

  if (category === 'Pottery & Ceramics') {
    recommendations.push({
      id: '4',
      skillName: 'Packaging for Fragile Items',
      description: 'Learn safe packaging techniques to ensure your pottery reaches customers intact.',
      reason: 'Proper packaging reduces returns and increases customer satisfaction.',
      priority: 'high',
    });
  }

  // Rule 3: General improvement
  recommendations.push({
    id: '5',
    skillName: 'Writing Product Descriptions',
    description: 'Craft compelling descriptions that tell the story of your product and its making.',
    reason: 'Good descriptions help buyers connect with your craft.',
    priority: 'low',
  });

  return recommendations.slice(0, 3);
};

const priorityColors = {
  high: 'bg-accent/10 text-accent border-accent/20',
  medium: 'bg-primary/10 text-primary border-primary/20',
  low: 'bg-muted text-muted-foreground border-border',
};

const priorityLabels = {
  high: 'Recommended',
  medium: 'Helpful',
  low: 'Optional',
};

const GrowthPage = () => {
  // Mock user data
  const userProducts = mockProducts.filter(p => p.userId === '1');
  const totalViews = userProducts.reduce((sum, p) => sum + p.views, 0);
  const totalSales = userProducts.reduce((sum, p) => sum + p.sales, 0);
  const primaryCategory = 'Textiles & Weaving';

  const recommendations = getSkillRecommendations(primaryCategory, totalSales);

  const stats = [
    { icon: Package, label: 'Total Products', value: userProducts.length, color: 'text-primary' },
    { icon: Eye, label: 'Total Views', value: totalViews, color: 'text-accent' },
    { icon: ShoppingBag, label: 'Total Sales', value: totalSales, color: 'text-success' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+12%', color: 'text-warning' },
  ];

  return (
    <EntrepreneurLayout title="My Growth">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card-elevated">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AI Skill Recommendations */}
      <div className="card-elevated">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recommended Skills for You</h2>
            <p className="text-sm text-muted-foreground">
              Based on your product category ({primaryCategory}) and sales performance, we suggest:
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border ${priorityColors[rec.priority]} transition-all hover:shadow-soft`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-card">
                  {priorityLabels[rec.priority]}
                </span>
                {rec.priority === 'high' && <Camera className="w-4 h-4" />}
                {rec.priority === 'medium' && <Tag className="w-4 h-4" />}
                {rec.priority === 'low' && <BookOpen className="w-4 h-4" />}
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">{rec.skillName}</h3>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              
              <div className="text-xs text-foreground/70 bg-card p-2 rounded-lg">
                <strong>Why?</strong> {rec.reason}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">How this works:</strong> Our AI analyzes your product category and sales data to suggest skills that can help grow your business. These recommendations are based on successful patterns from other entrepreneurs in similar categories.
          </p>
        </div>
      </div>
    </EntrepreneurLayout>
  );
};

export default GrowthPage;
