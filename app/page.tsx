import { getProjects } from '@/lib/projects';
import { getPublications } from '@/lib/publications';
import { getCertifications } from '@/lib/certifications';
import { getSocialChannels } from '@/lib/socials';
import { getLatestBlogPosts } from '@/lib/rss';
import { getGitHubRepos } from '@/lib/github';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubReposSection from '@/components/GitHubReposSection';
import PublicationsSection from '@/components/PublicationsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContentCreatorHub from '@/components/ContentCreatorHub';
import BlogFeed from '@/components/BlogFeed';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getProjects();
  const publications = await getPublications();
  const officialCerts = await getCertifications();
  const socialChannels = await getSocialChannels();

  const blogPosts = await getLatestBlogPosts(3);
  const githubRepos = await getGitHubRepos(3);

  return (
    <div className="min-h-screen bg-main text-main flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />

        <ProjectsSection initialProjects={projects} isHomePage={true} limit={6} />

        <GitHubReposSection repos={githubRepos} />
        <PublicationsSection publications={publications} />
        <CertificationsSection officialCerts={officialCerts} />
        <ContentCreatorHub channels={socialChannels} />
        <BlogFeed posts={blogPosts} />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
