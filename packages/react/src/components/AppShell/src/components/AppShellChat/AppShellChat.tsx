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

  const showChildrenInPlace = !portalMounted;

  const safeParentLeft = Math.max(parentLeft, 0);
  const safeParentTop = Math.max(parentTop, 0);
  const expandedWidth = `calc(100% - ${safeParentLeft}px)`;
  const expandedHeight = `calc(100vh - ${safeParentTop}px)`;

  return (
    <>
      <Box
        height="100%"
        maxWidth={{
          xs: "300px",
          xxl: "378px",
        }}
        minWidth={COLLAPSED_WIDTH}
        top="0"
        flex="1"
        py="2"
        mx="2"
        zIndex={portalMounted ? "100" : "700"}
        pointerEvents={portalMounted ? "none" : "auto"}
        {...rest}
        position="sticky"
        ref={placeholderRef}
      >
        {showChildrenInPlace && children}
      </Box>
      {portalMounted && (
        <Box
          position="fixed"
          top={`${safeParentTop}px`}
          right="0"
          width={portalFullWidth ? expandedWidth : COLLAPSED_WIDTH}
          height={expandedHeight}
          zIndex="500"
          transitionProperty="width"
          transitionDuration="fast"
          transitionTimingFunction="ease-out"
          p="2"
        >
          {children}
        </Box>
      )}
    </>
  );
};

AppShellChat.displayName = "AppShellChat";

export { AppShellChat };
