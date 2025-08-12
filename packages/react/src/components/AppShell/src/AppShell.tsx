import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellHeader } from "./components";

import { AppShellProps, AppShellComponents } from "./appShell.types";

const AppShell: React.FC<AppShellProps> & AppShellComponents = ({
  className: _className,
  style: _style,
  children,
  menu,
  menuProperties = {
    display: {
      xs: "none",
      md: "block",
    },
  },
  menuExpanded: controlledExpanded,
  defaultMenuExpanded = true,
  onMenuExpandedChange,
  menuExpandedWidth = "18rem",
  menuCollapsedWidth = "4rem",
  menuBehavior = "inline",
  menuTrigger = "hover",
  menuCollapsed,
  menuExpandedContent,
  menuPopoverWidth,
  menuPopoverZIndex = "900",
  menuHoverOpenDelayMs = 100,
  menuHoverCloseDelayMs = 150,
  menuFlyoutOpen: controlledFlyoutOpen,
  defaultMenuFlyoutOpen = false,
  onMenuFlyoutOpenChange,
  ...rest
}: AppShellProps) => {
  const [uncontrolledExpanded] = useState<boolean>(defaultMenuExpanded);
  const expanded =
    controlledExpanded === undefined
      ? uncontrolledExpanded
      : controlledExpanded;

  const sidebarWidth = String(
    expanded ? menuExpandedWidth : menuCollapsedWidth
  );

  const isPopoverMode = menuBehavior === "popover";
  const [uncontrolledFlyoutOpen, setUncontrolledFlyoutOpen] = useState(
    defaultMenuFlyoutOpen
  );
  const flyoutOpen =
    controlledFlyoutOpen === undefined
      ? uncontrolledFlyoutOpen
      : controlledFlyoutOpen;
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimeoutRef.current) {
      window.clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimeoutRef.current = window.setTimeout(
      () => setFlyout(true),
      menuHoverOpenDelayMs
    );
  }, [clearTimers, menuHoverOpenDelayMs]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimeoutRef.current = window.setTimeout(
      () => setFlyout(false),
      menuHoverCloseDelayMs
    );
  }, [clearTimers, menuHoverCloseDelayMs]);

  const handleRailMouseEnter = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleOpen();
  }, [isPopoverMode, expanded, menuTrigger, scheduleOpen]);

  const handleRailMouseLeave = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleClose();
  }, [isPopoverMode, expanded, menuTrigger, scheduleClose]);

  const handleOverlayMouseEnter = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleOpen();
  }, [isPopoverMode, expanded, menuTrigger, scheduleOpen]);

  const handleOverlayMouseLeave = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleClose();
  }, [isPopoverMode, expanded, menuTrigger, scheduleClose]);

  const handleRailFocus = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleOpen();
  }, [isPopoverMode, expanded, menuTrigger, scheduleOpen]);

  const handleRailBlur = useCallback(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "hover") return;
    scheduleClose();
  }, [isPopoverMode, expanded, menuTrigger, scheduleClose]);

  const handleOverlayFocus = handleRailFocus;
  const handleOverlayBlur = handleRailBlur;

  const setFlyout = useCallback(
    (open: boolean) => {
      if (controlledFlyoutOpen === undefined) {
        setUncontrolledFlyoutOpen(open);
      }
      onMenuFlyoutOpenChange?.(open);
    },
    [controlledFlyoutOpen, onMenuFlyoutOpenChange]
  );

  useEffect(() => {
    if (!isPopoverMode || expanded || menuTrigger !== "manual" || !flyoutOpen)
      return;

    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const railEl = railRef.current;
      const overlayEl = overlayRef.current;
      if (!railEl || !overlayEl) return;
      const clickedOutside =
        target &&
        !railEl.contains(target) &&
        !overlayEl.contains(target);
      if (clickedOutside) setFlyout(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlyout(false);
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopoverMode, expanded, menuTrigger, flyoutOpen, setFlyout]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const collapsedContent = menuCollapsed ?? menu;
  const expandedContent = menuExpandedContent ?? menu;
  const hasMenu = Boolean(collapsedContent || expandedContent);

  return (
    <Box {...rest} display="flex">
      {hasMenu && (
        <Box
          {...menuProperties}
          width={sidebarWidth}
          height="100vh"
          position="sticky"
          top="0"
          left="0"
          borderStyle="solid"
          borderWidth="none"
          borderRightWidth="1"
          borderColor="neutral-surfaceDisabled"
          transitionProperty="all"
          transitionDuration="base"
          transitionTimingFunction="ease-in-out"
          ref={railRef}
          onMouseEnter={handleRailMouseEnter}
          onMouseLeave={handleRailMouseLeave}
          onFocus={handleRailFocus}
          onBlur={handleRailBlur}
          // In manual or hover triggers, clicks on rail should not auto-open the popover
        >
          <>{expanded ? expandedContent : collapsedContent}</>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        flex="1 1 auto"
        backgroundColor="neutral-surface"
        width="100%"
      >
        {children}
      </Box>
      {isPopoverMode && !expanded && flyoutOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          height="100vh"
          width={String(menuPopoverWidth ?? menuExpandedWidth)}
          zIndex={menuPopoverZIndex}
          backgroundColor="neutral-background"
          boxShadow="2"
          borderStyle="solid"
          borderWidth="none"
          borderRightWidth="1"
          borderColor="neutral-surfaceDisabled"
          onMouseEnter={handleOverlayMouseEnter}
          onMouseLeave={handleOverlayMouseLeave}
          onFocus={handleOverlayFocus}
          onBlur={handleOverlayBlur}
          ref={overlayRef}
        >
          <>{expandedContent}</>
        </Box>
      )}
    </Box>
  );
};

AppShell.Header = AppShellHeader;

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";

export { AppShell };
