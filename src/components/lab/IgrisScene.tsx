'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

interface IgrisSceneProps {
  onScrollComplete: () => void;
  onScrollProgress: (progress: number) => void;
  onLoadComplete?: () => void;
  onLoadProgress?: (progress: number) => void;
}

/**
 * Spring-damper for buttery interpolation (frame-rate independent).
 * Returns new value each tick.
 */
function springDamp(current: number, target: number, speed: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-speed * dt));
}

export default function IgrisScene({ 
  onScrollComplete, 
  onScrollProgress, 
  onLoadComplete, 
  onLoadProgress 
}: IgrisSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 1);
    
    // Performance optimization: detect mobile to limit DPR
    const isMobile = window.innerWidth <= 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const canvas = renderer.domElement;
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;';
    container.appendChild(canvas);

    // ── SCENE ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    // ── CAMERA ──
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0.5, 5.5);

    // ── POST-PROCESSING ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.35, 0.5, 0.88
    );
    composer.addPass(bloomPass);
    
    // Subtle cinematic grain
    const filmPass = new FilmPass(0.15, false);
    composer.addPass(filmPass);
    
    composer.addPass(new OutputPass());

    // ── LIGHTING ──
    const ambient = new THREE.AmbientLight(0x0a0a12, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc8d0e0, 0.5);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.8, 20);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    const warmGlow = new THREE.PointLight(0xd97706, 0.8, 12);
    warmGlow.position.set(2, -1.5, 3);
    scene.add(warmGlow);

    // ── ENVIRONMENT ──
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.add(new THREE.AmbientLight(0x222222, 0.4));
    const envDir = new THREE.DirectionalLight(0xffffff, 0.4);
    envDir.position.set(1, 1, 1);
    envScene.add(envDir);
    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;

    // ── WARP PARTICLES ──
    const WARP_COUNT = 1200;
    const warpPos = new Float32Array(WARP_COUNT * 3);
    const warpSpd = new Float32Array(WARP_COUNT);
    const warpBaseR = new Float32Array(WARP_COUNT);
    const warpBaseA = new Float32Array(WARP_COUNT);
    for (let i = 0; i < WARP_COUNT; i++) {
      const r = 2.5 + Math.random() * 5;
      const a = Math.random() * Math.PI * 2;
      warpBaseR[i] = r;
      warpBaseA[i] = a;
      warpPos[i * 3] = Math.cos(a) * r;
      warpPos[i * 3 + 1] = Math.sin(a) * r;
      warpPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      warpSpd[i] = 0.3 + Math.random() * 0.7;
    }
    const warpGeo = new THREE.BufferGeometry();
    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPos, 3));
    const warpMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xd97706,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const warpPoints = new THREE.Points(warpGeo, warpMat);
    warpPoints.visible = false;
    scene.add(warpPoints);

    // ── AMBIENT DUST ──
    const DUST_COUNT = 200;
    const dustPos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 14;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.012,
      color: 0xd4a574,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    scene.add(dustMesh);

    // ── LOAD IGRIS ──
    let model: THREE.Group | null = null;
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (onLoadProgress) onLoadProgress(itemsLoaded / itemsTotal);
    };
    manager.onLoad = () => {
      if (onLoadComplete) onLoadComplete();
    };
    
    const loader = new GLTFLoader(manager);
    loader.load(
      '/igris.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.setScalar(2.0);
        model.position.set(0, -0.8, 0);
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            child.castShadow = true;
            child.material.envMap = envMap;
            child.material.envMapIntensity = 1.3;
            if (child.material.metalness !== undefined) child.material.metalness = 0.85;
            if (child.material.roughness !== undefined) child.material.roughness = Math.max(child.material.roughness, 0.25);
          }
        });
        scene.add(model);
      },
      undefined,
      (err) => {
        console.error('Igris load error:', err);
        if (onLoadComplete) onLoadComplete(); // ensure we don't hang if it fails
      }
    );

    // ── STATE ──
    let targetScroll = 0;
    let smoothScroll = 0;   // spring-damped
    let smoothFov = 45;
    let smoothBloom = 0.35;
    let smoothCamX = 0;
    let smoothCamY = 0;
    let smoothModelY = -0.8;
    let mouseX = 0;
    let mouseY = 0;
    const scrollSensitivity = window.innerHeight * 2.8;

    // ── INPUT ──
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll += e.deltaY / scrollSensitivity;
      targetScroll = Math.max(0, Math.min(1, targetScroll));
    };
    window.addEventListener('wheel', handleWheel, { passive: false });

    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      targetScroll += dy / scrollSensitivity;
      targetScroll = Math.max(0, Math.min(1, targetScroll));
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── RENDER LOOP ──
    let raf = 0;
    let lastTime = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms to avoid jumps
      lastTime = now;
      const t = now * 0.001;

      // ── Spring-damped scroll (frame-rate independent) ──
      smoothScroll = springDamp(smoothScroll, targetScroll, 4.5, dt);

      // Report to parent
      onScrollProgress(smoothScroll);

      // Trigger tunnel
      if (smoothScroll >= 0.96 && !completedRef.current) {
        completedRef.current = true;
        onScrollComplete();
      }

      // ── Camera parallax (spring-damped) ──
      smoothCamX = springDamp(smoothCamX, mouseX * 0.35, 3.0, dt);
      smoothCamY = springDamp(smoothCamY, mouseY * 0.18, 3.0, dt);

      // ── Dust drift ──
      dustMesh.rotation.y = t * 0.015;

      if (model) {
        const p = smoothScroll;

        if (p < 0.6) {
          // ── ACT 1: Monolith presentation ──
          const normalP = p / 0.6;
          model.visible = true;

          // Gentle idle sway + scroll rotation
          const idleBreath = Math.sin(t * 0.4) * 0.03;
          const idleSway = Math.sin(t * 0.25) * 0.015;

          smoothModelY = springDamp(smoothModelY, -0.8 + idleBreath, 6, dt);
          model.position.set(smoothCamX * -0.15, smoothModelY, 0);
          model.scale.setScalar(2.0);
          model.rotation.y = normalP * Math.PI * 2 + idleSway;
          model.rotation.x = Math.sin(normalP * Math.PI) * 0.06;

          // Camera
          const targetFov = 45;
          smoothFov = springDamp(smoothFov, targetFov, 5, dt);
          camera.fov = smoothFov;
          camera.position.set(smoothCamX * 0.4, 0.5 + smoothCamY * 0.15, 5.5);
          camera.lookAt(smoothCamX * 0.08, 0.1, 0);
          camera.updateProjectionMatrix();

          // Bloom subtle
          smoothBloom = springDamp(smoothBloom, 0.35, 4, dt);
          bloomPass.strength = smoothBloom;

          // Warp hidden
          warpPoints.visible = false;
          warpMat.opacity = 0;

          // Dust visible
          dustMat.opacity = 0.18;

        } else {
          // ── ACT 2: Warp entry ──
          const rawEntry = (p - 0.6) / 0.4;
          // Cubic ease-in for acceleration feel
          const entry = rawEntry * rawEntry * rawEntry;

          // Model scales + moves forward
          const targetScale = 2.0 + entry * 50;
          const targetZ = entry * 60;
          model.scale.setScalar(targetScale);
          model.position.set(smoothCamX * -0.1, smoothModelY, targetZ);
          model.rotation.y += dt * (0.3 + entry * 2.5);

          // Hide once past camera
          model.visible = entry < 0.88;

          // Camera FOV widens
          const targetFov2 = 45 + entry * 50;
          smoothFov = springDamp(smoothFov, targetFov2, 6, dt);
          camera.fov = smoothFov;
          camera.position.set(smoothCamX * 0.2, 0.5, 5.5);
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();

          // Bloom intensifies
          const targetBloom = 0.35 + entry * 1.8;
          smoothBloom = springDamp(smoothBloom, targetBloom, 5, dt);
          bloomPass.strength = smoothBloom;

          // ── Warp particles ──
          warpPoints.visible = true;
          const warpOpacity = Math.min(0.7, entry * 1.8);
          warpMat.opacity = warpOpacity;

          const posAttr = warpGeo.attributes.position;
          const speed = 1 + entry * 8;
          for (let i = 0; i < WARP_COUNT; i++) {
            let z = posAttr.getZ(i) + warpSpd[i] * speed * dt * 60;
            if (z > 12) z = -50 - Math.random() * 10;
            posAttr.setZ(i, z);
          }
          posAttr.needsUpdate = true;

          // Warm glow intensifies
          warmGlow.intensity = 0.8 + entry * 4;
          warmGlow.position.z = 3 - entry * 8;

          // Fog tightens
          (scene.fog as THREE.FogExp2).density = 0.015 + entry * 0.04;

          // Dust fades
          dustMat.opacity = 0.18 * (1 - entry);
        }
      }

      composer.render();
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      pmremGenerator.dispose();
      composer.dispose();
      scene.traverse((obj) => {
        const m = obj as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          if (Array.isArray(m.material)) m.material.forEach((x) => x.dispose());
          else (m.material as THREE.Material).dispose();
        }
      });
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [onScrollComplete, onScrollProgress, onLoadComplete, onLoadProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
      }}
    />
  );
}
