import React from "react";

import { Radio } from "@nimbus-ds/components";

import { InteractiveListRadioItemProps } from "./interactiveListRadioItem.types";
import { InteractiveListStructure, InteractiveListRow } from "..";
import { generateID } from "../../interactiveList.definitions";

const InteractiveListRadioItem: React.FC<InteractiveListRadioItemProps> = ({
  className: _className,
  style: _style,
  radio,
  ...rest
}: InteractiveListRadioItemProps) => {
  const itemID = generateID(rest.title);

  return (
    <InteractiveListRow
      role="menuitemradio"
      aria-checked={radio.checked}
      // TODO: Remover isso aqui
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="label"
      htmlFor={itemID}
    >
      <Radio id={itemID} {...radio} />
      <InteractiveListStructure {...rest} />
    </InteractiveListRow>
  );
};

export { InteractiveListRadioItem };
