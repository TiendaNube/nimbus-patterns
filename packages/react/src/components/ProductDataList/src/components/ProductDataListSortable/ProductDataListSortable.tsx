import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import type { ProductDataListSortableProps } from "../../ProductDataList.types";
import { Sortable, SortableItemType } from "@nimbus-ds/sortable";

const ProductDataListSortable = <T extends SortableItemType>({
  children,
  title,
  description,
  items,
  onReorder,
  onDragEnd,
  ...sortableProps
}: ProductDataListSortableProps<T>) => {
  return (
    <Box padding="4" display="flex" flexDirection="column" gap="4">
      <Sortable<T>
        items={items}
        onReorder={onReorder}
        onDragEnd={onDragEnd}
        {...sortableProps}
      >
        <Box display="flex" flexDirection="column" gap="2">
          {children}
        </Box>
      </Sortable>
    </Box>
  );
};

ProductDataListSortable.displayName = "ProductDataListSortable";

export { ProductDataListSortable };
