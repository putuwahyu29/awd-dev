import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keystatic CMS',
  description: 'Content Management Studio untuk awd.dev',
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
