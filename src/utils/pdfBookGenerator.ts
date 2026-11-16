import { jsPDF } from 'jspdf';
import bookCoverImg from '../assets/images/book_cover_34a_1794781148157.jpg';
import { BOOK_PARTS } from '../data/chapters';
import { GLOSSARY_ENTRIES } from '../data/glossary';
import { GLOSSARY_EXPLANATIONS_DE } from '../data/glossary_de';
import { getLocalizedQuestion } from '../data/questions_de';
import {
  LEVEL_LABELS_BILINGUAL,
  ORIGIN_LABELS_BILINGUAL,
  OUTCOME_LABELS_BILINGUAL,
} from '../i18n/translations';
import {
  ActorPosture,
  Chapter,
  GlossaryEntry,
  Language,
  Question,
  SceneArchetype,
  SceneElement,
} from '../types/encyclopedia';

export interface PdfGenerationOptions {
  chapters: Chapter[];
  questions: Question[];
  lang?: Language;
  includeCover: boolean;
  includeToc: boolean;
  includeGlossary: boolean;
  filename: string;
  onProgress?: (progress: { percent: number; label: string }) => void;
}

export interface PdfGenerationResult {
  blobUrl: string;
  filename: string;
  pageCount: number;
  fileSizeMb: string;
}

const PAGE_W = 1240;
const PAGE_H = 1754;
const MARGIN_X = 68;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const MARGIN_TOP = 92;
const MARGIN_BOTTOM = 76;
const MAX_Y = PAGE_H - MARGIN_BOTTOM;

const SANS_FONT = '"IBM Plex Sans Arabic", system-ui, sans-serif';
const DE_SANS_FONT = '"Inter", "IBM Plex Sans Arabic", system-ui, sans-serif';
const SERIF_FONT = '"Amiri", Georgia, serif';
const DE_SERIF_FONT = 'Georgia, "Amiri", serif';
const MONO_FONT = '"IBM Plex Mono", ui-monospace, monospace';

const OUTCOME_COLORS: Record<
  Question['visualScene']['outcomeType'],
  { bg: string; border: string; text: string; symbol: string }
> = {
  lawful: { bg: '#ECFDF5', border: '#059669', text: '#065F46', symbol: '✓' },
  unlawful: { bg: '#FEF2F2', border: '#DC2626', text: '#991B1B', symbol: '✕' },
  caution: { bg: '#FFFBEB', border: '#D97706', text: '#92400E', symbol: '!' },
  process: { bg: '#EFF6FF', border: '#1E3A5F', text: '#1E3A5F', symbol: '→' },
};

const ELEMENT_COLORS: Record<
  SceneElement['status'],
  { fill: string; stroke: string; text: string; mark: string }
> = {
  lawful: { fill: '#ECFDF5', stroke: '#059669', text: '#065F46', mark: '✓' },
  unlawful: { fill: '#FEF2F2', stroke: '#DC2626', text: '#991B1B', mark: '✕' },
  warning: { fill: '#FFFBEB', stroke: '#D97706', text: '#92400E', mark: '!' },
  neutral: { fill: '#F1F5F9', stroke: '#64748B', text: '#1E293B', mark: '•' },
};

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill?: string,
  stroke?: string,
  lineWidth = 1.5
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  font: string
): string[] {
  ctx.save();
  ctx.font = font;
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
      const candidate = `${current} ${words[i]}`;
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
  }

  ctx.restore();
  return lines.length > 0 ? lines : [''];
}

function drawAlignedTextLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  anchorX: number,
  startY: number,
  lineHeight: number,
  font: string,
  color: string,
  dir: 'rtl' | 'ltr'
) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.direction = dir;
  ctx.textAlign = dir === 'rtl' ? 'right' : 'left';
  ctx.textBaseline = 'top';
  lines.forEach((line, idx) => {
    ctx.fillText(line, anchorX, startY + idx * lineHeight);
  });
  ctx.restore();
}

function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  font: string,
  color: string,
  dir: 'rtl' | 'ltr' = 'rtl',
  maxWidth?: number
) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.direction = dir;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (maxWidth) {
    ctx.fillText(text, cx, y, maxWidth);
  } else {
    ctx.fillText(text, cx, y);
  }
  ctx.restore();
}

