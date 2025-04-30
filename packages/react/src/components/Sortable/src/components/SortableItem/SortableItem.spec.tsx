import React from "react";
import { render, screen } from "@testing-library/react";
import { useSortable } from "@dnd-kit/sortable";
import { DragDotsIcon } from "@nimbus-ds/icons";
import type { DraggableAttributes } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";
import { SortableItemHandle } from "../SortableItemHandle";
import { SortableItemContext } from "./SortableItemContext";

jest.mock("@dnd-kit/sortable", () => ({
  useSortable: jest.fn(),
}));

const mockAttributes: DraggableAttributes = {
  role: "button",
  tabIndex: 0,
  "aria-describedby": "DraggableItem-1",
  "aria-disabled": false,
  "aria-pressed": false,
  "aria-roledescription": "sortable",
};

const mockUseSortable = {
  attributes: mockAttributes,
  listeners: {
    onKeyDown: jest.fn(),
    onMouseDown: jest.fn(),
  },
  setNodeRef: jest.fn(),
  setActivatorNodeRef: jest.fn(),
  transform: { x: 0, y: 0, scaleX: 1, scaleY: 1 },
  transition: "transform 250ms ease",
  isDragging: false,
};

describe("SortableItem", () => {
  beforeEach(() => {
    (useSortable as jest.Mock).mockReturnValue(mockUseSortable);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <SortableItem id="test-1">
        <div data-testid="test-content">Test Content</div>
      </SortableItem>
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });

  it("applies drag listeners when handle is false", () => {
    render(
      <SortableItem id="test-1" handle={false}>
        <div data-testid="test-content">Test Content</div>
      </SortableItem>
    );

    const container = screen.getByRole("button");
    expect(container).toHaveAttribute("aria-describedby", "DraggableItem-1");
    expect(container).toHaveAttribute("tabIndex", "0");
  });

  it("renders with handle correctly", () => {
    (useSortable as jest.Mock).mockReturnValue({
      ...mockUseSortable,
      listeners: undefined,
    });

    render(
      <SortableItem id="test-1" handle>
        <div>
          <SortableItemContext.Provider
            value={{
              setActivatorNodeRef: mockUseSortable.setActivatorNodeRef,
              attributes: mockAttributes,
              listeners: undefined,
            }}
          >
            <SortableItemHandle>
              <DragDotsIcon size="small" />
            </SortableItemHandle>
          </SortableItemContext.Provider>
          <div data-testid="test-content">Test Content</div>
        </div>
      </SortableItem>
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });

  it("renders with renderItem prop correctly", () => {
    render(
      <SortableItem
        id="test-1"
        renderItem={({
          isDragging,
          attributes,
          listeners,
          setNodeRef,
          style,
        }) => (
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            data-testid="custom-render"
            data-is-dragging={isDragging}
          >
            Custom Render
          </div>
        )}
      />
    );

    expect(screen.getByTestId("custom-render")).toBeInTheDocument();
    expect(screen.getByTestId("custom-render")).toHaveAttribute(
      "data-is-dragging",
      "false"
    );
  });

  it("handles disabled state correctly", () => {
    render(
      <SortableItem id="test-1" disabled>
        <div data-testid="test-content">Test Content</div>
      </SortableItem>
    );

    expect(useSortable).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
      })
    );
  });

  it("renders with handle and custom renderItem", () => {
    const mockContextValue = {
      setActivatorNodeRef: mockUseSortable.setActivatorNodeRef,
      attributes: mockAttributes,
      listeners: undefined,
    };

    render(
      <SortableItemContext.Provider value={mockContextValue}>
        <SortableItem
          id="test-1"
          handle
          renderItem={({ attributes, listeners, setNodeRef, style }) => (
            <div
              ref={setNodeRef}
              {...attributes}
              {...(listeners || {})}
              style={style}
              data-testid="custom-render"
            >
              <SortableItemHandle>
                <DragDotsIcon size="small" />
              </SortableItemHandle>
              Custom Content
            </div>
          )}
        />
      </SortableItemContext.Provider>
    );

    expect(screen.getByTestId("custom-render")).toBeInTheDocument();
  });
});
