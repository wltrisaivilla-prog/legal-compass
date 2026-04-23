-- Drop redundant deny policies (RLS denies by default when no permissive policy exists)
DROP POLICY IF EXISTS "No public insert of purchases" ON public.purchases;
DROP POLICY IF EXISTS "No public update of purchases" ON public.purchases;
DROP POLICY IF EXISTS "No public delete of purchases" ON public.purchases;

DROP POLICY IF EXISTS "No public insert on legal-documents" ON storage.objects;
DROP POLICY IF EXISTS "No public update on legal-documents" ON storage.objects;
DROP POLICY IF EXISTS "No public delete on legal-documents" ON storage.objects;