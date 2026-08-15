"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks which section is currently "active" for a scroll-spy nav
 * indicator. Uses IntersectionObserver with a thin activation band near the
 * top of the viewport rather than manual scroll-offset math, and resolves
 * ties (multiple sections crossing the band at once) by picking whichever
 * has the highest intersectionRatio instead of "whichever event fired
 * last" — avoids flicker when scrolling fast past a short section.
 *
 * `setActiveOptimistic` lets a nav click set the target immediately and
 * suspends the observer briefly, so the indicator doesn't flicker through
 * intermediate sections during the native smooth-scroll.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const suspendedUntil = useRef(0);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < suspendedUntil.current) return;
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = active;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      // Thin band near the top of the viewport: a section only counts once
      // it's crossed into roughly the top third, so the nav lights up
      // "which section is being read", not "which section merely appeared".
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  function setActiveOptimistic(id: string) {
    setActive(id);
    suspendedUntil.current = Date.now() + 700;
  }

  return { active, setActiveOptimistic };
}
