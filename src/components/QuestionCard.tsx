import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Eye, EyeOff, Scale, XCircle } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { getLocalizedQuestion } from '../data/questions_de';
import {
  LEVEL_LABELS_BILINGUAL,
  ORIGIN_LABELS_BILINGUAL,
  getUiText,
} from '../i18n/translations';
import { Language, Question } from '../types/encyclopedia';
import { QuestionIllustration } from './QuestionIllustration';

interface QuestionCardProps {
  question: Question;
  lang?: Language;
  alwaysShowAnswer?: boolean;
  showChapterLabel?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  lang = 'ar',
  alwaysShowAnswer = false,
  showChapterLabel = false,
}) => {
  const [answerOpen, setAnswerOpen] = useState(alwaysShowAnswer);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [mcqChecked, setMcqChecked] = useState(false);

  const chapter = CHAPTERS.find((c) => c.id === question.chapterId);
  const levelInfo = LEVEL_LABELS_BILINGUAL[question.level];
  const originLabel = ORIGIN_LABELS_BILINGUAL[question.origin][lang];
  const ui = getUiText(lang);
  const localized = getLocalizedQuestion(question, lang);
  const isRevealed = alwaysShowAnswer || answerOpen;

  const toggleOption = (optId: string) => {
    if (mcqChecked) return;
    if (question.mcq?.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
      );
    } else {
      setSelectedOptions([optId]);
    }
  };

  const correctOptionIds =
    question.mcq?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? [];

  const isMcqFullyCorrect =
    mcqChecked &&
    correctOptionIds.length === selectedOptions.length &&
    correctOptionIds.every((id) => selectedOptions.includes(id));

  return (
    <article
      id={`question-${question.id}`}
      className="bg-white border border-slate-200 rounded-lg overflow-hidden print-avoid-break"
    >
      {/* Question Header Line — Zero-Pill Inline Metadata */}
      <header className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="font-bold text-sm text-[#1E3A5F]">
            {ui.questionNumberPrefix} <span className="tabular-nums">{question.id}</span>:
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="font-medium text-slate-800">{levelInfo[lang]}</span>
          {showChapterLabel && chapter && (
            <>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-slate-700">
                {ui.chapterPrefix} {chapter.id}: {lang === 'ar' ? chapter.titleAr : chapter.titleDe}
              </span>
            </>
          )}
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span
            className={
              question.origin === 'statutory_update'
                ? 'text-amber-800 font-medium'
                : 'text-slate-600'
            }
          >
            {originLabel}
          </span>
        </div>

        <span dir="ltr" className="font-legal-mono text-xs font-medium text-[#1E3A5F]">
          {question.lawRef}
        </span>
      </header>

      {/* Main Content: Side-by-side on desktop (Question + Answer + Terms | Illustration) */}
      <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {localized.questionText}
            </h3>
          </div>

          {/* Interactive MCQ Options when present (Level 4 IHK Questions) */}
          {question.mcq && localized.mcqOptions && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {question.mcq.multiSelect ? ui.mcqMultiHint : ui.mcqSingleHint}
                </span>
                {mcqChecked && (
                  <span
                    className={
                      isMcqFullyCorrect
                        ? 'font-bold text-emerald-700'
                        : 'font-bold text-rose-700'
                    }
                  >
                    {isMcqFullyCorrect ? ui.mcqMatchSuccess : ui.mcqMatchFail}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {localized.mcqOptions.map((opt) => {
                  const selected = selectedOptions.includes(opt.id);
                  const showState = mcqChecked || alwaysShowAnswer;

                  let rowStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                  if (showState && opt.isCorrect) {
                    rowStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950';
                  } else if (showState && selected && !opt.isCorrect) {
                    rowStyle = 'border-rose-400 bg-rose-50/70 text-rose-950';
                  } else if (selected) {
                    rowStyle = 'border-[#1E3A5F] bg-slate-50 text-slate-900';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      disabled={alwaysShowAnswer}
                      className={`w-full ${
                        lang === 'ar' ? 'text-right' : 'text-left'
                      } px-3.5 py-2.5 rounded border text-sm transition-colors flex items-start gap-2.5 ${rowStyle}`}
                    >
                      <span
                        dir="ltr"
                        className="font-legal-mono font-bold text-xs mt-0.5 shrink-0 w-5 text-center"
                      >
                        {opt.id}.
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                      {showState && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      )}
                      {showState && selected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!alwaysShowAnswer && (
                <div className="flex flex-wrap items-center gap-3 pt-1 no-print">
                  <button
                    type="button"
                    onClick={() => {
                      setMcqChecked(true);
                      setAnswerOpen(true);
                    }}
                    disabled={selectedOptions.length === 0}
                    className="px-3 py-1.5 rounded bg-[#1E3A5F] text-white text-xs font-semibold hover:bg-[#162C49] disabled:opacity-40 transition-colors"
                  >
                    {ui.checkOptionBtn}
                  </button>
                  {mcqChecked && (
                    <button
                      type="button"
                      onClick={() => {
                        setMcqChecked(false);
                        setSelectedOptions([]);
                      }}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
                    >
                      {ui.retryBtn}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Answer Toggle Button (screen only when not alwaysShowAnswer) */}
          {!alwaysShowAnswer && (
            <div className="no-print">
              <button
                type="button"
                onClick={() => setAnswerOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] hover:text-[#142942] transition-colors"
              >
                {isRevealed ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{ui.hideAnswer}</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>{ui.showAnswer}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Answer & Terminology Section */}
          {isRevealed && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-md p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E3A5F] mb-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  <span>{ui.answerHeading}</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{localized.answerText}</p>
                <p className="mt-2 text-[11px] text-slate-500">
                  <BookOpen
                    className={`w-3 h-3 inline ${lang === 'ar' ? 'ml-1' : 'mr-1'}`}
                  />
                  {localized.originNote}
                </p>
              </div>

              {/* Bilingual Legal Terms List */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                <div className="text-xs font-bold text-slate-800 mb-2">{ui.termsHeading}</div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {question.terms.map((term, idx) => (
                    <li
                      key={`${question.id}-term-${idx}`}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/70 last:border-b-0 pb-1 last:pb-0"
                    >
                      <span dir="ltr" className="font-legal-mono font-semibold text-[#1E3A5F]">
                        {term.de}
                      </span>
                      <span dir="rtl" className="text-slate-700 font-medium">
                        {term.ar}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Unique Educational Vector Diagram beside Question */}
        <div className="lg:col-span-5">
          <QuestionIllustration question={question} lang={lang} />
        </div>
      </div>
    </article>
  );
};
