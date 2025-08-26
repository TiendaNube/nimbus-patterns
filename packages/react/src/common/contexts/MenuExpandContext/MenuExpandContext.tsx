import { createContext, useContext } from "react";

export interface MenuExpandContext {
  expanded: boolean;
}

export const initialMenuContext: MenuExpandContext = {
  expanded: true,
};

export const MenuExpandContext = createContext<MenuExpandContext | undefined>(
  undefined
);

export const useMenuExpandContext = (enforce: boolean = true): MenuExpandContext => {
  const context = useContext(MenuExpandContext);
  
  if (context === undefined) {
    if(!enforce) {
      return initialMenuContext;
    }

    throw new Error("MenuExpand components must be used within a MenuExpand");
  }

  return context;
};

