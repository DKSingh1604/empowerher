import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useEntrepreneurs = () => {
  return useQuery({
    queryKey: ['entrepreneurs'],
    queryFn: async () => {
      // 1. Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }

      // 2. Fetch all user roles for mapping
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        throw rolesError;
      }

      // Filter natively to account for broken DB triggers
      const entrepreneurs = (profilesData || []).filter((dbUser: any) => {
        // Find their roles from the second query
        const userRoles = (rolesData || []).filter((r: any) => r.user_id === dbUser.user_id);
        
        // If trigger broke and they have no role, assume entrepreneur as default fallback
        if (userRoles.length === 0) return true;
        
        // Check for specific role assignment
        return userRoles.some((r: any) => r.role === 'entrepreneur');
      });

      return entrepreneurs.map((dbUser: any) => ({
        id: dbUser.id,
        userId: dbUser.user_id,
        name: dbUser.name,
        email: dbUser.email,
        location: dbUser.location,
        bio: dbUser.bio,
        skillCategory: dbUser.skill_category,
        avatarUrl: dbUser.avatar_url,
      }));
    }
  });
};
