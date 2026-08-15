"use client";

import { useSyncExternalStore } from "react";

export type DeviceTier = "full" | "low";

// Narrow types for the non-standard APIs this heuristic reads. Not in
// lib.dom.d.ts, so declared locally rather than widening `Navigator`.
type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * One-shot heuristic classification of the device's animation budget.
 * Requires 2+ independent weak signals before calling a device "low" — a
 * single signal (e.g. a powerful tablet that happens to report a coarse
 * pointer) isn't enough on its own.
 */
function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "full";
  const nav = navigator as NavigatorWithHints;

  let weakSignals = 0;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) weakSignals++;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) weakSignals++;
  if (window.matchMedia?.("(pointer: coarse)").matches) weakSignals++;
  if (nav.connection?.saveData) weakSignals++;
  if (nav.connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)) weakSignals++;

  return weakSignals >= 2 ? "low" : "full";
}

// Device capabilities don't change at runtime, so there's nothing to
// actually subscribe to — but routing through useSyncExternalStore (rather
// than "compute in an effect, setState on mount") gets us the correct
// getServerSnapshot value for free and avoids the extra post-mount render
// that pattern causes.
function subscribeNoop() {
  return () => {};
}

function getServerTier(): DeviceTier {
  return "full";
}

export function useDeviceTier(): DeviceTier {
  return useSyncExternalStore(subscribeNoop, detectTier, getServerTier);
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion(): boolean {
  return false;
}

/**
 * Combines device tier with the user's explicit prefers-reduced-motion
 * choice into one 3-level intensity: reduced (explicit user preference,
 * always wins) > low (weak device, motion still allowed but trimmed) > full.
 */
export function useAnimationIntensity(): "full" | "low" | "reduced" {
  const tier = useDeviceTier();
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getServerReducedMotion);
  return reduced ? "reduced" : tier;
}
