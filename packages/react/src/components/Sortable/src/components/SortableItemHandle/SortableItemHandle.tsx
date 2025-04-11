import React, { type ReactNode } from "react";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { useSortableItemContext } from "../SortableItem/SortableItemContext";
import { Box } from "@nimbus-ds/components";

interface SortableItemHandleProps {
  children?: ReactNode;
}

const SortableItemHandle = ({
  children = <DragDotsIcon />,
}: SortableItemHandleProps): JSX.Element => {
  const { setActivatorNodeRef, attributes, listeners } =
    useSortableItemContext();

  return (
    <Box {...attributes} {...listeners} ref={setActivatorNodeRef}>
      {children}
    </Box>
  );
};

// Set displayName according to component rules
SortableItemHandle.displayName = "SortableItemHandle";

export { SortableItemHandle };
