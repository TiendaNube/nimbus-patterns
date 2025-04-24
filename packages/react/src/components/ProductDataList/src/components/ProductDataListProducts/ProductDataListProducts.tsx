import React, { useState } from "react";
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
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <Sortable
      items={items}
      onReorder={onReorder}
      orientation="vertical"
      disabled={!sortable}
      renderOverlay={(props) => {
        return (
          <>
            <Box
              backgroundColor="neutral-background"
              boxShadow="3"
              display="flex"
              flexDirection="column"
              gap="2"
              py="2"
            >
              {renderItem?.(props)}
            </Box>
            <ItemSeparator />
          </>
        );
      }}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
      }}
      onDragEnd={() => {
        setActiveId(null);
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
        <ItemSeparator />
        {renderItem &&
          items.map((item) => (
            <>
              <div
                key={item.id}
                style={{
                  visibility: activeId === item.id ? "hidden" : "visible",
                }}
              >
                {renderItem(item)}
              </div>
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
