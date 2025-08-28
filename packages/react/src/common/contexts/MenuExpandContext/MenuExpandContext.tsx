import { createContext, useContext } from "react";

import { MenuExpandContextValue } from "./MenuExpandContext.types";
import { initialMenuContext } from "./MenuExpandContext.definitions";

const MenuExpandContext = createContext<MenuExpandContextValue | undefined>(
  undefined
);

/**
 * Read Menu expand/collapse state.
 * @param enforce When false, returns `initialMenuContext` if no provider is present.
 * @throws If `enforce=true` and used without a provider.
 */
const useMenuExpandContext = (enforce = true): MenuExpandContextValue => {
  const context = useContext(MenuExpandContext);

  if (context === undefined) {
    if (!enforce) {
      return initialMenuContext;
    }

    throw new Error(
      "Menu subcomponents must be used within MenuExpandContext.Provider"
    );
  }

  return context;
};

export { MenuExpandContext, useMenuExpandContext };
