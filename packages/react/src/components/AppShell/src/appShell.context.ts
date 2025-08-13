import React from "react";

const AppShellOverlayContext = React.createContext<HTMLElement | null>(null);

export const AppShellOverlayProvider = AppShellOverlayContext.Provider;

export const useAppShellOverlayContainer = (): HTMLElement | null =>
  React.useContext(AppShellOverlayContext);

export { AppShellOverlayContext };