function drawActorFigureCanvas(
  ctx: CanvasRenderingContext2D,
  posture: ActorPosture,
  cx: number,
  cy: number,
  scale = 1,
  flip = false
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  const d = flip ? -1 : 1;

  ctx.fillStyle =
    posture === 'aggressor' ? 'rgba(254, 202, 202, 0.85)' : 'rgba(203, 213, 225, 0.75)';
  ctx.beginPath();
  ctx.ellipse(0, 56, 22, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  if (posture === 'system') {
    drawRoundedRect(ctx, -22, -20, 44, 64, 5, '#0F172A', '#334155', 2);
    drawRoundedRect(ctx, -16, -13, 32, 20, 3, '#1E3A5F');
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-11, -2);
    ctx.lineTo(-4, -8);
    ctx.lineTo(4, 0);
    ctx.lineTo(11, -9);
    ctx.stroke();
    ['#10B981', '#F59E0B', '#EF4444'].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(-9 + i * 9, 18, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    return;
  }

  const legColor = posture === 'guard' || posture === 'officer' ? '#0F172A' : '#334155';
  drawRoundedRect(ctx, -10, 24, 7.5, 30, 3, legColor);
  drawRoundedRect(ctx, 2.5, 24, 7.5, 30, 3, legColor);

  const torsoColor =
    posture === 'guard'
      ? '#1E3A5F'
      : posture === 'aggressor'
      ? '#991B1B'
      : posture === 'officer'
      ? '#1D4ED8'
      : posture === 'medic'
      ? '#DC2626'
      : posture === 'inspector' || posture === 'manager'
      ? '#334155'
      : posture === 'victim'
      ? '#64748B'
      : '#475569';

  ctx.fillStyle = torsoColor;
  ctx.beginPath();
  ctx.moveTo(-15, -6);
  ctx.lineTo(15, -6);
  ctx.lineTo(13, 26);
  ctx.lineTo(-13, 26);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = torsoColor;
  ctx.lineWidth = 5.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  if (posture === 'aggressor') {
    ctx.moveTo(-12 * d, -2);
    ctx.lineTo(-26 * d, -15);
    ctx.moveTo(12 * d, 0);
    ctx.lineTo(18 * d, 16);
  } else if (posture === 'victim') {
    ctx.moveTo(-12 * d, 0);
    ctx.lineTo(-19 * d, -12);
    ctx.moveTo(12 * d, 0);
    ctx.lineTo(19 * d, -10);
  } else {
    ctx.moveTo(13 * d, -2);
    ctx.lineTo(20 * d, 16);
    ctx.moveTo(-13 * d, -2);
    ctx.lineTo(-18 * d, 16);
  }
  ctx.stroke();

  if (posture === 'guard') {
    ctx.fillStyle = '#D97706';
    ctx.fillRect(-15, -6, 7, 3.5);
    ctx.fillRect(8, -6, 7, 3.5);
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.arc(6, 5, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (posture === 'medic') {
    ctx.fillStyle = '#FEF08A';
    ctx.fillRect(-13, 7, 26, 4);
  } else if (posture === 'inspector' || posture === 'manager') {
    drawRoundedRect(ctx, 13, 3, 12, 16, 2, '#FFFFFF', '#475569', 1.2);
  }

  ctx.fillStyle = '#E2B89B';
  ctx.beginPath();
  ctx.arc(0, -18, 10, 0, Math.PI * 2);
  ctx.fill();

  if (posture === 'guard' || posture === 'officer') {
    ctx.fillStyle = posture === 'officer' ? '#1E3A8A' : '#0F172A';
    ctx.beginPath();
    ctx.arc(0, -21, 11, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-13, -22, 26, 3);
  }

  ctx.restore();
}

function drawArchetypeBackdropCanvas(
  ctx: CanvasRenderingContext2D,
  archetype: SceneArchetype,
  x: number,
  y: number,
  w: number,
  h: number
) {
  let bg = '#F8FAFC';
  let border = '#CBD5E1';
  if (archetype === 'fire_safety') {
    bg = '#FFFBEB';
    border = '#FDE68A';
  } else if (archetype === 'first_aid' || archetype === 'accident_prev') {
    bg = '#F0FDF4';
    border = '#BBF7D0';
  } else if (archetype === 'emergency' || archetype === 'criminal_offense') {
    bg = '#FEF2F2';
    border = '#FECACA';
  } else if (archetype === 'data_privacy' || archetype === 'security_tech') {
    bg = '#F1F5F9';
    border = '#CBD5E1';
  }

  drawRoundedRect(ctx, x, y, w, h, 8, bg, border, 1.5);
  const cx = x + w / 2;

  ctx.save();
  switch (archetype) {
    case 'self_defense':
    case 'necessity': {
      ctx.fillStyle = '#EFF6FF';
      ctx.strokeStyle = '#1E3A5F';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, y + 26);
      ctx.lineTo(cx + 22, y + 36);
      ctx.lineTo(cx + 18, y + 66);
      ctx.lineTo(cx, y + 84);
      ctx.lineTo(cx - 18, y + 66);
      ctx.lineTo(cx - 22, y + 36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 8, y + 54);
      ctx.lineTo(cx - 2, y + 61);
      ctx.lineTo(cx + 10, y + 46);
      ctx.stroke();
      break;
    }
    case 'fire_safety': {
      ctx.fillStyle = '#FEF3C7';
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, y + 20);
      ctx.lineTo(cx + 42, y + 86);
      ctx.lineTo(cx - 42, y + 86);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(cx, y + 64, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'data_privacy':
    case 'security_tech': {
      drawRoundedRect(ctx, cx - 22, y + 14, 44, 16, 3, '#1E293B');
      ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.beginPath();
      ctx.moveTo(cx, y + 30);
      ctx.lineTo(cx - 60, y + 98);
      ctx.lineTo(cx + 60, y + 98);
      ctx.closePath();
      ctx.fill();
      drawRoundedRect(ctx, cx - 36, y + 80, 72, 20, 3, '#FFFFFF', '#0284C7', 1.2);
      drawCenteredText(ctx, 'DSGVO / CCTV', cx, y + 90, `700 10px ${MONO_FONT}`, '#0369A1', 'ltr');
      break;
    }
    case 'house_right':
    case 'access_control':
    case 'detention': {
      ctx.strokeStyle = '#1E3A5F';
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 12);
      ctx.lineTo(cx, y + h - 12);
      ctx.stroke();
      ctx.setLineDash([]);
      drawRoundedRect(ctx, cx - 46, y + 16, 92, 20, 4, '#1E3A5F');
      drawCenteredText(ctx, 'GRENZE', cx, y + 26, `700 10px ${MONO_FONT}`, '#FFFFFF', 'ltr');
      break;
    }
    case 'first_aid':
    case 'accident_prev': {
      drawRoundedRect(ctx, cx - 20, y + 20, 40, 40, 6, '#059669');
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 29);
      ctx.lineTo(cx, y + 51);
      ctx.moveTo(cx - 11, y + 40);
      ctx.lineTo(cx + 11, y + 40);
      ctx.stroke();
      break;
    }
    case 'communication':
    case 'conflict': {
      drawRoundedRect(ctx, cx - 64, y + 20, 60, 26, 5, '#EFF6FF', '#1E3A5F', 1.5);
      drawRoundedRect(ctx, cx + 4, y + 44, 60, 26, 5, '#FFFBEB', '#D97706', 1.5);
      drawCenteredText(ctx, '> 1.5m', cx, y + 86, `700 10px ${MONO_FONT}`, '#475569', 'ltr');
      break;
    }
    case 'emergency': {
      ctx.fillStyle = '#FEF3C7';
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, y + 18);
      ctx.lineTo(cx + 34, y + 74);
      ctx.lineTo(cx - 34, y + 74);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      drawRoundedRect(ctx, cx - 46, y + 82, 92, 18, 4, '#0F172A');
      drawCenteredText(ctx, 'NOTRUF 110 / 112', cx, y + 91, `700 10px ${MONO_FONT}`, '#FEF08A', 'ltr');
      break;
    }
    default: {
      drawRoundedRect(ctx, cx - 44, y + 20, 88, 56, 6, '#FFFFFF', '#1E3A5F', 1.8);
      drawRoundedRect(ctx, cx - 44, y + 20, 88, 18, 4, '#1E3A5F');
      drawCenteredText(ctx, '§34a GewO', cx, y + 29, `700 10px ${MONO_FONT}`, '#FFFFFF', 'ltr');
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx - 8, y + 56);
      ctx.lineTo(cx - 2, y + 62);
      ctx.lineTo(cx + 10, y + 48);
      ctx.stroke();
      break;
    }
  }
  ctx.restore();
}

