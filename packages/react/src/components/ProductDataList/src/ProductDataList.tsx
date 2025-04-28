import React from "react";
import { Box, Title } from "@nimbus-ds/components";

import type {
  ProductDataListProps,
  ProductDataListComponents,
} from "./ProductDataList.types";
import {
  ProductDataListProducts,
  ProductDataListItem,
  ProductDataListSection,
  ProductDataListItemDivider,
} from "./components";

const ProductDataList: React.FC<ProductDataListProps> &
  ProductDataListComponents = ({
  children,
  title,
  ...props
}: ProductDataListProps) => (
  <Box padding="4" display="flex" flexDirection="column" gap="4" {...props}>
    {title && <Title as="h4">{title}</Title>}

    {children}
  </Box>
);

ProductDataList.Item = ProductDataListItem;
ProductDataList.Products = ProductDataListProducts;
ProductDataList.Section = ProductDataListSection;
ProductDataList.ItemDivider = ProductDataListItemDivider;

ProductDataList.displayName = "ProductDataList";
ProductDataList.Item.displayName = "ProductDataList.Item";
ProductDataList.Products.displayName = "ProductDataList.Products";
ProductDataList.ItemDivider.displayName = "ProductDataList.ItemDivider";
ProductDataList.Section.displayName = "ProductDataList.Section";

export { ProductDataList };
