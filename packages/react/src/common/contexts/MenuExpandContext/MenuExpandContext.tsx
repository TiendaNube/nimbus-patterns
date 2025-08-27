import { createContext, useContext } from "react";

import { MenuExpandContextValue } from "./MenuExpandContext.types";
import { initialMenuContext } from "./MenuExpandContext.definitions";

const MenuExpandContext = createContext<MenuExpandContextValue | undefined>(
  undefined
);

const useMenuExpandContext = (enforce = true): MenuExpandContextValue => {
  const context = useContext(MenuExpandContext);

  if (context === undefined) {
    if (!enforce) {
      return initialMenuContext;
    }

    throw new Error("MenuExpand components must be used within a MenuExpand");
  }

  return context;
};

export { MenuExpandContext, useMenuExpandContext };
