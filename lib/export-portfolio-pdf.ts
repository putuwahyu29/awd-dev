import { jsPDF } from 'jspdf';
import { HeroData } from './hero';
import { AboutData } from './about';
import { ProjectData } from './projects';
import { GitHubRepo } from './github';
import { Publication } from './publications';
import { Certification } from './certifications';
import { ContactData } from './contact';
import { SocialChannel } from './socials';

export interface PortfolioExportData {
  hero: HeroData;
  about: AboutData;
  projects: ProjectData[];
  githubRepos: GitHubRepo[];
  publications: Publication[];
  certifications: Certification[];
  contact: ContactData;
  socials?: SocialChannel[];
}

export interface PortfolioExportOptions {
  customFileName?: string;
  lang?: 'id' | 'en';
  onlyFeatured?: boolean;
  selectedCategory?: string;
  includeGithub?: boolean;
  includePublications?: boolean;
  includeCertifications?: boolean;
  includeExpertise?: boolean;
}

export async function exportPortfolioToPdf(
  data: PortfolioExportData,
  optionsOrFileName?: string | PortfolioExportOptions,
  legacyLang: 'id' | 'en' = 'id'
): Promise<void> {
  const options: PortfolioExportOptions =
    typeof optionsOrFileName === 'string'
      ? { customFileName: optionsOrFileName, lang: legacyLang }
      : optionsOrFileName || {};

  const lang = options.lang || 'id';
  const isEn = lang === 'en';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm

  const marginLeft = 15;
  const marginRight = pageWidth - 15; // 195mm
  const contentWidth = marginRight - marginLeft; // 180mm
  const marginTop = 15;
  const marginBottom = 16;

  let y = marginTop;

  // Intelligent Page Break Handler
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  const { hero, about, projects: rawProjects, githubRepos, publications, certifications, contact } = data;
  const fullName = hero?.name || 'I Putu Agus Wahyu Dupayana';
  const role = isEn && hero?.roleEn ? hero.roleEn : hero?.role || 'Software Engineer & Content Creator';
  const bio = isEn && hero?.bioEn ? hero.bioEn : hero?.bioId || '';

  // Filter projects based on options
  let projects = rawProjects || [];
  if (options.onlyFeatured) {
    projects = projects.filter((p) => p.featured);
  }
  if (options.selectedCategory && options.selectedCategory !== 'Semua' && options.selectedCategory !== 'All') {
    projects = projects.filter((p) => {
      const cats = p.categories || [p.category];
      return cats.includes(options.selectedCategory!);
    });
  }

  const defaultSuffix = isEn ? '_EN' : '_ID';
  const fileName =
    options.customFileName || `Portofolio_${fullName.replace(/\s+/g, '_')}${defaultSuffix}.pdf`;

  // Section Header Helper with Clean Badge
  const renderSectionHeader = (title: string, minFirstItemHeight = 22) => {
    checkPageBreak(12 + minFirstItemHeight);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(title.toUpperCase(), marginLeft, y);
    y += 2.2;

    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.4);
    doc.line(marginLeft, y, marginRight, y);
    y += 5;
  };

  // ================= 1. COVER / HEADER & HERO SECTION =================
  // Top decorative accent line
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(marginLeft, y, contentWidth, 2.5, 'F');
  y += 7;

  // Title: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(fullName.toUpperCase(), marginLeft, y);
  y += 6.5;

  // Role
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text(role, marginLeft, y);
  y += 5;

  // Quick Contact Info Row
  const contactParts: { text: string; url?: string }[] = [];
  if (contact?.email) contactParts.push({ text: contact.email, url: `mailto:${contact.email}` });
  const loc = isEn && contact?.locationEn ? contact.locationEn : contact?.locationId;
  if (loc) contactParts.push({ text: loc });
  contactParts.push({ text: 'awd.my.id', url: 'https://awd.my.id' });
  contactParts.push({ text: 'github.com/putuwahyu29', url: 'https://github.com/putuwahyu29' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105); // slate-600

  let currentContactX = marginLeft;
  contactParts.forEach((part, i) => {
    if (i > 0) {
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(' • ', currentContactX, y);
      currentContactX += doc.getTextWidth(' • ');
    }
    doc.setTextColor(part.url ? 37 : 71, part.url ? 99 : 85, part.url ? 235 : 105);
    doc.text(part.text, currentContactX, y);
    if (part.url) {
      doc.link(currentContactX, y - 2.5, doc.getTextWidth(part.text), 3.5, { url: part.url });
    }
    currentContactX += doc.getTextWidth(part.text);
  });
  y += 6;

  // Bio / Executive Summary Card
  if (bio) {
    const bioLines = doc.splitTextToSize(bio, contentWidth - 8);
    const bioCardHeight = bioLines.length * 4.0 + 5;
    checkPageBreak(bioCardHeight);

    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.roundedRect(marginLeft, y, contentWidth, bioCardHeight, 1.5, 1.5, 'FD');

    // Left blue accent line on bio
    doc.setFillColor(37, 99, 235);
    doc.roundedRect(marginLeft, y, 1.2, bioCardHeight, 0.5, 0.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(bioLines, marginLeft + 4, y + 4);
    y += bioCardHeight + 4;
  }

  // Highlights Metric Cards (3 boxes)
  const highlights = hero?.highlights || [
    { number: '26+', labelId: 'Proyek Selesai', labelEn: 'Completed Projects' },
    { number: '5+ Tahun', labelId: 'Pengalaman', labelEn: 'Years Experience' },
    { number: '500+', labelId: 'Kontribusi GitHub', labelEn: 'GitHub Contributions' },
  ];

  if (highlights.length > 0) {
    checkPageBreak(16);
    const boxCount = highlights.length;
    const boxGap = 4;
    const boxWidth = (contentWidth - (boxCount - 1) * boxGap) / boxCount;
    const boxHeight = 12.5;

    highlights.forEach((h, i) => {
      const boxX = marginLeft + i * (boxWidth + boxGap);
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.3);
      doc.roundedRect(boxX, y, boxWidth, boxHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(h.number, boxX + boxWidth / 2, y + 5, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const label = isEn && h.labelEn ? h.labelEn : h.labelId;
      doc.text(label, boxX + boxWidth / 2, y + 9.5, { align: 'center' });
    });
    y += boxHeight + 4;
  }

  // Core Tech Stack
  const coreTech = hero?.coreTechStack || [];
  if (coreTech.length > 0) {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      isEn ? 'CORE TECHNOLOGIES & TOOLS:' : 'TEKNOLOGI & TOOLS UTAMA:',
      marginLeft,
      y
    );
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    const techText = coreTech.join('  •  ');
    const techLines = doc.splitTextToSize(techText, contentWidth);
    doc.text(techLines, marginLeft, y);
    y += techLines.length * 4.0 + 2;
  }

  // ================= 2. ABOUT & AREAS OF EXPERTISE =================
  const pillars = about?.pillars || [];
  if (options.includeExpertise !== false && pillars.length > 0) {
    renderSectionHeader(
      isEn ? 'AREAS OF EXPERTISE' : 'FOKUS & BIDANG KEAHLIAN',
      25
    );

    // 2-column or list cards for pillars
    pillars.forEach((p) => {
      const pTitle = isEn && p.titleEn ? p.titleEn : p.titleId;
      const pDesc = isEn && p.descEn ? p.descEn : p.descId;

      const descLines = doc.splitTextToSize(pDesc, contentWidth - 10);
      const cardHeight = 4.5 + descLines.length * 3.8 + 4;
      checkPageBreak(cardHeight + 2);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(marginLeft, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`▸ ${pTitle}`, marginLeft + 3, y + 4.2);

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(descLines, marginLeft + 3, y + 8.2);

      y += cardHeight + 2.5;
    });
  }

  // ================= 3. FEATURED SOFTWARE PROJECTS (CARD-BASED) =================
  if (projects && projects.length > 0) {
    const sectionTitle = options.onlyFeatured
      ? isEn
        ? `FEATURED SOFTWARE PROJECTS & SYSTEMS (${projects.length})`
        : `PROYEK & SISTEM UNGGULAN (${projects.length})`
      : isEn
        ? `SOFTWARE PROJECTS & SYSTEMS (${projects.length})`
        : `DAFTAR PROYEK & SISTEM (${projects.length})`;

    renderSectionHeader(sectionTitle, 35);

    projects.forEach((proj, idx) => {
      const cardPadding = 3.5;
      const cardInnerWidth = contentWidth - cardPadding * 2 - 2;

      const categoryText = proj.category || (proj.categories && proj.categories[0]) || '';
      const techText = proj.tech_stack ? `Tech: ${proj.tech_stack.join(', ')}` : '';
      const descLines = proj.description ? doc.splitTextToSize(proj.description, cardInnerWidth) : [];
      const techLines = techText ? doc.splitTextToSize(techText, cardInnerWidth) : [];

      let cardHeight = cardPadding + 4.5; // top pad + title row
      if (techLines.length > 0) cardHeight += techLines.length * 3.6 + 1;
      if (descLines.length > 0) cardHeight += descLines.length * 3.8 + 1.5;
      if (proj.link) cardHeight += 4;
      cardHeight += cardPadding;

      // Ensure the card never gets split across page boundary
      checkPageBreak(cardHeight + 3);

      // Draw Card Container
      doc.setFillColor(250, 250, 252); // soft off-white/slate-50
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.3);
      doc.roundedRect(marginLeft, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      // Left blue accent bar on each project card
      doc.setFillColor(37, 99, 235);
      doc.roundedRect(marginLeft, y, 1.2, cardHeight, 0.5, 0.5, 'F');

      let currentCardY = y + cardPadding + 3.2;

      // Project Number & Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42); // slate-900
      const titleText = `${idx + 1}. ${proj.title}`;
      doc.text(titleText, marginLeft + cardPadding + 1.5, currentCardY);

      // Category Pill / Tag (Right aligned)
      if (categoryText) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(37, 99, 235); // blue-600
        doc.text(`[ ${categoryText.toUpperCase()} ]`, marginRight - cardPadding, currentCardY, {
          align: 'right',
        });
      }
      currentCardY += 4.2;

      // Tech Stack
      if (techLines.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text(techLines, marginLeft + cardPadding + 1.5, currentCardY);
        currentCardY += techLines.length * 3.6 + 1;
      }

      // Description
      if (descLines.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.2);
        doc.setTextColor(51, 65, 85); // slate-700
        doc.text(descLines, marginLeft + cardPadding + 1.5, currentCardY);
        currentCardY += descLines.length * 3.8 + 1;
      }

      // URL (Interactive Clickable)
      if (proj.link) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(37, 99, 235);
        const linkLabel = `Live URL: ${proj.link}`;
        doc.text(linkLabel, marginLeft + cardPadding + 1.5, currentCardY);
        const textWidth = doc.getTextWidth(linkLabel);
        doc.link(marginLeft + cardPadding + 1.5, currentCardY - 2.5, textWidth, 3.5, { url: proj.link });
      }

      y += cardHeight + 3.5; // clean gap between cards
    });
  }

  // ================= 4. GITHUB OPEN-SOURCE REPOSITORIES =================
  if (options.includeGithub !== false && githubRepos && githubRepos.length > 0) {
    renderSectionHeader(
      isEn
        ? `GITHUB OPEN SOURCE REPOSITORIES (${githubRepos.length})`
        : `REPOSITORI OPEN SOURCE GITHUB (${githubRepos.length})`,
      25
    );

    githubRepos.forEach((repo) => {
      const descLines = repo.description ? doc.splitTextToSize(repo.description, contentWidth - 8) : [];
      const cardHeight = 4.5 + descLines.length * 3.6 + (repo.html_url ? 4 : 0) + 4;
      checkPageBreak(cardHeight + 2);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(marginLeft, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      // Repo name & Stars
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`• ${repo.name}`, marginLeft + 3, y + 4.2);

      const starMeta = repo.stargazers_count > 0 ? `★ ${repo.stargazers_count}` : '';
      const langMeta = repo.language ? repo.language : '';
      const meta = [langMeta, starMeta].filter(Boolean).join('  |  ');

      if (meta) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(meta, marginRight - 3, y + 4.2, { align: 'right' });
      }

      let repoY = y + 7.5;
      if (descLines.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        doc.text(descLines, marginLeft + 3, repoY);
        repoY += descLines.length * 3.6;
      }

      if (repo.html_url) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(37, 99, 235);
        doc.text(repo.html_url, marginLeft + 3, repoY + 1);
        doc.link(marginLeft + 3, repoY - 1.5, doc.getTextWidth(repo.html_url), 3.2, { url: repo.html_url });
      }

      y += cardHeight + 2.5;
    });
  }

  // ================= 5. PUBLICATIONS =================
  if (options.includePublications !== false && publications && publications.length > 0) {
    renderSectionHeader(
      isEn
        ? `PUBLICATIONS & SCIENTIFIC PAPERS (${publications.length})`
        : `PUBLIKASI & KARYA ILMIAH (${publications.length})`,
      25
    );

    publications.forEach((pub) => {
      const details = [pub.journal, pub.year, pub.authors].filter(Boolean).join(' — ');
      const titleLines = doc.splitTextToSize(`• ${pub.title}`, contentWidth - 8);
      const detailLines = doc.splitTextToSize(details, contentWidth - 8);
      const cardHeight = titleLines.length * 4.0 + detailLines.length * 3.5 + 4;

      checkPageBreak(cardHeight + 2);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(marginLeft, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text(titleLines, marginLeft + 3, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(71, 85, 105);
      doc.text(detailLines, marginLeft + 3, y + 4.2 + titleLines.length * 4.0);

      y += cardHeight + 2.5;
    });
  }

  // ================= 6. CERTIFICATIONS =================
  if (options.includeCertifications !== false && certifications && certifications.length > 0) {
    renderSectionHeader(
      isEn
        ? `PROFESSIONAL CERTIFICATIONS (${certifications.length})`
        : `SERTIFIKASI PROFESIONAL (${certifications.length})`,
      25
    );

    certifications.forEach((cert) => {
      const titleLines = doc.splitTextToSize(`• ${cert.title}`, contentWidth - 40);
      const issuerSkillText = [
        cert.issuer,
        cert.skills && cert.skills.length > 0 ? `(${cert.skills.join(', ')})` : '',
      ]
        .filter(Boolean)
        .join(' ');
      const issuerLines = doc.splitTextToSize(issuerSkillText, contentWidth - 10);
      const cardHeight = titleLines.length * 4.0 + issuerLines.length * 3.5 + 4;

      checkPageBreak(cardHeight + 2);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(marginLeft, y, contentWidth, cardHeight, 1.5, 1.5, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.8);
      doc.setTextColor(15, 23, 42);
      doc.text(titleLines, marginLeft + 3, y + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(cert.issueDate || '', marginRight - 3, y + 4.2, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      doc.setTextColor(71, 85, 105);
      doc.text(issuerLines, marginLeft + 3, y + 4.2 + titleLines.length * 4.0);

      y += cardHeight + 2.5;
    });
  }

  // ================= 7. CONTACT & COLLABORATION =================
  renderSectionHeader(isEn ? 'CONTACT & COLLABORATION' : 'KONTAK & KOLABORASI', 20);

  const avail = isEn && contact?.availabilityEn ? contact.availabilityEn : contact?.availabilityId;
  if (avail) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const availLines = doc.splitTextToSize(avail, contentWidth);
    doc.text(availLines, marginLeft, y);
    y += availLines.length * 4.0 + 3;
  }

  const contactList: { label: string; url?: string }[] = [];
  if (contact?.email) contactList.push({ label: `Email: ${contact.email}`, url: `mailto:${contact.email}` });
  if (contactParts[1]) contactList.push({ label: `${isEn ? 'Location' : 'Lokasi'}: ${contactParts[1].text}` });
  contactList.push({ label: 'Website: https://awd.my.id', url: 'https://awd.my.id' });
  contactList.push({ label: 'GitHub: https://github.com/putuwahyu29', url: 'https://github.com/putuwahyu29' });
  contactList.push({ label: 'LinkedIn: https://linkedin.com/in/aguswahyu', url: 'https://linkedin.com/in/aguswahyu' });

  contactList.forEach((item) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(item.url ? 37 : 71, item.url ? 99 : 85, item.url ? 235 : 105);
    doc.text(`• ${item.label}`, marginLeft, y);
    if (item.url) {
      const textWidth = doc.getTextWidth(`• ${item.label}`);
      doc.link(marginLeft, y - 2.5, textWidth, 3.8, { url: item.url });
    }
    y += 4.2;
  });

  // ================= 8. FOOTER PAGE NUMBERS & HEADER TITLE =================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Top-left subtle header
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`${fullName} — Portfolio Showcase`, marginLeft, 10);
    doc.text('awd.my.id', marginRight, 10, { align: 'right' });

    // Subtle header divider
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(marginLeft, 11.5, marginRight, 11.5);

    // Bottom footer divider
    doc.line(marginLeft, pageHeight - 11, marginRight, pageHeight - 11);

    // Bottom footer label
    const pageLabel = isEn ? `Page ${i} of ${totalPages}` : `Halaman ${i} dari ${totalPages}`;
    doc.text(pageLabel, pageWidth / 2, pageHeight - 7.5, { align: 'center' });
  }

  // ================= 9. DIRECT BROWSER DOWNLOAD =================
  const cleanFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  try {
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', cleanFileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 500);
  } catch {
    doc.save(cleanFileName);
  }
}
