import { useEffect, useState } from "react";

/**
 * Tracks how much the on-screen keyboard is currently covering the viewport
 * (px), using the Visual Viewport API. Returns 0 when the API is unavailable
 * (degrades gracefully instead of throwing) or when the keyboard is closed.
 *
 * Consumers subtract this from the panel height so the focused input stays
 * above the keyboard instead of being covered by it.
 */
export const useKeyboardInset = (active: boolean): number => {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("[DEBUG-BOTTOMSHEET] effect run", {
      active,
      hasWindow: typeof window !== "undefined",
      hasVisualViewport:
        typeof window !== "undefined" && !!window.visualViewport,
    });
    if (!active || typeof window === "undefined" || !window.visualViewport) {
      setInset(0);
      return undefined;
    }

    const viewport = window.visualViewport;

    const handleViewportChange = () => {
      const covered = window.innerHeight - viewport.height - viewport.offsetTop;
      const next = Math.max(0, Math.round(covered));
      // eslint-disable-next-line no-console
      console.log("[DEBUG-BOTTOMSHEET] handleViewportChange", {
        innerHeight: window.innerHeight,
        viewportHeight: viewport.height,
        offsetTop: viewport.offsetTop,
        covered,
        next,
      });
      setInset(next);
    };

    handleViewportChange();
    viewport.addEventListener("resize", handleViewportChange);
    viewport.addEventListener("scroll", handleViewportChange);
    // eslint-disable-next-line no-console
    console.log("[DEBUG-BOTTOMSHEET] listeners attached to viewport");

    return () => {
      // eslint-disable-next-line no-console
      console.log("[DEBUG-BOTTOMSHEET] effect cleanup");
      viewport.removeEventListener("resize", handleViewportChange);
      viewport.removeEventListener("scroll", handleViewportChange);
      setInset(0);
    };
  }, [active]);

  return inset;
};
