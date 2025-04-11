import { createContext, useContext } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface SortableItemContextValue {
  setActivatorNodeRef: (node: HTMLElement | null) => void;
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
}

export const SortableItemContext = createContext<SortableItemContextValue | null>(null);

export const useSortableItemContext = () => {
  const context = useContext(SortableItemContext);
  if (!context) {
    throw new Error("useSortableItemContext must be used within a SortableItem");
  }
  return context;
}; 