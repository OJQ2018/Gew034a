import React from 'react';
import { getLocalizedQuestion } from '../data/questions_de';
import { OUTCOME_LABELS_BILINGUAL, getUiText } from '../i18n/translations';
import { ActorPosture, Language, Question, SceneArchetype, SceneElement } from '../types/encyclopedia';

interface QuestionIllustrationProps {
  question: Question;
  lang?: Language;
  compact?: boolean;
}

const OUTCOME_STYLES: Record<
  Question['visualScene']['outcomeType'],
  { bg: string; border: string; text: string; symbol: string }
> = {
  lawful: {
    bg: '#ECFDF5',
    border: '#059669',
    text: '#065F46',
    symbol: '✓',
  },
  unlawful: {
    bg: '#FEF2F2',
    border: '#DC2626',
    text: '#991B1B',
    symbol: '✕',
  },
  caution: {
    bg: '#FFFBEB',
    border: '#D97706',
    text: '#92400E',
    symbol: '!',
  },
  process: {
    bg: '#EFF6FF',
    border: '#1E3A5F',
    text: '#1E3A5F',
    symbol: '→',
  },
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

function renderActorFigure(posture: ActorPosture, x: number, y: number, flip = false) {
  const dir = flip ? -1 : 1;
  switch (posture) {
    case 'guard':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="22" ry="5" fill="#CBD5E1" opacity="0.7" />
          {/* Legs */}
          <rect x="-11" y="28" width="8" height="34" rx="3" fill="#0F172A" />
          <rect x="3" y="28" width="8" height="34" rx="3" fill="#0F172A" />
          {/* Torso uniform */}
          <path d="M-16,-6 L16,-6 L14,30 L-14,30 Z" fill="#1E3A5F" />
          {/* Security shoulder epaulettes & badge */}
          <rect x="-16" y="-6" width="8" height="4" rx="1" fill="#D97706" />
          <rect x="8" y="-6" width="8" height="4" rx="1" fill="#D97706" />
          <circle cx="7" cy="6" r="3.5" fill="#FBBF24" />
          {/* Arms */}
          <path d={`M${14 * dir},-3 L${23 * dir},16`} stroke="#1E3A5F" strokeWidth="6" strokeLinecap="round" />
          <path d={`M${-14 * dir},-3 L${-20 * dir},18`} stroke="#1E3A5F" strokeWidth="6" strokeLinecap="round" />
          {/* Head & cap */}
          <circle cx="0" cy="-20" r="11" fill="#E2B89B" />
          <path d="M-12,-24 C-12,-33 12,-33 12,-24 Z" fill="#0F172A" />
          <rect x="-14" y="-25" width="28" height="3.5" rx="1.5" fill="#1E3A5F" />
        </g>
      );
    case 'aggressor':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="24" ry="5" fill="#FECACA" opacity="0.8" />
          <path d="M-10,28 L-16,60 M8,28 L17,59" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          <path d="M-15,-5 L15,-5 L12,30 L-12,30 Z" fill="#991B1B" />
          {/* Raised aggressive arm */}
          <path d={`M${-12 * dir},-2 L${-28 * dir},-16`} stroke="#991B1B" strokeWidth="6" strokeLinecap="round" />
          <path d={`M${12 * dir},0 L${20 * dir},18`} stroke="#991B1B" strokeWidth="6" strokeLinecap="round" />
          {/* Motion lines */}
          <path d={`M${-34 * dir},-22 L${-42 * dir},-26 M${-36 * dir},-14 L${-45 * dir},-14`} stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-19" r="11" fill="#E2B89B" />
          <path d="M-7,-22 L-2,-20 M7,-22 L2,-20" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case 'officer':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="22" ry="5" fill="#CBD5E1" opacity="0.7" />
          <rect x="-11" y="28" width="8" height="34" rx="3" fill="#1E293B" />
          <rect x="3" y="28" width="8" height="34" rx="3" fill="#1E293B" />
          <path d="M-16,-6 L16,-6 L14,30 L-14,30 Z" fill="#1D4ED8" />
          <rect x="-14" y="16" width="28" height="4" fill="#0F172A" />
          <polygon points="7,3 10,8 4,8" fill="#FACC15" />
          <circle cx="0" cy="-20" r="11" fill="#E2B89B" />
          <path d="M-13,-24 L13,-24 L10,-34 L-10,-34 Z" fill="#1E3A8A" />
          <rect x="-14" y="-25" width="28" height="3" fill="#0F172A" />
        </g>
      );
    case 'medic':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="22" ry="5" fill="#CBD5E1" opacity="0.7" />
          <rect x="-11" y="28" width="8" height="34" rx="3" fill="#334155" />
          <rect x="3" y="28" width="8" height="34" rx="3" fill="#334155" />
          <path d="M-16,-6 L16,-6 L14,30 L-14,30 Z" fill="#DC2626" />
          <rect x="-14" y="8" width="28" height="5" fill="#FEF08A" />
          <circle cx="0" cy="-20" r="11" fill="#E2B89B" />
          {/* First aid kit */}
          <rect x="15" y="12" width="16" height="13" rx="2" fill="#FFFFFF" stroke="#DC2626" strokeWidth="1.5" />
          <path d="M23,15 V22 M19.5,18.5 H26.5" stroke="#DC2626" strokeWidth="2" />
        </g>
      );
    case 'victim':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="22" ry="5" fill="#CBD5E1" opacity="0.7" />
          <rect x="-10" y="28" width="7" height="33" rx="3" fill="#475569" />
          <rect x="3" y="28" width="7" height="33" rx="3" fill="#475569" />
          <path d="M-14,-6 L14,-6 L12,30 L-12,30 Z" fill="#64748B" />
          {/* Protective raised hands */}
          <path d={`M${-13 * dir},0 L${-20 * dir},-12 M${13 * dir},0 L${20 * dir},-10`} stroke="#64748B" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="0" cy="-19" r="10.5" fill="#E2B89B" />
        </g>
      );
    case 'inspector':
    case 'manager':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="22" ry="5" fill="#CBD5E1" opacity="0.7" />
          <rect x="-10" y="28" width="7" height="34" rx="3" fill="#1E293B" />
          <rect x="3" y="28" width="7" height="34" rx="3" fill="#1E293B" />
          <path d="M-15,-6 L15,-6 L13,30 L-13,30 Z" fill="#334155" />
          <polygon points="0,-6 -4,10 0,16 4,10" fill="#E2E8F0" />
          <rect x="13" y="4" width="13" height="17" rx="1.5" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
          <line x1="16" y1="9" x2="23" y2="9" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="16" y1="13" x2="23" y2="13" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="0" cy="-19" r="10.5" fill="#E2B89B" />
        </g>
      );
    case 'system':
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="24" ry="5" fill="#CBD5E1" opacity="0.6" />
          <rect x="-24" y="-22" width="48" height="70" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <rect x="-17" y="-14" width="34" height="22" rx="3" fill="#1E3A5F" />
          <path d="M-12,-3 L-4,-8 L4,1 L12,-9" stroke="#38BDF8" strokeWidth="2" fill="none" />
          <circle cx="-10" cy="20" r="3" fill="#10B981" />
          <circle cx="0" cy="20" r="3" fill="#F59E0B" />
          <circle cx="10" cy="20" r="3" fill="#EF4444" />
          <rect x="-15" y="30" width="30" height="8" rx="2" fill="#334155" />
        </g>
      );
    case 'citizen':
    default:
      return (
        <g transform={`translate(${x}, ${y})`}>
          <ellipse cx="0" cy="64" rx="21" ry="5" fill="#CBD5E1" opacity="0.7" />
          <rect x="-10" y="28" width="7" height="34" rx="3" fill="#334155" />
          <rect x="3" y="28" width="7" height="34" rx="3" fill="#334155" />
          <path d="M-14,-6 L14,-6 L12,30 L-12,30 Z" fill="#475569" />
          <path d={`M${13 * dir},-2 L${19 * dir},17 M${-13 * dir},-2 L${-19 * dir},17`} stroke="#475569" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="0" cy="-19" r="10.5" fill="#E2B89B" />
        </g>
      );
  }
}

