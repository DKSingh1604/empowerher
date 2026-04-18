-- Create a new bucket for product images, securely configured
INSERT INTO storage.buckets (id, name, public) VALUES ('product_images', 'product_images', true);

-- (RLS is enabled by default on storage.objects in Supabase)

-- Policy 1: Anyone can view product images globally
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product_images');

-- Policy 2: Authenticated entrepreneurs can upload images
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (
    bucket_id = 'product_images' 
    AND auth.role() = 'authenticated'
);

-- Policy 3: Users can only delete images they uploaded
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'product_images' 
    AND auth.role() = 'authenticated'
    AND owner = auth.uid()
);
