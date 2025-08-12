import React, { useCallback, useState } from "react";

import { Box } from "@nimbus-ds/components";
import {
  FloatingPortal,
  safePolygon,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useFloating,
} from "@floating-ui/react";

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
  const setFlyout = useCallback(
    (open: boolean) => {
      if (controlledFlyoutOpen === undefined) {
        setUncontrolledFlyoutOpen(open);
      }
      onMenuFlyoutOpenChange?.(open);
    },
    [controlledFlyoutOpen, onMenuFlyoutOpenChange]
  );

  // Floating UI interactions
  const { refs, context } = useFloating({
    open: isPopoverMode && !expanded ? flyoutOpen : false,
    onOpenChange: setFlyout,
  });

  const interactions = [] as ReturnType<typeof useHover | typeof useFocus | typeof useDismiss | typeof useRole>[];
  if (menuTrigger === "hover") {
    interactions.push(
      useHover(context, {
        delay: { open: menuHoverOpenDelayMs, close: menuHoverCloseDelayMs },
        handleClose: safePolygon(),
      })
    );
    interactions.push(useFocus(context));
  }
  interactions.push(useDismiss(context, { outsidePress: true, escapeKey: true }));
  interactions.push(useRole(context, { role: "dialog" }));

  const { getReferenceProps, getFloatingProps } = useInteractions(interactions);

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
          ref={refs.setReference}
          {...getReferenceProps()}
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
        <FloatingPortal id="nimbus-popover-floating">
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
            ref={refs.setFloating}
            {...getFloatingProps()}
          >
            <>{expandedContent}</>
          </Box>
        </FloatingPortal>
      )}
    </Box>
  );
};

AppShell.Header = AppShellHeader;

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";

export { AppShell };
