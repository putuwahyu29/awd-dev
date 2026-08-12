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

if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
  process.env.KEYSTATIC_GITHUB_CLIENT_ID =
    process.env.KEYSTATIC_GITHUB_CLIENT_ID || 'Iv23li1tTeoBzeVmRNKB';
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET =
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET ||
    '68798dd176638b29abf4d6d0c3319cd6cd85e082';
  process.env.KEYSTATIC_SECRET =
    process.env.KEYSTATIC_SECRET || 'keystatic-secret-awd-dev-production-key-2026';
}

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`) || 'putuwahyu29/awd-dev',
      }
    : {
        kind: 'local',
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
          defaultValue: 'iputuaguswahyu@gmail.com',
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
      label: 'Saluran Media Sosial',
      path: 'content/socials',
      format: { data: 'json' },
      schema: {
        channels: fields.array(
          fields.object({
            id: fields.text({ label: 'ID Platform (misal: instagram, tiktok, kaggle)' }),
            name: fields.text({ label: 'Nama Platform' }),
            handle: fields.text({ label: 'Handle / Username (@username)' }),
            role: fields.text({ label: 'Deskripsi Role (Bahasa Indonesia)' }),
            roleEn: fields.text({ label: 'Deskripsi Role (English)' }),
            url: fields.text({ label: 'URL Profil Media Sosial' }),
            iconKey: fields.text({ label: 'Icon Key (instagram, tiktok, youtube, kaggle, dll.)' }),
            accentColor: fields.text({ label: 'Tailwind Accent Color Class' }),
          }),
          {
            label: 'Daftar Link Media Sosial',
            itemLabel: (props) =>
              props.fields.name.value ? `${props.fields.name.value} (${props.fields.handle.value || ''})` : 'Saluran Media Sosial',
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
