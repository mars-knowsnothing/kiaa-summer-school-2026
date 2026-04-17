-- Make referee_email optional since it is no longer collected in the form
ALTER TABLE public.recommendations ALTER COLUMN referee_email DROP NOT NULL;
