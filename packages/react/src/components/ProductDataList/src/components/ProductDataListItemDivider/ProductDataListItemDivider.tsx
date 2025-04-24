import React from "react";
import { Box } from "@nimbus-ds/components";
import { ProductDataListItemDividerProperties } from "./ProductDataListItemDivider.types";

export const ProductDataListItemDivider: React.FC<
  ProductDataListItemDividerProperties
> = ({ ...props }) => (
  <Box
    borderTopWidth="1"
    borderBottomWidth="none"
    borderColor="neutral-surfaceHighlight"
    borderStyle="solid"
    {...props}
  />
);
