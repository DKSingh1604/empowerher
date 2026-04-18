-- Migration: 20260416_create_ecommerce_tables.sql
-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active',
  views INT DEFAULT 0,
  sales INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products RLS policies
CREATE POLICY "Public products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Users can insert their own products" ON public.products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own products" ON public.products FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own products" ON public.products FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for products updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update profiles RLS to allow public viewing
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

-- Create stories table
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  author_name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

-- Stories RLS policies
CREATE POLICY "Stories are viewable by everyone" ON public.stories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert stories" ON public.stories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Generate mock stories
INSERT INTO public.stories (title, description, image, author_name, location) VALUES
('From Village Weaver to Business Owner', 'Lakshmi started weaving at age 12, learning from her grandmother in a small village in Rajasthan. For years, she sold her beautiful Bandhani textiles at local markets for meager prices. When she joined EmpowerHer, everything changed. Today, she runs a cooperative of 25 women weavers, exporting products to 5 countries.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop', 'Lakshmi Devi', 'Jaipur, Rajasthan'),
('Reviving My Village''s Pottery Tradition', 'When plastic replaced terracotta in our village, I thought our centuries-old craft would die with my generation. Through EmpowerHer, I found eco-conscious buyers across India who value our sustainable products. Now, 12 families depend on our pottery collective.', 'https://images.unsplash.com/photo-1610486985444-a03d09a066fb?q=80&w=2112&auto=format&fit=crop', 'Meena Kumari', 'Khurja, Uttar Pradesh'),
('Turning Heritage into Enterprise', 'My mother taught me Kundan jewelry work. I was about to give up when middlemen took most of my earnings. EmpowerHer connected me with a funding partner who helped me set up my first workshop. Today, I train 8 young women in the art of Kundan.', 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2564&auto=format&fit=crop', 'Sunita Sharma', 'Moradabad, UP');
