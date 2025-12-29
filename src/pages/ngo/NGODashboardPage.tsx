import NGOLayout from '@/components/layout/NGOLayout';
import { mockEntrepreneurs } from '@/data/mockData';
import { MapPin, Eye, TrendingUp, Users, IndianRupee, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NGODashboardPage = () => {
  const stats = [
    { icon: Users, label: 'Total Entrepreneurs', value: '100+', color: 'text-primary' },
    { icon: IndianRupee, label: 'Funds Allocated', value: '₹2.5L', color: 'text-success' },
    { icon: Award, label: 'Mentors Assigned', value: '15', color: 'text-accent' },
  ];

  return (
    <NGOLayout title="Entrepreneurs">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card-elevated">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card-elevated overflow-hidden">
        <h2 className="text-lg font-semibold text-foreground mb-4">Registered Entrepreneurs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Activity</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
            </tr></thead>
            <tbody>
              {mockEntrepreneurs.map((e) => (
                <tr key={e.id} className="border-b border-border hover:bg-secondary/50">
                  <td className="py-3 px-4"><div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">{e.name.charAt(0)}</div>
                    <span className="font-medium text-foreground">{e.name}</span>
                  </div></td>
                  <td className="py-3 px-4 text-sm text-muted-foreground"><MapPin className="w-3 h-3 inline mr-1" />{e.location}</td>
                  <td className="py-3 px-4 text-sm text-primary">{e.skillCategory}</td>
                  <td className="py-3 px-4"><span className="flex items-center gap-1 text-success text-sm"><TrendingUp className="w-3 h-3" />Active</span></td>
                  <td className="py-3 px-4"><Button variant="outline" size="sm">View Profile</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </NGOLayout>
  );
};

export default NGODashboardPage;
