import React from "react";

import { Checkbox } from "@nimbus-ds/components";

import { InteractiveListCheckboxItemProps } from "./interactiveListCheckboxItem.types";
import { InteractiveListStructure, InteractiveListRow } from "..";
import { generateID } from "../../interactiveList.definitions";

const InteractiveListCheckboxItem: React.FC<
  InteractiveListCheckboxItemProps
> = ({
  className: _className,
  style: _style,
  checkbox,
  ...rest
}: InteractiveListCheckboxItemProps) => {
  const itemID = generateID(rest.title);

  return (
    <InteractiveListRow
      role="menuitemcheckbox"
      aria-checked={checkbox.checked}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="label"
      htmlFor={itemID}
      topDivider={rest.topDivider}
    >
      <Checkbox id={itemID} {...checkbox} />
      <InteractiveListStructure {...rest} />
    </InteractiveListRow>
  );
};

export { InteractiveListCheckboxItem };
