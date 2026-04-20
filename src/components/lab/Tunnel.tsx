'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export const CARD_DATA = [
  {
    name: 'ENGLIVO',
    desc: 'AI fluency engine. Real-time speech feedback.',
    stack: 'LiveKit · NestJS · Neon · Claude API',
    url: 'englivo.com',
    z: -25,
    x: -2.8,
    y: 0.8,
    rotY: 0.6,
    images: [
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809526/Screenshot_2026-03-30_000214_s3uoln.png',
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809526/Screenshot_2026-03-30_000252_b15px9.png',
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809526/Screenshot_2026-03-30_000431_buyoaw.png',
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809526/Screenshot_2026-03-30_000319_zumkmh.png',
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809525/Screenshot_2026-03-30_000415_cqhbvm.png',
      'https://res.cloudinary.com/dufugk5rg/image/upload/v1774809525/Screenshot_2026-03-30_000341_tctonh.png',
    ],
  },
  {
    name: 'WEHOSTT',
    desc: 'Revenue SaaS for hospitality operators.',
    stack: 'Next.js · Stripe · CRM Logic',
    url: 'wehostt.com',
    z: -65,
    x: 2.8,
    y: -0.4,
    rotY: -0.6,
    images: [] as string[],
  },
  {
    name: 'STUDYHOURS',
    desc: 'K-12 tutoring. Outcome-driven.',
    stack: 'Multi-auth · Scheduling · Payments',
    url: 'vaidiktutoring.vercel.app',
    z: -105,
    x: -2.2,
    y: -0.8,
    rotY: 0.5,
    images: [] as string[],
  },
];

interface TunnelProps {
  cameraZRef: React.MutableRefObject<number>;
  pausedRef: React.MutableRefObject<boolean>;
}

function drawCardCanvas(card: (typeof CARD_DATA)[0]): HTMLCanvasElement {
  const W = 560;
  const H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = 'rgba(202, 138, 4, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  // Corner accents
  const corner = 18;
  ctx.strokeStyle = 'rgba(202, 138, 4, 0.8)';
  ctx.lineWidth = 2;
  // top-left
  ctx.beginPath(); ctx.moveTo(1, corner); ctx.lineTo(1, 1); ctx.lineTo(corner, 1); ctx.stroke();
  // top-right
  ctx.beginPath(); ctx.moveTo(W - corner, 1); ctx.lineTo(W - 1, 1); ctx.lineTo(W - 1, corner); ctx.stroke();
  // bottom-left
  ctx.beginPath(); ctx.moveTo(1, H - corner); ctx.lineTo(1, H - 1); ctx.lineTo(corner, H - 1); ctx.stroke();
  // bottom-right
  ctx.beginPath(); ctx.moveTo(W - corner, H - 1); ctx.lineTo(W - 1, H - 1); ctx.lineTo(W - 1, H - corner); ctx.stroke();

  // Project name
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillText(card.name, 28, 52);

  // [LIVE] tag
  ctx.fillStyle = '#CA8A04';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('[LIVE]', W - 80, 52);

  // Divider line
  ctx.strokeStyle = 'rgba(202, 138, 4, 0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(28, 72); ctx.lineTo(W - 28, 72); ctx.stroke();

  // Description
  ctx.fillStyle = 'rgba(248, 250, 252, 0.55)';
  ctx.font = '300 18px "IBM Plex Sans", sans-serif';
  ctx.fillText(card.desc, 28, 120);

  // Stack tags
  const tags = card.stack.split(' · ');
  let tagX = 28;
  const tagY = 180;
  ctx.font = '400 13px "IBM Plex Sans", sans-serif';
  tags.forEach((tag) => {
    const tw = ctx.measureText(tag).width;
    ctx.fillStyle = 'rgba(202, 138, 4, 0.15)';
    ctx.fillRect(tagX - 6, tagY - 16, tw + 12, 22);
    ctx.strokeStyle = 'rgba(202, 138, 4, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(tagX - 6, tagY - 16, tw + 12, 22);
    ctx.fillStyle = 'rgba(248, 250, 252, 0.4)';
    ctx.fillText(tag, tagX, tagY);
    tagX += tw + 20;
  });

  // URL
  ctx.fillStyle = 'rgba(248, 250, 252, 0.2)';
  ctx.font = '400 12px "JetBrains Mono", monospace';
  ctx.fillText(card.url, 28, H - 28);

  // Arrow
  ctx.fillStyle = '#CA8A04';
  ctx.font = '700 22px monospace';
  ctx.fillText('→', W - 52, H - 24);

  return canvas;
}

