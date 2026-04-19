import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import StoriesPage from "./pages/StoriesPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EntrepreneurProfilePage from "./pages/entrepreneur/EntrepreneurProfilePage";
import EntrepreneurProductsPage from "./pages/entrepreneur/EntrepreneurProductsPage";
import AddProductPage from "./pages/entrepreneur/AddProductPage";
import EditProductPage from "./pages/entrepreneur/EditProductPage";
import GrowthPage from "./pages/entrepreneur/GrowthPage";
import NGODashboardPage from "./pages/ngo/NGODashboardPage";
import FundingOverviewPage from "./pages/ngo/FundingOverviewPage";
import NotFound from "./pages/NotFound";
import { AiChatbot } from "@/components/chatbot/AiChatbot";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const DashboardRedirect = () => {
  const { role, isLoading, isAuthenticated } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  // Default to entrepreneur dashboard if role is missing or invalid
  return <Navigate to={role === 'ngo' ? '/ngo' : '/entrepreneur'} replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/stories" element={<StoriesPage />} />
    <Route path="/marketplace" element={<MarketplacePage />} />
    <Route path="/marketplace/:id" element={<ProductDetailPage />} />
    <Route path="/dashboard" element={<DashboardRedirect />} />
    
    {/* Entrepreneur Routes */}
    <Route path="/entrepreneur" element={
      <ProtectedRoute allowedRoles={['entrepreneur']}>
        <EntrepreneurProfilePage />
      </ProtectedRoute>
    } />
    <Route path="/entrepreneur/products" element={
      <ProtectedRoute allowedRoles={['entrepreneur']}>
        <EntrepreneurProductsPage />
      </ProtectedRoute>
    } />
    <Route path="/entrepreneur/products/new" element={
      <ProtectedRoute allowedRoles={['entrepreneur']}>
        <AddProductPage />
      </ProtectedRoute>
    } />
    <Route path="/entrepreneur/products/edit/:id" element={
      <ProtectedRoute allowedRoles={['entrepreneur']}>
        <EditProductPage />
      </ProtectedRoute>
    } />
    <Route path="/entrepreneur/growth" element={
      <ProtectedRoute allowedRoles={['entrepreneur']}>
        <GrowthPage />
      </ProtectedRoute>
    } />
    
    {/* NGO Routes */}
    <Route path="/ngo" element={
      <ProtectedRoute allowedRoles={['ngo']}>
        <NGODashboardPage />
      </ProtectedRoute>
    } />
    <Route path="/ngo/funding" element={
      <ProtectedRoute allowedRoles={['ngo']}>
        <FundingOverviewPage />
      </ProtectedRoute>
    } />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <AiChatbot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
