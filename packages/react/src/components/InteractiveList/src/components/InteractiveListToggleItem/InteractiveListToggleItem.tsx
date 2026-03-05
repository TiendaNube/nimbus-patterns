import React from "react";

import { Toggle } from "@nimbus-ds/components";

import { InteractiveListToggleItemProps } from "./interactiveListToggleItem.types";
import { InteractiveListStructure, InteractiveListRow } from "..";
import { generateID } from "../../interactiveList.definitions";

const InteractiveListToggleItem: React.FC<InteractiveListToggleItemProps> = ({
  className,
  style: _style,
  toggle,
  ...rest
}: InteractiveListToggleItemProps) => {
  const itemID = generateID(rest.title);

  return (
    <InteractiveListRow
      className={className}
      role="menuitem"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="label"
      htmlFor={itemID}
      topDivider={rest.topDivider}
    >
      <InteractiveListStructure {...rest} />
      <Toggle id={itemID} {...toggle} />
    </InteractiveListRow>
  );
};

export { InteractiveListToggleItem };
