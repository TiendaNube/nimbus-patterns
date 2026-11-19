import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Box } from "@nimbus-ds/components";

import { useAppShellBodyContext } from "../AppShellBody/AppShellBody.context";
import { AppShellChatProps } from "./AppShellChat.types";

export const APPSHELL_CHAT_DEFAULT_WIDTH = "360px";
const COLLAPSED_WIDTH = APPSHELL_CHAT_DEFAULT_WIDTH;
/** Matches the AppShell.Body right/bottom padding (`spacing-2`) under Norte UI. */
const NORTE_UI_SHELL_GUTTER = "var(--nimbus-spacing-2, 8px)";
const DEFAULT_COLLAPSED_MAX_WIDTH = {
  xs: APPSHELL_CHAT_DEFAULT_WIDTH,
  xxl: "378px",
} as const;

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  expanded: controlledExpanded,
  defaultExpanded = false,
  collapsedWidth,
  resizeHandle,
  ...rest
}: AppShellChatProps) => {
  /** Norte UI card layout (provided by AppShell.Body). */
  const { isCardLayout, chatSlot, bodyElement } = useAppShellBodyContext();
  const placeholderRef = useRef<HTMLDivElement>(null);
  /**
   * Norte UI: measure against the AppShell.Body (the chat itself is portaled
   * into a `display: contents` slot that has no box of its own).
   */
  const getMeasureTarget = useCallback(
    () =>
      (isCardLayout && bodyElement) || placeholderRef.current?.parentElement,
    [isCardLayout, bodyElement]
  );
  const [uncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? uncontrolledExpanded;

  const [portalMounted, setPortalMounted] = useState(false);
  const [portalFullWidth, setPortalFullWidth] = useState(false);
  const [bounds, setBounds] = useState({
    parentLeft: 0,
    parentTop: 0,
    collapsedWidth: COLLAPSED_WIDTH,
  });

  const measureBounds = useCallback(() => {
    const measureTarget = getMeasureTarget();
    if (placeholderRef.current && measureTarget) {
      const placeholderRect = placeholderRef.current.getBoundingClientRect();
      const rect = measureTarget.getBoundingClientRect();
      setBounds({
        collapsedWidth: `${placeholderRect.width}px`,
        parentLeft: rect.left,
        parentTop: rect.top,
      });
    }
  }, [getMeasureTarget]);

  useEffect(() => {
    if (!isExpanded) return undefined;

    measureBounds();

    const parentElement = getMeasureTarget();
    const resizeObserver =
      parentElement && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureBounds)
        : null;

    if (resizeObserver && parentElement) {
      resizeObserver.observe(parentElement);
    }
    window.addEventListener("resize", measureBounds);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureBounds);
    };
  }, [isExpanded, getMeasureTarget, measureBounds]);

  useEffect(() => {
    if (isExpanded) {
      measureBounds();
      setPortalMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPortalFullWidth(true);
        });
      });
    } else {
      setPortalFullWidth(false);
      setPortalMounted(false);
    }
  }, [isExpanded, measureBounds]);

  useEffect(() => {
    if (!isExpanded || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isExpanded]);

  const safeParentLeft = Math.max(bounds.parentLeft, 0);
  const safeParentTop = Math.max(bounds.parentTop, 0);
  const expandedWidth = `calc(100% - ${safeParentLeft}px)`;
  const expandedHeight = `calc(100vh - ${safeParentTop}px)`;

  const collapsedProps = {
    position: "sticky",
    height: "100%",
    maxWidth: collapsedWidth ?? DEFAULT_COLLAPSED_MAX_WIDTH,
    minWidth: collapsedWidth ?? COLLAPSED_WIDTH,
    top: "0",
    flex: "1",
    py: isCardLayout ? undefined : "2",
    mx: isCardLayout ? undefined : "2",
  } as const;

  const expandedProps = {
    position: "fixed",
    top: `${safeParentTop}px`,
    right: "0",
    width: portalFullWidth ? expandedWidth : bounds.collapsedWidth,
    height: expandedHeight,
    zIndex: "500",
    transitionProperty: "width",
    transitionDuration: "fast",
    transitionTimingFunction: "ease-out",
    p: "2",
  } as const;

  /**
   * Norte UI: the chat is a card with the same radius as the content card.
   * Spacing comes from the AppShell.Body gap/padding instead of margins.
   */
  const norteUiCardProps = {
    backgroundColor: "neutral-background",
    borderStyle: "solid",
    borderWidth: "1",
    borderColor: "neutral-surfaceHighlight",
    borderRadius: "3",
    overflow: "hidden",
  } as const;

  const norteUiExpandedProps = {
    ...expandedProps,
    p: "none",
    right: NORTE_UI_SHELL_GUTTER,
    width: portalFullWidth
      ? `calc(100% - ${safeParentLeft}px - ${NORTE_UI_SHELL_GUTTER})`
      : bounds.collapsedWidth,
    height: `calc(100vh - ${safeParentTop}px - ${NORTE_UI_SHELL_GUTTER})`,
  } as const;

  const baseProps = portalMounted ? expandedProps : collapsedProps;
  const cardLayoutProps = portalMounted
    ? { ...norteUiExpandedProps, ...norteUiCardProps }
    : { ...collapsedProps, ...norteUiCardProps };
  const activeProps = isCardLayout ? cardLayoutProps : baseProps;

  /**
   * Norte UI: the handle sits in the gap between the content card and the
   * chat card. The negative margins cancel its width so the gap stays the
   * same as without a handle.
   */
  const handle =
    isCardLayout && resizeHandle ? (
      <div
        style={{
          display: "flex",
          alignSelf: "stretch",
          justifyContent: "center",
          flexShrink: 0,
          width: NORTE_UI_SHELL_GUTTER,
          margin: `0 calc(-1 * ${NORTE_UI_SHELL_GUTTER})`,
        }}
      >
        {resizeHandle}
      </div>
    ) : (
      resizeHandle
    );

  const content = (
    <>
      {handle}
      {portalMounted && (
        <Box
          height="100%"
          maxWidth={collapsedWidth ?? DEFAULT_COLLAPSED_MAX_WIDTH}
          minWidth={collapsedWidth ?? COLLAPSED_WIDTH}
          flex="1"
          py={isCardLayout ? undefined : "2"}
          mx={isCardLayout ? undefined : "2"}
          pointerEvents="none"
          aria-hidden="true"
        />
      )}
      <Box {...activeProps} {...rest} ref={placeholderRef}>
        {children}
      </Box>
    </>
  );

  /**
   * Norte UI: wait for the slot (set on AppShell.Body's first commit) instead
   * of rendering inline first, so the chat content mounts only once.
   */
  if (isCardLayout) {
    return chatSlot ? createPortal(content, chatSlot) : null;
  }

  return content;
};

AppShellChat.displayName = "AppShellChat";

export { AppShellChat };
