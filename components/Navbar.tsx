'use client';

import { useState, useEffect } from 'react';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'projects', 'github', 'publications', 'certifications', 'creator', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('Beranda', 'Home'), href: '/#home', id: 'home' },
    { name: t('Proyek', 'Projects'), href: '/#projects', id: 'projects' },
    { name: 'GitHub', href: '/#github', id: 'github' },
    { name: t('Publikasi', 'Publications'), href: '/#publications', id: 'publications' },
    { name: t('Sertifikasi', 'Certifications'), href: '/#certifications', id: 'certifications' },
    { name: t('Komunitas', 'Community'), href: '/#creator', id: 'creator' },
    { name: 'Blog', href: '/#blog', id: 'blog' },
    { name: t('Kontak', 'Contact'), href: '/#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-card border-b border-main py-3 shadow-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name: awd.dev */}
          <a
            href="/#home"
            className="font-mono text-base font-bold tracking-tight text-main hover:text-blue-600 transition-colors"
          >
            awd<span className="text-blue-600 font-extrabold">.dev</span>
          </a>

          {/* Desktop Nav Links (Solid background, high contrast text) */}
          <nav className="hidden lg:flex items-center gap-1 bg-card px-3 py-1.5 rounded-full border border-main shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  activeSection === link.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-card-hover'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Utilities: Language Switcher + Theme Switcher + CV */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-card p-0.5 rounded-md border border-main text-xs font-mono">
              <button
                onClick={() => setLang('id')}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === 'id'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-main font-semibold'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:text-main font-semibold'
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark / Light Theme Switcher */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md bg-card text-main hover:text-blue-600 border border-main transition-colors"
                aria-label="Toggle Theme"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            )}

            {/* CV Download Button */}
            <a
              href="/cv.pdf"
              download="CV_I_Putu_Agus_Wahyu_Dupayana.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-main bg-card hover:bg-card-hover border border-main transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t('Unduh CV', 'CV PDF')}</span>
            </a>
          </div>

          {/* Mobile Utilities & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-md bg-card text-main border border-main"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              </button>
            )}

            <button
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="px-2 py-1.5 rounded-md bg-card text-main border border-main text-xs font-mono font-bold"
            >
              {lang.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-main bg-card border border-main"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-main px-4 pt-3 pb-6 mt-2 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-bold transition-colors ${
                activeSection === link.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-700 dark:text-slate-100 hover:bg-card-hover'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-main">
            <a
              href="/cv.pdf"
              download="CV_I_Putu_Agus_Wahyu_Dupayana.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md text-xs font-bold text-main bg-card border border-main"
            >
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t('Unduh CV (PDF)', 'Download CV (PDF)')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
