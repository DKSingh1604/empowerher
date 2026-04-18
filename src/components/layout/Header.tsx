import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Header = () => {
  const { profile, role, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    return '/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <img src="/navIcon.png" alt="EmpowerHer" className="h-10 w-auto" />

          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.stories')}
            </Link>
            <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              {t('nav.marketplace')}
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {t('nav.dashboard')}
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={getDashboardLink()}>
                  <Button variant="ghost" size="sm" className="gap-2 h-9 border border-border/50 hover:bg-secondary">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex flex-col items-start leading-none gap-0.5 max-w-[120px]">
                      <span className="text-sm font-medium truncate w-full">{profile?.name || 'Dashboard'}</span>
                      {role && (
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          role === 'ngo' ? 'text-blue-600 dark:text-blue-400' : 'text-primary'
                        }`}>
                          {role === 'ngo' ? 'NGO Partner' : 'Entrepreneur'}
                        </span>
                      )}
                    </div>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth">
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button variant="default" size="sm">{t('nav.getStarted')}</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-foreground font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.home')}
              </Link>
              <Link to="/stories" className="text-foreground font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.stories')}
              </Link>
              <Link to="/marketplace" className="text-foreground font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.marketplace')}
              </Link>

              <div className="pt-4 border-t border-border flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full flex-col h-auto py-2">
                        <span className="font-semibold">{t('nav.dashboard')}</span>
                        {role && (
                          <span className="text-[10px] uppercase opacity-80 tracking-widest mt-0.5">
                            Signed in as {role === 'ngo' ? 'NGO Partner' : 'Entrepreneur'}
                          </span>
                        )}
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                      {t('nav.logout')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">{t('nav.login')}</Button>
                    </Link>
                    <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full">{t('nav.getStarted')}</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
