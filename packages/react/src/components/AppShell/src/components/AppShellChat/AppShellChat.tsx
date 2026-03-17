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
  const [bounds, setBounds] = useState({
    parentLeft: 0,
    parentTop: 0,
    collapsedWidth: COLLAPSED_WIDTH,
  });

  const measureBounds = () => {
    if (placeholderRef.current?.parentElement) {
      const placeholderRect = placeholderRef.current.getBoundingClientRect();
      const rect = placeholderRef.current.parentElement.getBoundingClientRect();
      setBounds({
        collapsedWidth: `${placeholderRect.width}px`,
        parentLeft: rect.left,
        parentTop: rect.top,
      });
    }
  };

  useEffect(() => {
    if (!isExpanded) return undefined;

    measureBounds();

    const parentElement = placeholderRef.current?.parentElement;
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
  }, [isExpanded]);

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
  }, [isExpanded]);

  const safeParentLeft = Math.max(bounds.parentLeft, 0);
  const safeParentTop = Math.max(bounds.parentTop, 0);
  const expandedWidth = `calc(100% - ${safeParentLeft}px)`;
  const expandedHeight = `calc(100vh - ${safeParentTop}px)`;

  const collapsedProps = {
    position: "sticky",
    height: "100%",
    maxWidth: { xs: "300px", xxl: "378px" },
    minWidth: COLLAPSED_WIDTH,
    top: "0",
    flex: "1",
    py: "2",
    mx: "2",
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
