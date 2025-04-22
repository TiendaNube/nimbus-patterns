import React from "react";
import { Box, Title } from "@nimbus-ds/components";

import type { ProductDataListProps } from "./ProductDataList.types";
import { ProductDataListSortable, ProductDataListItem } from "./components";

const ProductDataList: React.FC<ProductDataListProps> & {
  Sortable: typeof ProductDataListSortable;
  Item: typeof ProductDataListItem;
} = ({ children, title, ...props }) => {
  return (
    <Box padding="4" display="flex" flexDirection="column" gap="4" {...props}>
      {title && <Title as="h4">{title}</Title>}
      <Box display="flex" flexDirection="column" gap="2">
        {children}
      </Box>
    </Box>
  );
};

ProductDataList.Sortable = ProductDataListSortable;
ProductDataList.Item = ProductDataListItem;

ProductDataList.displayName = "ProductDataList";
ProductDataList.Item.displayName = "ProductDataList.Item";
ProductDataList.Sortable.displayName = "ProductDataList.Sortable";

export { ProductDataList };
