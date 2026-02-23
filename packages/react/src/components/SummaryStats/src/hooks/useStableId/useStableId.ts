import { useRef } from "react";

let idCounter = 0;

/**
 * Generates a unique, stable ID per component instance.
 * Compatible with React 16.8+ (unlike React.useId which requires React 18).
 */
export function useStableId(): string {
  const idRef = useRef<string | null>(null);
  if (idRef.current === null) {
    idCounter += 1;
    idRef.current = `summary-stats-item-${idCounter}`;
  }
  return idRef.current;
}
