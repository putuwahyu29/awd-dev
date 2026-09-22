export interface CvPersonalInfo {
  fullName: string;
  website?: string;
  email: string;
  linkedin?: string;
  github?: string;
  title?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  linkedinDisplay?: string;
  githubUrl?: string;
  githubDisplay?: string;
  websiteUrl?: string;
  websiteDisplay?: string;
}

export interface CvExperience {
  role: string;
  company: string;
  location?: string;
  period: string;
  descriptions: string[];
}

export interface CvEducation {
  institution: string;
  location?: string;
  degree: string;
  major?: string;
  period: string;
  details?: string;
}

export interface CvCertification {
  title: string;
  issuer: string;
  period: string;
  credentialUrl?: string;
}

export interface CvPublication {
  title: string;
  publisher: string;
  year: string;
  link?: string;
}

export interface CvSkill {
  category: string;
  description: string;
}

export interface CvData {
  personalInfo: CvPersonalInfo;
  summary?: string;
  experiences: CvExperience[];
  education: CvEducation[];
  certifications: CvCertification[];
  publications: CvPublication[];
  skills: CvSkill[];
}

export interface CvAllData {
  id: CvData;
  en: CvData;
}

export const fallbackCvData: CvData = {
  personalInfo: {
    fullName: 'I PUTU AGUS WAHYU DUPAYANA',
    location: 'Surabaya, Indonesia',
    email: 'aguswahyu@office.awd.my.id',
    website: 'awd.my.id',
    github: 'github.com/putuwahyu29',
    linkedin: 'linkedin.com/in/aguswahyu',
  },
  summary:
    'Pengembang perangkat lunak berdedikasi dengan fokus pada rekayasa sistem web berkinerja tinggi (Next.js, Laravel), integrasi Agentic AI & Multimodal LLMs, serta otomatisasi cloud dan virtualisasi server (Proxmox VE, Docker, GCP).',
  experiences: [
    {
      role: 'Pranata Komputer Ahli Pertama',
      company: 'BPS Provinsi Jawa Timur',
      location: 'Surabaya',
      period: 'Desember 2024 – Sekarang',
      descriptions: [
        'Mengembangkan dan memelihara sistem informasi dan platform digital internal untuk mendukung percepatan pengolahan data statistik.',
        'Merancang arsitektur aplikasi web modern serta mengintegrasikan solusi otomatisasi data pipeline dan infrastruktur server.',
      ],
    },
    {
      role: 'AI Training Engineer',
      company: 'Shipd',
      location: 'Remote',
      period: 'September 2026 – Sekarang',
      descriptions: [
        'Merancang, mengkurasi, dan mengevaluasi dataset berkualitas tinggi untuk pelatihan, fine-tuning, dan alignment Large Language Models (LLMs).',
        'Mengembangkan pipeline evaluasi performa model, benchmark reasoning dan akurasi kode, serta pengoptimalan prompt engineering guna meningkatkan reliabilitas output model AI.',
      ],
    },
  ],
  education: [
    {
      institution: 'Politeknik Statistika STIS',
      location: 'Jakarta',
      degree: 'Sarjana Terapan Statistika',
      major: 'Program Studi Diploma IV Komputasi Statistik',
      period: 'Oktober 2020 – Juli 2024',
      details: 'Fokus pada rekayasa perangkat lunak, sains data, komputasi statistik, dan arsitektur sistem informasi.',
    },
  ],
  certifications: [
    {
      title: 'Pelatihan Instruktur Nasional Pengolahan Wilkerstat 2026',
      issuer: 'Pusat Pendidikan dan Pelatihan Badan Pusat Statistik',
      period: 'Juni 2026',
    },
    {
      title: 'Pelatihan Instruktur Daerah Sensus Ekonomi 2026',
      issuer: 'Pusat Pendidikan dan Pelatihan Badan Pusat Statistik',
      period: 'Mei 2026',
    },
    {
      title: 'Pelatihan Deep Learning',
      issuer: 'Pusat Pengembangan Talenta Digital Kementerian Komunikasi dan Digital',
      period: 'September 2025',
    },
    {
      title: 'Pelatihan Instruktur Nasional Lapangan Pemutakhiran Wilkerstat 2025',
      issuer: 'Pusat Pendidikan dan Pelatihan Badan Pusat Statistik',
      period: 'Februari 2025',
    },
    {
      title: 'Pelatihan Kecerdasan Artifisial & Keamanan Informasi',
      issuer: 'Pusat Pengembangan Talenta Digital Kementerian Komunikasi dan Digital',
      period: 'Januari 2025',
    },
    {
      title: 'Sertifikasi Profesi Ilmuwan Data',
      issuer: 'Lembaga Sertifikasi Profesi Politeknik Statistika STIS',
      period: 'Juli 2024',
    },
  ],
  publications: [
    {
      title:
        'The Application of Retrieval-Augmented Generation (RAG) in Developing an Intelligent Risk Management Platform: A Case Study at Statistics Jawa Timur',
      publisher: 'Proceedings of The International Conference on Data Science and Official Statistics',
      year: '2025(1), 281–292',
      link: 'https://doi.org/10.34123/icdsos.v2025i1.123',
    },
    {
      title:
        'Development of a Web-Based Activity Agenda Management Information System at Statistics of Nusa Tenggara Barat Province',
      publisher: 'Seminar Nasional Official Statistics',
      year: '2024(1), 499-510',
      link: 'https://doi.org/10.34123/semnasoffstat.v2024i1.499',
    },
  ],
  skills: [
    {
      category: 'Pengembangan Perangkat Lunak',
      description:
        'Membangun aplikasi web menggunakan ekosistem Laravel, Next.js, TypeScript, React, Tailwind CSS, dan RESTful/GraphQL APIs.',
    },
    {
      category: 'Kecerdasan Buatan (AI)',
      description:
        'Mengimplementasikan Agentic AI, Multimodal AI, RAG (Retrieval-Augmented Generation), LangChain, LlamaIndex, dan integrasi LLMs.',
    },
    {
      category: 'Komputasi Awan (Cloud)',
      description:
        'Memanfaatkan layanan Google Cloud Platform (GCP) untuk arsitektur cloud-native, Compute Engine, Cloud Run, dan Cloud Storage.',
    },
    {
      category: 'Infrastruktur & DevOps',
      description:
        'Mengelola server Linux, virtualisasi (Proxmox VE), kontainerisasi (Docker & Docker Compose), Nginx Reverse Proxy, dan CI/CD automation.',
    },
    {
      category: 'Insinyur Data (Data Engineering)',
      description:
        'Merancang arsitektur data, integrasi basis data PostgreSQL/MySQL, data pipeline ETL/ELT, dan optimasi query data analitik.',
    },
    {
      category: 'Operasional TI',
      description:
        'Memelihara infrastruktur jaringan komputer, sistem backup berkala, serta melakukan instalasi dan pemecahan masalah perangkat keras.',
    },
  ],
};

