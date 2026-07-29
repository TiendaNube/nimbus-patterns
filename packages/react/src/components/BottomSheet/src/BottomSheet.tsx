import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "@nimbus-ds/components";
import { useTheme } from "@nimbus-ds/styles";

import {
  DEFAULT_GRABBER_LABEL,
  DEFAULT_IGNORE_ATTRIBUTE_NAME,
  DEFAULT_SNAP_INDEX,
  DEFAULT_SNAP_POINTS,
  SETTLE_TRANSITION,
} from "./bottomSheet.constants";
import { BottomSheetComponents, BottomSheetProps } from "./bottomSheet.types";
import { clampIndex, isValidAttributeName } from "./bottomSheet.utils";
import { useDismissHandlers } from "./hooks/useDismissHandlers";
import { useDragGesture } from "./hooks/useDragGesture";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useKeyboardInset } from "./hooks/useKeyboardInset";
import { useScrollLock } from "./hooks/useScrollLock";
import { useSnapPoints } from "./hooks/useSnapPoints";
import { BottomSheetBody } from "./subcomponents/BottomSheetBody";
import { BottomSheetFooter } from "./subcomponents/BottomSheetFooter";
import { BottomSheetHeader } from "./subcomponents/BottomSheetHeader";
import { Grabber } from "./subcomponents/Grabber";

let headerIdCounter = 0;

