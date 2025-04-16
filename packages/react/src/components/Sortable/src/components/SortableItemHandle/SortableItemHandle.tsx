import React from "react";
import { Box } from "@nimbus-ds/components";
import { useSortableItemContext } from "../SortableItem/SortableItemContext";
import { SortableItemHandleProperties } from "./SortableItemHandle.types";

const SortableItemHandle = ({
  children,
}: SortableItemHandleProperties): React.ReactElement => {
  const { setActivatorNodeRef, attributes, listeners } =
    useSortableItemContext();

  return (
    <Box {...attributes} {...listeners} ref={setActivatorNodeRef} cursor="grab">
      {children}
    </Box>
  );
};

// Set displayName according to component rules
SortableItemHandle.displayName = "SortableItemHandle";

export { SortableItemHandle };
