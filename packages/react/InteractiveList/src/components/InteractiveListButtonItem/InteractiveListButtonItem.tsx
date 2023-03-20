import React from "react";

import { IconButton } from "@nimbus-ds/components";
import { ChevronRightIcon } from "@nimbus-ds/icons";

import { InteractiveListButtonItemProps } from "./interactiveListButtonItem.types";
import { InteractiveListStructure, InteractiveListRow } from "..";
import { generateID } from "../../interactiveList.definitions";

const InteractiveListButtonItem: React.FC<InteractiveListButtonItemProps> = ({
  className: _className,
  style: _style,
  iconButton,
  ...rest
}: InteractiveListButtonItemProps) => {
  const itemID = generateID(rest.title);

  return (
    <InteractiveListRow
      alignItems="center"
      role="menuitem"
      // TODO: Remover isso aqui
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="label"
      htmlFor={itemID}
    >
      <InteractiveListStructure {...rest} />
      <IconButton
        id={itemID}
        aria-label={rest.title}
        backgroundColor="transparent"
        borderColor="transparent"
        size="2rem"
        source={<ChevronRightIcon />}
        {...iconButton}
      />
    </InteractiveListRow>
  );
};

export { InteractiveListButtonItem };
