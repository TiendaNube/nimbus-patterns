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
  children,
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
          paddingTop="2"
        >
          {renderItem(overlayProps, 0)}
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
        gap="2"
        overflowY="auto"
        maxHeight="370px"
        {...props}
      >
        {children}
        <ProductDataListItemDivider />
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* We need to hide the item when it's being dragged, but Nimbus doesn't provide a way to do this right now */}
            <div
              aria-hidden={activeId === item.id}
              style={{ opacity: activeId === item.id ? 0 : 1 }}
            >
              {renderItem(item, index)}
            </div>
          </React.Fragment>
        ))}
      </Box>
    </Sortable>
  );
}

ProductDataListProducts.displayName = "ProductDataList.Products";

export { ProductDataListProducts };
