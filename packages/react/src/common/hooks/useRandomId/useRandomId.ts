import { useRef } from "react";

/**
 * Generates a random, stable ID per component instance.
 * Compatible with React 16.8+ (unlike React.useId which requires React 18).
 */
export function useRandomId(): string {
  const idRef = useRef<string | null>(null);
  idRef.current ??= Math.random().toString(36).substring(2, 9);
  return idRef.current;
}
