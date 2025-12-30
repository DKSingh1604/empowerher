-- Drop the existing trigger first to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Re-create the function with better error handling and type casting
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role public.app_role;
  user_name text;
BEGIN
  -- Get metadata with fallbacks
  user_name := COALESCE(NEW.raw_user_meta_data->>'name', 'New User');
  
  -- Safely cast role, defaulting to 'entrepreneur' if invalid or missing
  BEGIN
    user_role := (NEW.raw_user_meta_data->>'role')::public.app_role;
  EXCEPTION WHEN OTHERS THEN
    user_role := 'entrepreneur'::public.app_role;
  END;

  -- Insert into profiles
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (NEW.id, user_name, NEW.email);

  -- Insert into user_roles
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