function renderArchetypeBackdrop(archetype: SceneArchetype, variant: number) {
  const accentShift = (variant % 3) * 14;
  switch (archetype) {
    case 'self_defense':
    case 'necessity':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
          {/* Proportionality arc / defense shield */}
          <path d="M225,74 C265,64 295,64 335,74" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="5 4" fill="none" />
          <path d="M280,82 L302,92 L298,120 C295,134 280,142 280,142 C280,142 265,134 262,120 L258,92 Z" fill="#EFF6FF" stroke="#1E3A5F" strokeWidth="2" />
          <path d="M273,112 L279,118 L290,104" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'fire_safety':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#FFFBEB" stroke="#FDE68A" />
          {/* Fire triangle in center */}
          <polygon points="280,68 324,142 236,142" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <path d="M280,92 C289,106 293,116 286,127 C283,132 277,132 274,127 C268,118 273,104 280,92 Z" fill="#EF4444" />
          <path d="M280,106 C284,114 285,120 282,126 C280,128 278,128 277,125 C275,120 277,112 280,106 Z" fill="#FACC15" />
          {/* Exit sign */}
          <rect x="445" y="58" width="76" height="22" rx="3" fill="#059669" />
          <text x="483" y="73" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">NOTAUSGANG</text>
        </g>
      );
    case 'data_privacy':
    case 'security_tech':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F1F5F9" stroke="#CBD5E1" />
          {/* CCTV cone */}
          <rect x="256" y="60" width="44" height="16" rx="3" fill="#1E293B" />
          <polygon points="278,76 205,160 351,160" fill="#38BDF8" opacity="0.16" />
          <line x1="278" y1="76" x2="205" y2="160" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="278" y1="76" x2="351" y2="160" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="246" y="138" width="64" height="20" rx="3" fill="#FFFFFF" stroke="#0284C7" />
          <text x="278" y="151" textAnchor="middle" fill="#0369A1" fontSize="9" fontWeight="700">DSGVO / CCTV</text>
        </g>
      );
    case 'house_right':
    case 'access_control':
    case 'detention':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Property threshold / Turnstile divider */}
          <line x1="280" y1="58" x2="280" y2="196" stroke="#1E3A5F" strokeWidth="2.5" strokeDasharray="6 4" />
          <rect x="242" y="64" width="76" height="20" rx="3" fill="#1E3A5F" />
          <text x="280" y="77" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">GRENZE / SCHWELLE</text>
          <rect x="268" y="148" width="24" height="36" rx="2" fill="#94A3B8" />
          <line x1="246" y1="158" x2="314" y2="158" stroke="#D97706" strokeWidth="3" />
        </g>
      );
    case 'first_aid':
    case 'accident_prev':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F0FDF4" stroke="#BBF7D0" />
          {/* Medical cross / heart pulse */}
          <rect x="260" y="72" width="40" height="40" rx="6" fill="#059669" />
          <path d="M280,81 V103 M269,92 H291" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M210,136 L245,136 L256,118 L268,150 L282,124 L293,136 L350,136" stroke="#059669" strokeWidth="2" fill="none" />
        </g>
      );
    case 'constitutional':
    case 'trade_law':
    case 'rights_duties':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Architectural columns / scales */}
          <rect x={232 + accentShift * 0.2} y="66" width="96" height="10" rx="2" fill="#1E3A5F" />
          <rect x="244" y="76" width="12" height="62" fill="#CBD5E1" />
          <rect x="274" y="76" width="12" height="62" fill="#CBD5E1" />
          <rect x="304" y="76" width="12" height="62" fill="#CBD5E1" />
          <rect x="226" y="138" width="108" height="10" rx="2" fill="#1E3A5F" />
        </g>
      );
    case 'communication':
    case 'conflict':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Two dialogue speech bubbles + calm distance zone */}
          <rect x="195" y="68" width="80" height="30" rx="6" fill="#EFF6FF" stroke="#1E3A5F" strokeWidth="1.5" />
          <line x1="207" y1="80" x2="263" y2="80" stroke="#1E3A5F" strokeWidth="2" />
          <line x1="207" y1="88" x2="249" y2="88" stroke="#64748B" strokeWidth="2" />
          <rect x="285" y="96" width="80" height="30" rx="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          <line x1="297" y1="108" x2="353" y2="108" stroke="#D97706" strokeWidth="2" />
          <line x1="297" y1="116" x2="338" y2="116" stroke="#92400E" strokeWidth="2" />
          {/* Arm-length safety distance indicator */}
          <line x1="185" y1="142" x2="375" y2="142" stroke="#64748B" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="280" y="137" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="IBM Plex Mono, monospace">
            SICHERHEITSABSTAND &gt; 1.5m
          </text>
        </g>
      );
    case 'emergency':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#FEF2F2" stroke="#FECACA" />
          {/* Warning beacon & evacuation corridor */}
          <polygon points="280,64 316,124 244,124" fill="#FEF3C7" stroke="#DC2626" strokeWidth="2.2" />
          <rect x="278" y="82" width="4" height="22" rx="2" fill="#DC2626" />
          <circle cx="280" cy="113" r="2.8" fill="#DC2626" />
          <rect x="234" y="132" width="92" height="18" rx="3" fill="#0F172A" />
          <text x="280" y="144" textAnchor="middle" fill="#FEF08A" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
            NOTRUF 110 / 112
          </text>
        </g>
      );
    case 'weapons_exam':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Locked transport box / IHK exam matrix */}
          <rect x="230" y="66" width="100" height="62" rx="6" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="2" />
          <rect x="230" y="66" width="100" height="18" rx="4" fill="#1E3A5F" />
          <text x="280" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace">
            WaffG / IHK §34a
          </text>
          <circle cx="280" cy="102" r="10" fill="#EFF6FF" stroke="#1E3A5F" strokeWidth="1.5" />
          <path d="M276,102 L279,105 L285,99" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" />
          <line x1="244" y1="119" x2="316" y2="119" stroke="#CBD5E1" strokeWidth="2" />
        </g>
      );
    case 'guard_tasks':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Perimeter building & patrol checkpoints */}
          <rect x="232" y="66" width="96" height="72" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          <rect x="244" y="78" width="16" height="16" fill="#FFFFFF" stroke="#94A3B8" />
          <rect x="272" y="78" width="16" height="16" fill="#FFFFFF" stroke="#94A3B8" />
          <rect x="300" y="78" width="16" height="16" fill="#FFFFFF" stroke="#94A3B8" />
          <rect x="268" y="108" width="24" height="30" fill="#1E3A5F" />
          <circle cx="222" cy="102" r="6" fill="#059669" />
          <circle cx="338" cy="102" r="6" fill="#059669" />
        </g>
      );
    case 'civil_property':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          {/* Ownership vs Possession diagram */}
          <rect x="208" y="70" width="64" height="58" rx="5" fill="#EFF6FF" stroke="#1E3A5F" strokeWidth="1.8" />
          <text x="240" y="94" textAnchor="middle" fill="#1E3A5F" fontSize="9" fontWeight="700">Eigentum</text>
          <text x="240" y="109" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="IBM Plex Mono, monospace">§ 903 BGB</text>
          <rect x="288" y="70" width="64" height="58" rx="5" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
          <text x="320" y="94" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="700">Besitz</text>
          <text x="320" y="109" textAnchor="middle" fill="#78350F" fontSize="8" fontFamily="IBM Plex Mono, monospace">§ 854 BGB</text>
        </g>
      );
    case 'criminal_offense':
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#FEF2F2" stroke="#E2E8F0" />
          {/* Penal Code 3-stage analysis: Tatbestand -> Rechtswidrigkeit -> Schuld */}
          <rect x="204" y="70" width="152" height="18" rx="3" fill="#0F172A" />
          <text x="280" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">1. TATBESTAND (StGB)</text>
          <rect x="204" y="93" width="152" height="18" rx="3" fill="#991B1B" />
          <text x="280" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">2. RECHTSWIDRIGKEIT</text>
          <rect x="204" y="116" width="152" height="18" rx="3" fill="#475569" />
          <text x="280" y="128" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700">3. SCHULD</text>
        </g>
      );
    default:
      return (
        <g>
          <rect x="20" y="50" width="520" height="156" rx="8" fill="#F8FAFC" stroke="#E2E8F0" />
          <circle cx="280" cy="112" r="36" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          <path d="M220,112 H340" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
      );
  }
}

