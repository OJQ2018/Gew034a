import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  Download,
  FileDown,
  Loader2,
  Printer,
  ShieldAlert,
} from 'lucide-react';
import bookCoverImg from '../assets/images/book_cover_34a_1794781148157.jpg';
import { BOOK_PARTS, CHAPTERS } from '../data/chapters';
import { GLOSSARY_ENTRIES } from '../data/glossary';
import { GLOSSARY_EXPLANATIONS_DE } from '../data/glossary_de';
import { ALL_QUESTIONS } from '../data/questions';
import { getUiText } from '../i18n/translations';
import { Language } from '../types/encyclopedia';
import {
  generateEncyclopediaPdf,
  PdfGenerationResult,
} from '../utils/pdfBookGenerator';
import { QuestionCard } from './QuestionCard';

interface PrintBookViewProps {
  lang?: Language;
}

type PrintScope = 'full' | 'part_1' | 'part_2' | 'part_3' | 'part_4' | 'single_chapter';

export const PrintBookView: React.FC<PrintBookViewProps> = ({ lang = 'ar' }) => {
  const ui = getUiText(lang);
  const [scope, setScope] = useState<PrintScope>('full');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [previewChapterId, setPreviewChapterId] = useState<number>(1);
  const [includeCover, setIncludeCover] = useState(true);
  const [includeToc, setIncludeToc] = useState(true);
  const [includeGlossary, setIncludeGlossary] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<{ percent: number; label: string }>({
    percent: 0,
    label: '',
  });
  const [pdfResult, setPdfResult] = useState<PdfGenerationResult | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const selectedChapters = useMemo(() => {
    if (scope === 'full') return CHAPTERS;
    if (scope === 'single_chapter') {
      return CHAPTERS.filter((c) => c.id === selectedChapterId);
    }
    const partNum = Number(scope.replace('part_', '')) as 1 | 2 | 3 | 4;
    const part = BOOK_PARTS.find((p) => p.id === partNum);
    return CHAPTERS.filter((c) => part?.chapterIds.includes(c.id));
  }, [scope, selectedChapterId]);

  const selectedQuestions = useMemo(() => {
    const ids = new Set(selectedChapters.map((c) => c.id));
    return ALL_QUESTIONS.filter((q) => ids.has(q.chapterId));
  }, [selectedChapters]);

  useEffect(() => {
    if (selectedChapters.length > 0 && !selectedChapters.some((c) => c.id === previewChapterId)) {
      setPreviewChapterId(selectedChapters[0].id);
    }
  }, [selectedChapters, previewChapterId]);

  useEffect(() => {
    return () => {
      if (pdfResult?.blobUrl) {
        URL.revokeObjectURL(pdfResult.blobUrl);
      }
    };
  }, [pdfResult]);

  const buildFilename = () => {
    const suffix = lang.toUpperCase();
    if (scope === 'full') return `34a-GewO-Encyclopedia-${suffix}-520-QA.pdf`;
    if (scope === 'single_chapter') return `34a-GewO-${suffix}-Chapter-${selectedChapterId}.pdf`;
    return `34a-GewO-${suffix}-${scope}.pdf`;
  };

  const handleDownloadPdf = async () => {
    if (isGenerating) return;
    setPdfError(null);
    if (pdfResult?.blobUrl) {
      URL.revokeObjectURL(pdfResult.blobUrl);
      setPdfResult(null);
    }

    setIsGenerating(true);
    setProgress({
      percent: 2,
      label:
        lang === 'ar'
          ? 'تهيئة الخطوط العربية والألمانية وبناء صفحات A4...'
          : 'Initialisiere Schriftarten und A4-Seitenlayout...',
    });

    try {
      const result = await generateEncyclopediaPdf({
        chapters: selectedChapters,
        questions: selectedQuestions,
        lang,
        includeCover,
        includeToc,
        includeGlossary,
        filename: buildFilename(),
        onProgress: (p) => setProgress(p),
      });
      setPdfResult(result);
    } catch (err) {
      setPdfError(
        err instanceof Error
          ? lang === 'ar'
            ? `تعذر إنشاء ملف PDF: ${err.message}`
            : `PDF konnte nicht erstellt werden: ${err.message}`
          : lang === 'ar'
          ? 'حدث خطأ غير متوقع أثناء بناء ملف PDF.'
          : 'Unerwarteter Fehler beim Erstellen der PDF-Datei.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  const previewChapter =
    selectedChapters.find((c) => c.id === previewChapterId) ?? selectedChapters[0];
  const previewPart = BOOK_PARTS.find((p) => p.id === previewChapter?.partId);
  const previewQuestions = useMemo(
    () => ALL_QUESTIONS.filter((q) => q.chapterId === previewChapter?.id),
    [previewChapter]
  );

  return (
    <section className="space-y-6">
      {/* Export Control Studio */}
      <div className="no-print bg-white border border-slate-200 rounded-lg p-5 sm:p-7 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1E3A5F]">
              <FileDown className="w-4 h-4" />
              <span>{ui.pdfEyebrow}</span>
            </div>
            <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
              {ui.pdfTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {ui.pdfDesc} ({selectedQuestions.length} {ui.questionsSuffix})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#1E3A5F] text-white text-sm font-bold hover:bg-[#162C49] disabled:opacity-60 transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {ui.pdfGenerating} ({progress.percent}%)...
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{ui.pdfDownloadBtn}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBrowserPrint}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-md border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{ui.pdfPrintFallbackBtn}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="bg-[#EFF6FF] border border-[#1E3A5F]/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1E3A5F]">
              <span>{progress.label}</span>
              <span className="font-legal-mono tabular-nums">{progress.percent}%</span>
            </div>
            <div className="w-full h-2.5 bg-white border border-slate-200 rounded-md overflow-hidden">
              <div
                className="h-full bg-[#1E3A5F] transition-all duration-150"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Ready Download Card */}
        {pdfResult && (
          <div className="bg-emerald-50 border border-emerald-400 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-sm">
                <div className="font-bold text-emerald-950">
                  {ui.pdfReadyTitle} ({pdfResult.pageCount} A4 · {pdfResult.fileSizeMb} MB)
                </div>
                <div className="text-xs text-emerald-900">{ui.pdfReadyHint}</div>
              </div>
            </div>

            <a
              href={pdfResult.blobUrl}
              download={pdfResult.filename}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-700 text-white text-xs sm:text-sm font-bold hover:bg-emerald-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>
                {ui.pdfDirectLink} ({pdfResult.filename})
              </span>
            </a>
          </div>
        )}

        {pdfError && (
          <div className="bg-rose-50 border border-rose-300 rounded-lg p-4 text-xs sm:text-sm text-rose-900 font-medium">
            {pdfError}
          </div>
        )}

        {/* Scope Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-bold text-slate-800">{ui.pdfScopeLabel}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setScope('full')}
                className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-3 rounded border transition-colors ${
                  scope === 'full'
                    ? 'border-[#1E3A5F] bg-[#EFF6FF] text-slate-950 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {ui.pdfScopeFull}
              </button>
              <button
                type="button"
                onClick={() => setScope('single_chapter')}
                className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-3 rounded border transition-colors ${
                  scope === 'single_chapter'
                    ? 'border-[#1E3A5F] bg-[#EFF6FF] text-slate-950 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {ui.pdfScopeSingle}
              </button>
              {BOOK_PARTS.map((part) => {
                const key = `part_${part.id}` as PrintScope;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setScope(key)}
                    className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-3 rounded border transition-colors ${
                      scope === key
                        ? 'border-[#1E3A5F] bg-[#EFF6FF] text-slate-950 font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {ui.pdfScopePartPrefix} {part.id}: {part.chapterIds.length} {ui.chaptersLabel} (130{' '}
                    {ui.questionsSuffix})
                  </button>
                );
              })}
            </div>

            {scope === 'single_chapter' && (
              <div className="pt-1">
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded bg-white focus:outline-none focus:border-[#1E3A5F]"
                >
                  {CHAPTERS.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ui.chapterPrefix} {ch.id}: {lang === 'ar' ? `${ch.titleAr} (${ch.titleDe})` : ch.titleDe}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-2.5 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-bold text-slate-800">{ui.pdfSectionsLabel}</div>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCover}
                onChange={(e) => setIncludeCover(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>{ui.pdfIncludeCover}</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeToc}
                onChange={(e) => setIncludeToc(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>{ui.pdfIncludeToc}</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeGlossary}
                onChange={(e) => setIncludeGlossary(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>
                {ui.pdfIncludeGlossary} ({GLOSSARY_ENTRIES.length})
              </span>
            </label>
            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              {ui.pdfNote}
            </div>
          </div>
        </div>
      </div>

      {/* Fast Paginated Book Preview */}
      <div className="space-y-8">
        {includeCover && (
          <div className="print-cover-page bg-white border border-slate-200 rounded-lg p-8 sm:p-12 text-center space-y-8">
            <div className="space-y-3">
              <div dir="ltr" className="font-legal-mono text-xs uppercase tracking-widest text-[#1E3A5F] font-semibold">
                SACHKUNDEPRÜFUNG IM BEWACHUNGSGEWERBE GEMÄSS § 34a GewO
              </div>
              <h1 className="font-book-display text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                {lang === 'ar' ? (
                  <>
                    الموسوعة الشاملة للتحضير لامتحان
                    <span className="block text-[#1E3A5F] mt-2" dir="ltr">
                      §34a GewO (IHK)
                    </span>
                  </>
                ) : (
                  <>
                    Enzyklopädie zur Sachkundeprüfung
                    <span className="block text-[#1E3A5F] mt-2" dir="ltr">
                      §34a GewO (IHK)
                    </span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {selectedQuestions.length} {ui.questionsSuffix}
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <img
                src={bookCoverImg}
                alt="§34a GewO Book Cover"
                className="w-full h-auto rounded-lg border border-slate-300 shadow-sm mx-auto"
              />
            </div>

            <div
              className={`max-w-3xl mx-auto ${
                lang === 'ar' ? 'text-right' : 'text-left'
              } bg-[#FAF8F5] border border-stone-300 rounded-lg p-5 space-y-2`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F]">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{ui.provenanceTitle}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{ui.provenanceBody}</p>
            </div>
          </div>
        )}

        {includeToc && (
          <div className="print-page-break bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
                {ui.sidebarTitle} ({selectedChapters.length})
              </h2>
              <span dir="ltr" className="font-legal-mono text-xs text-slate-500">
                INHALTSVERZEICHNIS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedChapters.map((ch) => {
                const chQs = ALL_QUESTIONS.filter((q) => q.chapterId === ch.id);
                const firstQ = chQs[0]?.id ?? 1;
                const lastQ = chQs[chQs.length - 1]?.id ?? 1;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setPreviewChapterId(ch.id)}
                    className={`${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    } flex items-baseline justify-between gap-3 py-2 px-3 rounded border text-sm transition-colors ${
                      previewChapter?.id === ch.id
                        ? 'border-[#1E3A5F] bg-[#EFF6FF]/60'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span
                        className={`font-bold text-[#1E3A5F] ${
                          lang === 'ar' ? 'ml-1.5' : 'mr-1.5'
                        }`}
                      >
                        {ui.chapterPrefix} {ch.id}:
                      </span>
                      <span className="font-semibold text-slate-900">
                        {lang === 'ar' ? ch.titleAr : ch.titleDe}
                      </span>
                      {lang === 'ar' && (
                        <div dir="ltr" className="font-legal-mono text-[11px] text-slate-500">
                          {ch.titleDe}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-legal-mono shrink-0">
                      Q{firstQ}–{lastQ} ({chQs.length})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {previewChapter && (
          <div className="space-y-5">
            <div className="no-print bg-white border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-bold text-slate-800">{ui.pdfPreviewBanner}</div>
              <select
                value={previewChapter.id}
                onChange={(e) => setPreviewChapterId(Number(e.target.value))}
                className="px-3 py-1.5 text-xs border border-slate-300 rounded bg-white focus:outline-none focus:border-[#1E3A5F]"
              >
                {selectedChapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ui.pdfPreviewOptionPrefix} {ch.id}: {lang === 'ar' ? ch.titleAr : ch.titleDe}
                  </option>
                ))}
              </select>
            </div>

            <div className="print-chapter-header bg-[#1E3A5F] text-white rounded-lg p-6 sm:p-7 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200">
                <span>{lang === 'ar' ? previewPart?.titleAr : previewPart?.titleDe}</span>
                <span dir="ltr" className="font-legal-mono">
                  {previewChapter.lawDomain}
                </span>
              </div>
              <h2 className="font-book-display text-2xl sm:text-3xl font-bold">
                {ui.chapterPrefix} {previewChapter.id}:{' '}
                {lang === 'ar' ? previewChapter.titleAr : previewChapter.titleDe}
              </h2>
              {lang === 'ar' && (
                <div dir="ltr" className="font-legal-mono text-sm text-sky-100">
                  {previewChapter.titleDe}
                </div>
              )}
              <p className="text-sm text-slate-100 leading-relaxed pt-1">
                {lang === 'ar'
                  ? previewChapter.subtitleAr
                  : previewChapter.subtitleDe ?? previewChapter.subtitleAr}
              </p>
            </div>

            <div className="space-y-5">
              {previewQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} lang={lang} alwaysShowAnswer />
              ))}
            </div>
          </div>
        )}

        {includeGlossary && (
          <div className="print-page-break bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="w-5 h-5 text-[#1E3A5F]" />
                <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
                  {ui.glossaryTitle} ({GLOSSARY_ENTRIES.length})
                </h2>
              </div>
              <span dir="ltr" className="font-legal-mono text-xs text-slate-500">
                FACHBEGRIFFE A–Z
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse text-xs sm:text-sm`}>
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
                    <th className="py-2.5 px-3 w-10">#</th>
                    <th className="py-2.5 px-3">{ui.glossaryColTermDe}</th>
                    <th className="py-2.5 px-3">{ui.glossaryColTermAr}</th>
                    <th className="py-2.5 px-3">{ui.glossaryColExpl}</th>
                    <th className="py-2.5 px-3">{ui.glossaryColLaw}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {GLOSSARY_ENTRIES.map((g) => (
                    <tr key={g.id} className="print-avoid-break align-top">
                      <td className="py-2 px-3 text-slate-500 tabular-nums">{g.id}</td>
                      <td className="py-2 px-3">
                        <span dir="ltr" className="font-legal-mono font-semibold text-[#1E3A5F]">
                          {g.de}
                        </span>
                      </td>
                      <td dir="rtl" className="py-2 px-3 font-semibold text-slate-900">
                        {g.ar}
                      </td>
                      <td className="py-2 px-3 text-slate-700 leading-relaxed">
                        {lang === 'de' ? GLOSSARY_EXPLANATIONS_DE[g.id] ?? g.explanationAr : g.explanationAr}
                      </td>
                      <td className="py-2 px-3">
                        <span dir="ltr" className="font-legal-mono text-xs text-slate-600">
                          {g.lawRef}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
