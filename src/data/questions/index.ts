import { Question } from '../../types/encyclopedia';
import { CHAPTER_01 } from './chapter01';
import { CHAPTER_02 } from './chapter02';
import { CHAPTER_03 } from './chapter03';
import { CHAPTER_04 } from './chapter04';
import { CHAPTER_05 } from './chapter05';
import { CHAPTER_06 } from './chapter06';
import { CHAPTER_07 } from './chapter07';
import { CHAPTER_08 } from './chapter08';
import { CHAPTER_09 } from './chapter09';
import { CHAPTER_10 } from './chapter10';
import { CHAPTER_11 } from './chapter11';
import { CHAPTER_12 } from './chapter12';
import { CHAPTER_13 } from './chapter13';
import { CHAPTER_14 } from './chapter14';
import { CHAPTER_15 } from './chapter15';
import { CHAPTER_16 } from './chapter16';
import { CHAPTER_17 } from './chapter17';
import { CHAPTER_18 } from './chapter18';
import { CHAPTER_19 } from './chapter19';
import { CHAPTER_20_QUESTIONS } from './chapter20';

export const ALL_QUESTIONS: Question[] = [
  ...CHAPTER_01,
  ...CHAPTER_02,
  ...CHAPTER_03,
  ...CHAPTER_04,
  ...CHAPTER_05,
  ...CHAPTER_06,
  ...CHAPTER_07,
  ...CHAPTER_08,
  ...CHAPTER_09,
  ...CHAPTER_10,
  ...CHAPTER_11,
  ...CHAPTER_12,
  ...CHAPTER_13,
  ...CHAPTER_14,
  ...CHAPTER_15,
  ...CHAPTER_16,
  ...CHAPTER_17,
  ...CHAPTER_18,
  ...CHAPTER_19,
  ...CHAPTER_20_QUESTIONS,
].sort((a, b) => a.id - b.id);

export function getQuestionsByChapter(chapterId: number): Question[] {
  return ALL_QUESTIONS.filter((q) => q.chapterId === chapterId);
}

export function getMcqQuestions(): Question[] {
  return ALL_QUESTIONS.filter((q) => Boolean(q.mcq && q.mcq.options.length > 0));
}
