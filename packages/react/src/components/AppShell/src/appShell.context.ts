import React from "react";

const AppShellOverlayContext = React.createContext<HTMLElement | null>(null);

const AppShellOverlayProvider = AppShellOverlayContext.Provider;

const useAppShellOverlayContainer = (): HTMLElement | null =>
  React.useContext(AppShellOverlayContext);

export {
  AppShellOverlayProvider,
  AppShellOverlayContext,
  useAppShellOverlayContainer,
};
