'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CARD_DATA } from './Tunnel';

interface TunnelCardsProps {
  cameraZRef: React.MutableRefObject<number>;
  pausedRef: React.MutableRefObject<boolean>;
}

// Typewriter hook — returns the currently-displayed string and a "done" flag
function useTypewriter(text: string, speed = 28, active = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      setDone(false);
      indexRef.current = 0;
      return;
    }
    setDisplayed('');
    setDone(false);
    indexRef.current = 0;

    const type = () => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current < text.length) {
        timerRef.current = setTimeout(type, speed);
      } else {
        setDone(true);
      }
    };
    timerRef.current = setTimeout(type, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, active]);

  return { displayed, done };
}

// Telemetry coordinate counter
function TelemetryCoord({ label, value }: { label: string; value: string }) {
  return (
    <span style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '7px',
      color: 'rgba(202,138,4,0.5)',
      letterSpacing: '0.06em',
    }}>
      {label}:{value}
    </span>
  );
}

// Auto-rotating image slideshow — cinematic terminal version
function ImageSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [scanning, setScanning] = useState(true);  // scan-in sweep active
  const [acquired, setAcquired] = useState(false);  // SIGNAL ACQUIRED flash
  const [glitch, setGlitch] = useState(false);      // RGB split pulse
  const [coords, setCoords] = useState({ lat: '37.7749', lng: '-122.4194' });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initial scan-in on mount
  useEffect(() => {
    setScanning(true);
    setAcquired(false);
    const t1 = setTimeout(() => {
      setScanning(false);
      setAcquired(true);
    }, 900);
    const t2 = setTimeout(() => setAcquired(false), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Periodic subtle glitch pulse
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 3400);
    return () => clearInterval(glitchInterval);
  }, []);

  // Fake coordinate drift
  useEffect(() => {
    const driftInterval = setInterval(() => {
      setCoords({
        lat: (37.7749 + (Math.random() - 0.5) * 0.0004).toFixed(4),
        lng: (-122.4194 + (Math.random() - 0.5) * 0.0004).toFixed(4),
      });
    }, 800);
    return () => clearInterval(driftInterval);
  }, []);

  // Auto-advance slides with scan-in on each transition
  useEffect(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setScanning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setTimeout(() => setScanning(false), 700);
      }, 80);
    }, 2600);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Screen bezel — gives the image a contained "monitor" look */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: '#0a0f1e',
        zIndex: 0,
      }} />
      {/* The image — zoomed into the hero, not top nav */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[current]}
        alt={`screenshot ${current + 1}`}
        style={{
          position: 'absolute',
          width: '115%',
          height: '160%',
          top: '-12%',
          left: '-7%',
          objectFit: 'cover',
          objectPosition: 'center 28%',
          display: 'block',
          filter: glitch
            ? 'saturate(1.6) contrast(1.15) brightness(1.15) hue-rotate(2deg) drop-shadow(2px 0 0 rgba(255,0,60,0.5)) drop-shadow(-2px 0 0 rgba(0,200,255,0.5))'
            : 'saturate(1.1) contrast(1.08) brightness(1.18)',
          transition: glitch ? 'none' : 'filter 0.3s ease',
          zIndex: 1,
        }}
      />

      {/* Scan sweep — a bright line that moves top to bottom */}
      {scanning && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 8,
          background: 'linear-gradient(180deg, transparent 0%, rgba(202,138,4,0.06) 46%, rgba(202,138,4,0.28) 50%, rgba(202,138,4,0.06) 54%, transparent 100%)',
          animation: 'scanSweep 0.65s cubic-bezier(0.4,0,0.6,1) both',
        }} />
      )}

      {/* Static noise overlay — always present, very subtle */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        backgroundSize: '120px 120px',
        pointerEvents: 'none',
        opacity: 0.6,
        zIndex: 3,
      }} />

      {/* Vignette — just edges, don't kill the image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 80% at center, transparent 30%, rgba(3,7,18,0.55) 100%)',
        pointerEvents: 'none',
        zIndex: 3,
      }} />

      {/* Top-left telemetry */}
      <div style={{
        position: 'absolute',
        top: '7px',
        left: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        <TelemetryCoord label="LAT" value={coords.lat} />
        <TelemetryCoord label="LNG" value={coords.lng} />
      </div>

      {/* Top-right — frame counter */}
      <div style={{
        position: 'absolute',
        top: '7px',
        right: '8px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '7px',
        color: 'rgba(202,138,4,0.45)',
        letterSpacing: '0.06em',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        {String(current + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
      </div>

      {/* Corner targeting brackets */}
      {(['tl','tr','bl','br'] as const).map((pos) => (
        <div key={pos} style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          borderColor: 'rgba(202,138,4,0.55)',
          borderStyle: 'solid',
          zIndex: 5,
          pointerEvents: 'none',
          ...(pos === 'tl' ? { top: 4, left: 4, borderWidth: '1px 0 0 1px' } :
              pos === 'tr' ? { top: 4, right: 4, borderWidth: '1px 1px 0 0' } :
              pos === 'bl' ? { bottom: 4, left: 4, borderWidth: '0 0 1px 1px' } :
                             { bottom: 4, right: 4, borderWidth: '0 1px 1px 0' }),
        }} />
      ))}

      {/* SIGNAL ACQUIRED flash */}
      {acquired && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 6,
          pointerEvents: 'none',
          animation: 'signalFlash 0.9s ease both',
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '0.4em',
            color: 'rgba(202,138,4,0.9)',
            textTransform: 'uppercase',
          }}>SIGNAL ACQUIRED</span>
        </div>
      )}

      {/* Bottom signal-strength bar indicators */}
      <div style={{
        position: 'absolute',
        bottom: '7px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '3px',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: '3px',
              height: i === current ? '10px' : '4px',
              background: i === current ? '#CA8A04' : 'rgba(202,138,4,0.2)',
              transition: 'all 0.25s ease',
            }}
          />
        ))}
      </div>

      {/* Keyframes for scan + signal flash */}
      <style>{`
        @keyframes scanSweep {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100%); }
        }
        @keyframes signalFlash {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Single card panel UI
function CardPanel({
  cardIndex,
  onContinue,
}: {
  cardIndex: number;
  onContinue: () => void;
}) {
  const card = CARD_DATA[cardIndex];

  // Sequence: label → name → desc → stack → actions
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const label = useTypewriter('// PROJECT INCOMING', 30, phase >= 0);
  const name = useTypewriter(card.name, 45, phase >= 1);
  const desc = useTypewriter(card.desc, 22, phase >= 2);
  const stack = useTypewriter(card.stack, 18, phase >= 3);

  // Advance phases when each typewriter finishes
  useEffect(() => {
    if (phase === 0 && label.done) setPhase(1);
  }, [label.done, phase]);

  useEffect(() => {
    if (phase === 1 && name.done) setPhase(2);
  }, [name.done, phase]);

  useEffect(() => {
    if (phase === 2 && desc.done) setPhase(3);
  }, [desc.done, phase]);

  useEffect(() => {
    if (phase === 3 && stack.done) setPhase(4);
  }, [stack.done, phase]);

  // Auto-continue after 5s once actions appear
  useEffect(() => {
    if (phase === 4) {
      autoTimerRef.current = setTimeout(onContinue, 5000);
    }
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [phase, onContinue]);

  const tags = card.stack.split(' · ');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: 110,
        pointerEvents: 'none',
        padding: '0 4vw',
      }}
    >
      {/* Panel */}
      <div
        style={{
          width: 'min(440px, 90vw)',
          background: 'rgba(3, 7, 18, 0.92)',
          border: '1px solid rgba(202,138,4,0.3)',
          backdropFilter: 'blur(12px)',
          padding: '2rem 2.5rem',
          position: 'relative',
          pointerEvents: 'auto',
          animation: 'panelSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Top-right frame counter / ordinal */}
        <div
          style={{
            position: 'absolute',
            top: '7px',
            right: '8px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '7px',
            color: 'rgba(202,138,4,0.45)',
            letterSpacing: '0.06em',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          {String(cardIndex + 1).padStart(2, '0')} / {String(CARD_DATA.length).padStart(2, '0')}
        </div>

        {/* Corner accents */}
        <span style={cornerStyle('topLeft')} />
        <span style={cornerStyle('topRight')} />
        <span style={cornerStyle('bottomLeft')} />
        <span style={cornerStyle('bottomRight')} />

        {/* Label */}
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '0.4em',
            color: 'rgba(202,138,4,0.6)',
            margin: '0 0 1.2rem 0',
            minHeight: '14px',
          }}
        >
          {label.displayed}
          {phase === 0 && <Cursor />}
        </p>

        {/* Image slideshow */}
        <div
          style={{
            width: '100%',
            height: '180px',
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(202,138,4,0.45)',
            marginBottom: '1.5rem',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 0 0 1px rgba(202,138,4,0.1), 0 0 24px rgba(202,138,4,0.15), inset 0 0 12px rgba(3,7,18,0.5)',
          }}
        >
          {card.images && card.images.length > 0 ? (
            <ImageSlideshow images={card.images} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  color: 'rgba(248,250,252,0.1)',
                  margin: 0,
                }}
              >
                [ FEED OFFLINE ]
              </p>
            </div>
          )}
          {/* Horizontal scanlines always on top */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.09) 2px, rgba(0,0,0,0.09) 4px)',
            pointerEvents: 'none',
            zIndex: 6,
          }} />
        </div>

        {/* Project name */}
        <h2
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: '#F8FAFC',
            letterSpacing: '0.05em',
            margin: '0 0 0.75rem 0',
            minHeight: '2.2rem',
          }}
        >
          {phase >= 1 ? name.displayed : ''}
          {phase === 1 && <Cursor />}
        </h2>

        {/* Divider */}
        {phase >= 2 && (
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, rgba(202,138,4,0.4), transparent)',
              margin: '0 0 0.9rem 0',
              animation: 'expandWidth 0.4s ease both',
            }}
          />
        )}

        {/* Description */}
        <p
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '13px',
            fontWeight: 300,
            color: 'rgba(248,250,252,0.6)',
            letterSpacing: '0.03em',
            lineHeight: 1.6,
            margin: '0 0 1.1rem 0',
            minHeight: '1.2rem',
          }}
        >
          {phase >= 2 ? desc.displayed : ''}
          {phase === 2 && <Cursor />}
        </p>

        {/* Stack tags */}
        {phase >= 3 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '1.5rem',
            }}
          >
            {tags.map((tag, i) => {
              // Reveal tags one by one as stack types
              const stackSoFar = stack.displayed;
              const tagStart = card.stack.indexOf(tag);
              const tagVisible = stackSoFar.length > tagStart;
              return tagVisible ? (
                <span
                  key={tag}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px',
                    color: 'rgba(248,250,252,0.45)',
                    background: 'rgba(202,138,4,0.1)',
                    border: '1px solid rgba(202,138,4,0.25)',
                    padding: '3px 8px',
                    letterSpacing: '0.08em',
                    animation: 'fadeInTag 0.2s ease both',
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {tag}
                </span>
              ) : null;
            })}
            {phase === 3 && <Cursor />}
          </div>
        )}

        {/* Action buttons */}
        {phase === 4 && (
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              animation: 'fadeInTag 0.3s ease both',
            }}
          >
            <a
              href={`https://${card.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                fontWeight: 500,
                color: '#000',
                background: '#CA8A04',
                padding: '8px 18px',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              VIEW PROJECT →
            </a>
            <button
              onClick={onContinue}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '10px',
                color: 'rgba(248,250,252,0.3)',
                background: 'none',
                border: '1px solid rgba(248,250,252,0.1)',
                padding: '8px 14px',
                letterSpacing: '0.15em',
                cursor: 'pointer',
              }}
            >
              CONTINUE ↓
            </button>
          </div>
        )}

        {/* Auto-continue progress bar */}
        {phase === 4 && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background: 'rgba(202,138,4,0.5)',
              animation: 'autoProgress 5s linear both',
              width: '100%',
              transformOrigin: 'left',
            }}
          />
        )}
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes panelSlideIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes expandWidth {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes fadeInTag {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes autoProgress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}

// Blinking cursor
function Cursor() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: '#CA8A04',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        animation: 'blink 0.8s step-end infinite',
      }}
    />
  );
}

