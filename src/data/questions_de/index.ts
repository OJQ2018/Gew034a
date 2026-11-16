import { Language, Question, QuestionDeContent } from '../../types/encyclopedia';
import { QUESTIONS_DE_01_04 } from './batch1_ch01_04';
import { QUESTIONS_DE_05_08 } from './batch2_ch05_08';
import { QUESTIONS_DE_09_12 } from './batch3_ch09_12';
import { QUESTIONS_DE_13_16 } from './batch4_ch13_16';
import { QUESTIONS_DE_17_20 } from './batch5_ch17_20';

export const QUESTIONS_DE: Record<number, QuestionDeContent> = {
  ...QUESTIONS_DE_01_04,
  ...QUESTIONS_DE_05_08,
  ...QUESTIONS_DE_09_12,
  ...QUESTIONS_DE_13_16,
  ...QUESTIONS_DE_17_20,
};

export function getLocalizedQuestion(q: Question, lang: Language) {
  if (lang === 'ar') {
    return {
      questionText: q.questionAr,
      answerText: q.answerAr,
      illustrationDescription: q.illustrationDescriptionAr,
      outcomeText: q.visualScene.outcomeTextAr,
      sceneTitle: q.visualScene.sceneTitleAr,
      leftRole: q.visualScene.leftActor.roleAr,
      rightRole: q.visualScene.rightActor.roleAr,
      actionLabel: q.visualScene.actionLabelAr,
      originNote: q.originNoteAr,
      mcqOptions: q.mcq?.options.map((o) => ({
        id: o.id,
        text: o.textAr,
        isCorrect: o.isCorrect,
      })),
    };
  }

  const de = QUESTIONS_DE[q.id];
  return {
    questionText: de?.questionDe ?? q.questionAr,
    answerText: de?.answerDe ?? q.answerAr,
    illustrationDescription:
      de?.illustrationDescriptionDe ??
      `${q.visualScene.sceneTitleDe}: ${q.visualScene.leftActor.roleDe} — ${q.visualScene.actionLabelDe} — ${q.visualScene.rightActor.roleDe} (${q.lawRef}).`,
    outcomeText: de?.outcomeTextDe ?? `${q.visualScene.sceneTitleDe} (${q.lawRef})`,
    sceneTitle: q.visualScene.sceneTitleDe,
    leftRole: q.visualScene.leftActor.roleDe,
    rightRole: q.visualScene.rightActor.roleDe,
    actionLabel: q.visualScene.actionLabelDe,
    originNote:
      de?.originNoteDe ??
      (q.origin === 'statutory_update'
        ? `Geltendes deutsches Recht / aktuelle Gesetzesfassung (${q.lawRef}).`
        : q.origin === 'practical_supplement'
        ? `Praxishinweis für die IHK-Prüfung und den Wachalltag (${q.lawRef}).`
        : `IHK-Rahmenstoffplan §34a GewO / Standardthemen (Boorberg & DIHK) · ${q.lawRef}.`),
    mcqOptions: q.mcq?.options.map((o) => ({
      id: o.id,
      text: de?.mcqOptionsDe?.[o.id] ?? o.textAr,
      isCorrect: o.isCorrect,
    })),
  };
}
