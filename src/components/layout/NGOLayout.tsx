import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, IndianRupee, LogOut, Menu, X, Home, ChevronRight } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const menuItems = [
  { icon: Users, label: 'Entrepreneurs', path: '/ngo' },
  { icon: IndianRupee, label: 'Funding Overview', path: '/ngo/funding' },
];

const NGOLayout = ({ children, title }: DashboardLayoutProps) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <img src="/navIcon.png" alt="EmpowerHer" className="h-10 w-auto" />

            </Link>
          </div>
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-semibold">{profile?.name?.charAt(0) || 'N'}</span>
              </div>
              <div>
                <p className="font-medium text-foreground truncate">{profile?.name || 'NGO Partner'}</p>
                <p className="text-xs text-muted-foreground">NGO / Funding Partner</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                <item.icon className="w-5 h-5" /><span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            <Link to="/"><Button variant="ghost" className="w-full justify-start gap-3"><Home className="w-5 h-5" />Back to Home</Button></Link>
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive" onClick={handleLogout}><LogOut className="w-5 h-5" />Logout</Button>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-4 px-4 md:px-6 h-16">
            <button className="lg:hidden p-2 -ml-2" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Link to="/ngo" className="hover:text-foreground">Dashboard</Link><ChevronRight className="w-4 h-4" /><span className="text-foreground font-medium">{title}</span></div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8"><div className="max-w-6xl mx-auto"><h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{title}</h1>{children}</div></main>
      </div>
    </div>
  );
};

export default NGOLayout;