function drawQuestionIllustrationToCanvas(
  ctx: CanvasRenderingContext2D,
  question: Question,
  lang: Language,
  x: number,
  y: number,
  w: number
): number {
  const { visualScene } = question;
  const outcome = OUTCOME_COLORS[visualScene.outcomeType];
  const outcomeMeta = OUTCOME_LABELS_BILINGUAL[visualScene.outcomeType];
  const localized = getLocalizedQuestion(question, lang);
  const elements = visualScene.elements.slice(0, 4);
  const bodyFont = lang === 'ar' ? SANS_FONT : DE_SANS_FONT;

  const captionPrefix = lang === 'ar' ? 'وصف التوضيح: ' : 'Bildbeschreibung: ';
  const captionLines = wrapLines(
    ctx,
    `${captionPrefix}${localized.illustrationDescription}`,
    w - 28,
    `500 12.5px ${bodyFont}`
  );
  const captionH = captionLines.length * 19 + 18;
  const diagramBodyH = 292;
  const headerH = 34;
  const totalH = headerH + diagramBodyH + captionH;

  drawRoundedRect(ctx, x, y, w, totalH, 8, '#FFFFFF', '#CBD5E1', 1.4);

  drawRoundedRect(ctx, x, y, w, headerH, 8, '#F8FAFC');
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x, y + headerH, w, 1);

  ctx.save();
  ctx.font = `700 12px ${MONO_FONT}`;
  ctx.fillStyle = '#1E3A5F';
  ctx.direction = 'ltr';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`FIG. ${String(question.id).padStart(3, '0')}`, x + 12, y + headerH / 2);
  ctx.restore();

  ctx.save();
  ctx.font = `700 12.5px ${bodyFont}`;
  ctx.fillStyle = '#0F172A';
  ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(localized.sceneTitle, x + w - 12, y + headerH / 2, w - 110);
  ctx.restore();

  const pad = 12;
  const innerW = w - pad * 2;
  const stripY = y + headerH + 10;
  drawRoundedRect(ctx, x + pad, stripY, innerW, 28, 5, '#0F172A');
  drawCenteredText(
    ctx,
    visualScene.sceneTitleDe,
    x + w / 2,
    stripY + 14,
    `600 11.5px ${MONO_FONT}`,
    '#F8FAFC',
    'ltr',
    innerW - 16
  );

  const stageY = stripY + 34;
  const stageH = 148;
  drawArchetypeBackdropCanvas(ctx, visualScene.archetype, x + pad, stageY, innerW, stageH);

  const leftActorX = x + pad + innerW * 0.17;
  const rightActorX = x + pad + innerW * 0.83;
  drawActorFigureCanvas(ctx, visualScene.leftActor.posture, leftActorX, stageY + 52, 0.85, false);
  drawActorFigureCanvas(ctx, visualScene.rightActor.posture, rightActorX, stageY + 52, 0.85, true);

  const labelW = innerW * 0.3;
  drawRoundedRect(ctx, leftActorX - labelW / 2, stageY + 108, labelW, 32, 4, '#FFFFFF', '#CBD5E1', 1);
  if (lang === 'ar') {
    drawCenteredText(ctx, visualScene.leftActor.roleAr, leftActorX, stageY + 119, `700 10.5px ${SANS_FONT}`, '#0F172A', 'rtl', labelW - 8);
    drawCenteredText(ctx, visualScene.leftActor.roleDe, leftActorX, stageY + 132, `500 8.5px ${MONO_FONT}`, '#475569', 'ltr', labelW - 8);
  } else {
    drawCenteredText(ctx, visualScene.leftActor.roleDe, leftActorX, stageY + 124, `700 9.5px ${MONO_FONT}`, '#0F172A', 'ltr', labelW - 8);
  }

  drawRoundedRect(ctx, rightActorX - labelW / 2, stageY + 108, labelW, 32, 4, '#FFFFFF', '#CBD5E1', 1);
  if (lang === 'ar') {
    drawCenteredText(ctx, visualScene.rightActor.roleAr, rightActorX, stageY + 119, `700 10.5px ${SANS_FONT}`, '#0F172A', 'rtl', labelW - 8);
    drawCenteredText(ctx, visualScene.rightActor.roleDe, rightActorX, stageY + 132, `500 8.5px ${MONO_FONT}`, '#475569', 'ltr', labelW - 8);
  } else {
    drawCenteredText(ctx, visualScene.rightActor.roleDe, rightActorX, stageY + 124, `700 9.5px ${MONO_FONT}`, '#0F172A', 'ltr', labelW - 8);
  }

  const actW = innerW * 0.34;
  const actX = x + w / 2 - actW / 2;
  drawRoundedRect(ctx, actX, stageY + 102, actW, 38, 6, '#FFFFFF', '#1E3A5F', 1.5);
  if (lang === 'ar') {
    drawCenteredText(ctx, visualScene.actionLabelAr, x + w / 2, stageY + 115, `700 10.5px ${SANS_FONT}`, '#1E3A5F', 'rtl', actW - 10);
    drawCenteredText(ctx, visualScene.actionLabelDe, x + w / 2, stageY + 130, `500 8.5px ${MONO_FONT}`, '#475569', 'ltr', actW - 10);
  } else {
    drawCenteredText(ctx, visualScene.actionLabelDe, x + w / 2, stageY + 121, `700 9.5px ${MONO_FONT}`, '#1E3A5F', 'ltr', actW - 10);
  }

  const elemY = stageY + stageH + 8;
  const gap = 8;
  const boxW = (innerW - gap * (elements.length - 1)) / Math.max(1, elements.length);
  elements.forEach((el, i) => {
    const bx = x + pad + i * (boxW + gap);
    const c = ELEMENT_COLORS[el.status];
    drawRoundedRect(ctx, bx, elemY, boxW, 38, 4, c.fill, c.stroke, 1.2);
    if (lang === 'ar') {
      drawCenteredText(ctx, `${c.mark} ${el.ar}`, bx + boxW / 2, elemY + 13, `700 10px ${SANS_FONT}`, c.text, 'rtl', boxW - 8);
      drawCenteredText(ctx, el.de, bx + boxW / 2, elemY + 28, `500 8.5px ${MONO_FONT}`, '#334155', 'ltr', boxW - 8);
    } else {
      drawCenteredText(ctx, `${c.mark} ${el.de}`, bx + boxW / 2, elemY + 19, `700 9px ${MONO_FONT}`, c.text, 'ltr', boxW - 8);
    }
  });

  const outY = elemY + 44;
  drawRoundedRect(ctx, x + pad, outY, innerW, 26, 4, outcome.bg, outcome.border, 1.2);
  drawCenteredText(
    ctx,
    lang === 'ar'
      ? `${outcome.symbol} ${outcomeMeta.ar} — ${localized.outcomeText}`
      : `${outcome.symbol} ${outcomeMeta.de} — ${visualScene.lawBadge}`,
    x + w / 2,
    outY + 13,
    `700 10.5px ${bodyFont}`,
    outcome.text,
    lang === 'ar' ? 'rtl' : 'ltr',
    innerW - 14
  );

  const capY = y + headerH + diagramBodyH;
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(x + 1, capY, w - 2, captionH - 1);
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x, capY, w, 1);
  drawAlignedTextLines(
    ctx,
    captionLines,
    lang === 'ar' ? x + w - 14 : x + 14,
    capY + 9,
    19,
    `500 12.5px ${bodyFont}`,
    '#475569',
    lang === 'ar' ? 'rtl' : 'ltr'
  );

  return totalH;
}

