'use client';

import { useEffect, useRef, useState } from 'react';
import { CARD_DATA } from './Tunnel';
import { Z_INDEX, COLORS, FONTS, PERF, SPACING, A11Y } from './constants';

interface TunnelNavProps {
  cameraZRef: React.MutableRefObject<number>;
}

export default function TunnelNav({ cameraZRef }: TunnelNavProps) {
  const [velocity, setVelocity] = useState('1.0');
  const [activeProject, setActiveProject] = useState(-1);
  const rafRef = useRef<number>(0);
  const jumpTargetRef = useRef<number | null>(null);
  const jumpStartRef = useRef<number>(0);
  const jumpStartZRef = useRef<number>(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        resetView();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeProject]);

  const navigatePrev = () => {
    if (activeProject > 0) {
      jumpTo(CARD_DATA[activeProject - 1].z);
    }
  };

  const navigateNext = () => {
    if (activeProject < CARD_DATA.length - 1) {
      jumpTo(CARD_DATA[activeProject + 1].z);
    }
  };

  const resetView = () => {
    jumpTargetRef.current = 0;
    jumpStartRef.current = performance.now();
    jumpStartZRef.current = cameraZRef.current;
  };

  useEffect(() => {
    let lastZ = cameraZRef.current;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const cz = cameraZRef.current;

      // Calculate velocity from delta Z
      const delta = Math.abs(cz - lastZ);
      const velMultiplier = delta / PERF.baseSpeed;
      setVelocity(velMultiplier.toFixed(1));
      lastZ = cz;

      // Determine active project
      let active = -1;
      CARD_DATA.forEach((card, i) => {
        if (Math.abs(cz - card.z) < 25) active = i;
      });
      setActiveProject(active);

      // Handle jump (smooth lerp to card Z)
      if (jumpTargetRef.current !== null) {
        const now = performance.now();
        const elapsed = (now - jumpStartRef.current) / PERF.jumpDuration; // 2s duration
        const t = Math.min(1, elapsed);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const newZ = jumpStartZRef.current + (jumpTargetRef.current - jumpStartZRef.current) * eased;
        cameraZRef.current = newZ;
        if (t >= 1) jumpTargetRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cameraZRef]);

  const jumpTo = (cardZ: number) => {
    jumpTargetRef.current = cardZ + 10; // arrive slightly before the card
    jumpStartRef.current = performance.now();
    jumpStartZRef.current = cameraZRef.current;
  };

  return (
    <>
      {/* Top-left: Exit link */}
      <a
        href="/"
        className="interactive-link"
        style={{
          position: 'fixed',
          top: SPACING.xl,
          left: '1.75rem',
          zIndex: Z_INDEX.navigation,
        }}
        tabIndex={0}
      >
        ← EXIT
      </a>

      {/* Top-right: velocity indicator */}
      <div
        className={`velocity-indicator ${Number(velocity) > PERF.velocityThreshold ? 'velocity-indicator--high' : ''}`}
        style={{
          position: 'fixed',
          top: SPACING.xl,
          right: SPACING.xl,
          color: Number(velocity) > 1.5 ? COLORS.slate[50] : undefined,
          opacity: Number(velocity) > 1.5 ? 0.6 : undefined,
        }}
      >
        VEL: {velocity}×
      </div>

      {/* Right edge: vertical progress rail */}
      <div
        style={{
          position: 'fixed',
          right: SPACING.xl,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: Z_INDEX.navigation,
          pointerEvents: 'none',
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            width: '1px',
            height: '120px',
            background: COLORS.alpha.white,
            position: 'relative',
          }}
        />
        {/* Three dots at proportional positions */}
        {CARD_DATA.map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${activeProject === i ? 'progress-dot--active' : ''}`}
            style={{
              marginTop: i === 0 ? '-62px' : i === 1 ? '0' : '62px',
              position: 'absolute',
              top: `${i === 0 ? '0%' : i === 1 ? '50%' : '100%'}`,
            }}
          />
        ))}
      </div>

      {/* Bottom-center: project nav with active indicators */}
      <div
        style={{
          position: 'fixed',
          bottom: SPACING.xl,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: SPACING['2xl'],
          alignItems: 'center',
          zIndex: Z_INDEX.navigation,
          userSelect: 'none',
        }}
      >
        {CARD_DATA.map((card, i) => (
          <button
            key={card.name}
            onClick={() => jumpTo(card.z)}
            className="interactive-button"
            style={{
              color: activeProject === i
                ? COLORS.amber[400]
                : COLORS.alpha.white,
            }}
            tabIndex={0}
            aria-label={`Navigate to ${card.name}`}
            aria-current={activeProject === i ? 'step' : undefined}
          >
            {activeProject === i && (
              <span style={{ color: COLORS.amber[400], fontSize: '6px' }}>▲</span>
            )}
            {card.name}
          </button>
        ))}
      </div>

      {/* Keyboard navigation hint */}
      <div
        style={{
          position: 'fixed',
          bottom: SPACING.lg,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: FONTS.mono,
          fontSize: '7px',
          letterSpacing: '0.1em',
          color: COLORS.alpha.textDim,
          zIndex: Z_INDEX.navigation,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        ← PREV · ESC RESET · NEXT →
      </div>

      {/* Bottom-right: steer hint — permanent low opacity */}
      <div
        style={{
          position: 'fixed',
          bottom: SPACING.xl,
          right: SPACING.xl,
          fontFamily: FONTS.sans,
          fontSize: '8px',
          letterSpacing: '0.2em',
          color: COLORS.alpha.textDim,
          zIndex: Z_INDEX.navigation,
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
        }}
      >
        <span>MOVE MOUSE TO STEER</span>
        <span>SCROLL TO BOOST</span>
      </div>
    </>
  );
}
