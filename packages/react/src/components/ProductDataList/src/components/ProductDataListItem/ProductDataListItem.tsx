import React from "react";
import { Box, IconButton, Text, Thumbnail } from "@nimbus-ds/components";
import { DragDotsIcon, TrashIcon } from "@nimbus-ds/icons";
import { Sortable } from "@nimbus-ds/sortable";
import type { ProductDataListItemProps } from "./ProductDataListItem.types";
import { ProductDataListItemDivider } from "../ProductDataListItemDivider/ProductDataListItemDivider";

const ProductDataListItem: React.FC<ProductDataListItemProps> = ({
  id,
  title,
  imageUrl,
  imageAlt,
  isDraggable = false,
  withDivider = false,
  onRemove,
  children,
}) => {
  const component = (
    <Box display="flex" flexDirection="column" gap="2">
      <Box display="flex" alignItems="center" gap="3" px="2">
        {isDraggable && (
          <Box as="span" className="handle" cursor="grab">
            <Sortable.ItemHandle>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Text>
                  <DragDotsIcon size="small" />
                </Text>
              </Box>
            </Sortable.ItemHandle>
          </Box>
        )}

        {imageUrl && (
          <Box width="12" height="12" borderRadius="1">
            <Thumbnail
              src={imageUrl}
              alt={imageAlt || title}
              width="56px"
              height="56px"
            />
          </Box>
        )}

        <Box flex="1" display="flex" flexDirection="column" gap="1">
          <Text>{title}</Text>
          {children}
        </Box>

        {onRemove && (
          <Box justifyContent="flex-end">
            <IconButton source={<TrashIcon />} size="2rem" onClick={onRemove} />
          </Box>
        )}
      </Box>
      {withDivider && <ProductDataListItemDivider data-testid="divider" />}
    </Box>
  );

  if (isDraggable) {
    return (
      <Sortable.Item key={id} id={id} handle>
        {component}
      </Sortable.Item>
    );
  }

  return component;
};

ProductDataListItem.displayName = "ProductDataList.Item";

export { ProductDataListItem };