// Corner accent helper
function cornerStyle(pos: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'): React.CSSProperties {
  const size = 12;
  const base: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: 'rgba(202,138,4,0.7)',
    borderStyle: 'solid',
  };
  if (pos === 'topLeft')     return { ...base, top: -1, left: -1, borderWidth: '2px 0 0 2px' };
  if (pos === 'topRight')    return { ...base, top: -1, right: -1, borderWidth: '2px 2px 0 0' };
  if (pos === 'bottomLeft')  return { ...base, bottom: -1, left: -1, borderWidth: '0 0 2px 2px' };
  return                            { ...base, bottom: -1, right: -1, borderWidth: '0 2px 2px 0' };
}

// ─────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────
export default function TunnelCards({ cameraZRef, pausedRef }: TunnelCardsProps) {
  const [panelIndex, setPanelIndex] = useState<number | null>(null);
  const triggeredRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>(0);

  // Approach label state (shown before panel triggers)
  const [approachLabel, setApproachLabel] = useState<{ index: number; opacity: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const cz = cameraZRef.current;

      // If panel is open, don't check for new triggers
      if (panelRef.current !== null) return;

      let closest = -1;
      let closestDist = Infinity;

      CARD_DATA.forEach((card, i) => {
        const dist = cz - card.z; // positive = camera is ahead of (hasn't reached) card
        if (dist >= 0 && dist < 20 && dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      if (closest !== -1) {
        const opacity = Math.max(0, 1 - closestDist / 20);
        setApproachLabel({ index: closest, opacity });

        // Trigger panel when close enough and not already triggered
        if (closestDist < 5 && !triggeredRef.current.has(closest)) {
          triggeredRef.current.add(closest);
          setPanelIndex(closest);
          pausedRef.current = true;
          setApproachLabel(null);
        }
      } else {
        setApproachLabel(null);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraZRef, pausedRef]);

  // Keep a ref of panelIndex so the rAF loop can read it without stale closure
  const panelRef = useRef<number | null>(null);
  useEffect(() => { panelRef.current = panelIndex; }, [panelIndex]);

  const handleContinue = useCallback(() => {
    setPanelIndex(null);
    pausedRef.current = false;
  }, [pausedRef]);

  return (
    <>
      {/* Approach label — only shown when no panel is open */}
      {approachLabel !== null && panelIndex === null && (
        <div
          style={{
            position: 'fixed',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: approachLabel.opacity,
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 110,
            userSelect: 'none',
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: 'rgba(202,138,4,0.6)',
              margin: '0 0 8px 0',
              textTransform: 'uppercase',
            }}
          >
            NOW APPROACHING
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '18px',
              fontWeight: 700,
              color: '#F8FAFC',
              letterSpacing: '0.1em',
              margin: '0 0 6px 0',
            }}
          >
            {CARD_DATA[approachLabel.index].name}
          </p>
          <p
            style={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '11px',
              color: 'rgba(248,250,252,0.4)',
              letterSpacing: '0.15em',
              margin: 0,
            }}
          >
            {CARD_DATA[approachLabel.index].desc}
          </p>
        </div>
      )}

      {/* Full panel with typewriter */}
      {panelIndex !== null && (
        <CardPanel
          key={panelIndex}
          cardIndex={panelIndex}
          onContinue={handleContinue}
        />
      )}
    </>
  );
}
