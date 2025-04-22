import React from "react";
import { Box } from "@nimbus-ds/components";
import { Sortable, SortableItemType } from "@nimbus-ds/sortable";
import { ProductDataListProductsProps } from "./ProductDataListProducts.types";

const ItemSeparator = () => (
  <Box
    borderTopWidth="1"
    borderBottomWidth="none"
    borderColor="neutral-surfaceHighlight"
    borderStyle="solid"
  />
);

function ProductDataListProducts<T extends SortableItemType>({
  sortable,
  items,
  onReorder,
  children,
  renderItem,
  ...props
}: ProductDataListProductsProps<T>): React.ReactElement {
  return (
    <Sortable
      items={items}
      onReorder={onReorder}
      orientation="vertical"
      disabled={!sortable}
    >
      <Box
        display="flex"
        flexDirection="column"
        py="4"
        gap="2"
        overflow="scroll"
        {...props}
      >
        <ItemSeparator />
        {renderItem &&
          items.map((item) => (
            <>
              {renderItem(item)}
              <ItemSeparator />
            </>
          ))}
        {children}
      </Box>
    </Sortable>
  );
}

ProductDataListProducts.displayName = "ProductDataList.Products";

export { ProductDataListProducts };
