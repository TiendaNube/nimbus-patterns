import React from "react";

import { DataList } from "@nimbus-ds/data-list";

import {
  InteractiveListProps,
  InteractiveListComponents,
} from "./interactiveList.types";

import {
  InteractiveListStructure,
  InteractiveListButtonItem,
  InteractiveListCheckboxItem,
  InteractiveListRadioItem,
  InteractiveListToggleItem,
  InteractiveListCheckboxItemSkeleton,
  InteractiveListStructureSkeleton,
  InteractiveListButtonItemSkeleton,
  InteractiveListRadioItemSkeleton,
  InteractiveListToggleItemSkeleton,
} from "./components";

const InteractiveList: React.FC<InteractiveListProps> &
  InteractiveListComponents = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: InteractiveListProps) => (
  <DataList role="menu" {...rest}>
    {children}
  </DataList>
);

InteractiveList.Structure = InteractiveListStructure;
InteractiveList.StructureSkeleton = InteractiveListStructureSkeleton;
InteractiveList.ButtonItem = InteractiveListButtonItem;
InteractiveList.ButtonItemSkeleton = InteractiveListButtonItemSkeleton;
InteractiveList.CheckboxItem = InteractiveListCheckboxItem;
InteractiveList.CheckboxItemSkeleton = InteractiveListCheckboxItemSkeleton;
InteractiveList.RadioItem = InteractiveListRadioItem;
InteractiveList.RadioItemSkeleton = InteractiveListRadioItemSkeleton;
InteractiveList.ToggleItem = InteractiveListToggleItem;
InteractiveList.ToggleItemSkeleton = InteractiveListToggleItemSkeleton;

InteractiveList.displayName = "InteractiveList";
InteractiveList.Structure.displayName = "InteractiveList.Structure";
InteractiveList.ButtonItem.displayName = "InteractiveList.ButtonItem";
InteractiveList.CheckboxItem.displayName = "InteractiveList.CheckboxItem";
InteractiveList.RadioItem.displayName = "InteractiveList.RadioItem";
InteractiveList.ToggleItem.displayName = "InteractiveList.ToggleItem";
InteractiveList.StructureSkeleton.displayName =
  "InteractiveList.StructureSkeleton";
InteractiveList.ButtonItemSkeleton.displayName =
  "InteractiveList.ButtonItemSkeleton";
InteractiveList.CheckboxItemSkeleton.displayName =
  "InteractiveList.CheckboxItemSkeleton";
InteractiveList.RadioItemSkeleton.displayName =
  "InteractiveList.RadioItemSkeleton";
InteractiveList.ToggleItemSkeleton.displayName =
  "InteractiveList.ToggleItemSkeleton";

export { InteractiveList };
