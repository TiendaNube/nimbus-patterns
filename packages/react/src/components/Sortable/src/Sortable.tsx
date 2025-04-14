import React, { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext as BaseSortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as Components from "./components";
import { SortableProps, SortableItemType } from "./Sortable.types";
import { SortableContext } from "./contexts/SortableContext";

/**
 * A component that provides drag and drop sorting functionality
 * @example
 * ```tsx
 * const [items, setItems] = useState([{ id: '1', content: 'Item 1' }]);
 *
 * return (
 *   <Sortable items={items} onReorder={setItems}>
 *     <div className="my-sortable-container">
 *       {items.map((item) => (
 *         <Sortable.Item key={item.id} id={item.id}>
 *           {item.content}
 *         </Sortable.Item>
 *       ))}
 *     </div>
 *   </Sortable>
 * );
 * ```
 */
function Sortable<T extends SortableItemType>({
  items,
  onReorder,
  orientation = "vertical",
  sensorOptions,
  onDragStart,
  onDragOver,
  onDragEnd,
  disabled = false,
  children,
}: SortableProps<T>): React.ReactElement {
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
    // We return the children without the DndContext to avoid the drag and drop functionality
    /* eslint-disable-next-line react/jsx-no-useless-fragment */
    return <>{children}</>;
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
          {children}
        </SortableContext.Provider>
      </BaseSortableContext>
    </DndContext>
  );
}

/**
 * A draggable item within the sortable list
 * @example
 * ```tsx
 * <Sortable.Item id="1">
 *   <div>Draggable content</div>
 * </Sortable.Item>
 * ```
 */
Sortable.Item = Components.SortableItem;

/**
 * A handle component that can be used to drag a sortable item, useful for providing a dedicated drag target
 * @example
 * ```tsx
 * <Sortable.Item id="1" handle>
 *   <div>
 *     <Sortable.ItemHandle>
 *       <DragIcon />
 *     </Sortable.ItemHandle>
 *     Draggable content
 *   </div>
 * </Sortable.Item>
 * ```
 */
Sortable.ItemHandle = Components.SortableItemHandle;

Sortable.displayName = "Sortable";
Sortable.Item.displayName = "Sortable.Item";
Sortable.ItemHandle.displayName = "Sortable.ItemHandle";

export { Sortable };
