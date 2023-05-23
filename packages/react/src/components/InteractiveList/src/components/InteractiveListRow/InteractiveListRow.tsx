import React from "react";

import { DataList } from "@nimbus-ds/data-list";

import { InteractiveListRowProps } from "./interactiveListRow.types";

const InteractiveListRow: React.FC<InteractiveListRowProps> = ({
  className: _className,
  style: _style,
  children,
  topDivider = true,
  ...rest
}: InteractiveListRowProps) => (
  <DataList.Row
    flexDirection="row"
    gap="2"
    cursor="pointer"
    alignItems="flex-start"
    backgroundColor={{ hover: "neutral-surface" }}
    transitionDuration="fast"
    transitionProperty="background-color"
    transitionTimingFunction="ease-in-out"
    boxShadow={{ focusWithin: "focusRing" }}
    borderWidth="none"
    borderTopWidth={topDivider ? "1" : "none"}
    {...rest}
  >
    {children}
  </DataList.Row>
);

export { InteractiveListRow };
