import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SortableItem } from "./SortableItem";
import { useSortable } from "@dnd-kit/sortable";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { SortableItemHandle } from "../SortableItemHandle";

jest.mock("@dnd-kit/sortable", () => ({
  useSortable: jest.fn(),
}));

const mockUseSortable = {
  attributes: {
    role: "button",
    tabIndex: 0,
    "aria-describedby": "DraggableItem-1",
  },
  listeners: {
    onKeyDown: jest.fn(),
    onMouseDown: jest.fn(),
  },
  setNodeRef: jest.fn(),
  setActivatorNodeRef: jest.fn(),
  transform: null,
  transition: null,
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

  it("renders with handle correctly", () => {
    render(
      <SortableItem id="test-1" handle>
        <div>
          <SortableItemHandle>
            <DragDotsIcon size="small" />
          </SortableItemHandle>
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
        renderItem={({ isDragging, attributes, listeners, setNodeRef, style }) => (
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
  });
});
