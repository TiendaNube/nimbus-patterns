import React, { createContext, useContext, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext as BaseSortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableProps, SortableContextValue } from "./Sortable.types";
import { SortableItem, SortableItemHandle } from "./components";

export const SortableContext = createContext<SortableContextValue>({
  activeId: null,
});

export const useSortableContext = () => {
  const context = useContext(SortableContext);
  if (!context) {
    throw new Error(
      "useSortableContext must be used within a Sortable component"
    );
  }
  return context;
};

function Sortable<T extends { id: UniqueIdentifier }>({
  items,
  onReorder,
  orientation = "vertical",
  sensorOptions,
  onDragStart,
  onDragOver,
  onDragEnd,
  disabled = false,
  as: Component = "div",
  containerProps = {},
  children,
}: SortableProps<T>) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
      ...sensorOptions,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      ...sensorOptions,
    })
  );

  const strategy = useMemo(
    () =>
      orientation === "vertical"
        ? verticalListSortingStrategy
        : horizontalListSortingStrategy,
    [orientation]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = [...items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      onReorder(newItems);
    }

    setActiveId(null);
    onDragEnd?.(event);
  };

  const contextValue = useMemo(
    () => ({
      activeId,
    }),
    [activeId]
  );

  if (disabled) {
    return <Component {...containerProps}>{children}</Component>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveId(event.active.id as string);
        onDragStart?.(event);
      }}
      onDragOver={onDragOver}
      onDragEnd={handleDragEnd}
    >
      <BaseSortableContext
        items={items.map((item) => item.id)}
        strategy={strategy}
      >
        <SortableContext.Provider value={contextValue}>
          <Component {...containerProps}>{children}</Component>
        </SortableContext.Provider>
      </BaseSortableContext>
    </DndContext>
  );
}

Sortable.displayName = "Sortable";

Sortable.Item = SortableItem;
Sortable.Item.displayName = "Sortable.Item";
Sortable.ItemHandle = SortableItemHandle;
Sortable.ItemHandle.displayName = "Sortable.ItemHandle";

export { Sortable };
