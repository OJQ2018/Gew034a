import React, { useMemo, useState } from 'react';
import { BookText, Search } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { GLOSSARY_ENTRIES } from '../data/glossary';
import { GLOSSARY_EXPLANATIONS_DE } from '../data/glossary_de';
import { getUiText } from '../i18n/translations';
import { Language } from '../types/encyclopedia';

interface GlossaryViewProps {
  lang?: Language;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ lang = 'ar' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const ui = getUiText(lang);

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return GLOSSARY_ENTRIES.filter((entry) => {
      if (selectedChapter !== 'all' && entry.chapterId !== selectedChapter) {
        return false;
      }
      if (!q) return true;
      const explDe = GLOSSARY_EXPLANATIONS_DE[entry.id] ?? '';
      return (
        entry.de.toLowerCase().includes(q) ||
        entry.ar.toLowerCase().includes(q) ||
        entry.explanationAr.toLowerCase().includes(q) ||
        explDe.toLowerCase().includes(q) ||
        entry.lawRef.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedChapter]);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#1E3A5F] text-sm font-semibold mb-1">
              <BookText className="w-4 h-4" />
              <span>{ui.glossaryEyebrow}</span>
            </div>
            <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
              {ui.glossaryTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {lang === 'ar'
                ? `يضم ${GLOSSARY_ENTRIES.length} ${ui.glossaryDesc}`
                : `Umfasst ${GLOSSARY_ENTRIES.length} Einträge: ${ui.glossaryDesc}`}
            </p>
          </div>
          <div className="text-xs text-slate-600 font-medium">
            {ui.glossaryCountLabel}{' '}
            <span className="font-bold text-[#1E3A5F] tabular-nums">{filteredEntries.length}</span>
          </div>
        </div>

        {/* Search & Chapter Filter */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-7 relative">
            <Search
              className={`w-4 h-4 text-slate-400 absolute ${
                lang === 'ar' ? 'right-3' : 'left-3'
              } top-1/2 -translate-y-1/2 pointer-events-none`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.glossarySearchPlaceholder}
              className={`w-full ${
                lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'
              } py-2.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[#1E3A5F]`}
            />
          </div>
          <div className="md:col-span-5">
            <select
              value={selectedChapter}
              onChange={(e) =>
                setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[#1E3A5F]"
            >
              <option value="all">
                {ui.glossaryAllChapters} ({GLOSSARY_ENTRIES.length})
              </option>
              {CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ui.chapterPrefix} {ch.id}: {lang === 'ar' ? ch.titleAr : ch.titleDe}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Glossary Table */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center text-sm text-slate-600">
          {ui.glossaryEmpty}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} border-collapse`}>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 min-w-[190px]">{ui.glossaryColTermDe}</th>
                  <th className="py-3 px-4 min-w-[180px]">{ui.glossaryColTermAr}</th>
                  <th className="py-3 px-4 min-w-[260px]">{ui.glossaryColExpl}</th>
                  <th className="py-3 px-4 min-w-[150px]">{ui.glossaryColLaw}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredEntries.map((item) => {
                  const ch = CHAPTERS.find((c) => c.id === item.chapterId);
                  const expl =
                    lang === 'de'
                      ? GLOSSARY_EXPLANATIONS_DE[item.id] ?? item.explanationAr
                      : item.explanationAr;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 align-top">
                      <td className="py-3 px-4 text-center text-xs text-slate-500 tabular-nums">
                        {item.id}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          dir="ltr"
                          className="font-legal-mono font-semibold text-[#1E3A5F] inline-block"
                        >
                          {item.de}
                        </span>
                      </td>
                      <td dir="rtl" className="py-3 px-4 font-semibold text-slate-900">
                        {item.ar}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed">
                        {expl}
                        {ch && (
                          <div className="text-[11px] text-slate-500 mt-1">
                            {ui.chapterPrefix} {ch.id}: {lang === 'ar' ? ch.titleAr : ch.titleDe}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span dir="ltr" className="font-legal-mono text-xs text-slate-700">
                          {item.lawRef}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
