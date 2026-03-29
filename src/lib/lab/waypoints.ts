import * as THREE from 'three';

export interface Waypoint {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  progress: number;
}

export const waypoints: Waypoint[] = [
  {
    progress: 0,
    position: new THREE.Vector3(0, 0, 20),
    lookAt: new THREE.Vector3(0, 0, 0),
  },
  {
    progress: 0.25,
    position: new THREE.Vector3(-5, 1.5, 12),
    lookAt: new THREE.Vector3(-1, 0, 0),
  },
  {
    progress: 0.5,
    position: new THREE.Vector3(0, -2, 7),
    lookAt: new THREE.Vector3(0, 0, 0),
  },
  {
    progress: 0.75,
    position: new THREE.Vector3(5, 2.5, 10),
    lookAt: new THREE.Vector3(1, 0.5, 0),
  },
  {
    progress: 0.95,
    position: new THREE.Vector3(0, 0, 16),
    lookAt: new THREE.Vector3(0, 0, 0),
  },
];

export const CAMERA_LERP_FACTOR = 0.05;

export function getInterpolatedWaypoint(progress: number): { position: THREE.Vector3; lookAt: THREE.Vector3 } {
  let startWaypoint = waypoints[0];
  let endWaypoint = waypoints[waypoints.length - 1];

  for (let i = 0; i < waypoints.length - 1; i++) {
    if (progress >= waypoints[i].progress && progress <= waypoints[i + 1].progress) {
      startWaypoint = waypoints[i];
      endWaypoint = waypoints[i + 1];
      break;
    }
  }

  const segmentProgress = (progress - startWaypoint.progress) / (endWaypoint.progress - startWaypoint.progress);
  const clampedSegmentProgress = Math.max(0, Math.min(1, segmentProgress));

  const position = new THREE.Vector3(
    THREE.MathUtils.lerp(startWaypoint.position.x, endWaypoint.position.x, clampedSegmentProgress),
    THREE.MathUtils.lerp(startWaypoint.position.y, endWaypoint.position.y, clampedSegmentProgress),
    THREE.MathUtils.lerp(startWaypoint.position.z, endWaypoint.position.z, clampedSegmentProgress)
  );

  const lookAt = new THREE.Vector3(
    THREE.MathUtils.lerp(startWaypoint.lookAt.x, endWaypoint.lookAt.x, clampedSegmentProgress),
    THREE.MathUtils.lerp(startWaypoint.lookAt.y, endWaypoint.lookAt.y, clampedSegmentProgress),
    THREE.MathUtils.lerp(startWaypoint.lookAt.z, endWaypoint.lookAt.z, clampedSegmentProgress)
  );

  return { position, lookAt };
}
