'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useRef, useState } from 'react';
import Tunnel from '@/components/lab/Tunnel';
import TunnelCards from '@/components/lab/TunnelCards';
import TunnelNav from '@/components/lab/TunnelNav';

export default function LabPage() {
  const cameraZRef = useRef(0);
  const pausedRef = useRef(false);
  const [introOpacity, setIntroOpacity] = useState(1);
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    // After 2s, fade out the intro
    const fadeTimer = setTimeout(() => {
      setIntroOpacity(0);
    }, 2000);
    // After fade completes, unmount
    const removeTimer = setTimeout(() => {
      setIntroVisible(false);
    }, 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <Tunnel cameraZRef={cameraZRef} pausedRef={pausedRef} />
      <TunnelCards cameraZRef={cameraZRef} pausedRef={pausedRef} />
      <TunnelNav cameraZRef={cameraZRef} />

      {/* Vignette — porthole lens effect, above canvas, below all overlays */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.82) 100%)',
          pointerEvents: 'none',
          zIndex: 105,
        }}
      />

      {/* Opening sequence overlay */}
      {introVisible && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 130,
            pointerEvents: 'none',
            opacity: introOpacity,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Horizontal amber scan line sweep */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '100%',
              background: 'linear-gradient(180deg, transparent 0%, rgba(202,138,4,0.15) 50%, transparent 100%)',
              animation: 'scanDown 0.8s cubic-bezier(0.4,0,0.6,1) both',
              pointerEvents: 'none',
            }}
          />

          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.5em',
              color: 'rgba(248,250,252,0.3)',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
            }}
          >
            Swarup Shekhar
          </p>
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'rgba(202,138,4,0.3)',
              margin: '0 0 1.5rem 0',
            }}
          />
          <h1
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              fontWeight: 700,
              color: '#F8FAFC',
              margin: '0 0 1rem 0',
              letterSpacing: '-0.02em',
            }}
          >
            The Lab.
          </h1>
          <p
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(248,250,252,0.3)',
              letterSpacing: '0.2em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Three systems. One engineer.
          </p>
        </div>
      )}

      {/* Keyframes for intro scan */}
      <style>{`
        @keyframes scanDown {
          from { transform: translateY(-100%) translateX(-50%); }
          to   { transform: translateY(100%) translateX(-50%); }
        }
      `}</style>
    </>
  );
}
