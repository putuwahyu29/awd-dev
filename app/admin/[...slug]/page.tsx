import { redirect } from 'next/navigation';

interface AdminSlugPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function AdminSlugPage({ params }: AdminSlugPageProps) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join('/') : '';
  redirect(`/keystatic/${slugPath}`);
}
