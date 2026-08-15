/**
 * Shared Framer Motion presets. Extracted after the refinement-agent audit
 * found the same spring constants and fadeUp/slideIn variants copy-pasted
 * (with small unintentional drifts, e.g. damping 16 vs 18 for no real
 * reason) across Hero, Navbar, About, Projects, Contact and Footer.
 *
 * Pure motion values — no components here — so both client and server
 * files can import it without pulling in "use client".
 */
import type { Transition, Variants } from "framer-motion";

export const SPRING_SOFT: Transition = { type: "spring", stiffness: 200, damping: 18 };
export const SPRING_MEDIUM: Transition = { type: "spring", stiffness: 260, damping: 18 };
export const SPRING_BOUNCY: Transition = { type: "spring", stiffness: 300, damping: 14 };
export const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 400, damping: 12 };
export const SPRING_POP: Transition = { type: "spring", stiffness: 500, damping: 15 };

export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;

/** Entrance: fade + rise, optionally with a scale/rotate pop. */
export function fadeUp(options: { y?: number; scale?: number; rotate?: number; spring?: Transition } = {}): Variants {
  const { y = 60, scale, rotate, spring = SPRING_SOFT } = options;
  return {
    hidden: { opacity: 0, y, ...(scale !== undefined ? { scale } : {}), ...(rotate !== undefined ? { rotate } : {}) },
    show: {
      opacity: 1,
      y: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      ...(rotate !== undefined ? { rotate: 0 } : {}),
      transition: spring,
    },
  };
}

/** Entrance: slide in from a side, used for alternating grid/field layouts. */
export function slideIn(fromLeft: boolean, options: { x?: number; scale?: number; rotate?: number; spring?: Transition } = {}): Variants {
  const { x = 50, scale, rotate, spring = SPRING_SOFT } = options;
  const signedX = fromLeft ? -x : x;
  const signedRotate = rotate !== undefined ? (fromLeft ? -rotate : rotate) : undefined;
  return {
    hidden: {
      opacity: 0,
      x: signedX,
      ...(scale !== undefined ? { scale } : {}),
      ...(signedRotate !== undefined ? { rotate: signedRotate } : {}),
    },
    show: {
      opacity: 1,
      x: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      ...(signedRotate !== undefined ? { rotate: 0 } : {}),
      transition: spring,
    },
  };
}

/** Parent container that staggers its children's own variants. */
export function staggerContainer(staggerChildren = 0.12, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren, delayChildren } } };
}
