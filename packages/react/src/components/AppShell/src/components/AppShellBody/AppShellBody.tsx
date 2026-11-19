import React, { useMemo, useState } from "react";

import { Box } from "@nimbus-ds/components";
import { box } from "@nimbus-ds/styles";
import { useMergeRefs } from "@floating-ui/react";

import { useIsNorteUiTheme } from "../../hooks";
import { useAppShellLayoutContext } from "../../contexts/AppShellLayoutContext";
import { AppShellBodyContext } from "./AppShellBody.context";
import { AppShellBodyProps } from "./AppShellBody.types";

/** Layout-neutral wrapper used when the content card is not drawn. */
const CONTENTS_STYLE: React.CSSProperties = { display: "contents" };

const AppShellBody: React.FC<AppShellBodyProps> = ({
  children,
  onScroll,
  ref,
  ...rest
}: AppShellBodyProps) => {
  const isNorteUi = useIsNorteUiTheme();
  const { hasMenu } = useAppShellLayoutContext();
  /** Norte UI draws the content card only when a menu sits next to it. */
  const isCardLayout = isNorteUi && hasMenu;
  const [bodyElement, setBodyElement] = useState<HTMLDivElement | null>(null);
  const [chatSlot, setChatSlot] = useState<HTMLDivElement | null>(null);
  /** Keep the consumer ref (a regular prop in React 19) next to ours. */
  const bodyRef = useMergeRefs<HTMLDivElement>([setBodyElement, ref]);

  const contextValue = useMemo(
    () => ({ isCardLayout, chatSlot, bodyElement }),
    [isCardLayout, chatSlot, bodyElement]
  );

  /**
   * Norte UI: rounded "content card" that is the scroll container.
   * Below `md` (where AppShell hides the menu) the card chrome is removed.
   * Built with `box.sprinkle` on a plain `div` so the element is the same in
   * every layout: switching theme or adding/removing the menu only changes
   * its styles and never remounts the page.
   */
  const cardStyles = useMemo(
    () =>
      isCardLayout
        ? box.sprinkle({
            boxSizing: "border-box",
            display: "flex",
            flex: "1 1 auto",
            minWidth: "0",
            height: "100%",
            overflow: "auto",
            backgroundColor: "neutral-background",
            borderStyle: "solid",
            borderWidth: { xs: "none", md: "1" },
            borderColor: "neutral-surfaceHighlight",
            borderRadius: { xs: "none", md: "3" },
          })
        : null,
    [isCardLayout]
  );

  const outerProps = isCardLayout
    ? ({
        backgroundColor: "neutral-surfaceDisabled",
        width: "100%",
        height: "100%",
        minHeight: "0",
        overflow: "hidden",
        gap: { xs: "none", md: "2" },
        paddingRight: { xs: "none", md: "2" },
        paddingBottom: { xs: "none", md: "2" },
      } as const)
    : ({
        backgroundColor: isNorteUi ? "neutral-background" : "neutral-surface",
        width: "100%",
        overflow: "auto",
        height: "100%",
      } as const);

  /**
   * The tree is identical in every layout (outer Box > content wrapper +
   * chat slot) so React keeps the page state. Outside the card layout both
   * inner elements are `display: contents` and the layout is unchanged.
   * `onScroll` goes to whichever element actually scrolls.
   */
  return (
    <AppShellBodyContext.Provider value={contextValue}>
      <Box
        {...outerProps}
        {...rest}
        onScroll={isCardLayout ? undefined : onScroll}
        ref={bodyRef}
        flex="1 1 auto"
        display="flex"
      >
        <div
          className={cardStyles?.className}
          style={cardStyles ? cardStyles.style : CONTENTS_STYLE}
          onScroll={isCardLayout ? onScroll : undefined}
        >
          {children}
        </div>
        <div ref={setChatSlot} style={CONTENTS_STYLE} />
      </Box>
    </AppShellBodyContext.Provider>
  );
};

export { AppShellBody };
