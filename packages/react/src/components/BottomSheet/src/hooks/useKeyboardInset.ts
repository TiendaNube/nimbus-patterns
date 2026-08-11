import { useEffect, useState } from "react";

interface CapacitorKeyboardInfo {
  keyboardHeight: number;
}

interface CapacitorPluginListenerHandle {
  remove: () => void | Promise<void>;
}

interface CapacitorKeyboardPlugin {
  addListener: (
    eventName: "keyboardWillShow" | "keyboardWillHide",
    listener: (info?: CapacitorKeyboardInfo) => void
  ) => CapacitorPluginListenerHandle | Promise<CapacitorPluginListenerHandle>;
}

interface CapacitorGlobal {
  isPluginAvailable?: (name: string) => boolean;
  Plugins?: Record<string, unknown>;
}

/**
 * Reads the native `Keyboard` plugin off the global `window.Capacitor`
 * object at runtime, without ever importing `@capacitor/keyboard` — most
 * consumers of this component aren't Capacitor apps, and a static import
 * would force that dependency (and break their build if it's absent)
 * instead of degrading gracefully. Mirrors the exact detection pattern
 * Capacitor apps already use themselves (`Capacitor.isPluginAvailable`).
 */
const getCapacitorKeyboardPlugin = (): CapacitorKeyboardPlugin | null => {
  if (typeof window === "undefined") return null;
  const capacitor = (window as { Capacitor?: CapacitorGlobal }).Capacitor;
  if (!capacitor?.isPluginAvailable?.("Keyboard")) return null;
  return (capacitor.Plugins?.Keyboard as CapacitorKeyboardPlugin) ?? null;
};

/** Awaits a (possibly already-sync) listener handle, removing it immediately
 * if the effect was already cleaned up by the time it resolves, or handing
 * the caller a synchronous `remove` once it's safe to keep around. */
const trackListener = (
  handle:
    | CapacitorPluginListenerHandle
    | Promise<CapacitorPluginListenerHandle>,
  isCancelled: () => boolean,
  onReady: (remove: () => void) => void
): void => {
  Promise.resolve(handle).then((resolved) => {
    if (isCancelled()) {
      resolved.remove();
    } else {
      onReady(() => resolved.remove());
    }
  });
};

/**
 * Tracks how much the on-screen keyboard is currently covering the viewport
 * (px). Returns 0 when `active` is false or when neither of the two sources
 * below is available (degrades gracefully instead of throwing).
 *
 * Consumers subtract this from the panel height so the focused input stays
 * above the keyboard instead of being covered by it.
 */
export const useKeyboardInset = (active: boolean): number => {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    if (!active || typeof window === "undefined") {
      setInset(0);
      return undefined;
    }

    const keyboardPlugin = getCapacitorKeyboardPlugin();
    if (keyboardPlugin) {
      // Native app shell (Capacitor): the OS reports the real keyboard
      // height directly through its own plugin bridge, no viewport-metric
      // inference needed. Preferred over the Visual Viewport API below
      // whenever it's available, not used only as a last resort — Capacitor
      // apps manipulate how their WebView itself resizes in ways that make
      // `visualViewport` unreliable there (the same reason Ionic's own
      // modal falls back to this exact native plugin instead of
      // `visualViewport` inside a Capacitor/Cordova shell).
      let cancelled = false;
      let removeShow: (() => void) | undefined;
      let removeHide: (() => void) | undefined;

      trackListener(
        keyboardPlugin.addListener("keyboardWillShow", (info) => {
          setInset(Math.max(0, Math.round(info?.keyboardHeight ?? 0)));
        }),
        () => cancelled,
        (remove) => {
          removeShow = remove;
        }
      );
      trackListener(
        keyboardPlugin.addListener("keyboardWillHide", () => setInset(0)),
        () => cancelled,
        (remove) => {
          removeHide = remove;
        }
      );

      return () => {
        cancelled = true;
        removeShow?.();
        removeHide?.();
        setInset(0);
      };
    }

    if (!window.visualViewport) {
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
    // Also re-run on window's own resize: when the on-screen keyboard opens
    // shortly after the browser's own chrome (address bar/toolbar) already
    // changed size (e.g. the user scrolled the background right before
    // opening the sheet, then focused an input), both the keyboard and a
    // further chrome adjustment can land close together, and which of the
    // two ("window" vs "visualViewport") actually fires its own resize event
    // for a given change isn't reliable on every mobile browser. Reacting to
    // either one — recomputing fresh live reads of both window.innerHeight
    // and the visual viewport's height regardless of which fired — means a
    // change is never missed just because it happened to signal through the
    // "other" event.
    window.addEventListener("resize", handleViewportChange);

    return () => {
      viewport.removeEventListener("resize", handleViewportChange);
      viewport.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      setInset(0);
    };
  }, [active]);

  return inset;
};
