import { useReducedMotion } from "motion/react";

/**
 * True when scroll-driven reveals and pinned sections must be skipped:
 * reduced motion, no IntersectionObserver, or a very tall viewport (crawlers
 * and preview renderers resize the viewport to the page height, which makes
 * vh-based layouts grow and leaves scroll-revealed content hidden).
 */
export function useStaticMotion(): boolean {
  const reduce = useReducedMotion() ?? false;
  if (typeof window === "undefined") return true;
  return reduce || !("IntersectionObserver" in window) || window.innerHeight > 1600;
}
