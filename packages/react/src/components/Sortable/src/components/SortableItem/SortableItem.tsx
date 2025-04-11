import React, {
  memo,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "./sortableItem.types";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { SortableItemContext } from "./SortableItemContext";

interface SortableItemComponentProps {
  setNodeRef: (node: HTMLElement | null) => void;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  style: CSSProperties;
  isDragging: boolean;
  handle?: boolean;
  children: ReactNode;
}

function SortableItemComponent({
  setNodeRef,
  attributes,
  listeners,
  style,
  isDragging,
  handle = false,
  children,
}: SortableItemComponentProps) {
  return (
    <div 
      ref={setNodeRef} 
      style={style}
      {...(!handle && { ...attributes, ...listeners })}
    >
      <div>
        {children}
      </div>
    </div>
  );
}

const SortableItemComponentMemo = memo(SortableItemComponent);

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  disabled = false,
  handle = false,
  children,
}: SortableItemProps): JSX.Element => {
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

  const contextValue = useMemo(() => ({
    setActivatorNodeRef,
    attributes,
    listeners,
  }), [setActivatorNodeRef, attributes, listeners]);

  if (typeof children === "function") {
    return <>{children({ isDragging })}</>;
  }

  return (
    <SortableItemContext.Provider value={contextValue}>
      <SortableItemComponentMemo
        setNodeRef={setNodeRef}
        attributes={attributes}
        listeners={listeners}
        style={style}
        isDragging={isDragging}
        handle={handle}
      >
        {children}
      </SortableItemComponentMemo>
    </SortableItemContext.Provider>
  );
};

export { SortableItem };