export default function Tunnel({ cameraZRef, pausedRef }: TunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    const canvas = renderer.domElement;
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:100;display:block;';
    container.appendChild(canvas);

    // ── SCENE ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // ── CAMERA ──
    const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 0);

    // ── POST-PROCESSING ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.85,   // strength
      0.55,   // radius
      0.18    // threshold — low so rings + engine glows bloom
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // ── LIGHTING ──
    scene.add(new THREE.AmbientLight(0x0a0a0f, 0.2));
    const forwardLight = new THREE.PointLight(0xd97706, 2.0, 30);
    scene.add(forwardLight);
    const camLight = new THREE.PointLight(0xfbbf24, 0.8, 15);
    scene.add(camLight);

    // ── TUNNEL RINGS (InstancedMesh) ──
    const RING_COUNT = 50;
    const RING_SPACING = 3;
    const ringGeo = new THREE.TorusGeometry(3.5, 0.015, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    // Individual meshes for per-ring opacity control
    const rings: THREE.Mesh[] = [];
    const ringBaseOpacities: number[] = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const z = -i * RING_SPACING;
      let baseOpacity: number;
      if (z > -40) baseOpacity = 0.5;
      else if (z > -100) baseOpacity = 0.25;
      else baseOpacity = 0.08;

      const mat = new THREE.MeshBasicMaterial({
        color: z > -40 ? 0xd97706 : z > -100 ? 0x92400e : 0x1c1917,
        transparent: true,
        opacity: 0.0, // start at 0 for fade-in
        depthWrite: false,
      });

      const ring = new THREE.Mesh(ringGeo, mat);
      ring.position.z = z;
      ring.rotation.z = Math.sin(i * 0.3) * 0.15;
      ring.rotation.x = Math.cos(i * 0.2) * 0.08;
      scene.add(ring);
      rings.push(ring);
      ringBaseOpacities.push(baseOpacity);
    }

    // ── LONGITUDINAL LINES ──
    const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    angles.forEach((angle) => {
      const x = Math.cos(angle) * 3.5;
      const y = Math.sin(angle) * 3.5;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, 0),
        new THREE.Vector3(x, y, -150),
      ]);
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.08 })
      );
      scene.add(line);
    });

    // ── PARTICLE FIELD ──
    const makeParticles = (
      count: number,
      color: number,
      opacity: number,
      size: number,
      positionFn: (i: number) => [number, number, number]
    ) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const [x, y, z] = positionFn(i);
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        size, color, transparent: true, opacity,
        sizeAttenuation: true, depthWrite: false,
      });
      return new THREE.Points(geo, mat);
    };

    // Layer 1 — inside tunnel
    scene.add(makeParticles(800, 0xfbbf24, 0.6, 0.025, () => {
      const r = 0.5 + Math.random() * 2.5;
      const a = Math.random() * Math.PI * 2;
      return [Math.cos(a) * r, Math.sin(a) * r, -Math.random() * 150];
    }));

    // Layer 2 — tunnel wall surface
    scene.add(makeParticles(600, 0xd97706, 0.4, 0.015, () => {
      const a = Math.random() * Math.PI * 2;
      const r = 3.4 + Math.random() * 0.2;
      return [Math.cos(a) * r, Math.sin(a) * r, -Math.random() * 150];
    }));

    // Layer 3 — outer space
    scene.add(makeParticles(600, 0x334155, 0.25, 0.010, () => [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      -Math.random() * 150,
    ]));

    // ── SPEED LINES — boost-reactive streaks ──
    const STREAK_COUNT = 80;
    // Each streak: 2 points (near, far) forming a radial line segment from center outward
    const streakPositions = new Float32Array(STREAK_COUNT * 2 * 3); // 2 verts * 3 floats
    const streakAngles: number[] = [];
    const streakRadii: number[] = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = (i / STREAK_COUNT) * Math.PI * 2;
      streakAngles.push(angle);
      streakRadii.push(1.2 + Math.random() * 2.2); // radial distance from center
    }
    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
    // Each pair of verts = one line segment; use LineSegments
    const streakMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const streakLines = new THREE.LineSegments(streakGeo, streakMat);
    scene.add(streakLines);

    // ── PROJECT CARDS ──
    const cardLights: THREE.PointLight[] = [];
    const cardMeshes: THREE.Mesh[] = [];

    CARD_DATA.forEach((card) => {
      const cvs = drawCardCanvas(card);
      const tex = new THREE.CanvasTexture(cvs);
      const geo = new THREE.PlaneGeometry(2.8, 1.6);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(card.x, card.y, card.z);
      mesh.rotation.y = card.rotY;
      scene.add(mesh);
      cardMeshes.push(mesh);

      const light = new THREE.PointLight(0xCA8A04, 1.5, 8);
      light.position.set(card.x, card.y, card.z);
      scene.add(light);
      cardLights.push(light);
    });

    // ── GLASS CRYSTAL (refractive, dispersive) ──
    // Main transmission object — IcosahedronGeometry = gem / data crystal shape
    const crystalGeo = new THREE.IcosahedronGeometry(0.38, 1);

    // Core glass body: real Three.js physical transmission
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,       // fully transmissive
      roughness: 0.0,
      metalness: 0.0,
      ior: 1.5,                 // glass IOR
      thickness: 0.8,           // refraction depth
      envMapIntensity: 2.2,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, glassMat);
    scene.add(crystalMesh);

    // Dispersion ghosts — 3 slightly scaled copies, RGB tinted, offset rotation
    // They create the chromatic fringe as the crystal rotates
    const dispersionData = [
      { color: 0xff2244, scale: 1.035, rotOffset: 0.08,  opacity: 0.13 },  // red channel
      { color: 0x22ff88, scale: 1.055, rotOffset: -0.06, opacity: 0.09 },  // green channel
      { color: 0x2255ff, scale: 1.075, rotOffset: 0.12,  opacity: 0.11 },  // blue channel
    ];
    const ghostMeshes: THREE.Mesh[] = [];
    dispersionData.forEach(({ color, scale, opacity }) => {
      const ghostMat = new THREE.MeshPhysicalMaterial({
        color,
        transmission: 0.7,
        roughness: 0.05,
        metalness: 0,
        ior: 1.45,
        thickness: 0.4,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const ghost = new THREE.Mesh(crystalGeo, ghostMat);
      ghost.scale.setScalar(scale);
      scene.add(ghost);
      ghostMeshes.push(ghost);
    });

    // Crystal point light — illuminates it from the front so glass catches light
    const crystalLight = new THREE.PointLight(0xffffff, 1.8, 6);
    scene.add(crystalLight);
    // Coloured rim lights to create the prismatic effect
    const rimR = new THREE.PointLight(0xff3344, 0.6, 4);
    const rimB = new THREE.PointLight(0x3355ff, 0.6, 4);
    scene.add(rimR);
    scene.add(rimB);
    const shipGroup = new THREE.Group();

    // ── SLEEK CRAFT — LatheGeometry fuselage ──
    // Profile curve: tapered nose → widest mid → taper to engine
    const profilePoints = [
      new THREE.Vector2(0, -0.42),     // nose tip
      new THREE.Vector2(0.012, -0.38), // nose taper
      new THREE.Vector2(0.032, -0.30), // forward body
      new THREE.Vector2(0.045, -0.15), // widening
      new THREE.Vector2(0.048, 0),     // midpoint (widest)
      new THREE.Vector2(0.046, 0.12),  // aft body
      new THREE.Vector2(0.040, 0.22),  // engine taper
      new THREE.Vector2(0.035, 0.30),  // engine mount
      new THREE.Vector2(0.030, 0.34),  // exhaust rim
    ];
    const fuselageGeo = new THREE.LatheGeometry(profilePoints, 16);
    const hullMat = new THREE.MeshPhysicalMaterial({
      color: 0x12182a,
      roughness: 0.3,
      metalness: 0.85,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });
    const fuselage = new THREE.Mesh(fuselageGeo, hullMat);
    fuselage.rotation.x = Math.PI / 2; // point nose forward (-Z)
    shipGroup.add(fuselage);

    // ── COCKPIT dome (glass bubble) ──
    const cockpitGeo = new THREE.SphereGeometry(0.028, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const cockpitMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transmission: 0.85,
      roughness: 0.0,
      metalness: 0.0,
      ior: 1.4,
      thickness: 0.2,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const cockpit = new THREE.Mesh(cockpitGeo, cockpitMat);
    cockpit.position.set(0, 0.038, -0.18);
    shipGroup.add(cockpit);

    // ── SWEPT DELTA WINGS ──
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.lineTo(0.42, 0.12);
    wingShape.lineTo(0.38, 0.16);
    wingShape.lineTo(0.05, 0.08);
    wingShape.lineTo(0, 0.04);
    wingShape.lineTo(0, 0);
    const wingExtrudeSettings = { depth: 0.006, bevelEnabled: false };
    const wingMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e1424,
      roughness: 0.4,
      metalness: 0.9,
      clearcoat: 0.3,
    });
    // Right wing
    const rWing = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, wingExtrudeSettings), wingMat);
    rWing.position.set(0.03, -0.008, 0.02);
    rWing.rotation.x = -0.02;
    shipGroup.add(rWing);
    // Left wing (mirrored)
    const lWing = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, wingExtrudeSettings), wingMat);
    lWing.scale.x = -1;
    lWing.position.set(-0.03, -0.008, 0.02);
    lWing.rotation.x = -0.02;
    shipGroup.add(lWing);

    // ── VERTICAL STABILIZER ──
    const finShape = new THREE.Shape();
    finShape.moveTo(0, 0);
    finShape.lineTo(0, 0.1);
    finShape.lineTo(0.08, 0.06);
    finShape.lineTo(0.12, 0);
    finShape.lineTo(0, 0);
    const fin = new THREE.Mesh(
      new THREE.ExtrudeGeometry(finShape, { depth: 0.004, bevelEnabled: false }),
      wingMat
    );
    fin.position.set(-0.002, 0.035, 0.06);
    fin.rotation.y = 0;
    shipGroup.add(fin);

    // ── ENGINE GLOW RING ──
    const engineRingGeo = new THREE.TorusGeometry(0.032, 0.006, 8, 24);
    const engineGlowMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.9,
    });
    const engineRing = new THREE.Mesh(engineRingGeo, engineGlowMat);
    engineRing.position.set(0, 0, 0.34);
    shipGroup.add(engineRing);

    // Engine core (inner disc)
    const engineCoreMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.6,
    });
    const engineCore = new THREE.Mesh(new THREE.CircleGeometry(0.025, 16), engineCoreMat);
    engineCore.position.set(0, 0, 0.341);
    shipGroup.add(engineCore);

    // ── WING-TIP LIGHTS ──
    const tipGeo = new THREE.SphereGeometry(0.006, 6, 6);
    const tipMatR = new THREE.MeshBasicMaterial({ color: 0xff3344 });
    const tipMatG = new THREE.MeshBasicMaterial({ color: 0x33ff88 });
    const tipR = new THREE.Mesh(tipGeo, tipMatR);
    tipR.position.set(0.40, 0, 0.14);
    shipGroup.add(tipR);
    const tipL = new THREE.Mesh(tipGeo, tipMatG);
    tipL.position.set(-0.40, 0, 0.14);
    shipGroup.add(tipL);

    scene.add(shipGroup);

    // ── EXHAUST PARTICLE TRAIL ──
    const EXHAUST_COUNT = 150;
    const exhaustPos = new Float32Array(EXHAUST_COUNT * 3);
    const exhaustLife = new Float32Array(EXHAUST_COUNT);
    for (let i = 0; i < EXHAUST_COUNT; i++) {
      exhaustPos[i * 3] = 0;
      exhaustPos[i * 3 + 1] = 0;
      exhaustPos[i * 3 + 2] = 0;
      exhaustLife[i] = Math.random(); // random start phase
    }
    const exhaustGeo = new THREE.BufferGeometry();
    exhaustGeo.setAttribute('position', new THREE.BufferAttribute(exhaustPos, 3));
    const exhaustMat = new THREE.PointsMaterial({
      size: 0.018,
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const exhaustPoints = new THREE.Points(exhaustGeo, exhaustMat);
    scene.add(exhaustPoints);

    // Engine lights
    const engineLight = new THREE.PointLight(0xd97706, 1.0, 4);
    scene.add(engineLight);
    const shipFillLight = new THREE.PointLight(0x3b5bdb, 0.3, 3);
    scene.add(shipFillLight);

    // ── MOUSE ──
    let mouseX = 0, mouseY = 0;
    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);

    // ── SCROLL BOOST ──
    let boost = 0;           // current extra speed (decays each frame)
    let targetBoost = 0;     // set by wheel, decays naturally
    const MAX_BOOST = 0.55;  // max extra speed (about 8x cruise)
    const handleWheel = (e: WheelEvent) => {
      if (pausedRef.current) return;  // don't boost during card panel
      e.preventDefault();
      // deltaY > 0 = scroll down = fly forward
      const impulse = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.0012, 0.18);
      targetBoost = Math.max(0, Math.min(MAX_BOOST, targetBoost + impulse));
    };
    window.addEventListener('wheel', handleWheel, { passive: false });

    // ── RESIZE ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── STATE ──
    let cameraZ = 0;
    let offsetX = 0, offsetY = 0;
    let targetOffsetX = 0, targetOffsetY = 0;
    let fadeIn = 0; // 0 → 1 over first 1.5s
    let started = false; // camera starts moving after delay
    let startTime = performance.now();
    let loopingBack = false;
    let loopStartZ = 0;
    let loopStartTime = 0;
    const BASE_SPEED = 0.07;
    const BASE_FOV = 80;
    // Expose cameraZ to parent via ref
    const extRef = cameraZRef;

    // ── ANIMATION ──
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = performance.now();
      const t = (now - startTime) * 0.001;

      // Fade-in rings
      fadeIn = Math.min(1, t / 1.5);

      // Camera starts moving after 0.8s
      if (t > 0.8) started = true;

      // Auto-advance
      if (started && !pausedRef.current) {
        // Decay boost toward 0 each frame
        targetBoost *= 0.92;
        boost += (targetBoost - boost) * 0.18;
        if (boost < 0.001) boost = 0;

        if (!loopingBack) {
          cameraZ -= (BASE_SPEED + boost);
          if (cameraZ < -130) {
            // Begin seamless loop back to 0
            loopingBack = true;
            loopStartZ = cameraZ;
            loopStartTime = now;
          }
        } else {
          const loopT = Math.min(1, (now - loopStartTime) / 3000);
          // ease in-out
          const eased = loopT < 0.5 ? 2 * loopT * loopT : -1 + (4 - 2 * loopT) * loopT;
          cameraZ = loopStartZ * (1 - eased);
          if (loopT >= 1) {
            cameraZ = 0;
            loopingBack = false;
          }
        }

        // Widen FOV during boost for speed-rush feel, ease back to base
        const speedRatio = boost / 0.55;
        const targetFov = BASE_FOV + speedRatio * 18;
        camera.fov += (targetFov - camera.fov) * 0.1;
        camera.updateProjectionMatrix();
      } else if (!pausedRef.current) {
        // Ease FOV back to base when not boosting / paused
        camera.fov += (BASE_FOV - camera.fov) * 0.08;
        camera.updateProjectionMatrix();
      }

      extRef.current = cameraZ;

      // Mouse offset (steering)
      targetOffsetX = mouseX * 0.8;
      targetOffsetY = mouseY * 0.4;
      offsetX += (targetOffsetX - offsetX) * 0.05;
      offsetY += (targetOffsetY - offsetY) * 0.05;

      camera.position.set(offsetX, offsetY, cameraZ);
      camera.lookAt(offsetX * 0.3, offsetY * 0.3, cameraZ - 10);

      // Forward light tracks camera
      forwardLight.position.set(offsetX * 2, offsetY, cameraZ - 8);
      camLight.position.set(offsetX, offsetY, cameraZ);

      // Ring opacity (fade-in + distance-based)
      rings.forEach((ring, i) => {
        const ringZ = -i * RING_SPACING;
        const dist = Math.abs(ringZ - cameraZ);
        const baseOpacity = ringBaseOpacities[i] * fadeIn;

        // Rings close behind camera fade, close ahead glow
        let factor = 1.0;
        if (ringZ > cameraZ) {
          // behind camera
          factor = Math.max(0, 1 - (ringZ - cameraZ) / 8);
        } else if (dist < 20) {
          // near — slight boost
          factor = 1.0 + (1 - dist / 20) * 0.4;
        }

        (ring.material as THREE.MeshBasicMaterial).opacity = Math.min(0.9, baseOpacity * factor);
      });

      // Card approach effect
      cardMeshes.forEach((mesh, i) => {
        const cardZ = CARD_DATA[i].z;
        const dist = Math.abs(cameraZ - cardZ);
        const behind = cameraZ < cardZ;

        if (behind) {
          // Camera passed it
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.15, 0.3 * fadeIn);
          mesh.scale.setScalar(1.0);
          cardLights[i].intensity = 0.4;
        } else if (dist < 20) {
          const closeness = 1 - dist / 20;
          const scale = 1.0 + closeness * 0.15;
          mesh.scale.setScalar(scale);
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, 0.6 + closeness * 0.4);
          cardLights[i].intensity = 1.5 + closeness * 1.5;
        } else {
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0.3, 0.6 * fadeIn);
          mesh.scale.setScalar(1.0);
          cardLights[i].intensity = 1.5;
        }

        // Subtle pulse
        const pulse = Math.sin(t * 1.2 + i * 2.1) * 0.05;
        cardLights[i].intensity += pulse;
      });

      // ── DEPTH COLOR SHIFT — blue → amber → white ──
      // Journey: 0 (start) → -130 (end). Map to 0→1.
      const journeyT = Math.min(1, Math.max(0, -cameraZ / 110));
      // Act 1: 0→0.4 = cold blue; Act 2: 0.4→0.75 = amber; Act 3: 0.75→1 = stark white
      let ambientR: number, ambientG: number, ambientB: number;
      let ringHue: number;
      if (journeyT < 0.4) {
        const a = journeyT / 0.4;
        // Blue → amber start
        ambientR = 0.04 + a * 0.18; ambientG = 0.04 + a * 0.08; ambientB = 0.12 + a * 0.02;
        ringHue = 0.06 + a * 0.04; // shift hue
      } else if (journeyT < 0.75) {
        const a = (journeyT - 0.4) / 0.35;
        // Amber → white approach
        ambientR = 0.22 + a * 0.14; ambientG = 0.12 + a * 0.14; ambientB = 0.14 + a * 0.14;
        ringHue = 0.10 + a * 0.04;
      } else {
        const a = (journeyT - 0.75) / 0.25;
        // White
        ambientR = 0.36 + a * 0.12; ambientG = 0.26 + a * 0.12; ambientB = 0.28 + a * 0.12;
        ringHue = 0.14;
      }
      // Apply to ambient light color
      (scene.children[0] as THREE.AmbientLight).color.setRGB(ambientR, ambientG, ambientB);
      // Apply ring color shift to nearest 12 rings
      rings.forEach((ring, i) => {
        const ringZ = -i * RING_SPACING;
        if (ringZ >= cameraZ - 36 && ringZ <= cameraZ + 6) {
          const ringColor = new THREE.Color();
          ringColor.setHSL(ringHue, 0.92, 0.48);
          (ring.material as THREE.MeshBasicMaterial).color.copy(ringColor);
        }
      });

      // ── CARD-PROXIMITY RING DISTORTION ──
      // When approaching any card, rings within 18 units scale outward slightly
      CARD_DATA.forEach((card) => {
        const distToCard = cameraZ - card.z; // positive = haven’t reached yet
        if (distToCard > 0 && distToCard < 18) {
          const proximity = 1 - distToCard / 18; // 0→1 as we approach
          rings.forEach((ring, i) => {
            const ringZ = -i * RING_SPACING;
            const ringDistToCard = Math.abs(ringZ - card.z);
            if (ringDistToCard < 12) {
              const pulse = 1 + proximity * Math.sin(t * 6 + i * 0.8) * 0.06;
              ring.scale.setScalar(pulse);
              // Also brighten the material slightly
              const mat = ring.material as THREE.MeshBasicMaterial;
              const baseOp = ringBaseOpacities[i];
              mat.opacity = Math.min(0.95, baseOp + proximity * 0.35);
            }
          });
        }
      });

      // ── SPEED LINES update ──
      const streakOpacity = Math.min(0.75, (boost / MAX_BOOST) * 0.75);
      streakMat.opacity = streakOpacity;
      // Length grows with boost: near point stays close, far point stretches back
      const streakLen = 0.3 + (boost / MAX_BOOST) * 3.5;
      const streakZ = cameraZ - 2.5; // plane just ahead of camera
      const posArr = streakGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < STREAK_COUNT; i++) {
        const angle = streakAngles[i];
        const r = streakRadii[i];
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        // near vertex
        posArr[i * 6 + 0] = x * 0.05; posArr[i * 6 + 1] = y * 0.05; posArr[i * 6 + 2] = streakZ;
        // far vertex — stretches outward
        posArr[i * 6 + 3] = x * (0.05 + streakLen * 0.28); posArr[i * 6 + 4] = y * (0.05 + streakLen * 0.28); posArr[i * 6 + 5] = streakZ + 0.4;
      }
      streakGeo.attributes.position.needsUpdate = true;

      // Bloom strength ramps with boost — extra cinematic during rush
      bloomPass.strength = 0.85 + (boost / MAX_BOOST) * 0.9;

      // ── GLASS CRYSTAL update ──
      // Float ahead and above center, drifting gently
      const crystalX = Math.sin(t * 0.18) * 0.12;
      const crystalY = 0.28 + Math.sin(t * 0.24) * 0.08;
      const crystalZ = cameraZ - 8.5;
      crystalMesh.position.set(crystalX, crystalY, crystalZ);

      // Slow dual-axis rotation — makes refractions shift constantly
      crystalMesh.rotation.y += 0.004 + boost * 0.018;
      crystalMesh.rotation.x += 0.0025 + boost * 0.010;
      crystalMesh.rotation.z += 0.0015;

      // Dispersion ghosts: same position, each slightly phase-offset in rotation
      ghostMeshes.forEach((ghost, gi) => {
        const rd = dispersionData[gi];
        ghost.position.copy(crystalMesh.position);
        ghost.rotation.y = crystalMesh.rotation.y + rd.rotOffset + t * 0.012 * (gi + 1);
        ghost.rotation.x = crystalMesh.rotation.x - rd.rotOffset * 0.5;
        ghost.rotation.z = crystalMesh.rotation.z + rd.rotOffset * 0.3;
      });

      // Crystal light orbits crystal position
      crystalLight.position.set(crystalX + Math.cos(t * 0.4) * 1.2, crystalY + 0.5, crystalZ + 0.8);
      crystalLight.intensity = 1.8 + Math.sin(t * 1.6) * 0.3;

      // Rim lights orbit on opposite sides — creates the R/B prismatic split
      rimR.position.set(crystalX - 1.0, crystalY + Math.sin(t * 0.6) * 0.4, crystalZ + Math.cos(t * 0.6) * 1.0);
      rimB.position.set(crystalX + 1.0, crystalY - Math.sin(t * 0.6) * 0.4, crystalZ - Math.cos(t * 0.6) * 1.0);

      // Fade crystal in during intro
      glassMat.opacity = Math.min(0.92, fadeIn * 1.1);
      ghostMeshes.forEach((ghost, gi) => {
        (ghost.material as THREE.MeshPhysicalMaterial).opacity = Math.min(dispersionData[gi].opacity, fadeIn * dispersionData[gi].opacity * 1.2);
      });

      // ── SHIP update ──
      shipGroup.position.set(
        offsetX * 0.6,
        offsetY * 0.3 - 0.72,
        cameraZ - 1.8
      );
      shipGroup.rotation.z = -offsetX * 0.22;
      shipGroup.rotation.x = boost * 0.15;

      // Engine intensity scales with boost
      const boostRatio = boost / MAX_BOOST;
      const engineColor = new THREE.Color().lerpColors(
        new THREE.Color(0xd97706),
        new THREE.Color(0xffffff),
        boostRatio * 0.4
      );
      engineGlowMat.color.copy(engineColor);
      engineGlowMat.opacity = 0.7 + boostRatio * 0.3;
      engineCoreMat.color.copy(engineColor);
      engineCoreMat.opacity = 0.4 + boostRatio * 0.6;
      engineRing.scale.setScalar(1 + Math.sin(t * 12) * 0.04 + boostRatio * 0.15);

      // Wing-tip blink
      tipMatR.opacity = 0.5 + Math.sin(t * 2.5) * 0.5;
      tipMatG.opacity = 0.5 + Math.sin(t * 2.5 + Math.PI) * 0.5;
      (tipMatR as THREE.MeshBasicMaterial).transparent = true;
      (tipMatG as THREE.MeshBasicMaterial).transparent = true;

      // Hull tint during boost
      const hullR = 0x12 / 255 + boostRatio * 0.08;
      const hullG = 0x18 / 255 + boostRatio * 0.06;
      const hullB = 0x2a / 255 + boostRatio * 0.12;
      (fuselage.material as THREE.MeshPhysicalMaterial).color.setRGB(hullR, hullG, hullB);

      // Exhaust particle trail
      const shipPos = shipGroup.position;
      const exAttr = exhaustGeo.attributes.position;
      for (let i = 0; i < EXHAUST_COUNT; i++) {
        exhaustLife[i] += 0.02 + boostRatio * 0.04;
        if (exhaustLife[i] > 1) {
          exhaustLife[i] = 0;
          exAttr.setXYZ(i,
            shipPos.x + (Math.random() - 0.5) * 0.04,
            shipPos.y + (Math.random() - 0.5) * 0.04,
            shipPos.z + 0.36
          );
        } else {
          exAttr.setZ(i, exAttr.getZ(i) + 0.06 + boostRatio * 0.15);
          exAttr.setX(i, exAttr.getX(i) + (Math.random() - 0.5) * 0.003);
        }
      }
      exAttr.needsUpdate = true;
      exhaustMat.opacity = 0.2 + boostRatio * 0.6;
      exhaustMat.size = 0.015 + boostRatio * 0.02;

      // Lights
      engineLight.position.set(shipPos.x, shipPos.y, shipPos.z + 0.36);
      engineLight.intensity = 1.0 + boostRatio * 3.0 + Math.sin(t * 10) * 0.1;
      engineLight.color.copy(engineColor);
      shipFillLight.position.set(shipPos.x, shipPos.y + 0.2, shipPos.z);

      composer.render();

      // Chromatic aberration — CSS filter on canvas, boost-reactive
      const caAmount = boost * 1.8; // px of shift at max boost
      if (caAmount > 0.05) {
        canvas.style.filter = `drop-shadow(${caAmount.toFixed(2)}px 0 0 rgba(255,0,80,0.28)) drop-shadow(-${caAmount.toFixed(2)}px 0 0 rgba(0,200,255,0.28))`;
      } else {
        canvas.style.filter = 'none';
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else (mat as THREE.Material).dispose();
        }
      });
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [cameraZRef]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100 }}
    />
  );
}