const BottomSheetBase: React.FC<BottomSheetProps> = ({
  open = false,
  onRemove,
  snapPoints = [...DEFAULT_SNAP_POINTS],
  defaultSnap = DEFAULT_SNAP_INDEX,
  children,
  closeOnOutsidePress = true,
  ignoreAttributeName = DEFAULT_IGNORE_ATTRIBUTE_NAME,
  needRemoveScroll = true,
  grabberLabel = DEFAULT_GRABBER_LABEL,
  zIndex,
  root,
  ...rest
}) => {
  // Falls back to the default convention instead of trusting a
  // consumer-supplied string outright: this same value is later used both as
  // a literal DOM attribute name (`setAttribute` throws `InvalidCharacterError`
  // on an invalid one) and inside a CSS attribute selector (`Element.closest()`
  // throws a `SyntaxError` on an invalid one) — degrading here once, instead
  // of crashing render or every future pointerdown on the page.
  const safeIgnoreAttributeName = isValidAttributeName(ignoreAttributeName)
    ? ignoreAttributeName
    : DEFAULT_IGNORE_ATTRIBUTE_NAME;

  const [snapIndex, setSnapIndex] = useState(() =>
    clampIndex(defaultSnap, snapPoints.length)
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const grabberRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  rootRef.current = root ?? null;
  // Stable fallback id for associating BottomSheet.Header with the dialog via
  // aria-labelledby when the consumer hasn't provided their own aria-label(ledby).
  // A plain ref (not React's useId) so this also works on React 16.8/17, which
  // this package's peerDependencies still allow.
  const fallbackHeaderIdRef = useRef<string | undefined>(undefined);
  if (!fallbackHeaderIdRef.current) {
    headerIdCounter += 1;
    fallbackHeaderIdRef.current = `bottom-sheet-header-${headerIdCounter}`;
  }

  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) {
      wasOpenRef.current = false;
      return;
    }
    if (!wasOpenRef.current) {
      // Opening transition: (re)initialize from defaultSnap.
      setSnapIndex(clampIndex(defaultSnap, snapPoints.length));
    } else {
      // Already open and snapPoints changed: keep the current snap, just
      // clamp it back in bounds if the array got shorter.
      setSnapIndex((current) => clampIndex(current, snapPoints.length));
    }
    wasOpenRef.current = true;
    // defaultSnap intentionally excluded: it should only apply at the moment
    // of opening, not on every render while already open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, snapPoints.length]);

  const { snaps, containerHeight } = useSnapPoints(snapPoints, rootRef);
  const keyboardInset = useKeyboardInset(open);
  const { refThemeProvider } = useTheme();

  // Stable across renders (deps only on `onRemove`) so useDismissHandlers'
  // effect — which depends on this identity to know when to re-subscribe —
  // doesn't tear down and re-run on every unrelated re-render of an open
  // sheet (e.g. a window resize updating containerHeight/keyboardInset). A
  // fresh function every render would re-push this sheet's token to the end
  // of useDismissHandlers' shared `openSheets` stack each time, corrupting
  // "last pushed = topmost" for Escape when another sheet is stacked above
  // (or below) it.
  const handleRequestClose = useCallback(() => onRemove?.(), [onRemove]);

  const { offset, isDragging, grabberHandlers } = useDragGesture({
    snaps,
    snapIndex,
    containerHeight,
    onSnapChange: setSnapIndex,
    onDismiss: handleRequestClose,
  });

  useScrollLock(open && needRemoveScroll, panelRef);
  useFocusTrap(panelRef, open);
  useDismissHandlers({
    enabled: open,
    panelRef,
    overlayRef,
    closeOnOutsidePress,
    ignoreAttributeName: safeIgnoreAttributeName,
    onRequestClose: handleRequestClose,
  });

  if (!open) return null;

  const visibleHeight = Math.max(0, containerHeight - offset);
  // Square off the top corners once the panel's own top edge reaches the
  // viewport's top edge (the "full" snap, or any drag that reaches flush with
  // it) — a rounded corner only reads as "a sheet" while there's visible
  // background around it; flush with the top, on-screen it just looks like a
  // rendering glitch instead of a deliberate full-screen transition.
  //
  // `containerHeight > 0` excludes the pre-measurement render: useSnapPoints
  // starts containerHeight at 0 and only measures the real value inside a
  // useEffect (after the first commit), so every snap's offset is 0 on that
  // first render regardless of which one is active. Without this guard,
  // every open — not just "full" — would start flush (square corners, hidden
  // grabber pill) and animate to its real state once measured, instead of
  // opening already correct.
  const isFlushWithTop = containerHeight > 0 && offset <= 0;
  // Defaults to the nearest Nimbus <ThemeProvider>'s own wrapper element
  // (refThemeProvider), not document.body directly. This matches the
  // convention Sidebar/Modal/Popover already follow internally: they all
  // portal into refThemeProvider.current so their CSS variables resolve
  // (theme classes are scoped to that div, not applied globally) AND so they
  // stack correctly against each other via DOM mount order. Portaling
  // straight to document.body instead put this sheet outside that shared
  // container, ahead of (i.e. visually under) any Popover/Sidebar/Modal that
  // portals into it — a Popover opened from inside the sheet would render
  // behind it. Falls back to document.body only when no ThemeProvider is
  // present at all.
  const portalTarget =
    typeof document !== "undefined"
      ? root ?? refThemeProvider?.current ?? document.body
      : null;
  if (!portalTarget) return null;

  const { style: consumerStyle, ...restProps } = rest;
  // Give the dialog an accessible name from its own Header when the consumer
  // hasn't explicitly labeled it themselves. Finds the BottomSheet.Header
  // among children, tags it with a stable id (or reuses one the consumer
  // already set), and points aria-labelledby at it.
  const hasExplicitAccessibleName =
    "aria-label" in restProps || "aria-labelledby" in restProps;
  let headerId: string | undefined;
  const labeledChildren = hasExplicitAccessibleName
    ? children
    : React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === BottomSheetHeader) {
          const headerElement = child as React.ReactElement<{ id?: string }>;
          headerId = headerElement.props.id ?? fallbackHeaderIdRef.current;
          return React.cloneElement(headerElement, { id: headerId });
        }
        return child;
      });
  // Marks this sheet's own overlay/panel so that OTHER already-open
  // BottomSheet instances (or Popovers) treat presses inside them as
  // "ignored" rather than an outside press. Without this, sheet #2's portal
  // is a DOM sibling of sheet #1's, so touching sheet #2 would otherwise look
  // like an outside press to sheet #1's own dismiss handler and close it.
  const ignoreAttributeProps = { [safeIgnoreAttributeName]: "" };

  // Plain elements (not Box) below: Box silently drops any caller-provided
  // `style` prop (it only forwards its own sprinkle-computed style), so the
  // dynamic geometry this component needs (bottom/height/zIndex/transition,
  // top-only corner radius) must be applied via native inline style instead.
  //
  // No default `zIndex`: Nimbus's own Sidebar/Modal render with no z-index at
  // all and rely purely on DOM mount order (their portal is appended to
  // document.body, and later-appended siblings paint on top of earlier ones
  // when neither has an explicit z-index). Popover follows the same
  // convention — it never sets a z-index either. Giving BottomSheet a
  // default explicit z-index broke that: any explicit positive z-index
  // always paints above an element left at the default `z-index: auto`,
  // regardless of DOM/open order, so a Popover opened from inside the sheet
  // would render underneath it. `zIndex` here is only applied if the
  // consumer explicitly passes it (an escape hatch), never by default.
  return createPortal(
    <>
      <div
        ref={overlayRef}
        {...ignoreAttributeProps}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--nimbus-colors-neutral-textHigh)",
          opacity: 0.4,
          zIndex,
        }}
      />
      {/*
        No `overflow: hidden` here on purpose. Nimbus's Popover isn't
        portaled (it renders in place, positioned via floating-ui), so it
        lives as a DOM descendant of this panel whenever it's opened from
        content inside the sheet. An `overflow: hidden` ancestor clips that
        floating content instead of letting it visually escape above the
        sheet. The rounded top corners still render correctly without it
        (a box always clips its own background/border to its own
        border-radius) since Header/Body/Footer don't paint a separate
        background layer that could bleed past the corners. Body's own
        `minHeight="0"` + `overflowY="auto"` (see BottomSheetBody) is what
        keeps its content properly clipped/scrollable, so the outer panel
        doesn't need to clip anything itself.
      */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={hasExplicitAccessibleName ? undefined : headerId}
        tabIndex={-1}
        {...ignoreAttributeProps}
        {...restProps}
        style={{
          ...consumerStyle,
          position: "fixed",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--nimbus-colors-neutral-background)",
          boxSizing: "border-box",
          bottom: 0,
          height: visibleHeight,
          // Panel stays flush to the viewport's bottom edge and reserves
          // keyboardInset as its OWN padding instead of shrinking/lifting the
          // whole panel by that amount. Lifting it relied on keyboardInset
          // being an exact match for how much of the viewport the keyboard
          // covers — inherently approximate on mobile web (the browser's own
          // chrome, e.g. the address bar, can be resizing at the same moment,
          // and Visual Viewport API updates aren't perfectly synced with
          // either) — so any shortfall exposed the real page behind the sheet
          // through the gap. Padding fills that same shortfall with this
          // panel's own background instead, the same technique native apps
          // and Ionic's own modal use (insetting the content, not shrinking
          // the sheet) for this platform gap. Grabber/Header/Body/Footer land
          // at the same visual position the old shrink-and-lift model put
          // them at either way.
          paddingBottom: keyboardInset,
          zIndex,
          borderTopLeftRadius: isFlushWithTop
            ? 0
            : "var(--nimbus-shape-border-radius-6)",
          borderTopRightRadius: isFlushWithTop
            ? 0
            : "var(--nimbus-shape-border-radius-6)",
          transition: isDragging ? "none" : SETTLE_TRANSITION,
        }}
      >
        <Grabber
          ref={grabberRef}
          onPointerDown={grabberHandlers.onPointerDown}
          snapIndex={snapIndex}
          snapCount={snaps.length}
          onSnapChange={setSnapIndex}
          pillHidden={isFlushWithTop}
          label={grabberLabel}
        />
        <Box display="flex" flexDirection="column" flex="1" minHeight="0">
          {labeledChildren}
        </Box>
      </div>
    </>,
    portalTarget
  );
};

