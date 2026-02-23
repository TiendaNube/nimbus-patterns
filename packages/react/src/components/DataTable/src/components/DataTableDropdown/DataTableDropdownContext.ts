import { createContext, useContext } from "react";
import type { DataTableDropdownContextValue } from "./dataTableDropdownContext.types";

export const DataTableDropdownContext = createContext<
  DataTableDropdownContextValue | undefined
>(undefined);

/**
 * Reads the DataTableDropdown visibility context.
 * Must be used within a DataTableDropdown component.
 * @throws If used outside a DataTableDropdown provider.
 */
export const useDataTableDropdownContext = () => {
  const context = useContext(DataTableDropdownContext);

  if (context === undefined) {
    throw new Error(
      "useDataTableDropdownContext must be used within a DataTable.Dropdown"
    );
  }

  return context;
};
