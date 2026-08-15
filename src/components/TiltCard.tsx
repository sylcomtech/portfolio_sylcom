"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useAnimationIntensity } from "@/hooks/useDeviceTier";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // 3D tilt has no cheap middle ground (it's a per-frame pointermove ->
  // radial-gradient recompute) — the "low" device tier disables it outright
  // rather than trying to do a lighter version. Hook called unconditionally
  // (never short-circuited by reduceMotion) to keep hook order stable.
  const intensity = useAnimationIntensity();
  const tiltDisabled = reduceMotion || intensity !== "full";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const spring = { stiffness: 260, damping: 14, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [24, -24]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-24, 24]), spring);
  const scaleSpring = useSpring(scale, spring);
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, rgba(210,79,220,0.35), transparent 70%)`;

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (tiltDisabled || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerEnter() {
    if (tiltDisabled) return;
    scale.set(1.05);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={
        tiltDisabled
          ? undefined
          : { rotateX, rotateY, scale: scaleSpring, transformPerspective: 700 }
      }
      className={`group relative ${className}`}
    >
      {!tiltDisabled && (
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
      {children}
    </motion.div>
  );
}
