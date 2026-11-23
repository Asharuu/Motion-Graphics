/**
 * General-purpose design, format, and spring tokens for Remotion motion graphics.
 * Copy into `src/theme.ts` and pick a VisualPresetId matching your project.
 */

export const FORMATS = {
  desktop16x9: { width: 1920, height: 1080, fps: 30 },
  vertical9x16: { width: 1080, height: 1920, fps: 30 },
  square1x1: { width: 1080, height: 1080, fps: 30 },
} as const;

export type VisualPresetId =
  | 'light-studio'
  | 'dark-saas'
  | 'editorial-paper'
  | 'bold-brand'
  | 'clean-data';

export interface VisualPreset {
  id: VisualPresetId;
  backgroundMode: 'mesh' | 'grid' | 'solid';
  bgCanvas: string;
  meshPrimary: string;
  meshSecondary: string;
  surfaceBg: string;
  surfaceBorder: string;
  surfaceShadow: string;
  barBg: string;
  barBorder: string;
  inkPrimary: string;
  inkSecondary: string;
  inkMuted: string;
  accentPrimary: string;
  accentSuccess: string;
  accentAlert: string;
  captionBg: string;
  captionBorder: string;
  captionText: string;
}

export const VISUAL_PRESETS: Record<VisualPresetId, VisualPreset> = {
  'light-studio': {
    id: 'light-studio',
    backgroundMode: 'mesh',
    bgCanvas: '#F7F8FC',
    meshPrimary: 'rgba(147, 197, 253, 0.28)',
    meshSecondary: 'rgba(196, 181, 253, 0.24)',
    surfaceBg: '#FFFFFF',
    surfaceBorder: 'rgba(15, 23, 42, 0.08)',
    surfaceShadow: '0 24px 60px -14px rgba(15, 23, 42, 0.11)',
    barBg: 'rgba(255, 255, 255, 0.80)',
    barBorder: 'rgba(15, 23, 42, 0.07)',
    inkPrimary: '#0F172A',
    inkSecondary: '#475569',
    inkMuted: '#94A3B8',
    accentPrimary: '#2563EB',
    accentSuccess: '#10B981',
    accentAlert: '#E11D48',
    captionBg: 'rgba(17, 20, 28, 0.93)',
    captionBorder: 'rgba(255, 255, 255, 0.12)',
    captionText: '#F8FAFC',
  },
  'dark-saas': {
    id: 'dark-saas',
    backgroundMode: 'grid',
    bgCanvas: '#090B10',
    meshPrimary: 'rgba(56, 189, 248, 0.14)',
    meshSecondary: 'rgba(16, 185, 129, 0.10)',
    surfaceBg: '#111520',
    surfaceBorder: 'rgba(255, 255, 255, 0.09)',
    surfaceShadow: '0 28px 70px -16px rgba(0, 0, 0, 0.55)',
    barBg: 'rgba(17, 21, 32, 0.82)',
    barBorder: 'rgba(255, 255, 255, 0.08)',
    inkPrimary: '#F8FAFC',
    inkSecondary: '#CBD5E1',
    inkMuted: '#64748B',
    accentPrimary: '#38BDF8',
    accentSuccess: '#10B981',
    accentAlert: '#EF4444',
    captionBg: 'rgba(248, 250, 252, 0.94)',
    captionBorder: 'rgba(15, 23, 42, 0.10)',
    captionText: '#0F172A',
  },
  'editorial-paper': {
    id: 'editorial-paper',
    backgroundMode: 'solid',
    bgCanvas: '#FAF7F2',
    meshPrimary: 'transparent',
    meshSecondary: 'transparent',
    surfaceBg: '#FFFFFF',
    surfaceBorder: 'rgba(28, 25, 23, 0.14)',
    surfaceShadow: '0 16px 40px -14px rgba(28, 25, 23, 0.10)',
    barBg: 'rgba(250, 247, 242, 0.88)',
    barBorder: 'rgba(28, 25, 23, 0.12)',
    inkPrimary: '#1C1917',
    inkSecondary: '#57534E',
    inkMuted: '#A8A29E',
    accentPrimary: '#C2410C',
    accentSuccess: '#15803D',
    accentAlert: '#B91C1C',
    captionBg: '#1C1917',
    captionBorder: 'rgba(255, 255, 255, 0.12)',
    captionText: '#FAF7F2',
  },
  'bold-brand': {
    id: 'bold-brand',
    backgroundMode: 'solid',
    bgCanvas: '#111827',
    meshPrimary: 'rgba(250, 204, 21, 0.16)',
    meshSecondary: 'rgba(249, 115, 22, 0.12)',
    surfaceBg: '#1F2937',
    surfaceBorder: 'rgba(255, 255, 255, 0.12)',
    surfaceShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.50)',
    barBg: 'rgba(17, 24, 39, 0.85)',
    barBorder: 'rgba(255, 255, 255, 0.10)',
    inkPrimary: '#FFFFFF',
    inkSecondary: '#E5E7EB',
    inkMuted: '#9CA3AF',
    accentPrimary: '#FACC15',
    accentSuccess: '#22C55E',
    accentAlert: '#FB7185',
    captionBg: '#FACC15',
    captionBorder: 'rgba(17, 24, 39, 0.15)',
    captionText: '#111827',
  },
  'clean-data': {
    id: 'clean-data',
    backgroundMode: 'grid',
    bgCanvas: '#F8FAFC',
    meshPrimary: 'rgba(79, 70, 229, 0.08)',
    meshSecondary: 'rgba(13, 148, 136, 0.08)',
    surfaceBg: '#FFFFFF',
    surfaceBorder: 'rgba(15, 23, 42, 0.08)',
    surfaceShadow: '0 18px 44px -12px rgba(15, 23, 42, 0.08)',
    barBg: 'rgba(255, 255, 255, 0.85)',
    barBorder: 'rgba(15, 23, 42, 0.06)',
    inkPrimary: '#0F172A',
    inkSecondary: '#475569',
    inkMuted: '#94A3B8',
    accentPrimary: '#4F46E5',
    accentSuccess: '#0D9488',
    accentAlert: '#F43F5E',
    captionBg: 'rgba(15, 23, 42, 0.92)',
    captionBorder: 'rgba(255, 255, 255, 0.10)',
    captionText: '#F8FAFC',
  },
};

export const SPRINGS = {
  snappyUI: { damping: 18, stiffness: 240, mass: 0.8 },
  bouncyPop: { damping: 11, stiffness: 260, mass: 0.75 },
  gentleSlide: { damping: 24, stiffness: 140, mass: 1.0 },
  overshootPunch: { damping: 9, stiffness: 180, mass: 1.1 },
  microTap: { damping: 15, stiffness: 300, mass: 0.6 },
} as const;

export interface CaptionSegment {
  id: string;
  startFrame: number;
  endFrame: number;
  text: string;
  /** Optional extra bottom offset (e.g., when a bottom Dock or mobile nav is visible). */
  bottomOffsetPx?: number;
}

export interface SfxCue {
  id: string;
  src: string;
  fromFrame: number;
  volume?: number;
  playbackRate?: number;
}
