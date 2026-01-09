import { FireBall } from "./fireball";
import { useRef } from "react";

export function DemoOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="h-[600px] w-full overflow-hidden flex items-center justify-center relative bg-black">
      <div 
        ref={containerRef} 
        className="absolute inset-0 flex items-center justify-center"
        style={{ width: "100%", height: "100%", zIndex: 5 }}
      >
        <FireBall 
          blobRadius={4} 
          ballColor="#ff2d75" 
          colors={["#ff2d75", "#ff5500", "#ffcc00", "#ff9900"]}
          followMouse={true}
          intensity={0.25}
          containerRef={containerRef}
        /> 
      </div>
      <h1 className="tracking-tighter text-7xl font-bold text-center z-10 text-white">
         Fire Ball
      </h1>
    </div>
  );
}