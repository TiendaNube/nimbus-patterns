import { createContext, useContext } from "react";

export interface MenuContextValue {
  collapsed: boolean;
  transition: boolean;
}

export const initialMenuContext: MenuContextValue = {
  collapsed: false,
  transition: false,
};

export const MenuContext = createContext<MenuContextValue | undefined>(
  undefined
);

export const useMenuContext = (): MenuContextValue => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("Menu components must be used within a Menu");
  }
  return context;
};

