import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ProductDataListProducts } from "./ProductDataListProducts";

// Mock DndContext to simulate drag and drop
/**
 * Mock implementation of @dnd-kit/core components
 * - DndContext: Captures drag callbacks on global object for test access
 * - DragOverlay: Simple wrapper with testid for overlay content
 */
jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  DndContext: jest.fn(({ children, onDragStart, onDragOver, onDragEnd }) => {
    (global as any).__dndContextOnDragStart = onDragStart;
    (global as any).__dndContextOnDragOver = onDragOver;
    (global as any).__dndContextOnDragEnd = onDragEnd;
    return <div data-testid="dnd-context">{children}</div>;
  }),
  DragOverlay: jest.fn(({ children }) => (
    <div data-testid="drag-overlay">{children}</div>
  )),
}));

interface ProductDataItem {
  id: string;
  content: string;
}

describe("ProductDataListProducts", () => {
  const mockItems: ProductDataItem[] = [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
  ];
  const defaultRenderItem = (item: ProductDataItem) => (
    <div data-testid={`item-${item.id}`}>{item.content}</div>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <ProductDataListProducts
        sortable
        items={mockItems}
        onReorder={jest.fn()}
        renderItem={defaultRenderItem}
      >
        <div data-testid="child">Test Child</div>
      </ProductDataListProducts>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders items correctly", () => {
    const renderItem = (item: ProductDataItem) => (
      <div key={item.id}>{item.content}</div>
    );

    render(
      <ProductDataListProducts
        sortable
        items={mockItems}
        onReorder={jest.fn()}
        renderItem={renderItem}
      />
    );

    mockItems.forEach((item) => {
      expect(screen.getByText(item.content)).toBeInTheDocument();
    });
  });

  describe("drag events", () => {
    it("calls onDragStart callback and updates item visibility", async () => {
      const onDragStart = jest.fn();

      render(
        <ProductDataListProducts
          sortable
          items={mockItems}
          onReorder={jest.fn()}
          renderItem={defaultRenderItem}
          sortableProps={{ onDragStart }}
        />
      );

      // Simulate drag start
      await act(async () => {
        (global as any).__dndContextOnDragStart({ active: { id: "1" } });
      });

      // Check if callback was called
      expect(onDragStart).toHaveBeenCalledWith({ active: { id: "1" } });

      // Check if the dragged item is hidden
      const items = screen.getAllByTestId("item-1");
      const draggedItem = items[0].closest("div[aria-hidden]");
      expect(draggedItem).toHaveAttribute("aria-hidden", "true");
      expect(draggedItem).toHaveStyle({ opacity: "0" });

      // Check if other items remain visible
      const otherItem = screen
        .getByTestId("item-2")
        .closest("div[aria-hidden]");
      expect(otherItem).toHaveAttribute("aria-hidden", "false");
      expect(otherItem).toHaveStyle({ opacity: "1" });
    });

    it("calls onDragEnd callback and restores item visibility", async () => {
      const onDragEnd = jest.fn();

      render(
        <ProductDataListProducts
          sortable
          items={mockItems}
          onReorder={jest.fn()}
          renderItem={defaultRenderItem}
          sortableProps={{ onDragEnd }}
        />
      );

      // Simulate drag sequence
      await act(async () => {
        (global as any).__dndContextOnDragStart({ active: { id: "1" } });
      });

      await act(async () => {
        (global as any).__dndContextOnDragEnd({ active: { id: "1" } });
      });

      // Check if callback was called
      expect(onDragEnd).toHaveBeenCalledWith({ active: { id: "1" } });

      // Check if all items are visible after drag end
      const items = screen.getAllByTestId("item-1");
      const draggedItem = items[0].closest("div[aria-hidden]");
      expect(draggedItem).toHaveAttribute("aria-hidden", "false");
      expect(draggedItem).toHaveStyle({ opacity: "1" });

      const otherItem = screen
        .getByTestId("item-2")
        .closest("div[aria-hidden]");
      expect(otherItem).toHaveAttribute("aria-hidden", "false");
      expect(otherItem).toHaveStyle({ opacity: "1" });
    });

    it("handles drag events when sortableProps callbacks are not provided", async () => {
      render(
        <ProductDataListProducts
          sortable
          items={mockItems}
          onReorder={jest.fn()}
          renderItem={defaultRenderItem}
        />
      );

      // Simulate drag sequence without callbacks
      await act(async () => {
        (global as any).__dndContextOnDragStart({ active: { id: "1" } });
      });

      // Check visibility during drag
      const items = screen.getAllByTestId("item-1");
      const draggedItem = items[0].closest("div[aria-hidden]");
      expect(draggedItem).toHaveAttribute("aria-hidden", "true");
      expect(draggedItem).toHaveStyle({ opacity: "0" });

      // End drag
      await act(async () => {
        (global as any).__dndContextOnDragEnd({ active: { id: "1" } });
      });

      // Check visibility after drag
      expect(draggedItem).toHaveAttribute("aria-hidden", "false");
      expect(draggedItem).toHaveStyle({ opacity: "1" });
    });

    it("calls onReorder when items are reordered", async () => {
      const onReorder = jest.fn();

      render(
        <ProductDataListProducts
          sortable
          items={mockItems}
          onReorder={onReorder}
          renderItem={defaultRenderItem}
        />
      );

      // Simulate drag sequence that results in reordering
      await act(async () => {
        (global as any).__dndContextOnDragEnd({
          active: { id: "1" },
          over: { id: "2" },
        });
      });

      // Check if onReorder was called with the correct order
      expect(onReorder).toHaveBeenCalledWith([mockItems[1], mockItems[0]]);
    });
  });
});
