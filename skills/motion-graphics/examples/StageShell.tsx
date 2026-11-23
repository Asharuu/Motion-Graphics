import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  SPRINGS,
  VISUAL_PRESETS,
  type CaptionSegment,
  type VisualPresetId,
} from './motion-tokens';

export interface TopBarConfig {
  title: string;
  menuItems?: string[];
  statusLabel?: string;
  contextBadge?: string;
  rightText?: string;
}

export interface StageShellProps {
  presetId?: VisualPresetId;
  fontSans?: string;
  fontMono?: string;
  topBar?: TopBarConfig;
  captions?: CaptionSegment[];
  defaultCaptionBottomPx?: number;
  children: React.ReactNode;
}

/**
 * Reusable Remotion canvas wrapper supporting all 5 VisualPresetId aesthetics,
 * deterministic animated backgrounds, optional top bar, and floating kinetic captions.
 */
export const StageShell: React.FC<StageShellProps> = ({
  presetId = 'light-studio',
  fontSans = 'system-ui, -apple-system, sans-serif',
  fontMono = 'ui-monospace, SFMono-Regular, monospace',
  topBar,
  captions = [],
  defaultCaptionBottomPx = 32,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = VISUAL_PRESETS[presetId];

  // Deterministic ambient background motion driven purely by useCurrentFrame().
  const blob1X = Math.sin(frame * 0.015) * 85;
  const blob1Y = Math.cos(frame * 0.012) * 50;
  const blob2X = Math.cos(frame * 0.013) * 95;
  const blob2Y = Math.sin(frame * 0.016) * 55;

  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame,
  );
  const captionIn = activeCaption
    ? spring({
        frame: frame - activeCaption.startFrame,
        fps,
        config: SPRINGS.snappyUI,
      })
    : 0;
  const captionOut = activeCaption
    ? interpolate(
        frame,
        [activeCaption.endFrame - 6, activeCaption.endFrame],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 0;

  const topOffset = topBar ? 38 : 0;
  const captionBottom = activeCaption?.bottomOffsetPx ?? defaultCaptionBottomPx;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bgCanvas,
        fontFamily: fontSans,
        color: theme.inkPrimary,
        overflow: 'hidden',
      }}
    >
      {/* Background Layer */}
      {theme.backgroundMode === 'mesh' ? (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: -180 + blob1Y,
              left: -140 + blob1X,
              width: 940,
              height: 940,
              borderRadius: '50%',
              background: theme.meshPrimary,
              filter: 'blur(120px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -220 + blob2Y,
              right: -140 + blob2X,
              width: 980,
              height: 980,
              borderRadius: '50%',
              background: theme.meshSecondary,
              filter: 'blur(130px)',
            }}
          />
        </div>
      ) : null}

      {theme.backgroundMode === 'grid' ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `linear-gradient(${theme.barBorder} 1px, transparent 1px), linear-gradient(90deg, ${theme.barBorder} 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
          }}
        />
      ) : null}

      {/* Optional Top Context Bar */}
      {topBar ? (
        <header
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: topOffset,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 26px',
            backgroundColor: theme.barBg,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${theme.barBorder}`,
            fontSize: 14,
            zIndex: 40,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              {topBar.title}
            </span>
            {topBar.menuItems ? (
              <nav style={{ display: 'flex', gap: 14, color: theme.inkSecondary, fontWeight: 500 }}>
                {topBar.menuItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </nav>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: fontMono,
              fontSize: 13,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {topBar.statusLabel ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: theme.accentSuccess,
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: theme.accentSuccess,
                  }}
                />
                {topBar.statusLabel}
              </span>
            ) : null}
            {topBar.contextBadge ? (
              <span style={{ color: theme.inkSecondary }}>{topBar.contextBadge}</span>
            ) : null}
            {topBar.rightText ? (
              <span style={{ fontWeight: 700 }}>{topBar.rightText}</span>
            ) : null}
          </div>
        </header>
      ) : null}

      {/* Main Stage */}
      <main
        style={{
          position: 'absolute',
          top: topOffset,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </main>

      {/* Floating Kinetic Caption Pill */}
      {activeCaption ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: captionBottom,
            transform: `translate(-50%, ${interpolate(captionIn, [0, 1], [12, 0])}px) scale(${interpolate(captionIn, [0, 1], [0.95, 1])})`,
            opacity: captionIn * captionOut,
            backgroundColor: theme.captionBg,
            border: `1px solid ${theme.captionBorder}`,
            boxShadow: '0 14px 36px rgba(0, 0, 0, 0.22)',
            color: theme.captionText,
            borderRadius: 9999,
            padding: '13px 28px',
            maxWidth: '84%',
            fontSize: 22,
            fontWeight: 600,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            zIndex: 50,
          }}
        >
          {activeCaption.text}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
