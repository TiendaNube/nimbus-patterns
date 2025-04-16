import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sortable } from "./Sortable";
import { DragDotsIcon } from "@nimbus-ds/icons";

// Mock DndContext to simulate drag and drop
jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  DndContext: jest.fn(({ children, onDragEnd }) => {
    (global as any).__dndContextOnDragEnd = onDragEnd;
    return <div>{children}</div>;
  }),
}));

const mockItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

const defaultProps = {
  onReorder: jest.fn(),
};

const makeSut = (
  rest?: Partial<
    Omit<
      typeof defaultProps & {
        disabled?: boolean;
        orientation?: "vertical" | "horizontal";
      },
      "children" | "items"
    >
  >
) =>
  render(
    <Sortable items={mockItems} {...defaultProps} {...rest}>
      <div data-testid="sortable-container">
        {mockItems.map((item) => (
          <div key={item.id} data-testid={`item-wrapper-${item.id}`}>
            <Sortable.Item id={item.id}>
              <div>{item.content}</div>
            </Sortable.Item>
          </div>
        ))}
      </div>
    </Sortable>
  );

const makeSutWithHandle = () =>
  render(
    <Sortable items={mockItems} {...defaultProps}>
      <div data-testid="sortable-container">
        {mockItems.map((item) => (
          <div key={item.id} data-testid={`item-wrapper-${item.id}`}>
            <Sortable.Item id={item.id} handle>
              <div>
                <div data-testid={`handle-${item.id}`}>
                  <Sortable.ItemHandle>
                    <DragDotsIcon size="small" />
                  </Sortable.ItemHandle>
                </div>
                {item.content}
              </div>
            </Sortable.Item>
          </div>
        ))}
      </div>
    </Sortable>
  );

describe("GIVEN <Sortable />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("WHEN rendered", () => {
    it("SHOULD render all items correctly", () => {
      makeSut();
      mockItems.forEach((item) => {
        expect(screen.getByText(item.content)).toBeInTheDocument();
      });
    });

    it("SHOULD apply correct attributes to items", () => {
      makeSut();
      mockItems.forEach((item) => {
        const itemWrapper = screen.getByTestId(`item-wrapper-${item.id}`);
        const itemElement = itemWrapper.querySelector("[role='button']");
        expect(itemElement).toHaveAttribute("aria-roledescription", "sortable");
        expect(itemElement).toHaveAttribute("role", "button");
      });
    });

    it("SHOULD not render drag context when disabled", () => {
      makeSut({ disabled: true });
      const container = screen.getByTestId("sortable-container");
      expect(
        container.parentElement?.getAttribute("aria-describedby")
      ).toBeFalsy();
    });
  });

  describe("WHEN using handle functionality", () => {
    it("SHOULD render handles correctly", () => {
      makeSutWithHandle();
      mockItems.forEach((item) => {
        const handle = screen.getByTestId(`handle-${item.id}`);
        expect(handle).toBeInTheDocument();
        const handleElement = handle.querySelector("[role='button']");
        expect(handleElement).toHaveClass(
          "nimbus-box_cursor-grab-xs__cklfii119"
        );
      });
    });
  });

  describe("WHEN items are reordered", () => {
    it("SHOULD call onReorder callback with correct order", () => {
      const handleReorder = jest.fn();
      makeSut({ onReorder: handleReorder });

      // Simulate drag end event
      (global as any).__dndContextOnDragEnd({
        active: { id: "1" },
        over: { id: "2" },
      });

      expect(handleReorder).toHaveBeenCalledWith([
        mockItems[1],
        mockItems[0],
        mockItems[2],
      ]);
    });
  });

  describe("WHEN using custom render item", () => {
    it("SHOULD render custom item correctly", () => {
      render(
        <Sortable items={mockItems} {...defaultProps}>
          {mockItems.map((item) => (
            <Sortable.Item
              key={item.id}
              id={item.id}
              renderItem={({
                isDragging,
                attributes,
                listeners,
                setNodeRef,
                style,
              }) => (
                <div
                  ref={setNodeRef}
                  style={style}
                  data-testid={`custom-${item.id}`}
                  data-is-dragging={isDragging}
                  {...attributes}
                  {...listeners}
                >
                  {item.content}
                </div>
              )}
            />
          ))}
        </Sortable>
      );

      const customItem = screen.getByTestId("custom-1");
      expect(customItem).toBeInTheDocument();
      expect(customItem).toHaveAttribute("data-is-dragging", "false");
    });
  });
});
