'use client';

import { useEffect, useRef, useState } from 'react';
import { CARD_DATA } from './Tunnel';

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

  useEffect(() => {
    let lastZ = cameraZRef.current;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const cz = cameraZRef.current;

      // Calculate velocity from delta Z (BASE_SPEED is 0.07)
      const delta = Math.abs(cz - lastZ);
      const velMultiplier = delta / 0.07;
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
        const elapsed = (now - jumpStartRef.current) / 2000; // 2s duration
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
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.75rem',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(248,250,252,0.4)',
          textDecoration: 'none',
          zIndex: 120,
          letterSpacing: '0.05em',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#CA8A04'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(248,250,252,0.4)'}
      >
        ← EXIT
      </a>

      {/* Top-right: velocity indicator */}
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.75rem',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '9px',
          letterSpacing: '0.25em',
          color: `rgba(248,250,252,${Number(velocity) > 1.5 ? 0.6 : 0.2})`,
          zIndex: 120,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        VEL: {velocity}×
      </div>

      {/* Right edge: vertical progress rail */}
      <div
        style={{
          position: 'fixed',
          right: '1.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 120,
          pointerEvents: 'none',
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            width: '1px',
            height: '120px',
            background: 'rgba(248,250,252,0.1)',
            position: 'relative',
          }}
        />
        {/* Three dots at proportional positions */}
        {CARD_DATA.map((_, i) => (
          <div
            key={i}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: activeProject === i ? '#CA8A04' : 'rgba(248,250,252,0.15)',
              boxShadow: activeProject === i ? '0 0 8px rgba(202,138,4,0.6)' : 'none',
              transform: activeProject === i ? 'scale(1.3)' : 'scale(1)',
              transition: 'all 0.3s ease',
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
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          zIndex: 120,
          userSelect: 'none',
        }}
      >
        {CARD_DATA.map((card, i) => (
          <button
            key={card.name}
            onClick={() => jumpTo(card.z)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '8px',
              letterSpacing: '0.3em',
              color: activeProject === i
                ? 'rgba(202,138,4,0.7)'
                : 'rgba(248,250,252,0.15)',
              padding: '4px 2px',
              transition: 'color 0.3s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            {activeProject === i && (
              <span style={{ color: '#CA8A04', fontSize: '6px' }}>▲</span>
            )}
            {card.name}
          </button>
        ))}
      </div>

      {/* Bottom-right: steer hint — permanent low opacity */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.75rem',
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '8px',
          letterSpacing: '0.2em',
          color: 'rgba(248,250,252,0.12)',
          zIndex: 120,
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
