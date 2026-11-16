import React, { useMemo, useState } from "react";

import { Box } from "@nimbus-ds/components";

import { useIsNorteUiTheme } from "../../hooks";
import { useAppShellLayoutContext } from "../../contexts/AppShellLayoutContext";
import { AppShellBodyContext } from "./AppShellBody.context";
import { AppShellBodyProps } from "./AppShellBody.types";

const AppShellBody: React.FC<AppShellBodyProps> = ({
  children,
  ...rest
}: AppShellBodyProps) => {
  const isNorteUi = useIsNorteUiTheme();
  const { hasMenu } = useAppShellLayoutContext();
  /** Norte UI draws the content card only when a menu sits next to it. */
  const isCardLayout = isNorteUi && hasMenu;
  const [bodyElement, setBodyElement] = useState<HTMLDivElement | null>(null);
  const [chatSlot, setChatSlot] = useState<HTMLDivElement | null>(null);

  const contextValue = useMemo(
    () => ({ isCardLayout: true, chatSlot, bodyElement }),
    [chatSlot, bodyElement]
  );

  if (!isCardLayout) {
    return (
      <Box
        backgroundColor={isNorteUi ? "neutral-background" : "neutral-surface"}
        width="100%"
        overflow="auto"
        height="100%"
        {...rest}
        flex="1 1 auto"
        display="flex"
      >
        {children}
      </Box>
    );
  }

  /**
   * Norte UI: the page content lives inside a rounded "content card" that is
   * the scroll container. AppShell.Chat portals into the slot rendered next
   * to the card, so it becomes a sibling card wherever it is nested.
   * Below `md` (where AppShell hides the menu) the card chrome is removed.
   */
  return (
    <AppShellBodyContext.Provider value={contextValue}>
      <Box
        backgroundColor="neutral-surfaceDisabled"
        width="100%"
        height="100%"
        minHeight="0"
        overflow="hidden"
        gap={{ xs: "none", md: "2" }}
        paddingRight={{ xs: "none", md: "2" }}
        paddingBottom={{ xs: "none", md: "2" }}
        {...rest}
        ref={setBodyElement}
        flex="1 1 auto"
        display="flex"
      >
        <Box
          display="flex"
          flex="1 1 auto"
          minWidth="0"
          height="100%"
          overflow="auto"
          backgroundColor="neutral-background"
          borderStyle="solid"
          borderWidth={{ xs: "none", md: "1" }}
          borderColor="neutral-surfaceHighlight"
          borderRadius={{ xs: "none", md: "3" }}
        >
          {children}
        </Box>
        <div ref={setChatSlot} style={{ display: "contents" }} />
      </Box>
    </AppShellBodyContext.Provider>
  );
};

export { AppShellBody };
