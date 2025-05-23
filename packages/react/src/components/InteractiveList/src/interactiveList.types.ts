import { HTMLAttributes, PropsWithChildren } from "react";

import { DataListProps } from "@nimbus-ds/data-list";
import {
  InteractiveListStructure,
  InteractiveListStructureSkeleton,
  InteractiveListCheckboxItem,
  InteractiveListCheckboxItemSkeleton,
  InteractiveListButtonItem,
  InteractiveListButtonItemSkeleton,
  InteractiveListToggleItem,
  InteractiveListRadioItem,
  InteractiveListRadioItemSkeleton,
  InteractiveListToggleItemSkeleton,
} from "./components";

export interface InteractiveListComponents {
  Structure: typeof InteractiveListStructure;
  StructureSkeleton: typeof InteractiveListStructureSkeleton;
  ButtonItem: typeof InteractiveListButtonItem;
  ButtonItemSkeleton: typeof InteractiveListButtonItemSkeleton;
  CheckboxItem: typeof InteractiveListCheckboxItem;
  CheckboxItemSkeleton: typeof InteractiveListCheckboxItemSkeleton;
  ToggleItem: typeof InteractiveListToggleItem;
  ToggleItemSkeleton: typeof InteractiveListToggleItemSkeleton;
  RadioItem: typeof InteractiveListRadioItem;
  RadioItemSkeleton: typeof InteractiveListRadioItemSkeleton;
}

export type InteractiveListProperties = PropsWithChildren &
  Pick<DataListProps, "bottomDivider">;

export type InteractiveListProps = InteractiveListProperties &
  HTMLAttributes<HTMLElement>;
