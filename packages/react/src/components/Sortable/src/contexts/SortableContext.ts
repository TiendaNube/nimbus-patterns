import { createContext, useContext } from "react";
import { SortableContextValue } from "../Sortable.types";

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