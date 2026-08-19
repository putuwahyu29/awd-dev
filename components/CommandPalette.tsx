'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Folder,
  Award,
  BookOpen,
  FileText,
  Share2,
  ExternalLink,
  CornerDownLeft,
  Command,
  Tv,
  Link2,
} from 'lucide-react';
import { SearchItem } from '@/app/api/search/route';
import { useLanguage } from '@/context/LanguageContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [prevFilter, setPrevFilter] = useState({ query, selectedCategory });

  if (prevFilter.query !== query || prevFilter.selectedCategory !== selectedCategory) {
    setPrevFilter({ query, selectedCategory });
    setSelectedIndex(0);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch search items when opened
  useEffect(() => {
    let ignore = false;
    if (isOpen) {
      fetch('/api/search')
        .then((res) => res.json())
        .then((data: SearchItem[]) => {
          if (!ignore) {
            setItems(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (!ignore) setIsLoading(false);
        });

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
    return () => {
      ignore = true;
    };
  }, [isOpen]);

  // Filter items based on query & selected category
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelectItem = useCallback(
    (item: SearchItem) => {
      onClose();
      if (item.isExternal) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.url);
      }
    },
    [onClose, router]
  );

  // Keyboard navigation inside Palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelectItem(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredItems, selectedIndex, handleSelectItem, onClose]
  );

  if (!isOpen) return null;

  const categories = ['Semua', 'Proyek', 'Sertifikasi', 'Publikasi', 'Blog', 'Media Sosial'];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Tautan':
        return <Link2 className="w-4 h-4 text-cyan-500" />;
      case 'Presentasi':
        return <Tv className="w-4 h-4 text-purple-500" />;
      case 'Proyek':
        return <Folder className="w-4 h-4 text-blue-500" />;
      case 'Sertifikasi':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'Publikasi':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'Blog':
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'Media Sosial':
        return <Share2 className="w-4 h-4 text-pink-500" />;
      default:
        return <Search className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 select-none"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Main Command Box */}
      <div className="w-full max-w-2xl bg-card border border-main rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] z-20">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-main bg-main/60">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Cari proyek, sertifikasi, publikasi, artikel blog, atau sosmed...', 'Search projects, certs, publications, blog, or socials...')}
            className="w-full bg-transparent text-main text-sm sm:text-base placeholder-muted focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-sub hover:text-main hover:bg-card-hover transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-bold text-sub bg-card border border-main rounded-md shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-card border-b border-main overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-sub hover:text-main hover:bg-card-hover'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Results List */}
        <div className="overflow-y-auto p-2 space-y-1 min-h-[220px] max-h-[50vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sub text-xs font-mono gap-2">
              <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>{t('Memuat data pencarian...', 'Loading search index...')}</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Search className="w-8 h-8 text-muted mx-auto" />
              <p className="text-sm font-bold text-main">
                {t('Tidak ada hasil ditemukan', 'No search results found')}
              </p>
              <p className="text-xs text-sub">
                {t('Coba ketik kata kunci lain seperti "Next.js", "Laravel", "Docker", atau "Paper".', 'Try searching for "Next.js", "Laravel", "Docker", or "Paper".')}
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-600/10 border border-blue-500/30 text-main font-semibold shadow-2xs'
                      : 'hover:bg-card-hover text-sub border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className="p-2 rounded-lg bg-main border border-main shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-main truncate">
                          {item.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-main border border-main text-sub shrink-0">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-sub truncate mt-0.5 font-normal">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono text-muted">
                    {item.isExternal ? (
                      <ExternalLink className="w-3.5 h-3.5 text-sub" />
                    ) : (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-500" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Palette Footer with Shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-main border-t border-main text-xs font-mono text-sub">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-main text-[10px] font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-main text-[10px] font-bold">↓</kbd>
              <span className="text-[11px] ml-0.5">{t('Navigasi', 'Navigate')}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-card border border-main text-[10px] font-bold">↵</kbd>
              <span className="text-[11px] ml-0.5">{t('Buka', 'Select')}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[11px] font-bold">{t('awd.dev Command Palette', 'awd.dev Command Palette')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
