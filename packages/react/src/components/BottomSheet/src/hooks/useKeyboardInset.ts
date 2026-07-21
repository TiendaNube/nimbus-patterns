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
    if (!active || typeof window === "undefined" || !window.visualViewport) {
      setInset(0);
      return undefined;
    }

    const viewport = window.visualViewport;

    const handleViewportChange = () => {
      // window.innerHeight (the layout viewport) and viewport.height (the
      // visual viewport) shrink TOGETHER when the browser's own chrome
      // (address bar/toolbar) shows, since that genuinely reduces the page's
      // real layout space — useSnapPoints's containerHeight (itself read
      // from window.innerHeight) already accounts for that. The on-screen
      // keyboard, in contrast, only shrinks the visual viewport: it covers
      // part of the page without changing its layout at all. Reading both
      // live in the same handler call means a chrome-driven change cancels
      // out in this subtraction (both operands shrink equally), isolating
      // only the keyboard's own contribution — so this is never a redundant,
      // second deduction on top of what containerHeight already subtracted.
      const covered = window.innerHeight - viewport.height - viewport.offsetTop;
      setInset(Math.max(0, Math.round(covered)));
    };

    handleViewportChange();
    viewport.addEventListener("resize", handleViewportChange);
    viewport.addEventListener("scroll", handleViewportChange);

    return () => {
      viewport.removeEventListener("resize", handleViewportChange);
      viewport.removeEventListener("scroll", handleViewportChange);
      setInset(0);
    };
  }, [active]);

  return inset;
};
