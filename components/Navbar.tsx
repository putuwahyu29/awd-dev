'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCvModal } from '@/context/CvModalContext';
import CommandPalette from '@/components/CommandPalette';

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function Navbar() {
  const mounted = useIsMounted();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { openCvModal } = useCvModal();

  useEffect(() => {
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

  // Listen for global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: t('Proyek', 'Projects'), href: '/#projects', id: 'projects' },
    { name: 'GitHub', href: '/#github', id: 'github' },
    { name: t('Publikasi', 'Publications'), href: '/#publications', id: 'publications' },
    { name: t('Sertifikasi', 'Certifications'), href: '/#certifications', id: 'certifications' },
    { name: 'Blog', href: '/#blog', id: 'blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-card border-b border-main py-2.5 shadow-md'
            : 'bg-transparent py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Name: awd.dev */}
            <Link
              href="/#home"
              className="notranslate font-mono text-base sm:text-lg font-extrabold tracking-tight text-main hover:text-blue-600 transition-colors shrink-0"
              translate="no"
            >
              awd<span className="text-blue-600 font-extrabold">.dev</span>
            </Link>

            {/* Desktop Nav Links (Streamlined 5 main links) */}
            <nav className="hidden lg:flex items-center gap-1 bg-card px-3 py-1.5 rounded-full border border-main shadow-md">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeSection === link.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-main hover:text-blue-600 dark:hover:text-blue-400 hover:bg-card-hover'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Consolidated Right Utilities Toolbar (100% Solid Opacity) */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-card p-1 rounded-full border border-main shadow-md">
                {/* Command Palette Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-extrabold text-main hover:text-blue-600 dark:hover:text-blue-400 hover:bg-card-hover transition-colors"
                  aria-label="Open Command Palette Search"
                  title="Search (Cmd+K / Ctrl+K)"
                >
                  <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>⌘K</span>
                </button>

                {/* Language Switcher Button */}
                <button
                  onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
                  className="notranslate px-2.5 py-1 rounded-full text-xs font-mono font-extrabold text-main hover:text-blue-600 dark:hover:text-blue-400 hover:bg-card-hover transition-colors"
                  translate="no"
                  title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
                >
                  {lang.toUpperCase()}
                </button>

                {/* Theme Switcher Button */}
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-full text-main hover:text-blue-600 dark:hover:text-blue-400 hover:bg-card-hover transition-colors"
                    aria-label="Toggle Theme"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                    )}
                  </button>
                )}

                {/* CV Preview Badge */}
                <button
                  type="button"
                  onClick={() => openCvModal()}
                  title={t('Lihat CV', 'View CV')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs ml-0.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="notranslate" translate="no">CV</span>
                </button>
              </div>
            </div>

            {/* Mobile Utilities & Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-md bg-card text-main border border-main flex items-center gap-1 text-xs font-mono font-bold"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-[11px]">⌘K</span>
              </button>

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
                className="notranslate px-2 py-1.5 rounded-md bg-card text-main border border-main text-xs font-mono font-bold"
                translate="no"
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCvModal();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 transition-all shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t('Lihat CV', 'View CV')}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Command Palette */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
