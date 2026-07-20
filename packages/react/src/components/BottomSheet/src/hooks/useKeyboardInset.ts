import { useEffect, useRef, useState } from "react";

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
  const maxViewportHeightRef = useRef(0);

  useEffect(() => {
    if (!active || typeof window === "undefined" || !window.visualViewport) {
      setInset(0);
      return undefined;
    }

    const viewport = window.visualViewport;
    maxViewportHeightRef.current = viewport.height;

    const handleViewportChange = () => {
      // Deliberately not window.innerHeight: on mobile browsers it tracks the
      // layout viewport, which the browser's own chrome (address bar/toolbar)
      // grows or shrinks based on the page's scroll position *before* the
      // sheet ever opened, independent of the keyboard — and once the sheet
      // locks background scroll, that chrome state can no longer change on
      // its own, so it stays wrong for as long as the sheet is open. Tracking
      // the visual viewport's own largest-seen height instead is immune to
      // that: it only actually shrinks when the keyboard covers part of it.
      if (viewport.height > maxViewportHeightRef.current) {
        maxViewportHeightRef.current = viewport.height;
      }
      const covered =
        maxViewportHeightRef.current - viewport.height - viewport.offsetTop;
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
