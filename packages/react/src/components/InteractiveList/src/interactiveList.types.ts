import { ReactNode, HTMLAttributes } from "react";

import {
  InteractiveListStructure,
  InteractiveListCheckboxItem,
  InteractiveListButtonItem,
  InteractiveListToggleItem,
  InteractiveListRadioItem,
} from "./components";

export interface InteractiveListComponents {
  Structure: typeof InteractiveListStructure;
  ButtonItem: typeof InteractiveListButtonItem;
  CheckboxItem: typeof InteractiveListCheckboxItem;
  ToggleItem: typeof InteractiveListToggleItem;
  RadioItem: typeof InteractiveListRadioItem;
}

export interface InteractiveListProps extends HTMLAttributes<HTMLElement> {
  /** Content of the InteractiveList */
  children: ReactNode;
}
