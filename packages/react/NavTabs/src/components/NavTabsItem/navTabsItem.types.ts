import { ReactNode, HTMLAttributes } from "react";

import { BoxProps } from "@nimbus-ds/components";

type Extend = Omit<HTMLAttributes<HTMLElement>, "color"> & BoxProps;

export interface NavTabsItemProps extends Extend {
  /** Icon element to be rendered inside the button */
  icon: ReactNode;
  /** Controls whether the button is active or not */
  active?: boolean;
  /** Displays a small badge on top of the button */
  badge?: boolean;
  /** Function executed on click */
  onClick: () => void;
}
