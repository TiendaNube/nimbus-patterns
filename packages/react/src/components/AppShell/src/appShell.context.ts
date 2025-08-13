import React from "react";

const AppShellOverlayContext = React.createContext<HTMLElement | null>(null);

const AppShellOverlayProvider = AppShellOverlayContext.Provider;

const useAppShellOverlayContainer = (): HTMLElement | null => {
  return React.useContext(AppShellOverlayContext);
};

export {
  AppShellOverlayProvider,
  AppShellOverlayContext,
  useAppShellOverlayContainer,
};