export const fallbackCvDataEn: CvData = {
  personalInfo: {
    fullName: 'I PUTU AGUS WAHYU DUPAYANA',
    location: 'Surabaya, Indonesia',
    email: 'aguswahyu@office.awd.my.id',
    website: 'awd.my.id',
    github: 'github.com/putuwahyu29',
    linkedin: 'linkedin.com/in/aguswahyu',
  },
  summary:
    'Dedicated Software & AI Systems Engineer specializing in high-performance web systems engineering (Next.js, Laravel), Agentic AI & Multimodal LLM integrations, and cloud automation with server virtualization (Proxmox VE, Docker, GCP).',
  experiences: [
    {
      role: 'First Expert Computer Specialist (Software Engineer & Systems Architect)',
      company: 'BPS Provinsi Jawa Timur',
      location: 'Surabaya, Indonesia',
      period: 'December 2024 – Present',
      descriptions: [
        'Develop and maintain enterprise-grade internal information systems and digital platforms to accelerate official statistical data processing.',
        'Architect modern web applications and integrate automated ETL data pipelines with virtualized server infrastructure.',
      ],
    },
    {
      role: 'AI Training Engineer',
      company: 'Shipd',
      location: 'Remote',
      period: 'September 2026 – Present',
      descriptions: [
        'Designed, curated, and evaluated high-quality domain datasets for fine-tuning, instruction tuning, and alignment of Large Language Models (LLMs).',
        'Developed comprehensive model evaluation pipelines, reasoning and code generation benchmarks, and prompt engineering protocols to optimize model accuracy, safety, and output reliability.',
      ],
    },
  ],
  education: [
    {
      institution: 'Polytechnic of Statistics STIS',
      location: 'Jakarta, Indonesia',
      degree: 'Bachelor of Applied Statistics (S.Tr.Stat.)',
      major: 'Diploma IV in Statistical Computing',
      period: 'October 2020 – July 2024',
      details:
        'Focused on software engineering, data science, statistical computing, and enterprise information system architecture.',
    },
  ],
  certifications: [
    {
      title: 'National Instructor Training for Wilkerstat Processing 2026',
      issuer: 'Education and Training Center of BPS - Statistics Indonesia',
      period: 'June 2026',
    },
    {
      title: 'Regional Instructor Training for Economic Census 2026',
      issuer: 'Education and Training Center of BPS - Statistics Indonesia',
      period: 'May 2026',
    },
    {
      title: 'Deep Learning Training',
      issuer: 'Digital Talent Development Center, Ministry of Communication and Digital',
      period: 'September 2025',
    },
    {
      title: 'National Field Instructor Training for Wilkerstat Updating 2025',
      issuer: 'Education and Training Center of BPS - Statistics Indonesia',
      period: 'February 2025',
    },
    {
      title: 'Artificial Intelligence & Information Security Training',
      issuer: 'Digital Talent Development Center, Ministry of Communication and Digital',
      period: 'January 2025',
    },
    {
      title: 'Certified Professional Data Scientist',
      issuer: 'Professional Certification Body (LSP) of Polytechnic of Statistics STIS',
      period: 'July 2024',
    },
  ],
  publications: [
    {
      title:
        'The Application of Retrieval-Augmented Generation (RAG) in Developing an Intelligent Risk Management Platform: A Case Study at Statistics Jawa Timur',
      publisher: 'Proceedings of The International Conference on Data Science and Official Statistics',
      year: '2025(1), 281–292',
      link: 'https://doi.org/10.34123/icdsos.v2025i1.591',
    },
    {
      title:
        'Development of a Web-Based Activity Agenda Management Information System at Statistics of Nusa Tenggara Barat Province',
      publisher: 'Seminar Nasional Official Statistics',
      year: '2024(1), 499-510',
      link: 'https://doi.org/10.34123/semnasoffstat.v2024i1.2041',
    },
  ],
  skills: [
    {
      category: 'Software Engineering',
      description:
        'Building robust web applications using Laravel, Next.js, TypeScript, React, Tailwind CSS, and RESTful/GraphQL APIs.',
    },
    {
      category: 'Artificial Intelligence (AI)',
      description:
        'Implementing Agentic AI, Multimodal AI, RAG (Retrieval-Augmented Generation), LangChain, LlamaIndex, and LLM integrations.',
    },
    {
      category: 'Cloud Computing',
      description:
        'Leveraging Google Cloud Platform (GCP) for cloud-native architecture, Compute Engine, Cloud Run, and Cloud Storage.',
    },
    {
      category: 'Infrastructure & DevOps',
      description:
        'Managing Linux servers, virtualization (Proxmox VE), containerization (Docker & Docker Compose), Nginx Reverse Proxy, and CI/CD automation.',
    },
    {
      category: 'Data Engineering',
      description:
        'Architecting data infrastructure, PostgreSQL/MySQL database integration, ETL/ELT data pipelines, and query optimization for analytics.',
    },
    {
      category: 'IT Operations',
      description:
        'Maintaining computer network infrastructure, automated backup routines, system administration, and hardware troubleshooting.',
    },
  ],
};

