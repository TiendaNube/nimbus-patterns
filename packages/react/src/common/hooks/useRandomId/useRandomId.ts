import { useRef } from "react";

/**
 * Generates a unique, stable ID per component instance.
 * Compatible with React 16.8+ (unlike React.useId which requires React 18).
 *
 * `@returns` A stable string ID of the form `"summary-stats-item-{n}"`, unique
 *   per component instance and consistent across re-renders.
 *
 * `@example`
 * const id = useStableId(); // "summary-stats-item-1"
 */
export function useRandomId(): string {
  const idRef = useRef<string | null>(null);
  idRef.current ??= Math.random().toString(36).substring(2, 9);
  return idRef.current;
}