function createA4Canvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = PAGE_W;
  canvas.height = PAGE_H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, PAGE_W, PAGE_H);
  return [canvas, ctx];
}

function drawRunningChrome(
  ctx: CanvasRenderingContext2D,
  lang: Language,
  headerPrimary: string,
  headerSecondary: string,
  pageNum: number
) {
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(MARGIN_X, 64, CONTENT_W, 1.5);

  ctx.save();
  if (lang === 'ar') {
    ctx.font = `600 14px ${SANS_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    ctx.fillText(headerPrimary, PAGE_W - MARGIN_X, 46);

    ctx.font = `500 13px ${MONO_FONT}`;
    ctx.fillStyle = '#64748B';
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.fillText(headerSecondary, MARGIN_X, 46);
  } else {
    ctx.font = `600 14px ${DE_SANS_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.fillText(headerPrimary, MARGIN_X, 46);

    ctx.font = `500 13px ${MONO_FONT}`;
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'right';
    ctx.fillText(headerSecondary, PAGE_W - MARGIN_X, 46);
  }
  ctx.restore();

  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(MARGIN_X, PAGE_H - 58, CONTENT_W, 1.5);

  drawCenteredText(
    ctx,
    lang === 'ar'
      ? `صفحة ${pageNum} — موسوعة التحضير لامتحان §34a GewO`
      : `Seite ${pageNum} — Enzyklopädie zur Sachkundeprüfung §34a GewO`,
    PAGE_W / 2,
    PAGE_H - 36,
    `500 13px ${lang === 'ar' ? SANS_FONT : DE_SANS_FONT}`,
    '#475569',
    lang === 'ar' ? 'rtl' : 'ltr'
  );
}

interface QuestionLayoutMetrics {
  totalH: number;
  questionLines: string[];
  answerLines: string[];
  originLines: string[];
  mcqLinesList: { id: string; isCorrect: boolean; lines: string[] }[];
  illustColW: number;
  textColW: number;
  illustH: number;
}

function measureQuestionBlock(
  ctx: CanvasRenderingContext2D,
  q: Question,
  lang: Language
): QuestionLayoutMetrics {
  const innerPad = 24;
  const colGap = 24;
  const innerW = CONTENT_W - innerPad * 2;
  const textColW = Math.floor(innerW * 0.56);
  const illustColW = innerW - textColW - colGap;
  const bodyFont = lang === 'ar' ? SANS_FONT : DE_SANS_FONT;
  const localized = getLocalizedQuestion(q, lang);

  const questionLines = wrapLines(ctx, localized.questionText, textColW, `700 17.5px ${bodyFont}`);
  const answerLines = wrapLines(ctx, localized.answerText, textColW - 24, `400 15px ${bodyFont}`);
  const originLines = wrapLines(ctx, localized.originNote, textColW - 24, `400 12.5px ${bodyFont}`);

  const mcqLinesList =
    localized.mcqOptions?.map((opt) => ({
      id: opt.id,
      isCorrect: opt.isCorrect,
      lines: wrapLines(ctx, `${opt.id}. ${opt.text}`, textColW - 32, `500 14px ${bodyFont}`),
    })) ?? [];

  let textH = questionLines.length * 27 + 14;
  if (mcqLinesList.length > 0) {
    textH += 26;
    for (const m of mcqLinesList) {
      textH += m.lines.length * 21 + 18;
    }
    textH += 10;
  }

  textH += 34 + answerLines.length * 23 + originLines.length * 18 + 20;
  textH += 34 + q.terms.length * 26 + 16;

  const captionPrefix = lang === 'ar' ? 'وصف التوضيح: ' : 'Bildbeschreibung: ';
  const captionLines = wrapLines(
    ctx,
    `${captionPrefix}${localized.illustrationDescription}`,
    illustColW - 28,
    `500 12.5px ${bodyFont}`
  );
  const illustH = 34 + 292 + captionLines.length * 19 + 18;

  const headerH = 44;
  const bodyH = Math.max(textH, illustH);
  const totalH = headerH + innerPad * 2 + bodyH;

  return {
    totalH,
    questionLines,
    answerLines,
    originLines,
    mcqLinesList,
    illustColW,
    textColW,
    illustH,
  };
}

function drawQuestionBlockToCanvas(
  ctx: CanvasRenderingContext2D,
  q: Question,
  lang: Language,
  m: QuestionLayoutMetrics,
  y: number
) {
  const innerPad = 24;
  const x = MARGIN_X;
  const w = CONTENT_W;
  const bodyFont = lang === 'ar' ? SANS_FONT : DE_SANS_FONT;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const levelInfo = LEVEL_LABELS_BILINGUAL[q.level];
  const originText = ORIGIN_LABELS_BILINGUAL[q.origin][lang];

  drawRoundedRect(ctx, x, y, w, m.totalH, 10, '#FFFFFF', '#CBD5E1', 1.5);

  const headerH = 44;
  drawRoundedRect(ctx, x, y, w, headerH, 10, '#F8FAFC');
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(x, y + headerH, w, 1.2);

  ctx.save();
  if (lang === 'ar') {
    ctx.font = `700 15px ${SANS_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      `السؤال رقم ${q.id}  ·  ${levelInfo.ar}  ·  ${originText}`,
      x + w - innerPad,
      y + headerH / 2
    );

    ctx.font = `600 13.5px ${MONO_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.fillText(q.lawRef, x + innerPad, y + headerH / 2);
  } else {
    ctx.font = `700 14.5px ${DE_SANS_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      `Frage Nr. ${q.id}  ·  ${levelInfo.de}  ·  ${originText}`,
      x + innerPad,
      y + headerH / 2,
      w - 230
    );

    ctx.font = `600 13.5px ${MONO_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.textAlign = 'right';
    ctx.fillText(q.lawRef, x + w - innerPad, y + headerH / 2);
  }
  ctx.restore();

  const bodyTop = y + headerH + innerPad;
  const illustX = lang === 'ar' ? x + innerPad : x + w - innerPad - m.illustColW;
  const textAnchorX = lang === 'ar' ? x + w - innerPad : x + innerPad;
  const textBoxX = lang === 'ar' ? textAnchorX - m.textColW : textAnchorX;

  drawQuestionIllustrationToCanvas(ctx, q, lang, illustX, bodyTop, m.illustColW);

  let cy = bodyTop;
  drawAlignedTextLines(ctx, m.questionLines, textAnchorX, cy, 27, `700 17.5px ${bodyFont}`, '#0F172A', dir);
  cy += m.questionLines.length * 27 + 14;

  if (m.mcqLinesList.length > 0) {
    const mcqLabel =
      lang === 'ar'
        ? q.mcq?.multiSelect
          ? 'خيارات IHK (أكثر من إجابة صحيحة محتملة):'
          : 'خيارات IHK:'
        : q.mcq?.multiSelect
        ? 'IHK-Auswahl (mehrere Antworten möglich):'
        : 'IHK-Auswahl (eine richtige Antwort):';
    drawAlignedTextLines(ctx, [mcqLabel], textAnchorX, cy, 20, `700 13.5px ${bodyFont}`, '#334155', dir);
    cy += 24;

    for (const opt of m.mcqLinesList) {
      const boxH = opt.lines.length * 21 + 12;
      drawRoundedRect(
        ctx,
        textBoxX,
        cy,
        m.textColW,
        boxH,
        5,
        opt.isCorrect ? '#ECFDF5' : '#FFFFFF',
        opt.isCorrect ? '#059669' : '#CBD5E1',
        opt.isCorrect ? 1.8 : 1
      );
      drawAlignedTextLines(
        ctx,
        opt.lines,
        lang === 'ar' ? textAnchorX - 12 : textAnchorX + 12,
        cy + 7,
        21,
        `${opt.isCorrect ? '700' : '500'} 14px ${bodyFont}`,
        opt.isCorrect ? '#065F46' : '#1E293B',
        dir
      );
      cy += boxH + 7;
    }
    cy += 8;
  }

  const ansBoxH = 34 + m.answerLines.length * 23 + m.originLines.length * 18 + 16;
  drawRoundedRect(ctx, textBoxX, cy, m.textColW, ansBoxH, 7, '#FAF8F5', '#D6D3D1', 1.2);
  const innerTextAnchorX = lang === 'ar' ? textAnchorX - 12 : textAnchorX + 12;
  drawAlignedTextLines(
    ctx,
    [lang === 'ar' ? 'الجواب:' : 'Musterantwort / Lösung:'],
    innerTextAnchorX,
    cy + 10,
    20,
    `700 14px ${bodyFont}`,
    '#1E3A5F',
    dir
  );
  drawAlignedTextLines(ctx, m.answerLines, innerTextAnchorX, cy + 34, 23, `400 15px ${bodyFont}`, '#1E293B', dir);
  drawAlignedTextLines(
    ctx,
    m.originLines,
    innerTextAnchorX,
    cy + 34 + m.answerLines.length * 23 + 4,
    18,
    `400 12.5px ${bodyFont}`,
    '#64748B',
    dir
  );
  cy += ansBoxH + 12;

  const termsBoxH = 34 + q.terms.length * 26 + 8;
  drawRoundedRect(ctx, textBoxX, cy, m.textColW, termsBoxH, 7, '#F8FAFC', '#E2E8F0', 1.2);
  drawAlignedTextLines(
    ctx,
    [lang === 'ar' ? 'المصطلحات الألمانية:' : 'Zentrale Fachbegriffe (DE = AR):'],
    innerTextAnchorX,
    cy + 9,
    20,
    `700 13.5px ${bodyFont}`,
    '#0F172A',
    dir
  );

  q.terms.forEach((term, i) => {
    const ty = cy + 34 + i * 26;
    ctx.save();
    ctx.font = `600 13.5px ${MONO_FONT}`;
    ctx.fillStyle = '#1E3A5F';
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(term.de, textBoxX + 12, ty, m.textColW * 0.48);

    ctx.font = `600 13.5px ${SANS_FONT}`;
    ctx.fillStyle = '#334155';
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    ctx.fillText(term.ar, textBoxX + m.textColW - 12, ty, m.textColW * 0.48);
    ctx.restore();
  });
}

export async function generateEncyclopediaPdf(
  options: PdfGenerationOptions
): Promise<PdfGenerationResult> {
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const {
    chapters,
    questions,
    lang = 'ar',
    includeCover,
    includeToc,
    includeGlossary,
    filename,
    onProgress,
  } = options;

  const bodyFont = lang === 'ar' ? SANS_FONT : DE_SANS_FONT;
  const displayFont = lang === 'ar' ? SERIF_FONT : DE_SERIF_FONT;
  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr';

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
    compress: true,
  });

  const pdfW = doc.internal.pageSize.getWidth();
  const pdfH = doc.internal.pageSize.getHeight();
  let pdfPageCount = 0;

  const commitPage = (canvas: HTMLCanvasElement) => {
    const imgData = canvas.toDataURL('image/jpeg', 0.86);
    if (pdfPageCount > 0) doc.addPage();
    doc.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH, undefined, 'FAST');
    pdfPageCount += 1;
  };

  const totalSteps =
    (includeCover ? 1 : 0) +
    (includeToc ? 1 : 0) +
    questions.length +
    (includeGlossary ? GLOSSARY_ENTRIES.length : 0);
  let completedSteps = 0;

  const report = (label: string) => {
    const percent = Math.min(99, Math.round((completedSteps / Math.max(1, totalSteps)) * 100));
    onProgress?.({ percent, label });
  };

  const coverImageEl = includeCover ? await loadImage(bookCoverImg) : null;
  const partImageMap = new Map<number, HTMLImageElement | null>();
  for (const p of BOOK_PARTS) {
    partImageMap.set(p.id, await loadImage(p.coverImage));
  }

  // 1. COVER PAGE
  if (includeCover) {
    report(
      lang === 'ar'
        ? 'رسم غلاف الموسوعة وبيان المصادر...'
        : 'Erstelle Buchdeckblatt & Quellenhinweis...'
    );
    const [canvas, ctx] = createA4Canvas();

    ctx.fillStyle = '#1E3A5F';
    ctx.fillRect(0, 0, PAGE_W, 24);

    drawCenteredText(
      ctx,
      'SACHKUNDEPRÜFUNG IM BEWACHUNGSGEWERBE GEMÄSS § 34a GewO',
      PAGE_W / 2,
      110,
      `700 18px ${MONO_FONT}`,
      '#1E3A5F',
      'ltr'
    );
    drawCenteredText(
      ctx,
      lang === 'ar'
        ? 'الموسوعة الشاملة للتحضير لامتحان الكفاءة الأمنية'
        : 'Umfassende Fach-Enzyklopädie für die IHK-Prüfung',
      PAGE_W / 2,
      180,
      `700 ${lang === 'ar' ? 50 : 44}px ${displayFont}`,
      '#0F172A',
      dir
    );
    drawCenteredText(
      ctx,
      lang === 'ar' ? '§34a GewO (IHK) — ألماني / عربي' : '§34a GewO (IHK) — Deutsche Ausgabe',
      PAGE_W / 2,
      245,
      `700 34px ${MONO_FONT}`,
      '#1E3A5F',
      'ltr'
    );

    const coverSubtext =
      lang === 'ar'
        ? `${questions.length} سؤالاً وجواباً نموذجياً باللغة العربية مع المصطلحات الألمانية، ${questions.length} رسماً توضيحياً مستقلاً، أسئلة اختيار من متعدد بمستوى IHK، وقاموس قانوني شامل.`
        : `${questions.length} prüfungsrelevante Fragen & Musterlösungen auf Deutsch, ${questions.length} eigenständige didaktische Schaubilder, IHK-Multiple-Choice-Fälle und vollständiges Rechtslexikon.`;

    const subtitleLines = wrapLines(ctx, coverSubtext, CONTENT_W - 120, `500 20px ${bodyFont}`);
    subtitleLines.forEach((line, i) => {
      drawCenteredText(ctx, line, PAGE_W / 2, 315 + i * 32, `500 20px ${bodyFont}`, '#475569', dir);
    });

    if (coverImageEl) {
      const imgW = 480;
      const imgH = 640;
      const imgX = (PAGE_W - imgW) / 2;
      const imgY = 420;
      drawRoundedRect(ctx, imgX - 6, imgY - 6, imgW + 12, imgH + 12, 12, '#FFFFFF', '#CBD5E1', 2);
      ctx.drawImage(coverImageEl, imgX, imgY, imgW, imgH);
    }

    const provY = 1130;
    const provBodyText =
      lang === 'ar'
        ? 'صُمِّم هذا المرجع ليتوافق مع منهج غرفة التجارة والصناعة الألمانية (IHK Rahmenstoffplan) وموضوعات كتابي Boorberg وDIHK. ونظراً لعدم إرفاق النسختين الورقيتين داخل بيئة العمل، جرى التمييز بدقة في كل سؤال بين المادة الأساسية لمنهج IHK وبين التحديثات التشريعية السارية (§ 11b GewO، DSGVO/BDSG، وتعديلات BewachV وWaffG) دون اختراع نصوص غير سارية.'
        : 'Aufbau und Themen entsprechen dem bundeseinheitlichen IHK-Rahmenstoffplan sowie der Standardfachliteratur (Boorberg Sachkundeprüfung / DIHK Unterrichtung). Jede Frage unterscheidet transparent zwischen dem IHK-Kernlehrplan und aktuellen Gesetzesänderungen (§ 11b GewO, DSGVO/BDSG, BewachV, WaffG).';

    const provLines = wrapLines(ctx, provBodyText, CONTENT_W - 60, `400 16.5px ${bodyFont}`);
    const provH = 72 + provLines.length * 27;
    drawRoundedRect(ctx, MARGIN_X, provY, CONTENT_W, provH, 10, '#FAF8F5', '#D6D3D1', 1.5);
    const provAnchorX = lang === 'ar' ? PAGE_W - MARGIN_X - 28 : MARGIN_X + 28;
    drawAlignedTextLines(
      ctx,
      [
        lang === 'ar'
          ? 'منهجية المصادر والتحقق من سريان القوانين الألمانية:'
          : 'Quellenhinweis & Aktualität des deutschen Rechtsstands:',
      ],
      provAnchorX,
      provY + 20,
      24,
      `700 18.5px ${bodyFont}`,
      '#1E3A5F',
      dir
    );
    drawAlignedTextLines(ctx, provLines, provAnchorX, provY + 54, 27, `400 16.5px ${bodyFont}`, '#334155', dir);

    drawCenteredText(
      ctx,
      lang === 'ar'
        ? `تغطية ${chapters.length} فصلاً · 4 مستويات تعليمية · ${questions.length} سؤالاً وصورة توضيحية`
        : `${chapters.length} Lernkapitel · 4 Schwierigkeitsstufen · ${questions.length} Fragen & Schaubilder`,
      PAGE_W / 2,
      PAGE_H - 90,
      `600 17px ${bodyFont}`,
      '#64748B',
      dir
    );
    ctx.fillStyle = '#1E3A5F';
    ctx.fillRect(0, PAGE_H - 24, PAGE_W, 24);

    commitPage(canvas);
    completedSteps += 1;
    await new Promise((r) => setTimeout(r, 0));
  }

  // 2. TABLE OF CONTENTS
  if (includeToc) {
    report(
      lang === 'ar' ? 'إعداد فهرس المحتويات الكامل...' : 'Erstelle Inhaltsverzeichnis...'
    );
    const [canvas, ctx] = createA4Canvas();
    drawRunningChrome(
      ctx,
      lang,
      lang === 'ar' ? 'فهرس المحتويات الكامل' : 'INHALTSVERZEICHNIS',
      lang === 'ar' ? 'INHALTSVERZEICHNIS' : '§ 34a GewO',
      pdfPageCount + 1
    );

    drawAlignedTextLines(
      ctx,
      [
        lang === 'ar'
          ? 'فهرس الفصول والموضوعات القانونية والأمنية'
          : 'Inhaltsverzeichnis: Lernkapitel & Rechtsgebiete',
      ],
      lang === 'ar' ? PAGE_W - MARGIN_X : MARGIN_X,
      MARGIN_TOP + 10,
      36,
      `700 30px ${displayFont}`,
      '#0F172A',
      dir
    );

    let ty = MARGIN_TOP + 76;
    for (const ch of chapters) {
      const chQs = questions.filter((q) => q.chapterId === ch.id);
      const firstId = chQs[0]?.id ?? 0;
      const lastId = chQs[chQs.length - 1]?.id ?? 0;

      drawRoundedRect(ctx, MARGIN_X, ty, CONTENT_W, 58, 6, '#FFFFFF', '#E2E8F0', 1.2);
      ctx.save();
      if (lang === 'ar') {
        ctx.font = `700 17px ${SANS_FONT}`;
        ctx.fillStyle = '#0F172A';
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        ctx.fillText(`الفصل ${ch.id}: ${ch.titleAr}`, PAGE_W - MARGIN_X - 18, ty + 24);

        ctx.font = `500 13px ${MONO_FONT}`;
        ctx.fillStyle = '#64748B';
        ctx.fillText(ch.titleDe, PAGE_W - MARGIN_X - 18, ty + 45);

        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText(`Q${firstId}–Q${lastId} (${chQs.length})`, MARGIN_X + 18, ty + 32);
      } else {
        ctx.font = `700 16px ${DE_SANS_FONT}`;
        ctx.fillStyle = '#0F172A';
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText(`Kapitel ${ch.id}: ${ch.titleDe}`, MARGIN_X + 18, ty + 24, CONTENT_W - 220);

        ctx.font = `500 12.5px ${MONO_FONT}`;
        ctx.fillStyle = '#64748B';
        ctx.fillText(ch.lawDomain, MARGIN_X + 18, ty + 45, CONTENT_W - 220);

        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.textAlign = 'right';
        ctx.fillText(`Fragen ${firstId}–${lastId} (${chQs.length})`, PAGE_W - MARGIN_X - 18, ty + 32);
      }
      ctx.restore();

      ty += 66;
    }

    if (includeGlossary && ty + 62 < MAX_Y) {
      drawRoundedRect(ctx, MARGIN_X, ty + 6, CONTENT_W, 54, 6, '#EFF6FF', '#1E3A5F', 1.5);
      ctx.save();
      if (lang === 'ar') {
        ctx.font = `700 17px ${SANS_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        ctx.fillText('الملحق الختامي: القاموس القانوني الشامل (ألماني — عربي)', PAGE_W - MARGIN_X - 18, ty + 38);
        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText(`${GLOSSARY_ENTRIES.length} Terms`, MARGIN_X + 18, ty + 38);
      } else {
        ctx.font = `700 16px ${DE_SANS_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText('Anhang: Zweisprachiges Fachlexikon (Deutsch — Arabisch)', MARGIN_X + 18, ty + 38);
        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.textAlign = 'right';
        ctx.fillText(`${GLOSSARY_ENTRIES.length} Einträge`, PAGE_W - MARGIN_X - 18, ty + 38);
      }
      ctx.restore();
    }

    commitPage(canvas);
    completedSteps += 1;
    await new Promise((r) => setTimeout(r, 0));
  }

  // 3. CHAPTERS & ALL QUESTIONS
  for (const ch of chapters) {
    const chQuestions = questions.filter((q) => q.chapterId === ch.id);
    if (chQuestions.length === 0) continue;

    let [canvas, ctx] = createA4Canvas();
    const chTitleMain = lang === 'ar' ? `الفصل ${ch.id}: ${ch.titleAr}` : `Kapitel ${ch.id}: ${ch.titleDe}`;
    const chTitleSec = lang === 'ar' ? ch.titleDe : ch.lawDomain;
    drawRunningChrome(ctx, lang, chTitleMain, chTitleSec, pdfPageCount + 1);

    const bannerH = 220;
    const partImg = partImageMap.get(ch.partId);
    drawRoundedRect(ctx, MARGIN_X, MARGIN_TOP, CONTENT_W, bannerH, 10, '#1E3A5F');

    if (partImg) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(MARGIN_X, MARGIN_TOP, CONTENT_W, bannerH, 10);
      ctx.clip();
      ctx.globalAlpha = 0.22;
      ctx.drawImage(partImg, MARGIN_X, MARGIN_TOP - 40, CONTENT_W, 380);
      ctx.restore();
    }

    ctx.save();
    if (lang === 'ar') {
      ctx.font = `600 14px ${MONO_FONT}`;
      ctx.fillStyle = '#BAE6FD';
      ctx.direction = 'ltr';
      ctx.textAlign = 'left';
      ctx.fillText(ch.lawDomain, MARGIN_X + 26, MARGIN_TOP + 40);

      ctx.font = `700 34px ${SERIF_FONT}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.direction = 'rtl';
      ctx.textAlign = 'right';
      ctx.fillText(`الفصل ${ch.id}: ${ch.titleAr}`, PAGE_W - MARGIN_X - 28, MARGIN_TOP + 86);

      ctx.font = `600 17px ${MONO_FONT}`;
      ctx.fillStyle = '#E0F2FE';
      ctx.direction = 'ltr';
      ctx.textAlign = 'left';
      ctx.fillText(ch.titleDe, MARGIN_X + 26, MARGIN_TOP + 124);
    } else {
      ctx.font = `600 14px ${MONO_FONT}`;
      ctx.fillStyle = '#BAE6FD';
      ctx.direction = 'ltr';
      ctx.textAlign = 'left';
      ctx.fillText(ch.lawDomain, MARGIN_X + 28, MARGIN_TOP + 40);

      ctx.font = `700 32px ${DE_SERIF_FONT}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Kapitel ${ch.id}: ${ch.titleDe}`, MARGIN_X + 28, MARGIN_TOP + 88, CONTENT_W - 56);
    }
    ctx.restore();

    const chSub = lang === 'ar' ? ch.subtitleAr : ch.subtitleDe ?? ch.subtitleAr;
    const subLines = wrapLines(ctx, chSub, CONTENT_W - 60, `400 17px ${bodyFont}`);
    drawAlignedTextLines(
      ctx,
      subLines,
      lang === 'ar' ? PAGE_W - MARGIN_X - 28 : MARGIN_X + 28,
      MARGIN_TOP + 146,
      26,
      `400 17px ${bodyFont}`,
      '#F1F5F9',
      dir
    );

    let cursorY = MARGIN_TOP + bannerH + 22;

    for (let i = 0; i < chQuestions.length; i++) {
      const q = chQuestions[i];
      report(
        lang === 'ar'
          ? `إنشاء صفحات PDF: الفصل ${ch.id} — السؤال ${q.id} من ${questions.length}...`
          : `Erstelle PDF-Seiten: Kapitel ${ch.id} — Frage ${q.id} von ${questions.length}...`
      );

      const metrics = measureQuestionBlock(ctx, q, lang);
      if (cursorY + metrics.totalH > MAX_Y && cursorY > MARGIN_TOP + 10) {
        commitPage(canvas);
        [canvas, ctx] = createA4Canvas();
        drawRunningChrome(ctx, lang, chTitleMain, chTitleSec, pdfPageCount + 1);
        cursorY = MARGIN_TOP;
      }

      drawQuestionBlockToCanvas(ctx, q, lang, metrics, cursorY);
      cursorY += metrics.totalH + 18;
      completedSteps += 1;

      if (i % 5 === 0) {
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    commitPage(canvas);
  }

  // 4. BILINGUAL LEGAL GLOSSARY APPENDIX
  if (includeGlossary) {
    let [canvas, ctx] = createA4Canvas();
    drawRunningChrome(
      ctx,
      lang,
      lang === 'ar' ? 'الملحق: القاموس القانوني الشامل' : 'Anhang: Fachlexikon A–Z',
      'FACHBEGRIFFE A–Z',
      pdfPageCount + 1
    );
    drawAlignedTextLines(
      ctx,
      [
        lang === 'ar'
          ? 'القاموس القانوني والأمني الشامل للمصطلحات الألمانية'
          : 'Zweisprachiges Fachlexikon §34a GewO (Deutsch — Arabisch)',
      ],
      lang === 'ar' ? PAGE_W - MARGIN_X : MARGIN_X,
      MARGIN_TOP,
      36,
      `700 28px ${displayFont}`,
      '#0F172A',
      dir
    );

    let gy = MARGIN_TOP + 58;

    const getGlossaryExp = (g: GlossaryEntry) =>
      lang === 'de' ? GLOSSARY_EXPLANATIONS_DE[g.id] ?? g.explanationAr : g.explanationAr;

    const measureGlossaryRow = (g: GlossaryEntry) => {
      const expLines = wrapLines(ctx, getGlossaryExp(g), CONTENT_W - 440, `400 13.5px ${bodyFont}`);
      return Math.max(54, expLines.length * 20 + 20);
    };

    for (let i = 0; i < GLOSSARY_ENTRIES.length; i++) {
      const g = GLOSSARY_ENTRIES[i];
      const expLines = wrapLines(ctx, getGlossaryExp(g), CONTENT_W - 440, `400 13.5px ${bodyFont}`);
      const rowH = measureGlossaryRow(g);

      if (gy + rowH > MAX_Y) {
        commitPage(canvas);
        [canvas, ctx] = createA4Canvas();
        drawRunningChrome(
          ctx,
          lang,
          lang === 'ar' ? 'الملحق: القاموس القانوني الشامل' : 'Anhang: Fachlexikon A–Z',
          'FACHBEGRIFFE A–Z',
          pdfPageCount + 1
        );
        gy = MARGIN_TOP;
      }

      drawRoundedRect(ctx, MARGIN_X, gy, CONTENT_W, rowH, 6, i % 2 === 0 ? '#FFFFFF' : '#F8FAFC', '#E2E8F0', 1);

      ctx.save();
      if (lang === 'ar') {
        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText(g.de, MARGIN_X + 14, gy + 22, 230);

        ctx.font = `500 12px ${MONO_FONT}`;
        ctx.fillStyle = '#64748B';
        ctx.fillText(g.lawRef, MARGIN_X + 14, gy + 42, 230);

        ctx.font = `700 15px ${SANS_FONT}`;
        ctx.fillStyle = '#0F172A';
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        ctx.fillText(`${g.id}. ${g.ar}`, PAGE_W - MARGIN_X - 14, gy + 22, 165);
        ctx.restore();

        drawAlignedTextLines(ctx, expLines, PAGE_W - MARGIN_X - 195, gy + 11, 20, `400 13.5px ${SANS_FONT}`, '#334155', 'rtl');
      } else {
        ctx.font = `700 14px ${MONO_FONT}`;
        ctx.fillStyle = '#1E3A5F';
        ctx.direction = 'ltr';
        ctx.textAlign = 'left';
        ctx.fillText(`${g.id}. ${g.de}`, MARGIN_X + 14, gy + 22, 235);

        ctx.font = `500 12px ${MONO_FONT}`;
        ctx.fillStyle = '#64748B';
        ctx.fillText(g.lawRef, MARGIN_X + 14, gy + 42, 235);

        ctx.font = `700 14px ${SANS_FONT}`;
        ctx.fillStyle = '#0F172A';
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        ctx.fillText(g.ar, PAGE_W - MARGIN_X - 14, gy + 26, 155);
        ctx.restore();

        drawAlignedTextLines(ctx, expLines, MARGIN_X + 260, gy + 11, 20, `400 13.5px ${DE_SANS_FONT}`, '#334155', 'ltr');
      }

      gy += rowH + 6;
      completedSteps += 1;
      if (i % 15 === 0) {
        report(
          lang === 'ar'
            ? `إعداد القاموس القانوني (${i + 1}/${GLOSSARY_ENTRIES.length})...`
            : `Erstelle Fachlexikon (${i + 1}/${GLOSSARY_ENTRIES.length})...`
        );
        await new Promise((r) => setTimeout(r, 0));
      }
    }

    commitPage(canvas);
  }

  onProgress?.({
    percent: 100,
    label:
      lang === 'ar'
        ? 'جاري تجهيز ملف PDF للتحميل...'
        : 'PDF-Datei wird für den Download vorbereitet...',
  });
  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);
  const fileSizeMb = (blob.size / (1024 * 1024)).toFixed(2);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  return {
    blobUrl,
    filename,
    pageCount: pdfPageCount,
    fileSizeMb,
  };
}
