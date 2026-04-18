import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types';

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  location?: string;
  bio?: string;
  skill_category?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else if (profileData) {
        setProfile(profileData);
      } else if (currentUser) {
        // Fallback for broken trigger: Generate dynamic profile from raw metadata
        setProfile({
          id: currentUser.id,
          user_id: currentUser.id,
          name: currentUser.user_metadata?.name || 'Unknown User',
          email: currentUser.email || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      // Fetch role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (roleError) {
        console.error('Error fetching role:', roleError);
        setRole((currentUser?.user_metadata?.role as UserRole) || 'entrepreneur');
      } else if (roleData) {
        setRole(roleData.role as UserRole);
      } else {
        // Fallback if the database trigger inexplicably failed to create the row
        setRole((currentUser?.user_metadata?.role as UserRole) || 'entrepreneur');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer Supabase calls with setTimeout to prevent deadlocks
          setTimeout(async () => {
            await fetchUserData(session.user.id);
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setRole(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Invalid email or password. Please try again.' };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const register = async (name: string, email: string, password: string, selectedRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name,
            role: selectedRole,
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
        }
        return { success: false, error: error.message };
      }

      // Supabase Email Enumeration Protection natively swallows "User already exists" errors.
      // We detect this if it returns a user object but the identities array is empty.
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
      }

      // If registered successfully but email confirmation is ON, there will be no session
      if (data.user && !data.session) {
        return { success: false, error: 'Registration successful! Please check your email inbox (and spam) for the confirmation link to log in.' };
      }

      // Profile and Role are now created automatically by Supabase Triggers
      if (data.user && data.session) {
        await fetchUserData(data.user.id);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchUserData(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      role, 
      isAuthenticated: !!user, 
      isLoading,
      login, 
      register, 
      logout,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
