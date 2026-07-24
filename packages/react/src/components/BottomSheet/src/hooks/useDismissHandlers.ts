import { RefObject, useEffect } from "react";

import { CloseOnOutsidePress } from "../bottomSheet.types";

/**
 * Tracks currently-enabled sheet instances in mount order (same convention as
 * their DOM stacking: later-mounted is on top). Escape is a single
 * document-level event that every open sheet listens for independently, so
 * without this only the topmost instance may act on it — otherwise one
 * Escape press would close every open sheet at once.
 */
const openSheets: object[] = [];

interface UseDismissHandlersOptions {
  /** Whether the handlers are active (sheet open). */
  enabled: boolean;
  /** The sheet panel; presses inside it never dismiss. */
  panelRef: RefObject<HTMLElement | null>;
  /** The dimmed overlay; a press on it is the canonical outside press. */
  overlayRef: RefObject<HTMLElement | null>;
  /** boolean or predicate controlling dismissal on outside press. */
  closeOnOutsidePress?: boolean | CloseOnOutsidePress;
  /** Attribute that marks elements whose presses must be ignored. */
  ignoreAttributeName: string;
  /** Requests close (defers the actual visibility change to the consumer). */
  onRequestClose: () => void;
}

/**
 * Wires Escape-to-close and outside-press-to-close for the sheet.
 *
 * A press that lands inside the panel never closes. A press on the overlay is
 * the canonical outside press. A press elsewhere is ignored when it carries
 * `ignoreAttributeName` (the convention other BottomSheet instances use to
 * mark their own overlay/panel), or when it lands inside a
 * `[data-floating-ui-portal]` — the wrapper every floating-ui-based Nimbus
 * overlay (Popover, Modal, Sidebar) renders its content into. Without the
 * latter check, dismissing a Modal opened from inside the sheet (e.g.
 * clicking its own backdrop or close button) would also register as an
 * outside press against the sheet and close it too, since Nimbus's own
 * overlays don't tag themselves with `ignoreAttributeName` — that's purely
 * our own cross-instance convention. The whole check is gated by
 * `closeOnOutsidePress`.
 */
export const useDismissHandlers = ({
  enabled,
  panelRef,
  overlayRef,
  closeOnOutsidePress = true,
  ignoreAttributeName,
  onRequestClose,
}: UseDismissHandlersOptions): void => {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return undefined;

    const token = {};
    openSheets.push(token);

    const shouldClose = (event: PointerEvent | MouseEvent) =>
      typeof closeOnOutsidePress === "function"
        ? closeOnOutsidePress(event)
        : closeOnOutsidePress;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      // Inside the panel content: never a dismiss.
      if (panelRef.current?.contains(target)) return;

      const isOverlayPress = overlayRef.current?.contains(target) ?? false;

      // Elsewhere (above the overlay, e.g. a portaled Popover/Modal/Sidebar):
      // ignore presses on other overlays so they don't close the sheet.
      if (
        !isOverlayPress &&
        target instanceof Element &&
        target.closest(`[${ignoreAttributeName}], [data-floating-ui-portal]`)
      ) {
        return;
      }

      if (shouldClose(event)) onRequestClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Only the topmost open sheet reacts; others ignore the same press.
      if (openSheets.at(-1) !== token) return;
      onRequestClose();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
      const index = openSheets.indexOf(token);
      if (index !== -1) openSheets.splice(index, 1);
    };
  }, [
    enabled,
    panelRef,
    overlayRef,
    closeOnOutsidePress,
    ignoreAttributeName,
    onRequestClose,
  ]);
};
