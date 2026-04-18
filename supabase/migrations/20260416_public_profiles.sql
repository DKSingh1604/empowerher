-- Allow anyone to view profiles so the NGO can see them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Anyone can view profiles"
ON public.profiles FOR SELECT
USING (true);

-- Allow anyone to view user roles (needed for filtering entrepreneurs)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Anyone can view user roles"
ON public.user_roles FOR SELECT
USING (true);
