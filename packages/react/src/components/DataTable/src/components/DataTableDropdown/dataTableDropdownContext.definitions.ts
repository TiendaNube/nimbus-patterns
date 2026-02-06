import type { DataTableDropdownContextValue } from "./dataTableDropdownContext.types";

export const initialDataTableDropdownContextValue: DataTableDropdownContextValue =
  {
    visible: false,
    setDropdownVisibility: () => undefined,
  } as const;
