import {
  ActorPosture,
  DifficultyLevel,
  GermanTerm,
  McqOption,
  Question,
  SceneArchetype,
  SceneElement,
  SourceOrigin,
} from '../../types/encyclopedia';

export interface QuestionSeed {
  id: number;
  chapterId: number;
  level: DifficultyLevel;
  questionAr: string;
  illustrationDescriptionAr: string;
  answerAr: string;
  lawRef: string;
  origin?: SourceOrigin;
  originNoteAr?: string;
  terms: GermanTerm[];
  mcq?: {
    multiSelect?: boolean;
    options: McqOption[];
  };
  archetype: SceneArchetype;
  sceneTitleAr: string;
  sceneTitleDe: string;
  leftRoleAr: string;
  leftRoleDe: string;
  leftPosture: ActorPosture;
  rightRoleAr: string;
  rightRoleDe: string;
  rightPosture: ActorPosture;
  actionAr: string;
  actionDe: string;
  outcomeType: 'lawful' | 'unlawful' | 'caution' | 'process';
  outcomeTextAr: string;
  elements: SceneElement[];
}

export function buildQuestion(seed: QuestionSeed): Question {
  const origin: SourceOrigin = seed.origin ?? 'core_curriculum';
  const originNoteAr =
    seed.originNoteAr ??
    (origin === 'core_curriculum'
      ? 'مادة أساسية متوافقة مع منهج IHK وكتب التأهيل المعتمدة (Boorberg / DIHK).'
      : origin === 'statutory_update'
      ? 'تحديث تشريعي ساري المفعول مضاف للتحقق من أحدث النصوص القانونية الألمانية.'
      : 'إيضاح تطبيقي ميداني إضافي لتسهيل الفهم العملي للامتحان.');

  return {
    id: seed.id,
    chapterId: seed.chapterId,
    level: seed.level,
    questionAr: seed.questionAr,
    illustrationDescriptionAr: seed.illustrationDescriptionAr,
    answerAr: seed.answerAr,
    lawRef: seed.lawRef,
    origin,
    originNoteAr,
    terms: seed.terms,
    mcq: seed.mcq,
    visualScene: {
      archetype: seed.archetype,
      sceneTitleAr: seed.sceneTitleAr,
      sceneTitleDe: seed.sceneTitleDe,
      leftActor: {
        roleAr: seed.leftRoleAr,
        roleDe: seed.leftRoleDe,
        posture: seed.leftPosture,
      },
      rightActor: {
        roleAr: seed.rightRoleAr,
        roleDe: seed.rightRoleDe,
        posture: seed.rightPosture,
      },
      lawBadge: seed.lawRef,
      actionLabelAr: seed.actionAr,
      actionLabelDe: seed.actionDe,
      outcomeType: seed.outcomeType,
      outcomeTextAr: seed.outcomeTextAr,
      elements: seed.elements,
    },
  };
}
