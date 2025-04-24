import React, { useState } from "react";
import { Box } from "@nimbus-ds/components";
import { Sortable, SortableItemType } from "@nimbus-ds/sortable";
import { ProductDataListProductsProps } from "./ProductDataListProducts.types";
import { ProductDataListItemDivider } from "../ProductDataListItemDivider";

function ProductDataListProducts<T extends SortableItemType>({
  sortable,
  items,
  onReorder,
  renderItem,
  sortableProps,
  ...props
}: ProductDataListProductsProps<T>): React.ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Sortable
      {...sortableProps}
      items={items}
      onReorder={onReorder}
      orientation="vertical"
      disabled={!sortable}
      renderOverlay={(overlayProps) => (
        <Box
          display="flex"
          flexDirection="column"
          backgroundColor="neutral-background"
          boxShadow="3"
          gap="2"
          py="2"
        >
          {renderItem(overlayProps)}
        </Box>
      )}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        sortableProps?.onDragStart?.(event);
      }}
      onDragEnd={(event) => {
        setActiveId(null);
        sortableProps?.onDragEnd?.(event);
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        my="4"
        gap="2"
        overflowY="auto"
        maxHeight="370px"
        {...props}
      >
        {items.map((item) => (
          <>
            <ProductDataListItemDivider />
            <div
              key={item.id}
              style={{
                visibility: activeId === item.id ? "hidden" : "visible",
              }}
            >
              {renderItem(item)}
            </div>
          </>
        ))}
        <ProductDataListItemDivider />
      </Box>
    </Sortable>
  );
}

ProductDataListProducts.displayName = "ProductDataList.Products";

export { ProductDataListProducts };
