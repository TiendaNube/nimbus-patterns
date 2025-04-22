import React from "react";
import { Box, Title } from "@nimbus-ds/components";

import type {
  ProductDataListProps,
  ProductDataListComponents,
} from "./ProductDataList.types";
import { ProductDataListProducts, ProductDataListItem, ProductDataListSection } from "./components";

const ProductDataList: React.FC<ProductDataListProps> &
  ProductDataListComponents = ({
  children,
  title,
  ...props
}: ProductDataListProps) => (
  <Box padding="4" display="flex" flexDirection="column" gap="4" {...props}>
    {title && <Title as="h4">{title}</Title>}
    <Box display="flex" flexDirection="column" gap="2">
      {children}
    </Box>
  </Box>
);

ProductDataList.Item = ProductDataListItem;
ProductDataList.Products = ProductDataListProducts;
ProductDataList.Section = ProductDataListSection;

ProductDataList.displayName = "ProductDataList";
ProductDataList.Item.displayName = "ProductDataList.Item";
ProductDataList.Products.displayName = "ProductDataList.Products";

export { ProductDataList };
