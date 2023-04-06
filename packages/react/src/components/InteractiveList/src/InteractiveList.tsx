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
InteractiveList.ButtonItem = InteractiveListButtonItem;
InteractiveList.CheckboxItem = InteractiveListCheckboxItem;
InteractiveList.RadioItem = InteractiveListRadioItem;
InteractiveList.ToggleItem = InteractiveListToggleItem;

InteractiveList.displayName = "InteractiveList";
InteractiveList.Structure.displayName = "InteractiveList.Structure";
InteractiveList.ButtonItem.displayName = "InteractiveList.ButtonItem";
InteractiveList.CheckboxItem.displayName = "InteractiveList.CheckboxItem";
InteractiveList.RadioItem.displayName = "InteractiveList.RadioItem";
InteractiveList.ToggleItem.displayName = "InteractiveList.ToggleItem";

export { InteractiveList };
