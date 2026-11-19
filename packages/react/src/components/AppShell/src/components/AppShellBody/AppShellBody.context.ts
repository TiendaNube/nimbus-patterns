import { createContext, useContext } from "react";

export interface AppShellBodyContextValue {
  /**
   * Norte UI only: true when AppShell.Body renders the content card layout
   * (Norte UI theme and a menu next to the content).
   */
  isCardLayout: boolean;
  /**
   * Norte UI only: element rendered next to the content card where
   * AppShell.Chat portals itself, so it always sits outside the card even
   * when consumers nest it inside their own wrappers.
   */
  chatSlot: HTMLElement | null;
  /**
   * Norte UI only: the AppShell.Body element, used by AppShell.Chat to
   * measure the area its expanded overlay should cover.
   */
  bodyElement: HTMLElement | null;
}

export const AppShellBodyContext = createContext<AppShellBodyContextValue>({
  isCardLayout: false,
  chatSlot: null,
  bodyElement: null,
});

export const useAppShellBodyContext = () => useContext(AppShellBodyContext);
