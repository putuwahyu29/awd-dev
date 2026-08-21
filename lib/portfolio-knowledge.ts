import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

let cachedKnowledgeBase = '';

/**
 * Reads and compiles all project markdown files, JSON configs, CV, publications,
 * and dossiers into a single comprehensive knowledge base for the AI assistant.
 */
export function buildComprehensiveKnowledgeBase(): string {
  if (cachedKnowledgeBase) {
    return cachedKnowledgeBase;
  }

  const rootDir = process.cwd();
  const sections: string[] = [];

  // 1. Core Profile & Overview (llms-full.txt)
  try {
    const llmsPath = path.join(rootDir, 'public', 'llms-full.txt');
    if (fs.existsSync(llmsPath)) {
      sections.push('=== DOSSIER PROFIL UTAMA ===\n' + fs.readFileSync(llmsPath, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading llms-full.txt:', err);
  }

  // 2. About & Technical Pillars (content/about.json)
  try {
    const aboutPath = path.join(rootDir, 'content', 'about.json');
    if (fs.existsSync(aboutPath)) {
      const about = JSON.parse(fs.readFileSync(aboutPath, 'utf-8'));
      sections.push(
        `=== TENTANG & PILAR KEAHLIAN ===\nBio: ${about.bioId}\n\nPilar Keahlian:\n` +
          about.pillars
            .map(
              (p: { titleId: string; descId: string }) => `- ${p.titleId}: ${p.descId}`
            )
            .join('\n')
      );
    }
  } catch (err) {
    console.error('Error reading about.json:', err);
  }

  // 3. Curriculum Vitae & Experience (content/cv.json)
  try {
    const cvPath = path.join(rootDir, 'content', 'cv.json');
    if (fs.existsSync(cvPath)) {
      const cv = JSON.parse(fs.readFileSync(cvPath, 'utf-8'));
      let cvText = '=== CURRICULUM VITAE LENGKAP ===\n';
      cvText += `Ringkasan: ${cv.summary || ''}\n\n`;

      if (Array.isArray(cv.experiences)) {
        cvText += 'Pengalaman Kerja:\n';
        cv.experiences.forEach(
          (exp: { role: string; company: string; period: string; location: string; descriptions: string[] }) => {
            cvText += `* ${exp.role} di ${exp.company} (${exp.location}, ${exp.period})\n`;
            if (Array.isArray(exp.descriptions)) {
              exp.descriptions.forEach((d: string) => {
                cvText += `  - ${d}\n`;
              });
            }
          }
        );
      }

      if (Array.isArray(cv.education)) {
        cvText += '\nPendidikan:\n';
        cv.education.forEach(
          (edu: { institution: string; degree: string; major: string; period: string; details: string }) => {
            cvText += `* ${edu.institution} - ${edu.degree} (${edu.major}, ${edu.period}): ${edu.details}\n`;
          }
        );
      }

      if (Array.isArray(cv.certifications)) {
        cvText += '\nSertifikasi & Pelatihan:\n';
        cv.certifications.forEach(
          (cert: { title: string; issuer: string; period: string }) => {
            cvText += `* ${cert.title} - ${cert.issuer} (${cert.period})\n`;
          }
        );
      }

      sections.push(cvText);
    }
  } catch (err) {
    console.error('Error reading cv.json:', err);
  }

  // 4. Tech Stack Breakdown (content/tech-stack.json)
  try {
    const techPath = path.join(rootDir, 'content', 'tech-stack.json');
    if (fs.existsSync(techPath)) {
      const tech = JSON.parse(fs.readFileSync(techPath, 'utf-8'));
      sections.push(
        '=== RINCIAN TEKNOLOGI & TECH STACK ===\n' + JSON.stringify(tech, null, 2)
      );
    }
  } catch (err) {
    console.error('Error reading tech-stack.json:', err);
  }

  // 5. Scientific Publications (content/publications/*.md)
  try {
    const pubDir = path.join(rootDir, 'content', 'publications');
    if (fs.existsSync(pubDir)) {
      const pubFiles = fs.readdirSync(pubDir).filter((f) => f.endsWith('.md'));
      let pubText = '=== RISET & PUBLIKASI ILMIAH ===\n';

      pubFiles.forEach((file) => {
        const fullPath = path.join(pubDir, file);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);
        pubText += `\n[Publikasi: ${data.title || file}]\n`;
        pubText += `- Jurnal / Prosiding: ${data.journal || ''} (${data.year || ''})\n`;
        pubText += `- Penulis: ${data.authors || ''}\n`;
        pubText += `- DOI / Link: ${data.link || data.doi || ''}\n`;
        if (data.tags) pubText += `- Topik / Tags: ${Array.isArray(data.tags) ? data.tags.join(', ') : data.tags}\n`;
        pubText += `- Ringkasan & Abstrak:\n${content.trim()}\n`;
      });

      sections.push(pubText);
    }
  } catch (err) {
    console.error('Error reading publications:', err);
  }

  // 6. Complete Project Case Studies (content/projects/*.md)
  try {
    const projDir = path.join(rootDir, 'content', 'projects');
    if (fs.existsSync(projDir)) {
      const projFiles = fs.readdirSync(projDir).filter((f) => f.endsWith('.md'));
      let projText = `=== KATALOG LENGKAP & STUDI KASUS PROYEK (${projFiles.length} PROYEK) ===\n`;

      projFiles.forEach((file) => {
        const slug = file.replace(/\.md$/, '');
        const fullPath = path.join(projDir, file);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);

        projText += `\n----------------------------------------\n`;
        projText += `PROYEK: ${data.title || slug}\n`;
        projText += `Slug URL: /projects/${slug}\n`;
        if (data.categories) projText += `Kategori: ${Array.isArray(data.categories) ? data.categories.join(', ') : data.categories}\n`;
        if (data.tech_stack) projText += `Tech Stack: ${Array.isArray(data.tech_stack) ? data.tech_stack.join(', ') : data.tech_stack}\n`;
        if (data.link) projText += `Link / Repo / Demo: ${data.link}\n`;
        if (data.description) projText += `Deskripsi Singkat: ${data.description}\n`;
        projText += `\nDokumentasi & Studi Kasus Lengkap:\n${content.trim()}\n`;
      });

      sections.push(projText);
    }
  } catch (err) {
    console.error('Error reading projects directory:', err);
  }

  // 7. Contact & Social Channels (content/socials.json & content/contact.json)
  try {
    const contactPath = path.join(rootDir, 'content', 'contact.json');
    const socialsPath = path.join(rootDir, 'content', 'socials.json');

    let contactText = '=== KONTAK & KANAL MEDIA SOSIAL RESMI ===\n';
    if (fs.existsSync(contactPath)) {
      const contact = JSON.parse(fs.readFileSync(contactPath, 'utf-8'));
      contactText += `Email: ${contact.email || 'aguswahyu@office.awd.my.id'}\n`;
      contactText += `Lokasi: ${contact.location || 'Surabaya, Jawa Timur, Indonesia'}\n`;
      contactText += `Ketersediaan: ${contact.availability || 'Terbuka untuk kolaborasi dan diskusi teknis'}\n`;
    }

    if (fs.existsSync(socialsPath)) {
      const socials = JSON.parse(fs.readFileSync(socialsPath, 'utf-8'));
      contactText += 'Kanal Media Sosial:\n';
      if (Array.isArray(socials)) {
        socials.forEach((s: { name: string; handle: string; url: string; role?: string }) => {
          contactText += `* ${s.name} (${s.handle}): ${s.url} ${s.role ? `[${s.role}]` : ''}\n`;
        });
      }
    }

    sections.push(contactText);
  } catch (err) {
    console.error('Error reading contact/socials:', err);
  }

  cachedKnowledgeBase = sections.join('\n\n');
  return cachedKnowledgeBase;
}
