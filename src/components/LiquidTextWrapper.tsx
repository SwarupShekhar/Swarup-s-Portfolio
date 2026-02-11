import React, { useRef, useState, useEffect } from 'react';
import TextLiquidEther from './TextLiquidEther';

interface LiquidTextWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  liquidEtherProps?: {
    mouseForce?: number;
    cursorSize?: number;
    isViscous?: boolean;
    viscous?: number;
    iterationsViscous?: number;
    iterationsPoisson?: number;
    dt?: number;
    BFECC?: boolean;
    resolution?: number;
    isBounce?: boolean;
    colors?: string[];
    autoDemo?: boolean;
    autoSpeed?: number;
    autoIntensity?: number;
    takeoverDuration?: number;
    autoResumeDelay?: number;
    autoRampDuration?: number;
  };
}

export default function LiquidTextWrapper({ 
  children, 
  className = '',
  style = {},
  liquidEtherProps = {}
}: LiquidTextWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      });
      
      resizeObserver.observe(containerRef.current);
      
      // Initial measurement
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
      
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        ...style,
        isolation: 'isolate' // Create a new stacking context
      }}
    >
      {/* Liquid Ether Canvas - Behind the text */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <TextLiquidEther
          {...liquidEtherProps}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </div>
      
      {/* Text Content - In front of the liquid ether */}
      <div 
        className="relative"
        style={{ 
          zIndex: 2,
          position: 'relative'
        }}
      >
        {children}
      </div>
    </div>
  );
}