import React from "react";

import { Toggle } from "@nimbus-ds/components";

import { InteractiveListToggleItemProps } from "./interactiveListToggleItem.types";
import { InteractiveListStructure, InteractiveListRow } from "../";
import { generateID } from "../../interactiveList.definitions";

const InteractiveListToggleItem: React.FC<InteractiveListToggleItemProps> = ({
  className: _className,
  style: _style,
  toggle,
  ...rest
}: InteractiveListToggleItemProps) => {
  const itemID = generateID(rest.title);

  return (
    <InteractiveListRow role="menuitem" as="label" htmlFor={itemID}>
      <InteractiveListStructure {...rest} />
      <Toggle id={itemID} {...toggle} />
    </InteractiveListRow>
  );
};

export { InteractiveListToggleItem };
