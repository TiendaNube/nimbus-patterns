import React, { memo, useMemo, type CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableItemContainerProperties,
  SortableItemProps,
} from "./sortableItem.types";
import { SortableItemContext } from "./SortableItemContext";

/**
 *
 */
const SortableItemContainer: React.FC<SortableItemContainerProperties> = memo(
  ({
    setNodeRef,
    attributes,
    listeners,
    style,
    handle = false,
    children,
  }: SortableItemContainerProperties) => (
    <div
      ref={setNodeRef}
      style={style}
      {...(!handle && { ...attributes, ...listeners })}
    >
      <div>{children}</div>
    </div>
  )
);

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  disabled = false,
  handle = false,
  children,
  renderItem,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled,
  });

  const style: CSSProperties = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      touchAction: "none",
    }),
    [transform, transition]
  );

  const contextValue = useMemo(
    () => ({
      setActivatorNodeRef,
      attributes,
      listeners,
    }),
    [setActivatorNodeRef, attributes, listeners]
  );

  if (renderItem) {
    return renderItem({
      isDragging,
      attributes: handle ? attributes : attributes,
      listeners: handle ? undefined : listeners,
      setNodeRef,
      style,
    });
  }

  return (
    <SortableItemContext.Provider value={contextValue}>
      <SortableItemContainer
        setNodeRef={setNodeRef}
        attributes={attributes}
        listeners={listeners}
        style={style}
        handle={handle}
      >
        {children}
      </SortableItemContainer>
    </SortableItemContext.Provider>
  );
};

export { SortableItem };
