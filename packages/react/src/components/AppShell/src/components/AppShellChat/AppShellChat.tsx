import React, { useEffect, useRef, useState } from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellChatProps } from "./AppShellChat.types";

const COLLAPSED_WIDTH = "300px";

const AppShellChat: React.FC<AppShellChatProps> = ({
  children,
  expanded: controlledExpanded,
  defaultExpanded = false,
  ...rest
}: AppShellChatProps) => {
  const [uncontrolledExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded ?? uncontrolledExpanded;

  const placeholderRef = useRef<HTMLDivElement>(null);

  const [portalMounted, setPortalMounted] = useState(false);
  const [portalFullWidth, setPortalFullWidth] = useState(false);
  const [parentLeft, setParentLeft] = useState(0);
  const [parentTop, setParentTop] = useState(0);

  const measureParentBounds = () => {
    if (placeholderRef.current?.parentElement) {
      const rect = placeholderRef.current.parentElement.getBoundingClientRect();
      setParentLeft(rect.left);
      setParentTop(rect.top);
    }
  };

  useEffect(() => {
    if (!isExpanded) return undefined;

    measureParentBounds();

    const parentElement = placeholderRef.current?.parentElement;
    const resizeObserver =
      parentElement && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measureParentBounds)
        : null;

    if (resizeObserver && parentElement) {
      resizeObserver.observe(parentElement);
    }
    window.addEventListener("resize", measureParentBounds);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureParentBounds);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      measureParentBounds();
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
  }, [isExpanded]);

  const safeParentLeft = Math.max(parentLeft, 0);
  const safeParentTop = Math.max(parentTop, 0);
  const expandedWidth = `calc(100% - ${safeParentLeft}px)`;
  const expandedHeight = `calc(100vh - ${safeParentTop}px)`;

  const collapsedProps = {
    position: "sticky" as const,
    height: "100%",
    maxWidth: { xs: "300px", xxl: "378px" } as const,
    minWidth: COLLAPSED_WIDTH,
    top: "0",
    flex: "1",
    py: "2" as const,
    mx: "2" as const,
    zIndex: "700" as const,
  };

  const expandedProps = {
    position: "fixed" as const,
    top: `${safeParentTop}px`,
    right: "0",
    width: portalFullWidth ? expandedWidth : COLLAPSED_WIDTH,
    height: expandedHeight,
    zIndex: "500" as const,
    transitionProperty: "width" as const,
    transitionDuration: "fast" as const,
    transitionTimingFunction: "ease-out" as const,
    p: "2" as const,
  };

  return (
    <>
      {portalMounted && (
        <Box
          height="100%"
          maxWidth={{ xs: "300px", xxl: "378px" }}
          minWidth={COLLAPSED_WIDTH}
          flex="1"
          py="2"
          mx="2"
          pointerEvents="none"
          aria-hidden="true"
        />
      )}
      <Box
        {...(portalMounted ? expandedProps : collapsedProps)}
        {...rest}
        ref={placeholderRef}
      >
        {children}
      </Box>
    </>
  );
};

AppShellChat.displayName = "AppShellChat";

export { AppShellChat };
