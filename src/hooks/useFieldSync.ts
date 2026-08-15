"use client";

import { useCallback, useState } from "react";

type Validator = (value: string) => boolean;

export type FieldStatus = "idle" | "invalid" | "valid";

/**
 * Per-field form state with a validity status suitable for animated
 * feedback (border/check color, shake on failed submit). Deliberately
 * plain useState instead of a form library — this form has 3 fields and
 * doesn't warrant the dependency.
 */
export function useFieldSync(validator: Validator, initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const valid = validator(value);
  const status: FieldStatus = !touched ? "idle" : valid ? "valid" : "invalid";

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  const onBlur = useCallback(() => setTouched(true), []);

  // Called on submit attempt: marks the field touched (so an untouched-but-
  // empty required field turns red instead of staying neutral) and bumps a
  // key to retrigger the shake animation even if it was already shaking.
  const flagIfInvalid = useCallback(() => {
    setTouched(true);
    if (!valid) setShakeKey((k) => k + 1);
    return valid;
  }, [valid]);

  return { value, status, valid, shakeKey, onChange, onBlur, flagIfInvalid };
}