export const QuestionIllustration: React.FC<QuestionIllustrationProps> = ({
  question,
  lang = 'ar',
  compact = false,
}) => {
  const { visualScene } = question;
  const outcome = OUTCOME_STYLES[visualScene.outcomeType];
  const outcomeMeta = OUTCOME_LABELS_BILINGUAL[visualScene.outcomeType];
  const ui = getUiText(lang);
  const localized = getLocalizedQuestion(question, lang);
  const elements = visualScene.elements.slice(0, 4);

  return (
    <figure
      className="rounded-lg border border-slate-200 bg-white overflow-hidden print-avoid-break"
      aria-label={localized.sceneTitle}
    >
      {/* Illustration Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-legal-mono font-semibold text-[#1E3A5F] tabular-nums shrink-0">
            FIG. {String(question.id).padStart(3, '0')}
          </span>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <span className="font-semibold text-slate-800 truncate">
            {localized.sceneTitle}
          </span>
        </div>
        <span dir="ltr" className="font-legal-mono text-[11px] text-slate-600 shrink-0">
          {visualScene.lawBadge}
        </span>
      </div>

      {/* Bespoke Scenario Vector Diagram */}
      <div className={compact ? 'p-2' : 'p-3'}>
        <svg
          viewBox="0 0 560 288"
          className="w-full h-auto block"
          role="img"
          aria-label={`${localized.sceneTitle} - ${visualScene.lawBadge}`}
        >
          {/* Background frame */}
          <rect x="0" y="0" width="560" height="288" fill="#FFFFFF" />

          {/* Top German Scene Subtitle Strip */}
          <rect x="20" y="10" width="520" height="30" rx="5" fill="#0F172A" />
          <text
            x="280"
            y="29"
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize="11.5"
            fontFamily="IBM Plex Mono, monospace"
            fontWeight="600"
          >
            {visualScene.sceneTitleDe}
          </text>

          {/* Archetype Architectural Backdrop */}
          {renderArchetypeBackdrop(visualScene.archetype, question.id)}

          {/* Left Actor */}
          {renderActorFigure(visualScene.leftActor.posture, 108, 104, false)}
          <rect x="34" y="176" width="148" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
          {lang === 'ar' ? (
            <>
              <text x="108" y="188" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="700">
                {visualScene.leftActor.roleAr}
              </text>
              <text
                x="108"
                y="198"
                textAnchor="middle"
                fill="#475569"
                fontSize="8"
                fontFamily="IBM Plex Mono, monospace"
              >
                {visualScene.leftActor.roleDe}
              </text>
            </>
          ) : (
            <text
              x="108"
              y="193"
              textAnchor="middle"
              fill="#0F172A"
              fontSize="9.5"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="700"
            >
              {visualScene.leftActor.roleDe}
            </text>
          )}

          {/* Right Actor */}
          {renderActorFigure(visualScene.rightActor.posture, 452, 104, true)}
          <rect x="378" y="176" width="148" height="26" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
          {lang === 'ar' ? (
            <>
              <text x="452" y="188" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="700">
                {visualScene.rightActor.roleAr}
              </text>
              <text
                x="452"
                y="198"
                textAnchor="middle"
                fill="#475569"
                fontSize="8"
                fontFamily="IBM Plex Mono, monospace"
              >
                {visualScene.rightActor.roleDe}
              </text>
            </>
          ) : (
            <text
              x="452"
              y="193"
              textAnchor="middle"
              fill="#0F172A"
              fontSize="9.5"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="700"
            >
              {visualScene.rightActor.roleDe}
            </text>
          )}

          {/* Action Vector Box between Actors */}
          <rect x="190" y="162" width="180" height="36" rx="6" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="1.5" />
          {lang === 'ar' ? (
            <>
              <text x="280" y="177" textAnchor="middle" fill="#1E3A5F" fontSize="9.5" fontWeight="700">
                {visualScene.actionLabelAr}
              </text>
              <text
                x="280"
                y="190"
                textAnchor="middle"
                fill="#475569"
                fontSize="8"
                fontFamily="IBM Plex Mono, monospace"
              >
                {visualScene.actionLabelDe}
              </text>
            </>
          ) : (
            <text
              x="280"
              y="184"
              textAnchor="middle"
              fill="#1E3A5F"
              fontSize="9.5"
              fontFamily="IBM Plex Mono, monospace"
              fontWeight="700"
            >
              {visualScene.actionLabelDe}
            </text>
          )}

          {/* Directional flow arrows */}
          <line x1="164" y1="130" x2="188" y2="130" stroke="#1E3A5F" strokeWidth="2" />
          <line x1="372" y1="130" x2="396" y2="130" stroke="#1E3A5F" strokeWidth="2" />

          {/* Scenario Elements Strip (3-4 distinct labeled factors) */}
          {elements.map((el, idx) => {
            const count = elements.length;
            const totalW = 520;
            const gap = 8;
            const boxW = (totalW - gap * (count - 1)) / count;
            const bx = 20 + idx * (boxW + gap);
            const c = ELEMENT_COLORS[el.status];
            return (
              <g key={`${question.id}-el-${idx}`}>
                <rect
                  x={bx}
                  y="214"
                  width={boxW}
                  height="38"
                  rx="4"
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth="1.2"
                />
                {lang === 'ar' ? (
                  <>
                    <text
                      x={bx + boxW / 2}
                      y="229"
                      textAnchor="middle"
                      fill={c.text}
                      fontSize="8.8"
                      fontWeight="700"
                    >
                      {`${c.mark} ${el.ar}`}
                    </text>
                    <text
                      x={bx + boxW / 2}
                      y="244"
                      textAnchor="middle"
                      fill="#334155"
                      fontSize="7.6"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {el.de}
                    </text>
                  </>
                ) : (
                  <text
                    x={bx + boxW / 2}
                    y="236"
                    textAnchor="middle"
                    fill={c.text}
                    fontSize="8.4"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="700"
                  >
                    {`${c.mark} ${el.de}`}
                  </text>
                )}
              </g>
            );
          })}

          {/* Legal Outcome Footer Strip */}
          <rect
            x="20"
            y="258"
            width="520"
            height="24"
            rx="4"
            fill={outcome.bg}
            stroke={outcome.border}
            strokeWidth="1.2"
          />
          <text
            x="280"
            y="273"
            textAnchor="middle"
            fill={outcome.text}
            fontSize="9.5"
            fontWeight="700"
          >
            {lang === 'ar'
              ? `${outcome.symbol} ${outcomeMeta.ar} — ${localized.outcomeText}`
              : `${outcome.symbol} ${outcomeMeta.de} — ${visualScene.lawBadge}`}
          </text>
        </svg>
      </div>

      {/* Descriptive Caption */}
      <figcaption className="px-3 py-2 bg-slate-50/70 border-t border-slate-100 text-[11.5px] text-slate-600 leading-relaxed">
        <span className="font-semibold text-slate-800">{ui.illustrationCaptionLabel}</span>
        {localized.illustrationDescription}
      </figcaption>
    </figure>
  );
};
