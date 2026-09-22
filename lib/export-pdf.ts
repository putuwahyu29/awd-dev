import { jsPDF } from 'jspdf';
import { CvData } from './cv-types';

export function exportCvToPdf(
  cvData: CvData,
  customFileName?: string,
  lang: 'id' | 'en' = 'id'
): void {
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
  const marginBottom = 15;

  let y = marginTop + 2;

  // Intelligent Page Break Handler with Margin Protection
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  const { personalInfo, experiences, education, certifications, publications, skills, summary } = cvData;
  const fullName = personalInfo.fullName || 'I PUTU AGUS WAHYU DUPAYANA';
  const defaultSuffix = isEn ? '_EN' : '_ID';
  const fileName =
    customFileName || `CV_${fullName.replace(/\s+/g, '_')}${defaultSuffix}.pdf`;

  // ================= 1. HEADER (STANDARD ATS RESUME - 2 CLEAN ROWS) =================
  // Full Name: 22pt Bold Uppercase
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(fullName.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 6.5;

  const location = personalInfo.location || 'Surabaya, Indonesia';
  const email = personalInfo.email || 'aguswahyu@office.awd.my.id';
  const phone = personalInfo.phone;
  const website = personalInfo.website || personalInfo.websiteDisplay || 'awd.my.id';
  const github = personalInfo.github || personalInfo.githubDisplay || 'github.com/putuwahyu29';
  const linkedin = personalInfo.linkedin || personalInfo.linkedinDisplay || 'linkedin.com/in/aguswahyu';

  // Row 1: Location | Phone | Email
  const row1Items: string[] = [];
  if (location) row1Items.push(location);
  if (phone) row1Items.push(phone);
  if (email) row1Items.push(email);

  if (row1Items.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // slate-600
    const row1Text = row1Items.join('   |   ');
    doc.text(row1Text, pageWidth / 2, y, { align: 'center' });
    y += 4.8;
  }

  // Row 2: Digital Portfolios (Website | GitHub | LinkedIn)
  const row2Items: string[] = [];
  if (website) row2Items.push(website.replace(/^https?:\/\//, ''));
  if (github) row2Items.push(github.replace(/^https?:\/\//, ''));
  if (linkedin) row2Items.push(linkedin.replace(/^https?:\/\//, ''));

  if (row2Items.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // slate-600
    const row2Text = row2Items.join('   |   ');
    doc.text(row2Text, pageWidth / 2, y, { align: 'center' });
    y += 7.5;
  } else {
    y += 3.5;
  }

  // Section Header Helper (Standard 12.5pt Bold with Divider)
  const renderSectionHeader = (title: string, minFirstItemHeight = 22) => {
    checkPageBreak(9 + minFirstItemHeight);
    y += 3.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), marginLeft, y);
    y += 2.2;

    // Crisp horizontal rule
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.35);
    doc.line(marginLeft, y, marginRight, y);
    y += 5.5;
  };

  // Optional Summary: 10.5pt Standard
  if (summary && summary.trim().length > 0) {
    renderSectionHeader(isEn ? 'PROFESSIONAL SUMMARY' : 'TENTANG SAYA', 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59); // slate-800
    const summaryLines = doc.splitTextToSize(summary.trim(), contentWidth);
    const blockHeight = summaryLines.length * 5.0;
    checkPageBreak(blockHeight + 2);
    doc.text(summary.trim(), marginLeft, y, { align: 'justify', maxWidth: contentWidth });
    y += blockHeight + 3.5;
  }

  // ================= 2. PENGALAMAN KERJA / WORK EXPERIENCE =================
  if (experiences && experiences.length > 0) {
    renderSectionHeader(isEn ? 'WORK EXPERIENCE' : 'PENGALAMAN KERJA', 24);

    experiences.forEach((exp) => {
      checkPageBreak(22);

      // Line 1: Company (11.5pt Bold) & Period (10.5pt Normal Right-aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.setTextColor(15, 23, 42);
      const companyText = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      doc.text(companyText, marginLeft, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(71, 85, 105);
      doc.text(exp.period, marginRight, y, { align: 'right' });
      y += 5.0;

      // Line 2: Role (10.5pt Italic)
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10.5);
      doc.setTextColor(51, 65, 85);
      doc.text(exp.role, marginLeft, y);
      y += 5.0;

      // Bullet descriptions (10.5pt Justified with 5.0mm line height)
      if (exp.descriptions && exp.descriptions.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(30, 41, 59);

        exp.descriptions.forEach((desc) => {
          const bullet = '•';
          const textLines = doc.splitTextToSize(desc, contentWidth - 7);
          const blockHeight = textLines.length * 5.0 + 1.5;
          checkPageBreak(blockHeight);

          doc.text(bullet, marginLeft + 1.5, y);
          doc.text(desc, marginLeft + 6.5, y, { align: 'justify', maxWidth: contentWidth - 7 });
          y += blockHeight;
        });
      }
      y += 3;
    });
  }

  // ================= 3. PENDIDIKAN / EDUCATION =================
  if (education && education.length > 0) {
    renderSectionHeader(isEn ? 'EDUCATION' : 'PENDIDIKAN', 20);

    education.forEach((edu) => {
      checkPageBreak(18);

      // Institution (11.5pt Bold) & Period (10.5pt Normal Right-aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11.5);
      doc.setTextColor(15, 23, 42);
      const instText = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution;
      doc.text(instText, marginLeft, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(71, 85, 105);
      doc.text(edu.period, marginRight, y, { align: 'right' });
      y += 5.0;

      // Degree & Major (10.5pt Normal)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(51, 65, 85);
      const degreeText = edu.major ? `${edu.degree}, ${edu.major}` : edu.degree;
      doc.text(degreeText, marginLeft, y);
      y += 4.8;

      // Details (10pt Justified)
      if (edu.details) {
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        const detailLines = doc.splitTextToSize(edu.details, contentWidth);
        const blockHeight = detailLines.length * 4.6;
        checkPageBreak(blockHeight);
        doc.text(edu.details, marginLeft, y, { align: 'justify', maxWidth: contentWidth });
        y += blockHeight;
      }
      y += 3;
    });
  }

  // ================= 4. PELATIHAN & SERTIFIKASI / TRAINING & CERTIFICATIONS =================
  if (certifications && certifications.length > 0) {
    renderSectionHeader(isEn ? 'TRAINING & CERTIFICATIONS' : 'PELATIHAN & SERTIFIKASI', 16);

    certifications.forEach((cert) => {
      checkPageBreak(12);

      // Title (10.5pt Bold) & Period (10pt Normal Right-aligned)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      const titleLines = doc.splitTextToSize(cert.title, contentWidth - 42);
      doc.text(cert.title, marginLeft, y, { maxWidth: contentWidth - 42 });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(cert.period, marginRight, y, { align: 'right' });
      y += titleLines.length * 4.6;

      // Issuer (9.5pt Normal)
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(71, 85, 105);
      doc.text(cert.issuer, marginLeft, y);
      y += 4.6;
    });
    y += 2;
  }

  // ================= 5. PUBLIKASI / PUBLICATIONS =================
  if (publications && publications.length > 0) {
    renderSectionHeader(isEn ? 'PUBLICATIONS' : 'PUBLIKASI', 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);

    publications.forEach((pub) => {
      const pubFullText = `${pub.title}. ${pub.publisher}, ${pub.year}`;
      const pubLines = doc.splitTextToSize(pubFullText, contentWidth - 7);
      const blockHeight = pubLines.length * 5.0 + 2.0;
      checkPageBreak(blockHeight);

      doc.text('•', marginLeft + 1.5, y);
      doc.text(pubFullText, marginLeft + 6.5, y, { align: 'justify', maxWidth: contentWidth - 7 });
      y += blockHeight;
    });
    y += 2;
  }

  // ================= 6. KEAHLIAN / SKILLS =================
  if (skills && skills.length > 0) {
    renderSectionHeader(isEn ? 'SKILLS' : 'KEAHLIAN', 14);

    skills.forEach((skill) => {
      const bullet = '•';
      const categoryPrefix = `${skill.category}: `;
      const fullSkillText = `${categoryPrefix}${skill.description}`;
      const skillLines = doc.splitTextToSize(fullSkillText, contentWidth - 7);
      const blockHeight = skillLines.length * 5.0 + 1.8;

      checkPageBreak(blockHeight);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(30, 41, 59);
      doc.text(bullet, marginLeft + 1.5, y);

      doc.text(fullSkillText, marginLeft + 6.5, y, { align: 'justify', maxWidth: contentWidth - 7 });
      y += blockHeight;
    });
  }

  // ================= 7. FOOTER PAGE NUMBERS (IF MULTI-PAGE) =================
  const totalPages = doc.getNumberOfPages();
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184); // slate-400
      const pageLabel = isEn ? `Page ${i} of ${totalPages}` : `Halaman ${i} dari ${totalPages}`;
      doc.text(pageLabel, pageWidth / 2, pageHeight - 8, { align: 'center' });
    }
  }

  // ================= 8. EXPLICIT CROSS-BROWSER DOWNLOAD (CHROME & ALL BROWSERS) =================
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
    // Native jsPDF fallback
    doc.save(cleanFileName);
  }
}
