import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box } from "@nimbus-ds/components";
import { useTheme } from "@nimbus-ds/styles";

import {
  DEFAULT_IGNORE_ATTRIBUTE_NAME,
  DEFAULT_SNAP_INDEX,
  DEFAULT_SNAP_POINTS,
  SETTLE_TRANSITION,
} from "./bottomSheet.constants";
import { BottomSheetProps } from "./bottomSheet.types";
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

const clampIndex = (index: number, length: number) =>
  Math.min(Math.max(index, 0), Math.max(length - 1, 0));

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
  zIndex,
  root,
  ...rest
}) => {
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

  const handleRequestClose = () => onRemove?.();

  const { offset, isDragging, grabberHandlers } = useDragGesture({
    snaps,
    snapIndex,
    containerHeight,
    onSnapChange: setSnapIndex,
    onDismiss: handleRequestClose,
  });

  useScrollLock(open && needRemoveScroll);
  useFocusTrap(panelRef, open);
  useDismissHandlers({
    enabled: open,
    panelRef,
    overlayRef,
    closeOnOutsidePress,
    ignoreAttributeName,
    onRequestClose: handleRequestClose,
  });

  if (!open) return null;

  // Subtracting keyboardInset (rather than leaving height fixed and only
  // moving `bottom`) keeps the panel's top edge stable as the keyboard opens:
  // the panel shrinks from the bottom instead of the whole fixed-height block
  // sliding upward past the top of the viewport.
  const visibleHeight = Math.max(0, containerHeight - offset - keyboardInset);
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
  const ignoreAttributeProps = { [ignoreAttributeName]: "" };

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
          bottom: keyboardInset,
          height: visibleHeight,
          zIndex,
          borderTopLeftRadius: "var(--nimbus-shape-border-radius-6)",
          borderTopRightRadius: "var(--nimbus-shape-border-radius-6)",
          transition: isDragging ? "none" : SETTLE_TRANSITION,
        }}
      >
        <Grabber
          ref={grabberRef}
          onPointerDown={grabberHandlers.onPointerDown}
        />
        <Box display="flex" flexDirection="column" flex="1" minHeight="0">
          {labeledChildren}
        </Box>
      </div>
    </>,
    portalTarget
  );
};

export const BottomSheet = BottomSheetBase as typeof BottomSheetBase & {
  Header: typeof BottomSheetHeader;
  Body: typeof BottomSheetBody;
  Footer: typeof BottomSheetFooter;
};

BottomSheet.Header = BottomSheetHeader;
BottomSheet.Body = BottomSheetBody;
BottomSheet.Footer = BottomSheetFooter;

BottomSheet.displayName = "BottomSheet";
