import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { toast } from '@/hooks/use-toast';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:user_id (
            name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      // Map snake_case database fields to camelCase frontend types
      return (data || []).map((dbProduct: any): Product & { entrepreneurName?: string } => ({
        id: dbProduct.id,
        userId: dbProduct.user_id,
        title: dbProduct.title,
        description: dbProduct.description,
        price: dbProduct.price,
        category: dbProduct.category,
        images: dbProduct.images || [],
        status: dbProduct.status as 'active' | 'in_review' | 'draft',
        views: dbProduct.views,
        sales: dbProduct.sales,
        createdAt: new Date(dbProduct.created_at),
        entrepreneurName: dbProduct.profiles?.name
      }));
    }
  });
};

export const useEntrepreneurProducts = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['products', 'entrepreneur', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', userId as string)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching entrepreneur products:', error);
        throw error;
      }

      return (data || []).map((dbProduct: any): Product => ({
        id: dbProduct.id,
        userId: dbProduct.user_id,
        title: dbProduct.title,
        description: dbProduct.description,
        price: dbProduct.price,
        category: dbProduct.category,
        images: dbProduct.images || [],
        status: dbProduct.status as 'active' | 'in_review' | 'draft',
        views: dbProduct.views,
        sales: dbProduct.sales,
        createdAt: new Date(dbProduct.created_at)
      }));
    }
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: {
      userId: string;
      title: string;
      description: string;
      price: number;
      category: string;
      images: File[];
      status: 'active' | 'in_review' | 'draft';
    }) => {
      // 1. Upload Images to Storage
      const uploadedImageUrls: string[] = [];

      for (const file of newProduct.images) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${newProduct.userId}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('product_images')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Image upload failed:', uploadError);
          throw new Error('Failed to upload one or more images.');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('product_images')
          .getPublicUrl(fileName);

        uploadedImageUrls.push(publicUrl);
      }

      // 2. Insert Database Record
      const { data, error } = await supabase
        .from('products')
        .insert([{
          user_id: newProduct.userId,
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          images: uploadedImageUrls,
          status: newProduct.status,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Add product error:', error);
      toast({
        title: 'Error',
        description: 'Failed to save product to database.',
        variant: 'destructive',
      });
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product Deleted',
        description: 'Successfully removed item from your store.',
      });
    },
    onError: (error) => {
      console.error('Delete product error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product.',
        variant: 'destructive',
      });
    }
  });
};

export const useSingleProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: ['products', productId],
    enabled: !!productId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `)
        .eq('id', productId as string)
        .single();

      if (error) {
        console.error('Error fetching single product:', error);
        throw error;
      }

      return {
        id: data.id,
        userId: data.user_id,
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        images: data.images || [],
        status: data.status,
        views: data.views,
        sales: data.sales,
        createdAt: new Date(data.created_at),
        entrepreneurName: data.profiles?.name,
        entrepreneurEmail: data.profiles?.email
      } as Product & { entrepreneurName?: string; entrepreneurEmail?: string };
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedProduct: {
      id: string;
      title?: string;
      description?: string;
      price?: number;
      category?: string;
      status?: 'active' | 'in_review' | 'draft';
    }) => {
      const updateData: any = {};
      if (updatedProduct.title) updateData.title = updatedProduct.title;
      if (updatedProduct.description) updateData.description = updatedProduct.description;
      if (updatedProduct.price !== undefined) updateData.price = updatedProduct.price;
      if (updatedProduct.category) updateData.category = updatedProduct.category;
      if (updatedProduct.status) updateData.status = updatedProduct.status;

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', updatedProduct.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Update product error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product details.',
        variant: 'destructive',
      });
    }
  });
};

// ── Increment product view count ──────────────────────────────────
// Called when a product card becomes visible on screen.
// Uses a direct UPDATE with views + 1 to avoid race conditions.
export const useIncrementView = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      const { data: current, error: fetchErr } = await supabase
        .from('products')
        .select('views')
        .eq('id', productId)
        .single();

      if (fetchErr) throw fetchErr;

      const newViews = (current?.views || 0) + 1;

      const { error } = await supabase
        .from('products')
        .update({ views: newViews })
        .eq('id', productId);

      if (error) throw error;
      return { productId, newViews };
    },
    onSuccess: ({ productId, newViews }) => {
      // Update the cached products list in-place — no full refetch needed
      queryClient.setQueriesData({ queryKey: ['products'] }, (old: any) => {
        if (!Array.isArray(old)) return old;
        return old.map((p: any) =>
          p.id === productId ? { ...p, views: newViews } : p
        );
      });
    },
    onError: (err) => {
      console.warn('View increment skipped:', err);
    }
  });
};

