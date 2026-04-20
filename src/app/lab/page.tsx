'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState, useCallback } from 'react';
import Tunnel from '@/components/lab/Tunnel';
import TunnelCards from '@/components/lab/TunnelCards';
import TunnelNav from '@/components/lab/TunnelNav';
import ErrorBoundary from '@/components/lab/ErrorBoundary';
import IgrisScene from '@/components/lab/IgrisScene';
import { COLORS, A11Y, SPACING } from '@/components/lab/constants';
import '@/components/lab/lab-tokens.css';
import '@/components/lab/lab-styles.css';

export default function LabPage() {
  const cameraZRef = useRef(0);
  const pausedRef = useRef(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [introVisible, setIntroVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<'igris' | 'warpout' | 'tunnel'>('igris');
  const [igrisProgress, setIgrisProgress] = useState(0);

  // Accessibility
  useEffect(() => {
    const mq = window.matchMedia(A11Y.reducedMotionQuery);
    setPrefersReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  // Focus trap during intro
  useEffect(() => {
    document.body.style.pointerEvents = introVisible ? 'none' : 'auto';
    return () => { document.body.style.pointerEvents = 'auto'; };
  }, [introVisible]);

  // Auto-dismiss intro AFTER loading finishes
  useEffect(() => {
    if (!isLoading && introVisible) {
      const f = setTimeout(() => setIntroOpacity(0), 2600);
      const h = setTimeout(() => setIntroVisible(false), 3600);
      return () => { clearTimeout(f); clearTimeout(h); };
    }
  }, [isLoading, introVisible]);

  const handleScrollProgress = useCallback((p: number) => {
    setIgrisProgress(p);
  }, []);

  const handleScrollComplete = useCallback(() => {
    setPhase('warpout');
    setTimeout(() => setPhase('tunnel'), 800);
  }, []);

  const handleLoadComplete = useCallback(() => {
    // Add a slight delay to ensure first frame is rendered
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  // ── Derived text styles (smooth because igrisProgress is spring-damped) ──
  const textOpacity = Math.max(0, 1 - igrisProgress * 3);
  const textY = igrisProgress * -60;
  const hintOpacity = Math.max(0, 1 - igrisProgress * 6);
  const barHeight = Math.min(100, igrisProgress * 100);
  const dividerScale = Math.max(0, 1 - igrisProgress * 2.5);

  return (
    <ErrorBoundary>
      {isLoading && (
        <div className="skeleton-loader" aria-busy="true" aria-label="Loading lab experience">
          <div className="skeleton-spinner" />
        </div>
      )}

      {/* ═══ IGRIS PHASE ═══ */}
      {phase === 'igris' && (
        <>
          <IgrisScene 
            onScrollComplete={handleScrollComplete} 
            onScrollProgress={handleScrollProgress}
            onLoadComplete={handleLoadComplete}
          />

          {/* Hero overlay */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 110,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 6vw',
              pointerEvents: 'none',
              opacity: textOpacity,
              transform: `translate3d(0, ${textY}px, 0)`,
              willChange: 'transform, opacity',
            }}
          >
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B8960C',
              marginBottom: '1.8rem',
            }}>
              SWARUP SHEKHAR
            </p>

            <h1 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.92,
              color: '#F5F0E8',
              letterSpacing: '-0.025em',
              margin: '0 0 2.5rem 0',
            }}>
              THE LAB
            </h1>

            <div style={{
              width: '35%',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(184,150,12,0.35), rgba(184,150,12,0.55), transparent)',
              marginBottom: '2rem',
              transform: `scaleX(${dividerScale})`,
              transformOrigin: 'left',
              willChange: 'transform',
            }} />

            <div style={{
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
            }}>
              <p style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.75)',
              }}>
                Most of what I&apos;ve built didn&apos;t come from a roadmap.
              </p>
              <p style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.6)',
              }}>
                It came from sitting with a broken workflow long enough
                to see exactly where it failed — and then refusing to ship
                until it didn&apos;t anymore.
              </p>
              <p style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.82rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.85)',
              }}>
                This is where that process lives.
              </p>
              <p style={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(245,240,232,0.55)',
              }}>
                Each project in here represents a different kind of problem
                I couldn&apos;t walk away from.
              </p>
            </div>

            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.28em',
              color: 'rgba(184,150,12,0.35)',
              textTransform: 'uppercase',
              marginTop: '2.5rem',
              opacity: hintOpacity,
              willChange: 'opacity',
            }}>
              ↓ Scroll to enter.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{
            position: 'fixed',
            right: '1.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1.5px',
            height: '100px',
            background: 'rgba(184,150,12,0.1)',
            zIndex: 120,
            borderRadius: '1px',
          }}>
            <div style={{
              width: '1.5px',
              height: `${barHeight}%`,
              background: 'rgba(217,119,6,0.55)',
              borderRadius: '1px',
              willChange: 'height',
            }} />
          </div>
        </>
      )}

      {/* ═══ WARP-OUT PHASE ═══ */}
      {phase === 'warpout' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'warpFlash 0.8s ease-out forwards',
        }}>
          <div style={{
            width: '60px',
            height: '1px',
            background: 'rgba(217,119,6,0.6)',
            animation: 'warpLine 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }} />
        </div>
      )}

      {/* ═══ TUNNEL PHASE ═══ */}
      {phase === 'tunnel' && (
        <>
          <Tunnel cameraZRef={cameraZRef} pausedRef={pausedRef} />
          <TunnelCards cameraZRef={cameraZRef} pausedRef={pausedRef} />
          <TunnelNav cameraZRef={cameraZRef} />
        </>
      )}

      <div className="vignette" />

      {/* Intro overlay */}
      {introVisible && (
        <div
          className="introOverlay"
          style={{
            '--intro-opacity': introOpacity,
            transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
          } as React.CSSProperties}
          aria-hidden={!introVisible}
        >
          <div className={`scanLine ${!prefersReducedMotion ? 'scanLine--animate' : ''}`} />
          <p className="text-mono-xs">Swarup Shekhar</p>
          <div style={{
            width: '120px',
            height: '1px',
            background: COLORS.alpha.border,
            margin: `0 0 ${SPACING.md} 0`,
          }} />
          <h1 className="text-display-hero">The Lab.</h1>
          <p className="text-sans-caption">Three systems. One engineer.</p>
        </div>
      )}

      <style>{`
        @keyframes scanDown {
          from { transform: translateY(-100%) translateX(-50%); }
          to   { transform: translateY(100%) translateX(-50%); }
        }
        @keyframes warpFlash {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes warpLine {
          0%   { width: 0; opacity: 0; }
          40%  { width: 80px; opacity: 1; }
          100% { width: 200px; opacity: 0; }
        }
      `}</style>
    </ErrorBoundary>
  );
}

