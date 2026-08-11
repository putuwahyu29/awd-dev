import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getProjects } from '@/lib/projects';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Semua Proyek Portofolio - awd.dev',
  description: 'Daftar lengkap seluruh proyek sistem informasi, arsitektur microservices, aplikasi web enterprise, dan infrastruktur cloud karya I Putu Agus Wahyu Dupayana.',
  openGraph: {
    title: 'Semua Proyek Portofolio - awd.dev',
    description: 'Daftar lengkap proyek sistem informasi & aplikasi web enterprise oleh I Putu Agus Wahyu Dupayana.',
    url: 'https://awd.dev/projects',
    siteName: 'awd.dev',
    type: 'website',
  },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-main text-main flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Page Header Banner */}
        <div className="bg-card border-b border-main py-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Back to Home Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium text-sub bg-main hover:bg-card-hover border border-main transition-colors w-fit shadow-2xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda</span>
            </Link>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-main tracking-tight">
                Katalog Seluruh Proyek & Sistem
              </h1>
              <p className="text-sub text-sm sm:text-base mt-1.5 max-w-2xl">
                Eksplorasi seluruh sistem perangkat lunak, aplikasi web enterprise, arsitektur microservices, dan infrastruktur cloud virtualisasi yang telah dibangun ({projects.length} Proyek).
              </p>
            </div>
          </div>
        </div>

        {/* Full Projects Showcase with Search & Filters */}
        <ProjectsSection initialProjects={projects} isHomePage={false} />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
