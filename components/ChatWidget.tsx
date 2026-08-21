'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Maximize2,
  Minimize2,
  Bot,
  User,
  Copy,
  Check,
  Square,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

const QUICK_PROMPTS = [
  {
    id: 'projects',
    labelId: '🚀 Proyek Unggulan',
    labelEn: '🚀 Top Projects',
    promptId: 'Apa saja proyek unggulan rekayasa web dan AI yang pernah dikerjakan oleh Agus Wahyu?',
    promptEn: 'What are the top web engineering and AI projects built by Agus Wahyu?',
  },
  {
    id: 'experience',
    labelId: '🏢 Pengalaman di BPS',
    labelEn: '🏢 BPS Experience',
    promptId: 'Ceritakan pengalaman kerja, peran, dan tanggung jawab Agus Wahyu di BPS Provinsi Jawa Timur.',
    promptEn: 'Tell me about Agus Wahyu\'s work experience, role, and responsibilities at BPS East Java.',
  },
  {
    id: 'rag-research',
    labelId: '📚 Riset RAG AI',
    labelEn: '📚 RAG AI Research',
    promptId: 'Jelaskan tentang publikasi ilmiah Agus Wahyu mengenai Retrieval-Augmented Generation (RAG) di ICDSOS.',
    promptEn: 'Explain Agus Wahyu\'s scientific research publication on Retrieval-Augmented Generation (RAG) at ICDSOS.',
  },
  {
    id: 'tech-stack',
    labelId: '🛠️ Keahlian & Tech Stack',
    labelEn: '🛠️ Skills & Tech Stack',
    promptId: 'Apa saja teknologi, bahasa pemrograman, dan framework yang dikuasai Agus Wahyu?',
    promptEn: 'What technologies, programming languages, and frameworks does Agus Wahyu specialize in?',
  },
  {
    id: 'contact',
    labelId: '📬 Kontak & Kolaborasi',
    labelEn: '📬 Contact & Connect',
    promptId: 'Bagaimana cara menghubungi Agus Wahyu untuk diskusi teknis atau peluang kolaborasi?',
    promptEn: 'How can I get in touch with Agus Wahyu for technical inquiries or collaboration opportunities?',
  },
];

// Code block with copy button
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-2.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[10px] text-slate-400 font-mono">
        <span className="font-semibold uppercase tracking-wider">{lang || 'CODE'}</span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 font-mono text-[11px] overflow-x-auto leading-relaxed">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
}

