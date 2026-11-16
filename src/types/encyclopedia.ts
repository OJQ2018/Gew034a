export type DifficultyLevel = 1 | 2 | 3 | 4;

export type SourceOrigin = 'core_curriculum' | 'statutory_update' | 'practical_supplement';

export type SceneArchetype =
  | 'civil_property'
  | 'criminal_offense'
  | 'constitutional'
  | 'trade_law'
  | 'data_privacy'
  | 'self_defense'
  | 'necessity'
  | 'communication'
  | 'conflict'
  | 'fire_safety'
  | 'security_tech'
  | 'accident_prev'
  | 'first_aid'
  | 'rights_duties'
  | 'guard_tasks'
  | 'access_control'
  | 'house_right'
  | 'detention'
  | 'emergency'
  | 'weapons_exam';

export type ActorPosture =
  | 'guard'
  | 'citizen'
  | 'aggressor'
  | 'victim'
  | 'officer'
  | 'manager'
  | 'inspector'
  | 'medic'
  | 'system';

export interface SceneActor {
  roleAr: string;
  roleDe: string;
  posture: ActorPosture;
}

export interface SceneElement {
  ar: string;
  de: string;
  status: 'lawful' | 'unlawful' | 'warning' | 'neutral';
}

export interface VisualSceneSpec {
  archetype: SceneArchetype;
  sceneTitleAr: string;
  sceneTitleDe: string;
  leftActor: SceneActor;
  rightActor: SceneActor;
  lawBadge: string;
  actionLabelAr: string;
  actionLabelDe: string;
  outcomeType: 'lawful' | 'unlawful' | 'caution' | 'process';
  outcomeTextAr: string;
  elements: SceneElement[];
}

export interface GermanTerm {
  de: string;
  ar: string;
}

export interface McqOption {
  id: 'A' | 'B' | 'C' | 'D';
  textAr: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  chapterId: number;
  level: DifficultyLevel;
  questionAr: string;
  illustrationDescriptionAr: string;
  answerAr: string;
  lawRef: string;
  origin: SourceOrigin;
  originNoteAr: string;
  terms: GermanTerm[];
  mcq?: {
    multiSelect?: boolean;
    options: McqOption[];
  };
  visualScene: VisualSceneSpec;
}

export type Language = 'ar' | 'de';

export interface QuestionDeContent {
  questionDe: string;
  answerDe: string;
  illustrationDescriptionDe?: string;
  outcomeTextDe?: string;
  originNoteDe?: string;
  mcqOptionsDe?: Partial<Record<'A' | 'B' | 'C' | 'D', string>>;
}

export interface Chapter {
  id: number;
  partId: 1 | 2 | 3 | 4;
  titleAr: string;
  titleDe: string;
  subtitleAr: string;
  subtitleDe?: string;
  lawDomain: string;
  archetype: SceneArchetype;
  ihkWeightPercent: number;
}

export interface BookPart {
  id: 1 | 2 | 3 | 4;
  titleAr: string;
  titleDe: string;
  descriptionAr: string;
  descriptionDe?: string;
  coverImage: string;
  chapterIds: number[];
}

export interface GlossaryEntry {
  id: number;
  de: string;
  ar: string;
  explanationAr: string;
  explanationDe?: string;
  lawRef: string;
  chapterId: number;
}
