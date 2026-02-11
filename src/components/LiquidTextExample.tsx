import React from 'react';
import LiquidTextWrapper from './LiquidTextWrapper';

export default function LiquidTextExample() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12">Liquid Ether Text Examples</h1>
      
      {/* Example 1: Default settings */}
      <div className="mb-16 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-violet-400">Default Liquid Ether Effect</h2>
        <LiquidTextWrapper>
          <div className="p-8 bg-black/50 rounded-xl border border-white/10">
            <h3 className="text-3xl font-bold mb-4">Sample Heading</h3>
            <p className="text-lg text-white/80">
              This text has the default liquid ether effect applied behind it. 
              Move your cursor around to see the fluid dynamics in action.
            </p>
          </div>
        </LiquidTextWrapper>
      </div>

      {/* Example 2: Custom colors and settings */}
      <div className="mb-16 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-400">Custom Emerald Theme</h2>
        <LiquidTextWrapper
          liquidEtherProps={{
            colors: ['#10B981', '#34D399', '#6EE7B7'],
            mouseForce: 25,
            cursorSize: 120,
            isViscous: true,
            viscous: 50,
            resolution: 0.6,
            autoDemo: true,
            autoSpeed: 0.8,
            autoIntensity: 3.0
          }}
        >
          <div className="p-8 bg-black/50 rounded-xl border border-emerald-500/20">
            <h3 className="text-3xl font-bold mb-4 text-emerald-300">Emerald Liquid Effect</h3>
            <p className="text-lg text-white/80">
              This example uses custom emerald colors with higher viscosity and larger cursor size 
              for a more pronounced liquid effect.
            </p>
          </div>
        </LiquidTextWrapper>
      </div>

      {/* Example 3: Purple theme with different settings */}
      <div className="mb-16 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-purple-400">Purple Viscous Flow</h2>
        <LiquidTextWrapper
          liquidEtherProps={{
            colors: ['#8B5CF6', '#A78BFA', '#C4B5FD'],
            mouseForce: 15,
            cursorSize: 80,
            isViscous: true,
            viscous: 30,
            resolution: 0.4,
            autoDemo: true,
            autoSpeed: 0.5,
            autoIntensity: 2.0
          }}
        >
          <div className="p-8 bg-black/50 rounded-xl border border-purple-500/20">
            <h3 className="text-3xl font-bold mb-4 text-purple-300">Purple Fluid Dynamics</h3>
            <p className="text-lg text-white/80">
              Medium viscosity purple theme with balanced settings for smooth interaction.
            </p>
          </div>
        </LiquidTextWrapper>
      </div>

      {/* Example 4: Pink theme with high intensity */}
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-pink-400">High Intensity Pink</h2>
        <LiquidTextWrapper
          liquidEtherProps={{
            colors: ['#EC4899', '#F472B6', '#F9A8D4'],
            mouseForce: 30,
            cursorSize: 150,
            isViscous: true,
            viscous: 60,
            resolution: 0.7,
            autoDemo: true,
            autoSpeed: 1.0,
            autoIntensity: 4.0
          }}
        >
          <div className="p-8 bg-black/50 rounded-xl border border-pink-500/20">
            <h3 className="text-3xl font-bold mb-4 text-pink-300">Intense Pink Flow</h3>
            <p className="text-lg text-white/80">
              High-intensity pink theme with maximum responsiveness and large interaction area.
            </p>
          </div>
        </LiquidTextWrapper>
      </div>
    </div>
  );
}