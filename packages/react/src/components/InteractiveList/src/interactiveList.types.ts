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

export interface InteractiveListProperties {
  /**
   * Content of the InteractiveList
   * @TJS-type React.ReactNode
   */
  children: ReactNode;
}

export type InteractiveListProps = InteractiveListProperties &
  HTMLAttributes<HTMLElement>;
