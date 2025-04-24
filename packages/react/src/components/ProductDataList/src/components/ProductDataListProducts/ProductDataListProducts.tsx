import React, { useState } from "react";
import { Box } from "@nimbus-ds/components";
import { Sortable, SortableItemType } from "@nimbus-ds/sortable";
import { ProductDataListProductsProps } from "./ProductDataListProducts.types";
import { ItemDivider } from "./ProductDataList.definitions";

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
      renderOverlay={(props) => (
        <>
          <Box
            display="flex"
            flexDirection="column"
            backgroundColor="neutral-background"
            boxShadow="3"
            gap="2"
            py="2"
          >
            {renderItem(props)}
          </Box>
          <ItemDivider />
        </>
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
        py="4"
        gap="2"
        overflow="scroll"
        {...props}
      >
        <ItemDivider />
        {items.map((item) => (
          <>
            <div
              key={item.id}
              style={{
                visibility: activeId === item.id ? "hidden" : "visible",
              }}
            >
              {renderItem(item)}
            </div>
            <ItemDivider />
          </>
        ))}
      </Box>
    </Sortable>
  );
}

ProductDataListProducts.displayName = "ProductDataList.Products";

export { ProductDataListProducts };