// Markdown Table renderer
function MarkdownTable({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const parseRow = (row: string) => {
    return row
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
  };

  const headerCells = parseRow(lines[0]);
  const bodyRows = lines
    .slice(2)
    .filter((l) => l.trim().startsWith('|'))
    .map(parseRow);

  return (
    <div className="my-2.5 overflow-x-auto rounded-xl border border-main bg-card shadow-xs">
      <table className="w-full text-left text-[11px] border-collapse">
        <thead>
          <tr className="bg-main border-b border-main text-main font-bold">
            {headerCells.map((cell, idx) => (
              <th key={idx} className="px-3 py-2">
                {parseInlineMarkdown(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-main text-sub">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-main/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-3 py-2">
                  {parseInlineMarkdown(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Parse inline formatting: links, bold, italic, code
function parseInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Regex to match: [link text](url), **bold**, *italic*, `code`
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link [text](url)
      const linkText = match[2];
      const url = match[3];
      const isInternal = url.startsWith('/') || url.startsWith('#');

      if (isInternal) {
        elements.push(
          <Link
            key={match.index}
            href={url}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/70 dark:border-blue-800/70 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors text-[11px] shadow-2xs"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </Link>
        );
      } else {
        elements.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-blue-600 dark:text-blue-400 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors text-[11px] shadow-2xs"
          >
            <span>{linkText}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
        );
      }
    } else if (match[4]) {
      // Bold **text**
      elements.push(
        <strong key={match.index} className="font-bold text-main">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Italic *text*
      elements.push(
        <em key={match.index} className="italic text-sub">
          {match[5]}
        </em>
      );
    } else if (match[6]) {
      // Inline `code`
      elements.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 font-mono text-[11px] font-semibold border border-slate-200 dark:border-slate-700"
        >
          {match[6]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

// Master rich markdown content renderer
function renderFormattedContent(content: string) {
  if (!content) return null;

  // Split content by code blocks first
  const sections = content.split(/(```[\s\S]*?```)/g);

  return sections.map((section, sIdx) => {
    if (section.startsWith('```') && section.endsWith('```')) {
      const lines = section.slice(3, -3).trim().split('\n');
      const lang = lines[0] && !lines[0].includes(' ') ? lines[0] : '';
      const code = lang ? lines.slice(1).join('\n') : lines.join('\n');

      return <CodeBlock key={sIdx} code={code} lang={lang} />;
    }

    // Process non-code blocks line-by-line & grouping tables/lists
    const rawLines = section.split('\n');
    const renderedNodes: React.ReactNode[] = [];
    let tableBuffer: string[] = [];

    const flushTable = (key: string) => {
      if (tableBuffer.length > 0) {
        renderedNodes.push(<MarkdownTable key={key} lines={[...tableBuffer]} />);
        tableBuffer = [];
      }
    };

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      const trimmed = line.trim();

      // Check if line is part of a markdown table
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableBuffer.push(trimmed);
        continue;
      } else {
        flushTable(`table-${i}`);
      }

      // Horizontal divider --- or ***
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        renderedNodes.push(<hr key={i} className="my-2.5 border-main" />);
        continue;
      }

      // Headings
      if (trimmed.startsWith('### ')) {
        renderedNodes.push(
          <h4 key={i} className="text-xs font-extrabold text-blue-600 dark:text-blue-400 mt-3 mb-1.5 flex items-center gap-1.5">
            {parseInlineMarkdown(trimmed.substring(4))}
          </h4>
        );
        continue;
      }

      if (trimmed.startsWith('## ')) {
        renderedNodes.push(
          <h3 key={i} className="text-xs font-extrabold text-main mt-3.5 mb-1.5 pb-1 border-b border-main flex items-center gap-1.5">
            {parseInlineMarkdown(trimmed.substring(3))}
          </h3>
        );
        continue;
      }

      if (trimmed.startsWith('# ')) {
        renderedNodes.push(
          <h2 key={i} className="text-sm font-black text-main mt-2 mb-2 pb-1 border-b border-main flex items-center gap-1.5">
            {parseInlineMarkdown(trimmed.substring(2))}
          </h2>
        );
        continue;
      }

      // Blockquote (> ...)
      if (trimmed.startsWith('> ')) {
        renderedNodes.push(
          <div key={i} className="border-l-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 px-3 py-1.5 rounded-r-lg my-2 text-[11px] italic text-sub">
            {parseInlineMarkdown(trimmed.substring(2))}
          </div>
        );
        continue;
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const clean = trimmed.substring(2);
        renderedNodes.push(
          <div key={i} className="flex items-start gap-2 my-1 pl-1 text-xs leading-relaxed text-sub">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <span className="flex-1">{parseInlineMarkdown(clean)}</span>
          </div>
        );
        continue;
      }

      // Numbered lists (1. , 2. )
      const numMatch = trimmed.match(/^(\d+)\.\s/);
      if (numMatch) {
        const num = numMatch[1];
        const clean = trimmed.replace(/^\d+\.\s/, '');
        renderedNodes.push(
          <div key={i} className="flex items-start gap-2 my-1 pl-1 text-xs leading-relaxed text-sub">
            <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200/50 dark:border-blue-900/50 shrink-0 mt-0.5">
              {num}
            </span>
            <span className="flex-1">{parseInlineMarkdown(clean)}</span>
          </div>
        );
        continue;
      }

      // Empty line
      if (trimmed === '') {
        renderedNodes.push(<div key={i} className="h-1.5" />);
        continue;
      }

      // Standard text paragraph
      renderedNodes.push(
        <p key={i} className="my-1 text-xs leading-relaxed text-sub">
          {parseInlineMarkdown(line)}
        </p>
      );
    }

    flushTable(`table-end-${sIdx}`);
    return <div key={sIdx}>{renderedNodes}</div>;
  });
}

export default function ChatWidget() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'like' | 'dislike' | undefined>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initial welcome message
  const getWelcomeMessage = useCallback((): ChatMessage => {
    return {
      id: 'welcome',
      role: 'assistant',
      content:
        lang === 'id'
          ? `Halo! 👋 Saya adalah **AWD AI Assistant**.\n\nSaya siap membantu menjawab pertanyaan seputar:\n- 🚀 **Portofolio Proyek** & Arsitektur Sistem\n- 🏛️ **Pengalaman Kerja** di BPS Provinsi Jawa Timur\n- 🎓 **Latar Belakang Pendidikan** di Politeknik Statistika STIS\n- 🔬 **Riset & Publikasi Ilmiah** (seperti riset RAG AI di ICDSOS)\n- 🛠️ **Tech Stack & Keahlian Teknis**\n\nSilakan pilih topik di bawah atau ketik pertanyaan Anda!`
          : `Hello! 👋 I am **AWD AI Assistant**.\n\nI am ready to assist you with questions regarding:\n- 🚀 **Engineering Projects** & Architecture Case Studies\n- 🏛️ **Work Experience** at BPS East Java Provincial Office\n- 🎓 **Education Background** at Politeknik Statistika STIS\n- 🔬 **Scientific Research & Publications** (such as RAG AI at ICDSOS)\n- 🛠️ **Tech Stack & Technical Skills**\n\nFeel free to click any suggestion below or ask me directly!`,
      createdAt: Date.now(),
    };
  }, [lang]);

  // Load chat from sessionStorage or initialize
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('awd_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setMessages([getWelcomeMessage()]);
  }, [getWelcomeMessage]);

  // Save chat to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem('awd_chat_history', JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, scrollToBottom]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Global event listener to open AI Chat from anywhere (e.g. Navbar, CommandPalette, or Buttons)
  useEffect(() => {
    const handleCustomOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        handleSendMessage(customEvent.detail.prompt);
      }
    };

    window.addEventListener('open-ai-chat', handleCustomOpen);
    return () => window.removeEventListener('open-ai-chat', handleCustomOpen);
  });

  const handleClearHistory = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setErrorMessage(null);
    const welcome = getWelcomeMessage();
    setMessages([welcome]);
    try {
      sessionStorage.removeItem('awd_chat_history');
    } catch {
      // ignore
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: Date.now(),
    };

    const assistantPlaceholderId = `assistant-${Date.now()}`;
    const assistantMessage: ChatMessage = {
      id: assistantPlaceholderId,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const conversationPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationPayload }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const errMsg =
          errorData?.message ||
          (res.status === 400
            ? 'API Key Mistral AI belum disetel pada server.'
            : `Terjadi kesalahan saat memproses pertanyaan (Status ${res.status}).`);
        throw new Error(errMsg);
      }

      if (!res.body) {
        throw new Error('Tidak ada data stream yang diterima dari server.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantPlaceholderId ? { ...msg, content: fullContent } : msg))
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User explicitly stopped generation
        return;
      }

      console.error('Chat Error:', err);
      const errMsg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem.';
      setErrorMessage(errMsg);

      // If the placeholder was empty, remove or set error text
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholderId
            ? {
                ...msg,
                content:
                  msg.content ||
                  (lang === 'id'
                    ? `⚠️ **Maaf, terjadi kendala:** ${errMsg}`
                    : `⚠️ **Sorry, an error occurred:** ${errMsg}`),
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <aside
        aria-label={t('Tombol Asisten AI', 'AI Assistant Button')}
        className={`fixed z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'bottom-4 right-4 opacity-0 pointer-events-none scale-75' : 'bottom-6 right-6 opacity-100 scale-100'
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-lg shadow-blue-600/20 border border-blue-500/30 transition-all duration-200 cursor-pointer"
          aria-label={t('Buka Asisten AI Portofolio', 'Open Portfolio AI Assistant')}
          title={t('Tanya AI seputar portofolio Agus Wahyu', 'Ask AI about Agus Wahyu\'s portfolio')}
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-blue-600" />
          </div>
          <span className="font-mono text-xs font-bold tracking-tight">
            {t('Tanya AI', 'Ask AI')}
          </span>
        </button>
      </aside>

      {/* Background Blur Overlay for Mobile & Focus */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-45 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-widget-title"
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col bg-card border border-main shadow-2xl overflow-hidden ${
            isExpanded
              ? 'inset-2 sm:inset-6 md:inset-10 rounded-2xl'
              : 'bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto w-full sm:w-[440px] h-[85vh] sm:h-[580px] max-h-[100dvh] rounded-t-3xl sm:rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-main shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-blue-600 text-white shadow-xs">
                <Bot className="w-4.5 h-4.5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              <div>
                <h3 id="chat-widget-title" className="font-mono text-xs font-extrabold text-main">
                  AWD AI Assistant
                </h3>
                <p className="text-[10px] text-muted flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                  <span>{t('Online • Portofolio Mode', 'Online • Portfolio Mode')}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted">
              {/* Clear conversation */}
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg hover:bg-card-hover hover:text-rose-500 transition-colors"
                title={t('Hapus riwayat obrolan', 'Clear chat history')}
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Minimize / Maximize */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg hover:bg-card-hover text-main transition-colors hidden sm:block"
                title={isExpanded ? t('Kecilkan jendela', 'Minimize window') : t('Perbesar jendela', 'Maximize window')}
                aria-label="Toggle size"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-card-hover hover:text-main transition-colors"
                title={t('Tutup chat', 'Close chat')}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-main/50 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const timeString = new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });
              const feedback = feedbackMap[msg.id];

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </div>
                  )}

                  <div className={`group relative max-w-[88%] sm:max-w-[85%] rounded-2xl p-3.5 transition-all shadow-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs'
                      : 'bg-card text-main border border-main rounded-tl-xs'
                  }`}>
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-black/10 dark:border-white/10 text-[10px] font-mono opacity-80">
                      <span className="font-bold">
                        {isUser ? t('Anda', 'You') : 'AWD AI Assistant'}
                      </span>
                      <span>{timeString}</span>
                    </div>

                    {/* Message Content */}
                    <div className="text-xs leading-relaxed break-words font-sans">
                      {isUser ? (
                        <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                      ) : (
                        <div>
                          {msg.content ? (
                            renderFormattedContent(msg.content)
                          ) : (
                            <div className="flex items-center gap-1.5 py-2 text-muted">
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                              <span className="text-[11px] ml-1 font-medium">{t('Memikirkan jawaban...', 'Thinking...')}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Assistant Action Bar (Copy & Reaction Feedback) */}
                    {!isUser && msg.content && (
                      <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-main/40 text-[10px] text-muted">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setFeedbackMap((prev) => ({
                                ...prev,
                                [msg.id]: prev[msg.id] === 'like' ? undefined : ('like' as const),
                              }))
                            }
                            className={`p-1 rounded hover:bg-main transition-colors ${
                              feedback === 'like' ? 'text-emerald-500 font-bold' : 'hover:text-main'
                            }`}
                            title={t('Membantu', 'Helpful')}
                            aria-label="Thumbs up"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() =>
                              setFeedbackMap((prev) => ({
                                ...prev,
                                [msg.id]: prev[msg.id] === 'dislike' ? undefined : ('dislike' as const),
                              }))
                            }
                            className={`p-1 rounded hover:bg-main transition-colors ${
                              feedback === 'dislike' ? 'text-rose-500 font-bold' : 'hover:text-main'
                            }`}
                            title={t('Kurang membantu', 'Not helpful')}
                            aria-label="Thumbs down"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-main px-1.5 py-0.5 rounded hover:bg-main transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500 font-semibold">{t('Tersalin', 'Copied')}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>{t('Salin Jawaban', 'Copy')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-xl bg-slate-750 bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Error Message Notice */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold">{errorMessage}</p>
                  {errorMessage.includes('API Key') && (
                    <p className="text-[11px] text-muted">
                      Pastikan Anda telah mengisi variabel <code className="px-1 bg-amber-500/20 rounded">MISTRAL_API_KEY</code> di berkas <code className="px-1 bg-amber-500/20 rounded">.env.local</code>.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions (Shown if only welcome message is present) */}
          {messages.length <= 1 && (
            <div className="px-3 py-2 bg-card border-t border-main overflow-x-auto shrink-0">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5 px-1">
                {t('Saran Pertanyaan Portofolio:', 'Suggested Portfolio Inquiries:')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSendMessage(lang === 'id' ? item.promptId : item.promptEn)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-main hover:bg-blue-600 hover:text-white border border-main transition-all active:scale-95 text-sub text-left"
                  >
                    <span>{lang === 'id' ? item.labelId : item.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="p-3 bg-card border-t border-main shrink-0 space-y-1.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                  lang === 'id'
                    ? 'Tanyakan apa saja seputar portofolio Agus...'
                    : 'Ask anything about Agus\'s portfolio...'
                }
                className="flex-1 max-h-24 min-h-[38px] resize-none rounded-xl bg-input text-main placeholder:text-muted px-3.5 py-2 text-xs border border-main focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
              />

              {isLoading ? (
                <button
                  type="button"
                  onClick={handleStopGeneration}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shrink-0 shadow-xs transition-transform active:scale-95"
                  title={t('Hentikan pengetikan', 'Stop generating')}
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shrink-0 shadow-xs transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                  title={t('Kirim pertanyaan', 'Send inquiry')}
                  aria-label="Send inquiry"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>

            <div className="flex items-center justify-between text-[10px] text-muted px-1">
              <span>
                {t('Portofolio I Putu Agus Wahyu Dupayana', 'I Putu Agus Wahyu Dupayana Portfolio')}
              </span>
              <span className="hidden sm:inline font-mono text-[9px] opacity-70">
                Enter ↵ / Shift+Enter ↵
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
