import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { ArrowLeft, User, Building, Mail, Lock, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, role: userRole, isLoading: authLoading } = useAuth();
  
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const initialRole = (searchParams.get('role') as UserRole) || 'entrepreneur';
  
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated && !authLoading && userRole) {
      navigate(userRole === 'entrepreneur' ? '/entrepreneur' : '/ngo');
    }
  }, [isAuthenticated, authLoading, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const result = await login(formData.email, formData.password);
        
        if (result.success) {
          toast({
            title: 'Welcome back!',
            description: 'You have been logged in successfully.',
          });
        } else {
          toast({
            title: 'Login failed',
            description: result.error || 'Please check your credentials and try again.',
            variant: 'destructive',
          });
        }
      } else {
        if (!formData.name.trim()) {
          toast({
            title: 'Name required',
            description: 'Please enter your name to register.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          toast({
            title: 'Password too short',
            description: 'Password must be at least 6 characters long.',
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }

        const result = await register(formData.name, formData.email, formData.password, role);
        
        if (result.success) {
          toast({
            title: 'Registration successful!',
            description: 'Your account has been created.',
          });
        } else {
          toast({
            title: 'Registration failed',
            description: result.error || 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: 'entrepreneur' as UserRole,
      title: 'Woman Entrepreneur',
      description: 'List products & grow your business',
      icon: User,
    },
    {
      id: 'ngo' as UserRole,
      title: 'NGO / Funding Partner',
      description: 'Support & fund entrepreneurs',
      icon: Building,
    },
  ];

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground flex items-center justify-center">
              <span className="text-primary font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-primary-foreground">EmpowerHer</span>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            {mode === 'login' ? 'Welcome Back' : 'Join Our Community'}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            {mode === 'login'
              ? 'Continue your journey of empowerment and growth with EmpowerHer.'
              : 'Be part of a movement transforming lives of rural women entrepreneurs across India.'}
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                ✓
              </div>
              <span>100+ Women Entrepreneurs</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                ✓
              </div>
              <span>10+ NGO Partners</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                ✓
              </div>
              <span>₹5L+ Trade Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 md:p-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-foreground">EmpowerHer</span>
              </Link>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </h2>
            <p className="text-muted-foreground mb-8">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-primary font-medium hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>

            {/* Role Selection - only show for registration */}
            {mode === 'register' && (
              <div className="mb-8">
                <Label className="text-sm font-medium text-foreground mb-3 block">
                  I am a...
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        role === r.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <r.icon className={`w-6 h-6 mb-2 ${role === r.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <p className={`font-medium text-sm ${role === r.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {r.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Full Name
                  </Label>
                  <div className="relative mt-2">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={mode === 'register' ? 'Create a password (min 6 characters)' : 'Enter your password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 h-12"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <p className="mt-8 text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
