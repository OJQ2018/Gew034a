import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Filter,
  GraduationCap,
  Info,
  Library,
  Search,
} from 'lucide-react';
import bookCoverImg from './assets/images/book_cover_34a_1794781148157.jpg';
import { ExamSimulator } from './components/ExamSimulator';
import { GlossaryView } from './components/GlossaryView';
import { PrintBookView } from './components/PrintBookView';
import { QuestionCard } from './components/QuestionCard';
import { BOOK_PARTS, CHAPTERS } from './data/chapters';
import { GLOSSARY_ENTRIES } from './data/glossary';
import { ALL_QUESTIONS } from './data/questions';
import { QUESTIONS_DE } from './data/questions_de';
import { LEVEL_LABELS_BILINGUAL, getUiText } from './i18n/translations';
import { DifficultyLevel, Language, SourceOrigin } from './types/encyclopedia';

type ActiveTab = 'encyclopedia' | 'exam' | 'glossary' | 'print';

const PAGE_SIZE = 26;
const LANG_STORAGE_KEY = 'encyclopedia_34a_lang';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ar';
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'de' ? 'de' : 'ar';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('encyclopedia');
  const [selectedPartId, setSelectedPartId] = useState<1 | 2 | 3 | 4 | 'all'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<number | 'all'>(1);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<SourceOrigin | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllAnswers, setShowAllAnswers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
  }, [lang]);

  const ui = getUiText(lang);

  const visibleChapters = useMemo(() => {
    if (selectedPartId === 'all') return CHAPTERS;
    return CHAPTERS.filter((c) => c.partId === selectedPartId);
  }, [selectedPartId]);

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const partChapterIds =
      selectedPartId === 'all'
        ? null
        : new Set(CHAPTERS.filter((c) => c.partId === selectedPartId).map((c) => c.id));

    return ALL_QUESTIONS.filter((item) => {
      if (partChapterIds && !partChapterIds.has(item.chapterId)) return false;
      if (selectedChapterId !== 'all' && item.chapterId !== selectedChapterId) return false;
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
      if (selectedOrigin !== 'all' && item.origin !== selectedOrigin) return false;
      if (!q) return true;

      const de = QUESTIONS_DE[item.id];
      return (
        String(item.id) === q ||
        item.questionAr.toLowerCase().includes(q) ||
        item.answerAr.toLowerCase().includes(q) ||
        (de?.questionDe.toLowerCase().includes(q) ?? false) ||
        (de?.answerDe.toLowerCase().includes(q) ?? false) ||
        item.lawRef.toLowerCase().includes(q) ||
        item.terms.some(
          (t) => t.de.toLowerCase().includes(q) || t.ar.toLowerCase().includes(q)
        )
      );
    });
  }, [selectedPartId, selectedChapterId, selectedLevel, selectedOrigin, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedQuestions = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, safePage]);

  const currentChapter =
    selectedChapterId !== 'all'
      ? CHAPTERS.find((c) => c.id === selectedChapterId)
      : undefined;

  const activePart =
    selectedPartId !== 'all'
      ? BOOK_PARTS.find((p) => p.id === selectedPartId)
      : currentChapter
      ? BOOK_PARTS.find((p) => p.id === currentChapter.partId)
      : undefined;

  const handleSelectPart = (partId: 1 | 2 | 3 | 4 | 'all') => {
    setSelectedPartId(partId);
    setCurrentPage(1);
    if (partId !== 'all') {
      const firstCh = CHAPTERS.find((c) => c.partId === partId);
      if (firstCh) setSelectedChapterId(firstCh.id);
    }
  };

  const handleSelectChapter = (chapterId: number | 'all') => {
    setSelectedChapterId(chapterId);
    setCurrentPage(1);
  };

  const openPrintStudio = () => {
    setActiveTab('print');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#FAF8F5] text-slate-900">
      {/* Top 3-Zone Navigation Bar */}
      <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Brand */}
          <button
            type="button"
            onClick={() => setActiveTab('encyclopedia')}
            className={`flex items-center gap-2.5 ${lang === 'ar' ? 'text-right' : 'text-left'} shrink-0`}
          >
            <div className="w-9 h-9 rounded-md bg-[#1E3A5F] text-white flex items-center justify-center">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-slate-900 whitespace-nowrap">
                {ui.brandTitle}
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block whitespace-nowrap">
                {ui.brandSubtitle}
              </div>
            </div>
          </button>

          {/* Zone 2: 4 Concise Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('encyclopedia')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                activeTab === 'encyclopedia'
                  ? 'border-[#1E3A5F] text-[#1E3A5F] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {ui.navEncyclopedia}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('exam')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                activeTab === 'exam'
                  ? 'border-[#1E3A5F] text-[#1E3A5F] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {ui.navExam}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('glossary')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                activeTab === 'glossary'
                  ? 'border-[#1E3A5F] text-[#1E3A5F] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {ui.navGlossary}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('print')}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                activeTab === 'print'
                  ? 'border-[#1E3A5F] text-[#1E3A5F] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {ui.navPdf}
            </button>
          </nav>

          {/* Zone 3: Language Switcher + Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              role="group"
              aria-label="Language switch"
              className="inline-flex items-center border border-slate-300 rounded-md overflow-hidden bg-slate-50 text-xs font-bold"
            >
              <button
                type="button"
                onClick={() => setLang('ar')}
                aria-pressed={lang === 'ar'}
                className={`px-2.5 py-1.5 transition-colors whitespace-nowrap ${
                  lang === 'ar'
                    ? 'bg-[#1E3A5F] text-white'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setLang('de')}
                aria-pressed={lang === 'de'}
                className={`px-2.5 py-1.5 transition-colors whitespace-nowrap ${
                  lang === 'de'
                    ? 'bg-[#1E3A5F] text-white'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                Deutsch
              </button>
            </div>

            <button
              type="button"
              onClick={openPrintStudio}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#1E3A5F] text-white text-xs sm:text-sm font-semibold hover:bg-[#162C49] transition-colors whitespace-nowrap shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">{ui.ctaSavePdf}</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Sub-Navigation */}
        <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-3 overflow-x-auto text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('encyclopedia')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
              activeTab === 'encyclopedia' ? 'bg-[#1E3A5F] text-white' : 'text-slate-700'
            }`}
          >
            {ui.navEncyclopedia}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('exam')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
              activeTab === 'exam' ? 'bg-[#1E3A5F] text-white' : 'text-slate-700'
            }`}
          >
            {ui.navExam}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('glossary')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
              activeTab === 'glossary' ? 'bg-[#1E3A5F] text-white' : 'text-slate-700'
            }`}
          >
            {ui.navGlossary}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('print')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded ${
              activeTab === 'print' ? 'bg-[#1E3A5F] text-white' : 'text-slate-700'
            }`}
          >
            {ui.navPdf}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'encyclopedia' && (
          <div className="space-y-6">
            {/* Editorial Book Hero */}
            <section className="bg-white border border-slate-200 rounded-lg p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-semibold text-[#1E3A5F]">{ui.heroEyebrow}</div>
                <h1 className="font-book-display text-3xl sm:text-4xl font-bold text-slate-900 leading-snug">
                  {ui.heroTitle}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{ui.heroDesc}</p>

                {/* Inline Stats — Zero-Pill Typography */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-700 pt-1">
                  <span>
                    <strong className="text-[#1E3A5F] tabular-nums">{ALL_QUESTIONS.length}</strong>{' '}
                    {ui.statQuestions}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>
                    <strong className="text-[#1E3A5F] tabular-nums">520</strong> {ui.statDiagrams}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>
                    <strong className="text-[#1E3A5F] tabular-nums">20</strong> {ui.statChapters}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>
                    <strong className="text-[#1E3A5F] tabular-nums">{GLOSSARY_ENTRIES.length}</strong>{' '}
                    {ui.statGlossary}
                  </span>
                </div>

                {/* Source & Statutory Currency Transparency Notice */}
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-md p-3.5 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">{ui.provenanceTitle}</strong>
                    {ui.provenanceBody}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="w-48 sm:w-56 space-y-2">
                  <img
                    src={bookCoverImg}
                    alt="§34a GewO Book Cover"
                    className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={openPrintStudio}
                    className="w-full py-2 px-3 rounded border border-[#1E3A5F] text-[#1E3A5F] text-xs font-bold hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{ui.heroCoverCta}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* 4 Book Parts Navigation */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BOOK_PARTS.map((part) => {
                const isActive = selectedPartId === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => handleSelectPart(isActive ? 'all' : part.id)}
                    className={`${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    } rounded-lg border overflow-hidden transition-colors flex flex-col ${
                      isActive
                        ? 'border-[#1E3A5F] bg-[#EFF6FF]/60'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={part.coverImage}
                      alt={lang === 'ar' ? part.titleAr : part.titleDe}
                      className="w-full h-24 object-cover border-b border-slate-200"
                    />
                    <div className="p-3.5 space-y-1">
                      <div className="text-xs font-bold text-[#1E3A5F]">
                        {ui.volumeLabel} {part.id} · {ui.chaptersLabel}{' '}
                        {part.chapterIds.join(lang === 'ar' ? '، ' : ', ')}
                      </div>
                      <div className="text-sm font-bold text-slate-900 leading-snug">
                        {lang === 'ar' ? part.titleAr : part.titleDe}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-snug">
                        {lang === 'ar' ? part.titleDe : part.descriptionDe}
                      </div>
                    </div>
                  </button>
                );
              })}
            </section>

            {/* Workspace: Sidebar Chapters + Questions List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Chapter Index Sidebar */}
              <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#1E3A5F]" />
                    <span>{ui.sidebarTitle}</span>
                  </h2>
                  {selectedChapterId !== 'all' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPartId('all');
                        handleSelectChapter('all');
                      }}
                      className="text-xs font-semibold text-[#1E3A5F] hover:underline"
                    >
                      {ui.showAll520}
                    </button>
                  )}
                </div>

                <div
                  className={`space-y-1 max-h-[600px] overflow-y-auto ${
                    lang === 'ar' ? 'pl-1' : 'pr-1'
                  }`}
                >
                  {visibleChapters.map((ch) => {
                    const isSelected = selectedChapterId === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => handleSelectChapter(ch.id)}
                        className={`w-full ${
                          lang === 'ar' ? 'text-right' : 'text-left'
                        } px-3 py-2.5 rounded-md border text-xs transition-colors ${
                          isSelected
                            ? 'border-[#1E3A5F] bg-[#1E3A5F] text-white'
                            : 'border-transparent hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 font-bold">
                          <span>
                            {ch.id}. {lang === 'ar' ? ch.titleAr : ch.titleDe}
                          </span>
                          <span
                            dir="ltr"
                            className={`font-legal-mono text-[10px] shrink-0 ${
                              isSelected ? 'text-sky-200' : 'text-slate-500'
                            }`}
                          >
                            26 {lang === 'ar' ? 'Q' : 'F'}
                          </span>
                        </div>
                        <div
                          dir="ltr"
                          className={`font-legal-mono text-[10.5px] mt-0.5 truncate ${
                            isSelected ? 'text-sky-100' : 'text-slate-500'
                          }`}
                        >
                          {lang === 'ar' ? ch.titleDe : ch.lawDomain}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Main Question Column */}
              <div className="lg:col-span-8 space-y-5">
                {/* Active Chapter Banner */}
                {currentChapter && (
                  <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span>{lang === 'ar' ? activePart?.titleAr : activePart?.titleDe}</span>
                      <span dir="ltr" className="font-legal-mono text-[#1E3A5F] font-semibold">
                        {currentChapter.lawDomain}
                      </span>
                    </div>
                    <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
                      {ui.chapterPrefix} {currentChapter.id}:{' '}
                      {lang === 'ar' ? currentChapter.titleAr : currentChapter.titleDe}
                    </h2>
                    {lang === 'ar' && (
                      <div dir="ltr" className="font-legal-mono text-xs text-slate-600">
                        {currentChapter.titleDe}
                      </div>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {lang === 'ar'
                        ? currentChapter.subtitleAr
                        : currentChapter.subtitleDe ?? currentChapter.subtitleAr}
                    </p>
                  </div>
                )}

                {/* Filter & Search Bar */}
                <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-6 relative">
                      <Search
                        className={`w-4 h-4 text-slate-400 absolute ${
                          lang === 'ar' ? 'right-3' : 'left-3'
                        } top-1/2 -translate-y-1/2 pointer-events-none`}
                      />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder={ui.searchPlaceholder}
                        className={`w-full ${
                          lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'
                        } py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-[#1E3A5F]`}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <select
                        value={selectedLevel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedLevel(val === 'all' ? 'all' : (Number(val) as DifficultyLevel));
                          setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[#1E3A5F]"
                      >
                        <option value="all">{ui.allLevels}</option>
                        <option value="1">{LEVEL_LABELS_BILINGUAL[1][lang]}</option>
                        <option value="2">{LEVEL_LABELS_BILINGUAL[2][lang]}</option>
                        <option value="3">{LEVEL_LABELS_BILINGUAL[3][lang]}</option>
                        <option value="4">{LEVEL_LABELS_BILINGUAL[4][lang]}</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <select
                        value={selectedOrigin}
                        onChange={(e) => {
                          setSelectedOrigin(e.target.value as SourceOrigin | 'all');
                          setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[#1E3A5F]"
                      >
                        <option value="all">{ui.allSources}</option>
                        <option value="core_curriculum">{ui.sourceCore}</option>
                        <option value="statutory_update">{ui.sourceUpdate}</option>
                        <option value="practical_supplement">{ui.sourcePractical}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-[#1E3A5F]" />
                      <span>
                        {ui.showingPrefix}{' '}
                        <strong className="text-slate-900 tabular-nums">
                          {filteredQuestions.length}
                        </strong>{' '}
                        {ui.questionsSuffix}
                        {totalPages > 1 && ` (${ui.pageLabel} ${safePage} ${ui.ofLabel} ${totalPages})`}
                      </span>
                    </div>

                    <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={showAllAnswers}
                        onChange={(e) => setShowAllAnswers(e.target.checked)}
                        className="rounded border-slate-300"
                      />
                      <span>{ui.showAllAnswersLabel}</span>
                    </label>
                  </div>
                </div>

                {/* Questions Feed */}
                {paginatedQuestions.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-sm text-slate-600">
                    {ui.noResults}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {paginatedQuestions.map((question) => (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        lang={lang}
                        alwaysShowAnswer={showAllAnswers}
                        showChapterLabel={selectedChapterId === 'all'}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      disabled={safePage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    >
                      {lang === 'ar' ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronLeft className="w-4 h-4" />
                      )}
                      <span>{ui.prevPage}</span>
                    </button>

                    <div className="font-legal-mono font-semibold text-slate-700">
                      {safePage} / {totalPages}
                    </div>

                    <button
                      type="button"
                      disabled={safePage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <span>{ui.nextPage}</span>
                      {lang === 'ar' ? (
                        <ChevronLeft className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exam' && <ExamSimulator lang={lang} />}
        {activeTab === 'glossary' && <GlossaryView lang={lang} />}
        {activeTab === 'print' && <PrintBookView lang={lang} />}
      </main>
    </div>
  );
}
