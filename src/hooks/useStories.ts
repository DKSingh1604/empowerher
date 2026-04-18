import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/types';

export const useStories = () => {
  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        throw error;
      }

      return (data || []).map((dbStory: any): Story => ({
        id: dbStory.id,
        title: dbStory.title,
        description: dbStory.description,
        image: dbStory.image,
        authorName: dbStory.author_name,
        location: dbStory.location,
        createdAt: new Date(dbStory.created_at)
      }));
    }
  });
};

export const useAddStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (story: {
      title: string;
      description: string;
      author_name: string;
      location: string;
      image: string;
    }) => {
      const { data, error } = await supabase
        .from('stories')
        .insert([story])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
};
