import React, { useMemo, useState } from "react";

import { Box } from "@nimbus-ds/components";

import { useIsNorteUiTheme } from "../../hooks";
import { AppShellBodyContext } from "./AppShellBody.context";
import { AppShellBodyProps } from "./AppShellBody.types";

const AppShellBody: React.FC<AppShellBodyProps> = ({
  children,
  ...rest
}: AppShellBodyProps) => {
  const isNorteUi = useIsNorteUiTheme();
  const [bodyElement, setBodyElement] = useState<HTMLDivElement | null>(null);
  const [chatSlot, setChatSlot] = useState<HTMLDivElement | null>(null);

  const contextValue = useMemo(
    () => ({ chatSlot, bodyElement }),
    [chatSlot, bodyElement]
  );

  if (!isNorteUi) {
    return (
      <Box
        backgroundColor="neutral-surface"
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
   */
  return (
    <AppShellBodyContext.Provider value={contextValue}>
      <Box
        backgroundColor="neutral-surfaceDisabled"
        width="100%"
        height="100%"
        minHeight="0"
        overflow="hidden"
        gap="2"
        paddingRight="2"
        paddingBottom="2"
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
          borderWidth="1"
          borderColor="neutral-surfaceHighlight"
          borderRadius="3"
        >
          {children}
        </Box>
        <div ref={setChatSlot} style={{ display: "contents" }} />
      </Box>
    </AppShellBodyContext.Provider>
  );
};

export { AppShellBody };
