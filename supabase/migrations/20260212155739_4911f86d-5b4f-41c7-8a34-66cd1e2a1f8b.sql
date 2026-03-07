
-- Create team_members table
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT
USING (true);

CREATE POLICY "Admins can insert team members"
ON public.team_members FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update team members"
ON public.team_members FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete team members"
ON public.team_members FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create testimonials table (admin-managed)
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
ON public.testimonials FOR SELECT
USING (true);

CREATE POLICY "Admins can insert testimonials"
ON public.testimonials FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update testimonials"
ON public.testimonials FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete testimonials"
ON public.testimonials FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for team photos
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);

CREATE POLICY "Anyone can view team photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can upload team photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'team-photos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete team photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'team-photos' AND auth.uid() IS NOT NULL);
