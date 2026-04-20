/**
 * RESPONSIVE UTILITIES
 * Dynamic scaling based on viewport
 */

import { BREAKPOINTS } from './constants';

export interface ResponsiveConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  scale: number;
}

/**
 * Get responsive configuration based on viewport width
 */
export function getResponsiveConfig(viewportWidth: number): ResponsiveConfig {
  const isMobile = viewportWidth < BREAKPOINTS.tablet;
  const isTablet = viewportWidth >= BREAKPOINTS.tablet && viewportWidth < BREAKPOINTS.desktop;
  const isDesktop = viewportWidth >= BREAKPOINTS.desktop;
  
  // Scale factor for spacing and sizing
  const scale = isMobile ? 0.8 : isTablet ? 0.9 : 1.0;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    scale,
  };
}

/**
 * Hook for responsive value selection
 * Example: useResponsiveValue([10, 12, 14]) returns different values based on viewport
 */
export function useResponsiveValue<T>(values: [T, T, T]): T {
  const width = typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktop;
  const { isMobile, isTablet } = getResponsiveConfig(width);
  
  if (isMobile) return values[0];
  if (isTablet) return values[1];
  return values[2];
}

/**
 * Clamp helper for responsive font sizes
 */
export function clampFont(min: number, max: number, vw: number): string {
  return `clamp(${min}px, ${vw}vw, ${max}px)`;
}