/**
 * A mobile-first modal sheet that slides up from the bottom edge, with
 * configurable snap points and a pointer-driven drag gesture to resize
 * between them or dismiss by dragging down.
 *
 * Controlled via `open`/`onRemove`, the same contract as `Sidebar`: the
 * component never changes its own visibility, it only requests to close (via
 * overlay press, Escape, or a downward dismiss gesture) — the consumer sets
 * `open` to `false` in response.
 *
 * Compose with `BottomSheet.Header` (optional), `BottomSheet.Body`
 * (required), and `BottomSheet.Footer` (optional) as `children`.
 *
 * Behaves as a modal: renders as `role="dialog"`/`aria-modal="true"`, dims
 * and blocks the background, traps focus while open, and restores it to the
 * previously focused element on close. Automatically labels the dialog via
 * `aria-labelledby` pointing at `BottomSheet.Header` when one is present;
 * pass an explicit `aria-label`/`aria-labelledby` to override that.
 */
export const BottomSheet = BottomSheetBase as typeof BottomSheetBase &
  BottomSheetComponents;

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;

BottomSheet.displayName = "BottomSheet";
BottomSheet.Header.displayName = "BottomSheet.Header";
BottomSheet.Body.displayName = "BottomSheet.Body";
BottomSheet.Footer.displayName = "BottomSheet.Footer";
