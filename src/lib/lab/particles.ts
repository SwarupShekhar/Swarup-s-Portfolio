import * as THREE from 'three';

export interface ParticleData {
  velocity: THREE.Vector3;
  originalPosition: THREE.Vector3;
}

export function createParticleSystem(count: number = 2000): {
  geometry: THREE.BufferGeometry;
  particleData: ParticleData[];
} {
  const positions = new Float32Array(count * 3);
  const particleData: ParticleData[] = [];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 40;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const originalPosition = new THREE.Vector3(x, y, z);
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.002,
      (Math.random() - 0.5) * 0.002
    );

    particleData.push({ velocity, originalPosition });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return { geometry, particleData };
}

export function updateParticles(
  geometry: THREE.BufferGeometry,
  particleData: ParticleData[],
  mousePosition: THREE.Vector3 | null,
  deltaTime: number = 1
): void {
  const positions = geometry.attributes.position.array as Float32Array;
  const REPEL_RADIUS = 2.5;
  const REPEL_STRENGTH = 0.03;

  for (let i = 0; i < particleData.length; i++) {
    const idx = i * 3;
    let x = positions[idx];
    let y = positions[idx + 1];
    let z = positions[idx + 2];

    if (mousePosition) {
      const dx = x - mousePosition.x;
      const dy = y - mousePosition.y;
      const dz = z - mousePosition.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < REPEL_RADIUS && dist > 0.01) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_STRENGTH;
        const repelX = (dx / dist) * force;
        const repelY = (dy / dist) * force;
        const repelZ = (dz / dist) * force;

        x += repelX;
        y += repelY;
        z += repelZ;
      }
    }

    x += particleData[i].velocity.x * deltaTime;
    y += particleData[i].velocity.y * deltaTime;
    z += particleData[i].velocity.z * deltaTime;

    if (x > 20) x = -20;
    if (x < -20) x = 20;
    if (y > 20) y = -20;
    if (y < -20) y = 20;
    if (z > 20) z = -20;
    if (z < -20) z = 20;

    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;
  }

  geometry.attributes.position.needsUpdate = true;
}
