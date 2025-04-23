import { createContext, useContext } from "react";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";

interface SortableItemContextValue {
  // Reference callback for the drag handle element
  setActivatorNodeRef: (node: HTMLElement | null) => void;
  // DND-kit drag attributes
  attributes: DraggableAttributes;
  // DND-kit drag listeners
  listeners: DraggableSyntheticListeners;
}

export const SortableItemContext =
  createContext<SortableItemContextValue | null>(null);

export const useSortableItemContext = () => {
  const context = useContext(SortableItemContext);
  // Ignored as it's not necessary to test
  /* istanbul ignore next */
  if (!context) {
    throw new Error(
      "useSortableItemContext must be used within a SortableItem"
    );
  }

  return context;
};
