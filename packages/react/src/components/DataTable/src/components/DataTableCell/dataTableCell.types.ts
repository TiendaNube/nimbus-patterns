import { HTMLAttributes } from "react";

import { TableCellProperties } from "@nimbus-ds/components";

export type DataTableCellProps = Omit<HTMLAttributes<HTMLElement>, "color"> &
  TableCellProperties;
