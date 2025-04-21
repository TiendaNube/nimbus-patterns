import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext as BaseSortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as Components from "./components";
import { SortableItemType, SortableProperties } from "./Sortable.types";
import { DEFAULT_OVERLAY_SETTINGS } from "./Sortable.definitions";

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
  overlaySettings = DEFAULT_OVERLAY_SETTINGS,
  renderOverlay,
}: SortableProperties<T>): React.ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

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

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
    onDragStart?.(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // We only reorder if the item is being dragged over a different item
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

  if (disabled) {
    // We return the children without the DndContext to avoid the drag and drop functionality
    /* eslint-disable-next-line react/jsx-no-useless-fragment */
    return <>{children}</>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={onDragOver}
      onDragEnd={handleDragEnd}
    >
      <BaseSortableContext
        items={items.map((item) => item.id)}
        strategy={strategy}
      >
        {children}
      </BaseSortableContext>
      {/* DragOverlay helps with the visual feedback of the drag and the fixed constrains of the container */}
      <DragOverlay {...overlaySettings}>
        {activeItem && renderOverlay ? renderOverlay(activeItem) : null}
      </DragOverlay>
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
