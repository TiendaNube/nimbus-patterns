import React, { useCallback, useMemo, useState } from "react";

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

import { AppShellHeader, AppShellBody, AppShellChat } from "./components";

import { AppShellProps, AppShellComponents } from "./appShell.types";
import { AppShellMenuContext } from "./contexts/AppShellMenuContext";

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
  menuExpanded,
  menuExpandedWidth = "18rem",
  menuCollapsedWidth = "48px",
  menuBehavior = "inline",
  menuFlyout = { trigger: "manual" },
  ...rest
}: AppShellProps) => {
  const isPopoverMode = menuBehavior === "popover";

  const {
    trigger: flyoutTrigger = "hover",
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    hoverOpenDelayMs: hoverOpenDelay = 100,
    hoverCloseDelayMs: hoverCloseDelay = 150,
    ...flyoutBoxProps
  } = menuFlyout ?? {};
  const [uncontrolledFlyoutOpen, setUncontrolledFlyoutOpen] =
    useState(defaultOpen);
  const flyoutOpen = controlledOpen ?? uncontrolledFlyoutOpen;
  const setFlyout = useCallback(
    (open: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledFlyoutOpen(open);
      }
      onOpenChange?.(open);
    },
    [controlledOpen, onOpenChange]
  );

  // Floating UI interactions
  const { refs, context } = useFloating({
    open: isPopoverMode ? flyoutOpen : false,
    onOpenChange: setFlyout,
  });

  const hover = useHover(context, {
    delay: { open: hoverOpenDelay, close: hoverCloseDelay },
    handleClose: safePolygon(),
    enabled: flyoutTrigger === "hover",
  });
  const focus = useFocus(context, { enabled: flyoutTrigger === "hover" });
  const dismiss = useDismiss(context, { outsidePress: true, escapeKey: true });
  const role = useRole(context, { role: "dialog" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const appShellMenuContext = useMemo(
    () => ({
      isMenuPopover: false,
    }),
    []
  );

  const popoverAppShellMenuContext = useMemo(
    () => ({
      isMenuPopover: true,
    }),
    []
  );

  return (
    <Box {...rest} display="flex">
      {menu && (
        <Box
          {...menuProperties}
          width={menuExpanded ? menuExpandedWidth : menuCollapsedWidth}
          height="100vh"
          position="sticky"
          top="0"
          left="0"
          borderStyle="solid"
          borderWidth="none"
          borderRightWidth="1"
          borderColor="neutral-surfaceDisabled"
          transitionProperty="width"
          transitionDuration="fast"
          transitionTimingFunction="ease-out"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <AppShellMenuContext.Provider value={appShellMenuContext}>
            {menu}
          </AppShellMenuContext.Provider>
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
      {isPopoverMode && flyoutOpen && (
        <AppShellMenuContext.Provider value={popoverAppShellMenuContext}>
          <FloatingPortal id="nimbus-popover-floating">
            <Box
              backgroundColor="neutral-background"
              boxShadow="2"
              borderStyle="solid"
              borderWidth="none"
              borderRightWidth="1"
              borderColor="neutral-surfaceDisabled"
              width="18rem"
              {...flyoutBoxProps}
              position="fixed"
              top="0"
              left="0"
              zIndex="900"
              height="100vh"
              ref={refs.setFloating}
              {...getFloatingProps()}
            >
              {menu}
            </Box>
          </FloatingPortal>
        </AppShellMenuContext.Provider>
      )}
    </Box>
  );
};

AppShell.Header = AppShellHeader;
AppShell.Body = AppShellBody;
AppShell.Chat = AppShellChat;

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";
AppShell.Body.displayName = "AppShell.Body";
AppShell.Chat.displayName = "AppShell.Chat";

export { AppShell };
