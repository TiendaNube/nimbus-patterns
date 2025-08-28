import React, { useCallback, useMemo, useRef, useState } from "react";

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
  menuExpanded: controlledExpanded,
  defaultMenuExpanded = true,
  onMenuExpandedChange,
  menuExpandedWidth = "18rem",
  menuCollapsedWidth = "48px",
  menuBehavior = "inline",
  menuFlyout = { trigger: "manual" },

  ...rest
}: AppShellProps) => {
  const [uncontrolledExpanded] = useState<boolean>(defaultMenuExpanded);
  const expanded =
    controlledExpanded === undefined
      ? uncontrolledExpanded
      : controlledExpanded;

  const menuWidth = String(
    expanded ? menuExpandedWidth : menuCollapsedWidth
  );

  const isPopoverMode = menuBehavior === "popover";

  const {
    trigger: flyoutTrigger = "hover",
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    hoverOpenDelayMs: hoverOpenDelay = 100,
    hoverCloseDelayMs: hoverCloseDelay = 150,
    width: flyoutWidth,
    zIndex: flyoutZIndex,
    ...flyoutBoxProps
  } = menuFlyout ?? {};
  const [uncontrolledFlyoutOpen, setUncontrolledFlyoutOpen] =
    useState(defaultOpen);
  const flyoutOpen =
    controlledOpen === undefined ? uncontrolledFlyoutOpen : controlledOpen;
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
    open: isPopoverMode && !expanded ? flyoutOpen : false,
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

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box {...rest} display="flex">
      {Boolean(menu) && (
        <Box
          {...menuProperties}
          width={menuWidth}
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
          ref={(node) => {
            sidebarRef.current = node;
            refs.setReference(node);
          }}
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
      {isPopoverMode && !expanded && flyoutOpen && (
        <AppShellMenuContext.Provider value={popoverAppShellMenuContext}>
          <FloatingPortal id="nimbus-popover-floating">
            <Box
              backgroundColor="neutral-background"
              boxShadow="2"
              borderStyle="solid"
              borderWidth="none"
              borderRightWidth="1"
              borderColor="neutral-surfaceDisabled"
              {...flyoutBoxProps}
              position="fixed"
              top="0"
              left="0"
              height="100vh"
              width={String(flyoutWidth ?? "18rem")}
              zIndex={flyoutZIndex ?? "900"}
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

AppShell.displayName = "AppShell";
AppShell.Header.displayName = "AppShell.Header";

export { AppShell };
