import React, { useEffect, useMemo, useState } from 'react';
import { Award, CheckCircle2, Clock, Play, RotateCcw, XCircle } from 'lucide-react';
import { CHAPTERS } from '../data/chapters';
import { getMcqQuestions } from '../data/questions';
import { getLocalizedQuestion } from '../data/questions_de';
import { getUiText } from '../i18n/translations';
import { Language, Question } from '../types/encyclopedia';
import { QuestionIllustration } from './QuestionIllustration';

interface ExamSimulatorProps {
  lang?: Language;
}

type ExamMode = 'setup' | 'running' | 'review';
type ExamPreset = 'ihk_72' | 'quick_20' | 'chapter_focus';

const DOUBLE_WEIGHT_CHAPTERS = new Set([1, 2, 3, 4, 5, 6, 7, 14, 17, 18, 20]);

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({ lang = 'ar' }) => {
  const allMcqs = useMemo(() => getMcqQuestions(), []);
  const ui = getUiText(lang);

  const [mode, setMode] = useState<ExamMode>('setup');
  const [preset, setPreset] = useState<ExamPreset>('ihk_72');
  const [focusChapterId, setFocusChapterId] = useState<number>(6);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [secondsLeft, setSecondsLeft] = useState(120 * 60);

  useEffect(() => {
    if (mode !== 'running') return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setMode('review');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  const startExam = () => {
    let selected: Question[] = [];
    let durationSec = 120 * 60;

    if (preset === 'ihk_72') {
      selected = shuffleArray(allMcqs).slice(0, Math.min(72, allMcqs.length));
      durationSec = 120 * 60;
    } else if (preset === 'quick_20') {
      selected = shuffleArray(allMcqs).slice(0, Math.min(20, allMcqs.length));
      durationSec = 30 * 60;
    } else {
      const chMcqs = allMcqs.filter((q) => q.chapterId === focusChapterId);
      selected = chMcqs;
      durationSec = 15 * 60;
    }

    setExamQuestions(selected);
    setAnswers({});
    setCurrentIndex(0);
    setSecondsLeft(durationSec);
    setMode('running');
  };

  const toggleAnswer = (question: Question, optId: string) => {
    const prev = answers[question.id] ?? [];
    if (question.mcq?.multiSelect) {
      const updated = prev.includes(optId)
        ? prev.filter((x) => x !== optId)
        : [...prev, optId];
      setAnswers((a) => ({ ...a, [question.id]: updated }));
    } else {
      setAnswers((a) => ({ ...a, [question.id]: [optId] }));
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const scoreSummary = useMemo(() => {
    let earnedPoints = 0;
    let maxPoints = 0;
    let correctCount = 0;

    for (const q of examQuestions) {
      const weight = DOUBLE_WEIGHT_CHAPTERS.has(q.chapterId) ? 2 : 1;
      maxPoints += weight;
      const correctIds = (q.mcq?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? []).sort();
      const userIds = [...(answers[q.id] ?? [])].sort();
      const isCorrect =
        correctIds.length > 0 &&
        correctIds.length === userIds.length &&
        correctIds.every((id, i) => id === userIds[i]);
      if (isCorrect) {
        earnedPoints += weight;
        correctCount += 1;
      }
    }

    const percentage = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
    const passed = percentage >= 50;
    return { earnedPoints, maxPoints, correctCount, percentage, passed };
  }, [examQuestions, answers]);

  if (mode === 'setup') {
    return (
      <section className="bg-white border border-slate-200 rounded-lg p-5 sm:p-8 space-y-6">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <div className="text-xs font-semibold text-[#1E3A5F]">{ui.examEyebrow}</div>
          <h2 className="font-book-display text-2xl sm:text-3xl font-bold text-slate-900">
            {ui.examTitle}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">{ui.examDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPreset('ihk_72')}
            className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-4 rounded-lg border transition-colors ${
              preset === 'ihk_72'
                ? 'border-[#1E3A5F] bg-[#EFF6FF]/60'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-900">{ui.examPresetFullTitle}</div>
            <div className="text-xs text-slate-600 mt-1">{ui.examPresetFullDesc}</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset('quick_20')}
            className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-4 rounded-lg border transition-colors ${
              preset === 'quick_20'
                ? 'border-[#1E3A5F] bg-[#EFF6FF]/60'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-900">{ui.examPresetQuickTitle}</div>
            <div className="text-xs text-slate-600 mt-1">{ui.examPresetQuickDesc}</div>
          </button>

          <button
            type="button"
            onClick={() => setPreset('chapter_focus')}
            className={`${lang === 'ar' ? 'text-right' : 'text-left'} p-4 rounded-lg border transition-colors ${
              preset === 'chapter_focus'
                ? 'border-[#1E3A5F] bg-[#EFF6FF]/60'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="font-bold text-slate-900">{ui.examPresetChapterTitle}</div>
            <div className="text-xs text-slate-600 mt-1">{ui.examPresetChapterDesc}</div>
          </button>
        </div>

        {preset === 'chapter_focus' && (
          <div className="max-w-md">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {ui.examSelectChapterLabel}
            </label>
            <select
              value={focusChapterId}
              onChange={(e) => setFocusChapterId(Number(e.target.value))}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[#1E3A5F]"
            >
              {CHAPTERS.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ui.chapterPrefix} {ch.id}: {lang === 'ar' ? `${ch.titleAr} (${ch.titleDe})` : ch.titleDe}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {ui.examAvailablePool}{' '}
            <span className="font-bold text-[#1E3A5F] tabular-nums">{allMcqs.length}</span>{' '}
            {ui.examMcqSuffix}
          </div>
          <button
            type="button"
            onClick={startExam}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#162C49] transition-colors"
          >
            <Play className="w-4 h-4" />
            <span>{ui.examStartBtn}</span>
          </button>
        </div>
      </section>
    );
  }

  if (mode === 'running' && examQuestions[currentIndex]) {
    const q = examQuestions[currentIndex];
    const localized = getLocalizedQuestion(q, lang);
    const selected = answers[q.id] ?? [];
    const weight = DOUBLE_WEIGHT_CHAPTERS.has(q.chapterId) ? 2 : 1;
    const ch = CHAPTERS.find((c) => c.id === q.chapterId);

    return (
      <section className="space-y-5">
        {/* Top Exam Status Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
            <span className="font-bold text-sm text-[#1E3A5F]">
              {ui.examQuestionOf} <span className="tabular-nums">{currentIndex + 1}</span>{' '}
              {ui.ofLabel} <span className="tabular-nums">{examQuestions.length}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span>
              {ui.chapterPrefix} {ch?.id}: {lang === 'ar' ? ch?.titleAr : ch?.titleDe}
            </span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-900">
              {weight === 2 ? ui.examWeightDouble : ui.examWeightSingle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 text-sm font-legal-mono font-bold text-[#1E3A5F]">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
            <button
              type="button"
              onClick={() => setMode('review')}
              className="px-3.5 py-1.5 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              {ui.examFinishBtn}
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs text-slate-500">
              {ui.questionNumberPrefix} {q.id} ·{' '}
              <span dir="ltr" className="font-legal-mono">
                {q.lawRef}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {localized.questionText}
            </h3>

            <div className="text-xs font-semibold text-slate-600">
              {q.mcq?.multiSelect ? ui.examMultiNotice : ui.examSingleNotice}
            </div>

            <div className="space-y-2.5">
              {localized.mcqOptions?.map((opt) => {
                const isSelected = selected.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleAnswer(q, opt.id)}
                    className={`w-full ${
                      lang === 'ar' ? 'text-right' : 'text-left'
                    } px-4 py-3 rounded border text-sm transition-colors flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-[#1E3A5F] bg-[#EFF6FF] text-slate-950 font-medium'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span dir="ltr" className="font-legal-mono font-bold text-xs mt-0.5 w-5">
                      {opt.id}.
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                className="px-4 py-2 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                {ui.examPrevBtn}
              </button>

              {currentIndex < examQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((i) => Math.min(examQuestions.length - 1, i + 1))}
                  className="px-4 py-2 rounded bg-[#1E3A5F] text-white text-xs font-semibold hover:bg-[#162C49]"
                >
                  {ui.examNextBtn}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode('review')}
                  className="px-4 py-2 rounded bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800"
                >
                  {ui.examFinishBtn}
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuestionIllustration question={q} lang={lang} compact />
          </div>
        </div>

        {/* Question Palette */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-700 mb-2">{ui.examPaletteTitle}</div>
          <div className="flex flex-wrap gap-1.5">
            {examQuestions.map((item, idx) => {
              const answered = (answers[item.id] ?? []).length > 0;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded text-xs font-legal-mono font-semibold border transition-colors ${
                    isCurrent
                      ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                      : answered
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Review Mode
  return (
    <section className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E3A5F]">
              <Award className="w-5 h-5" />
              <span>{ui.examResultSubtitle}</span>
            </div>
            <h2 className="font-book-display text-3xl font-bold text-slate-900">
              {scoreSummary.passed ? ui.examPassedTitle : ui.examFailedTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {ui.examScoreLine}{' '}
              <span className="font-bold tabular-nums">{scoreSummary.earnedPoints}</span> /{' '}
              <span className="font-bold tabular-nums">{scoreSummary.maxPoints}</span> (
              {scoreSummary.percentage}%) · {ui.examCorrectCountLabel}{' '}
              <span className="font-bold tabular-nums">{scoreSummary.correctCount}</span> /{' '}
              <span className="font-bold tabular-nums">{examQuestions.length}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMode('setup')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#162C49]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{ui.examNewBtn}</span>
          </button>
        </div>
      </div>

      {/* Detailed Solutions */}
      <div className="space-y-4">
        {examQuestions.map((q, idx) => {
          const localized = getLocalizedQuestion(q, lang);
          const userIds = [...(answers[q.id] ?? [])].sort();
          const correctIds = (q.mcq?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? []).sort();
          const isCorrect =
            correctIds.length > 0 &&
            correctIds.length === userIds.length &&
            correctIds.every((id, i) => id === userIds[i]);

          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-700" />
                  )}
                  <span className="font-bold text-slate-900">
                    {ui.examTaskLabel} {idx + 1} ({ui.questionNumberPrefix} {q.id})
                  </span>
                </div>
                <span dir="ltr" className="font-legal-mono text-slate-600">
                  {q.lawRef}
                </span>
              </div>

              <p className="font-bold text-slate-900 text-sm sm:text-base">
                {localized.questionText}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {localized.mcqOptions?.map((opt) => {
                  const chosen = userIds.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded border ${
                        opt.isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold'
                          : chosen
                          ? 'border-rose-400 bg-rose-50 text-rose-900'
                          : 'border-slate-200 bg-slate-50/50 text-slate-600'
                      }`}
                    >
                      <span
                        dir="ltr"
                        className={`font-legal-mono font-bold ${lang === 'ar' ? 'ml-1.5' : 'mr-1.5'}`}
                      >
                        {opt.id}.
                      </span>
                      {opt.text}
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#FAF8F5] border border-stone-200 rounded p-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="font-bold text-[#1E3A5F]">{ui.examExplanationLabel}</span>
                {localized.answerText}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
