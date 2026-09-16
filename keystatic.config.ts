import React from 'react';
import { config, collection, singleton, fields } from '@keystatic/core';
import { masterTechStack, masterCategories } from './lib/master-data';

const categoryOptions = masterCategories.map((item) => ({
  label: item,
  value: item,
}));

const techStackOptions = masterTechStack.map((item) => ({
  label: item,
  value: item,
}));

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`) || 'putuwahyu29/awd-dev',
      }
    : {
        kind: 'local',
      },
  ui: {
    brand: {
      name: 'awd.dev Studio',
      mark: () =>
        React.createElement(
          'svg',
          {
            width: 28,
            height: 28,
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
          },
          React.createElement('path', {
            d: 'M12 2L2 7L12 12L22 7L12 2Z',
            stroke: '#38BDF8',
            strokeWidth: '2.2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          React.createElement('path', {
            d: 'M2 17L12 22L22 17',
            stroke: '#818CF8',
            strokeWidth: '2.2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }),
          React.createElement('path', {
            d: 'M2 12L12 17L22 12',
            stroke: '#60A5FA',
            strokeWidth: '2.2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          })
        ),
    },
    navigation: {
      '📁 KONTEN PORTOFOLIO': ['projects', 'certifications', 'publications'],
      '👤 PROFIL & INFORMASI': ['hero', 'about', 'cv', 'cvEn', 'contact', 'socials'],
      '⚙️ MASTER DATA': ['techStackMaster', 'categoriesMaster'],
    },
  },
  singletons: {
    hero: singleton({
      label: 'Profil & Hero Principal',
      path: 'content/hero',
      format: { data: 'json' },
      schema: {
        name: fields.text({
          label: 'Nama Lengkap',
          defaultValue: 'I Putu Agus Wahyu Dupayana',
        }),
        role: fields.text({
          label: 'Jabatan / Subtitle (Bahasa Indonesia)',
          defaultValue: 'Software Engineer & Content Creator',
        }),
        roleEn: fields.text({
          label: 'Jabatan / Subtitle (English)',
          defaultValue: 'Software Engineer & Content Creator',
        }),
        bioId: fields.text({
          label: 'Bio Singkat (Bahasa Indonesia)',
          multiline: true,
          defaultValue:
            'Pengembang perangkat lunak yang berfokus pada pembangunan sistem web berkinerja tinggi, arsitektur Next.js & Laravel, integrasi LLMs & AI Systems, pengelolaan infrastruktur server Proxmox VE & Docker, serta otomatisasi cloud di Google Cloud Platform (GCP).',
        }),
        bioEn: fields.text({
          label: 'Bio Singkat (English)',
          multiline: true,
          defaultValue:
            'Software engineer focused on building high-performance web systems, Next.js & Laravel architecture, LLMs & AI Systems integration, Proxmox VE & Docker server virtualization infrastructure, and Google Cloud Platform (GCP) cloud automation.',
        }),
        cvUrl: fields.text({
          label: 'URL File CV (misal: /cv.pdf)',
          defaultValue: '/cv.pdf',
        }),
        profileImage: fields.text({
          label: 'Path / URL Foto Profil Utama',
          defaultValue: '/foto-profil.jpg',
        }),
        highlights: fields.array(
          fields.object({
            number: fields.text({ label: 'Angka Metrik (misal: 21+, 4+ Tahun)' }),
            labelId: fields.text({ label: 'Label (Bahasa Indonesia)' }),
            labelEn: fields.text({ label: 'Label (English)' }),
          }),
          {
            label: 'Angka Highlight & Metrik Utama',
            itemLabel: (props) => `${props.fields.number.value || ''} - ${props.fields.labelId.value || ''}`,
          }
        ),
        coreTechStack: fields.array(fields.text({ label: 'Nama Teknologi' }), {
          label: 'Badge Teknologi Utama (Hero Bar)',
          itemLabel: (props) => props.value || 'Teknologi',
        }),
      },
    }),
    about: singleton({
      label: 'Tentang Saya (About Section)',
      path: 'content/about',
      format: { data: 'json' },
      schema: {
        titleId: fields.text({
          label: 'Judul Section (Bahasa Indonesia)',
          defaultValue: 'Tentang Saya',
        }),
        titleEn: fields.text({
          label: 'Judul Section (English)',
          defaultValue: 'About Me',
        }),
        subtitleId: fields.text({
          label: 'Sub-Judul (Bahasa Indonesia)',
          defaultValue: 'Rekayasa Sistem, Arsitektur Web, & Inovasi Teknologi',
        }),
        subtitleEn: fields.text({
          label: 'Sub-Judul (English)',
          defaultValue: 'System Engineering, Web Architecture, & Tech Innovation',
        }),
        bioId: fields.text({
          label: 'Narasi Tentang Saya (Bahasa Indonesia)',
          multiline: true,
          defaultValue:
            'Saya adalah seorang Software Engineer berdedikasi dengan fokus pada pengembangan sistem perangkat lunak yang andal, scalable, dan modern.',
        }),
        bioEn: fields.text({
          label: 'Narasi Tentang Saya (English)',
          multiline: true,
          defaultValue:
            'I am a dedicated Software Engineer focused on developing reliable, scalable, and modern software systems.',
        }),
        pillars: fields.array(
          fields.object({
            titleId: fields.text({ label: 'Judul Pilar (ID)' }),
            titleEn: fields.text({ label: 'Judul Pilar (EN)' }),
            descId: fields.text({ label: 'Deskripsi (ID)', multiline: true }),
            descEn: fields.text({ label: 'Deskripsi (EN)', multiline: true }),
          }),
          {
            label: 'Pilar Utama Keahlian',
            itemLabel: (props) => props.fields.titleId.value || 'Pilar Keahlian',
          }
        ),
      },
    }),
    contact: singleton({
      label: 'Informasi Kontak & Lokasi',
      path: 'content/contact',
      format: { data: 'json' },
      schema: {
        email: fields.text({
          label: 'Email Utama Kontak',
          defaultValue: 'aguswahyu@office.awd.my.id',
        }),
        locationId: fields.text({
          label: 'Lokasi / Domisili (ID)',
          defaultValue: 'Klungkung, Bali / Mataram, NTB, Indonesia',
        }),
        locationEn: fields.text({
          label: 'Lokasi / Domisili (EN)',
          defaultValue: 'Klungkung, Bali / Mataram, NTB, Indonesia',
        }),
        availabilityId: fields.text({
          label: 'Status Ketersediaan / Work Availability (ID)',
          multiline: true,
          defaultValue:
            'Terbuka untuk kolaborasi proyek freelance, pembuatan sistem web, & konsultasi arsitektur cloud/server.',
        }),
        availabilityEn: fields.text({
          label: 'Status Ketersediaan / Work Availability (EN)',
          multiline: true,
          defaultValue:
            'Open for freelance project collaboration, web systems development, & cloud/server architecture consultation.',
        }),
      },
    }),
    socials: singleton({
      label: 'Saluran Media Sosial & Bio Links',
      path: 'content/socials',
      format: { data: 'json' },
      schema: {
        channels: fields.array(
          fields.object({
            id: fields.text({ label: 'ID Platform (misal: website, cv, linkedin, github, tiktok, instagram, threads, kaggle, youtube, facebook, scholar, blog)' }),
            name: fields.text({ label: 'Nama Platform / Link' }),
            handle: fields.text({ label: 'Handle / Subtitle Singkat (@username / deskripsi ringkas)' }),
            role: fields.text({ label: 'Deskripsi Role / Keterangan (Bahasa Indonesia)' }),
            roleEn: fields.text({ label: 'Deskripsi Role / Keterangan (English)' }),
            url: fields.text({ label: 'URL Tautan' }),
            iconKey: fields.text({ label: 'Icon Key (website, cv, linkedin, github, tiktok, instagram, threads, kaggle, youtube, facebook, scholar, blog)' }),
            accentColor: fields.text({ label: 'Tailwind Accent Color Class' }),
            isPinned: fields.checkbox({
              label: '📌 Sematkan Link ke Paling Atas (Pinned Link - Maks 3)',
              description: 'Centang jika ingin link ini disematkan di urutan paling atas halaman Bio Links (maksimal 3 link teratas).',
            }),
          }),
          {
            label: 'Daftar Link & Media Sosial',
            itemLabel: (props) =>
              props.fields.name.value
                ? `${props.fields.isPinned.value ? '📌 ' : ''}${props.fields.name.value} (${props.fields.handle.value || props.fields.url.value || ''})`
                : 'Saluran Media Sosial / Link',
          }
        ),
      },
    }),
    techStackMaster: singleton({
      label: 'Master Tech Stack',
      path: 'content/tech-stack',
      format: { data: 'json' },
      schema: {
        items: fields.array(fields.text({ label: 'Nama Teknologi' }), {
          label: 'Daftar Master Teknologi (Tech Stack)',
          itemLabel: (props) => props.value || 'Teknologi',
        }),
      },
    }),
    categoriesMaster: singleton({
      label: 'Master Kategori Proyek',
      path: 'content/categories',
      format: { data: 'json' },
      schema: {
        items: fields.array(fields.text({ label: 'Nama Kategori' }), {
          label: 'Daftar Master Kategori Proyek',
          itemLabel: (props) => props.value || 'Kategori',
        }),
      },
    }),
    cv: singleton({
      label: 'Curriculum Vitae (Bahasa Indonesia)',
      path: 'content/cv',
      format: { data: 'json' },
      schema: {
        personalInfo: fields.object({
          fullName: fields.text({
            label: 'Nama Lengkap (Heading CV)',
            defaultValue: 'I PUTU AGUS WAHYU DUPAYANA',
          }),
          website: fields.text({
            label: 'Website Pribadi (misal: awd.my.id)',
            defaultValue: 'awd.my.id',
          }),
          email: fields.text({
            label: 'Email Kontak',
            defaultValue: 'aguswahyu@office.awd.my.id',
          }),
          linkedin: fields.text({
            label: 'LinkedIn (misal: linkedin.com/in/aguswahyu)',
            defaultValue: 'linkedin.com/in/aguswahyu',
          }),
        }),
        summary: fields.text({
          label: 'Ringkasan Profesional / Profil Singkat (Opsional)',
          multiline: true,
          defaultValue:
            'Pengembang perangkat lunak berdedikasi dengan fokus pada rekayasa sistem web berkinerja tinggi (Next.js, Laravel), integrasi Agentic AI & Multimodal LLMs, serta otomatisasi cloud dan virtualisasi server (Proxmox VE, Docker, GCP).',
        }),
        experiences: fields.array(
          fields.object({
            role: fields.text({ label: 'Jabatan / Posisi' }),
            company: fields.text({ label: 'Instansi / Perusahaan' }),
            location: fields.text({ label: 'Lokasi (misal: Surabaya)' }),
            period: fields.text({ label: 'Periode (misal: September 2026 – Sekarang)' }),
            descriptions: fields.array(fields.text({ label: 'Poin Tanggung Jawab / Pencapaian' }), {
              label: 'Daftar Bullet Points Deskripsi Pekerjaan',
              itemLabel: (props) => props.value || 'Poin Deskripsi',
            }),
          }),
          {
            label: 'Pengalaman Kerja (Work Experience)',
            itemLabel: (props) =>
              props.fields.role.value
                ? `${props.fields.role.value} - ${props.fields.company.value || ''}`
                : 'Pengalaman Kerja',
          }
        ),
        education: fields.array(
          fields.object({
            institution: fields.text({ label: 'Nama Institusi / Perguruan Tinggi' }),
            location: fields.text({ label: 'Lokasi (misal: Jakarta)' }),
            degree: fields.text({ label: 'Gelar / Strata (misal: Sarjana Terapan Statistika)' }),
            major: fields.text({ label: 'Program Studi / Jurusan' }),
            period: fields.text({ label: 'Periode Pendidikan (misal: Oktober 2020 – Juli 2024)' }),
            details: fields.text({ label: 'Keterangan Tambahan / Fokus Studi (Opsional)' }),
          }),
          {
            label: 'Riwayat Pendidikan (Education)',
            itemLabel: (props) =>
              props.fields.institution.value
                ? `${props.fields.degree.value || ''} - ${props.fields.institution.value}`
                : 'Riwayat Pendidikan',
          }
        ),
        certifications: fields.array(
          fields.object({
            title: fields.text({ label: 'Nama Pelatihan / Sertifikasi' }),
            issuer: fields.text({ label: 'Lembaga Penerbit / Penyelenggara' }),
            period: fields.text({ label: 'Waktu / Periode (misal: Juni 2026)' }),
            credentialUrl: fields.text({ label: 'URL Kredensial / Sertifikat (Opsional)' }),
          }),
          {
            label: 'Pelatihan & Sertifikasi (Training & Certifications)',
            itemLabel: (props) =>
              props.fields.title.value
                ? `${props.fields.title.value} (${props.fields.period.value || ''})`
                : 'Pelatihan / Sertifikasi',
          }
        ),
        publications: fields.array(
          fields.object({
            title: fields.text({ label: 'Judul Publikasi / Paper' }),
            publisher: fields.text({ label: 'Jurnal / Konferensi / Penyelenggara' }),
            year: fields.text({ label: 'Tahun / Edisi & Halaman (misal: 2025(1), 281–292)' }),
            link: fields.text({ label: 'Tautan / DOI Publikasi (Opsional)' }),
          }),
          {
            label: 'Publikasi Ilmiah & Penelitian',
            itemLabel: (props) => props.fields.title.value || 'Publikasi Ilmiah',
          }
        ),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: 'Kategori Keahlian (misal: Pengembangan Perangkat Lunak)' }),
            description: fields.text({ label: 'Deskripsi / Detail Tools & Keahlian', multiline: true }),
          }),
          {
            label: 'Keahlian Utama (Core Skills)',
            itemLabel: (props) => props.fields.category.value || 'Kategori Keahlian',
          }
        ),
      },
    }),
    cvEn: singleton({
      label: 'Curriculum Vitae (English Resume)',
      path: 'content/cv.en',
      format: { data: 'json' },
      schema: {
        personalInfo: fields.object({
          fullName: fields.text({
            label: 'Full Name (CV Heading)',
            defaultValue: 'I PUTU AGUS WAHYU DUPAYANA',
          }),
          website: fields.text({
            label: 'Personal Website (e.g. awd.my.id)',
            defaultValue: 'awd.my.id',
          }),
          email: fields.text({
            label: 'Contact Email',
            defaultValue: 'aguswahyu@office.awd.my.id',
          }),
          linkedin: fields.text({
            label: 'LinkedIn Profile',
            defaultValue: 'linkedin.com/in/aguswahyu',
          }),
        }),
        summary: fields.text({
          label: 'Professional Summary (Optional)',
          multiline: true,
          defaultValue:
            'Dedicated Software & AI Systems Engineer specializing in high-performance web systems engineering (Next.js, Laravel), Agentic AI & Multimodal LLM integrations, and cloud automation with server virtualization (Proxmox VE, Docker, GCP).',
        }),
        experiences: fields.array(
          fields.object({
            role: fields.text({ label: 'Role / Job Title' }),
            company: fields.text({ label: 'Company / Organization' }),
            location: fields.text({ label: 'Location (e.g. Remote, Surabaya)' }),
            period: fields.text({ label: 'Period (e.g. September 2026 – Present)' }),
            descriptions: fields.array(fields.text({ label: 'Responsibility / Achievement Bullet' }), {
              label: 'Job Description Bullet Points',
              itemLabel: (props) => props.value || 'Bullet Point',
            }),
          }),
          {
            label: 'Work Experience',
            itemLabel: (props) =>
              props.fields.role.value
                ? `${props.fields.role.value} - ${props.fields.company.value || ''}`
                : 'Work Experience',
          }
        ),
        education: fields.array(
          fields.object({
            institution: fields.text({ label: 'Institution / University Name' }),
            location: fields.text({ label: 'Location (e.g. Jakarta, Indonesia)' }),
            degree: fields.text({ label: 'Degree (e.g. Bachelor of Applied Statistics)' }),
            major: fields.text({ label: 'Major / Study Program' }),
            period: fields.text({ label: 'Period (e.g. October 2020 – July 2024)' }),
            details: fields.text({ label: 'Additional Details (Optional)' }),
          }),
          {
            label: 'Education',
            itemLabel: (props) =>
              props.fields.institution.value
                ? `${props.fields.degree.value || ''} - ${props.fields.institution.value}`
                : 'Education',
          }
        ),
        certifications: fields.array(
          fields.object({
            title: fields.text({ label: 'Certification / Training Title' }),
            issuer: fields.text({ label: 'Issuing Organization' }),
            period: fields.text({ label: 'Period / Date (e.g. June 2026)' }),
            credentialUrl: fields.text({ label: 'Credential URL (Optional)' }),
          }),
          {
            label: 'Certifications & Training',
            itemLabel: (props) =>
              props.fields.title.value
                ? `${props.fields.title.value} (${props.fields.period.value || ''})`
                : 'Certification',
          }
        ),
        publications: fields.array(
          fields.object({
            title: fields.text({ label: 'Publication Title' }),
            publisher: fields.text({ label: 'Publisher / Conference / Journal' }),
            year: fields.text({ label: 'Year / Volume & Pages' }),
            link: fields.text({ label: 'Paper / DOI Link (Optional)' }),
          }),
          {
            label: 'Academic Publications',
            itemLabel: (props) => props.fields.title.value || 'Publication',
          }
        ),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: 'Skill Category' }),
            description: fields.text({ label: 'Description / Tools & Skills', multiline: true }),
          }),
          {
            label: 'Core Skills',
            itemLabel: (props) => props.fields.category.value || 'Skill Category',
          }
        ),
      },
    }),
  },
  collections: {
    projects: collection({
      label: 'Proyek',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Proyek' } }),
        description: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        tech_stack: fields.array(
          fields.select({
            label: 'Pilih Teknologi Standar',
            options: techStackOptions.length > 0 ? techStackOptions : [{ label: 'Next.js', value: 'Next.js' }],
            defaultValue: techStackOptions[0]?.value || 'Next.js',
          }),
          {
            label: 'Tech Stack (Pilihan Standar)',
            itemLabel: (props) => props.value || 'Teknologi',
          }
        ),
        custom_tech_stack: fields.array(fields.text({ label: 'Teknologi Kustom' }), {
          label: 'Tech Stack Tambahan (Kustom)',
          itemLabel: (props) => props.value || 'Teknologi Kustom',
        }),
        categories: fields.array(
          fields.select({
            label: 'Pilih Kategori Standar',
            options: categoryOptions.length > 0 ? categoryOptions : [{ label: 'Aplikasi Web', value: 'Aplikasi Web' }],
            defaultValue: categoryOptions[0]?.value || 'Aplikasi Web',
          }),
          {
            label: 'Kategori Proyek (Pilihan Standar)',
            itemLabel: (props) => props.value || 'Kategori',
          }
        ),
        custom_categories: fields.array(fields.text({ label: 'Kategori Kustom' }), {
          label: 'Kategori Tambahan (Kustom)',
          itemLabel: (props) => props.value || 'Kategori Kustom',
        }),
        image_preview: fields.image({
          label: 'Gambar Preview Utama Proyek',
          directory: 'public/images/projects',
          publicPath: '/images/projects/',
        }),
        images: fields.array(
          fields.image({
            label: 'Gambar Detail Proyek',
            directory: 'public/images/projects',
            publicPath: '/images/projects/',
          }),
          {
            label: 'Galeri Gambar Detail Proyek',
            itemLabel: (props) => props.value?.filename || 'Gambar Detail',
          }
        ),
        link: fields.text({ label: 'Link Proyek' }),
        featured: fields.checkbox({ label: 'Proyek Unggulan (Featured)', defaultValue: false }),
        date: fields.text({ label: 'Tanggal (YYYY-MM-DD)' }),
        content: fields.markdoc({
          label: 'Detail Konten (Markdown)',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/projects',
              publicPath: '/images/projects/',
            },
          },
        }),
      },
    }),
    certifications: collection({
      label: 'Sertifikasi',
      slugField: 'title',
      path: 'content/certifications/*',
      format: { contentField: 'content' },
      schema: {
        id: fields.text({ label: 'ID Sertifikat' }),
        title: fields.slug({ name: { label: 'Judul Sertifikasi' } }),
        issuer: fields.text({ label: 'Penerbit (Issuer)' }),
        issueDate: fields.text({ label: 'Tahun / Tanggal Terbit' }),
        credentialId: fields.text({ label: 'ID Kredensial' }),
        credentialUrl: fields.text({ label: 'URL Kredensial' }),
        badgeImageUrl: fields.image({
          label: 'Gambar Badge Sertifikat',
          directory: 'public/images/certifications',
          publicPath: '/images/certifications/',
        }),
        skills: fields.array(fields.text({ label: 'Keahlian' }), {
          label: 'Daftar Skills',
          itemLabel: (props: { value: string }) => props.value,
        }),
        level: fields.text({ label: 'Tingkat / Level' }),
        content: fields.markdoc({ label: 'Deskripsi Sertifikat', extension: 'md' }),
      },
    }),
    publications: collection({
      label: 'Publikasi Ilmiah',
      slugField: 'title',
      path: 'content/publications/*',
      format: { contentField: 'content' },
      schema: {
        id: fields.text({ label: 'ID Publikasi' }),
        title: fields.slug({ name: { label: 'Judul Publikasi' } }),
        journal: fields.text({ label: 'Jurnal / Konferensi' }),
        year: fields.text({ label: 'Tahun' }),
        authors: fields.text({ label: 'Penulis (Authors)' }),
        doi: fields.text({ label: 'DOI' }),
        link: fields.text({ label: 'Link Dokumentasi / PDF' }),
        type: fields.select({
          label: 'Tipe Publikasi',
          options: [
            { label: 'Jurnal Ilmiah', value: 'Jurnal Ilmiah' },
            { label: 'Konferensi', value: 'Konferensi' },
            { label: 'Whitepaper', value: 'Whitepaper' },
            { label: 'Prosiding', value: 'Prosiding' },
          ],
          defaultValue: 'Konferensi',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Daftar Tag',
          itemLabel: (props: { value: string }) => props.value,
        }),
        content: fields.markdoc({ label: 'Abstrak / Ringkasan', extension: 'md' }),
      },
    }),
  },
});
