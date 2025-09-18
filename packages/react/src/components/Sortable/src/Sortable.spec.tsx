import React from "react";
import { render, screen, act } from "@testing-library/react";
import { DragDotsIcon } from "@nimbus-ds/icons";
import { Sortable } from "./Sortable";

// Mock DndContext to simulate drag and drop
jest.mock("@dnd-kit/core", () => ({
  ...jest.requireActual("@dnd-kit/core"),
  DndContext: jest.fn(({ children, onDragStart, onDragOver, onDragEnd }) => {
    (global as any).__dndContextOnDragStart = onDragStart;
    (global as any).__dndContextOnDragOver = onDragOver;
    (global as any).__dndContextOnDragEnd = onDragEnd;
    return <div data-testid="dnd-context">{children}</div>;
  }),
  DragOverlay: jest.fn(({ children, ...props }) => (
    <div data-testid="sortable-overlay" {...props}>
      {children}
    </div>
  )),
}));

const mockItems = [
  { id: "1", content: "Item 1" },
  { id: "2", content: "Item 2" },
  { id: "3", content: "Item 3" },
];

const defaultProps = {
  onReorder: jest.fn(),
  onDragStart: jest.fn(),
  onDragOver: jest.fn(),
};

const makeSut = (
  rest?: Partial<
    Omit<
      typeof defaultProps & {
        disabled?: boolean;
        orientation?: "vertical" | "horizontal";
        overlaySettings?: any;
        renderOverlay?: (item: any) => React.ReactNode;
        sensorOptions?: any;
        onDragStart?: (event: any) => void;
        onDragOver?: (event: any) => void;
      },
      "children" | "items"
    >
  >
) =>
  render(
    <Sortable items={mockItems} {...defaultProps} {...rest}>
      <div
        data-testid="sortable-container"
        style={{
          display: "flex",
          flexDirection: rest?.orientation === "horizontal" ? "row" : "column",
        }}
      >
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
        // Assert using stable class prefix instead of hashed class name
        expect(handleElement?.className).toEqual(
          expect.stringContaining("nimbus-box_cursor-grab-xs__")
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

  describe("WHEN drag events occur", () => {
    it("SHOULD call onDragStart when drag begins", () => {
      const handleDragStart = jest.fn();
      makeSut({ onDragStart: handleDragStart });

      act(() => {
        const dragStartEvent = { active: { id: "1" } };
        (global as any).__dndContextOnDragStart(dragStartEvent);
      });

      expect(handleDragStart).toHaveBeenCalled();
    });

    it("SHOULD call onDragOver during drag", () => {
      const handleDragOver = jest.fn();
      makeSut({ onDragOver: handleDragOver });

      const dragOverEvent = { active: { id: "1" }, over: { id: "2" } };
      (global as any).__dndContextOnDragOver(dragOverEvent);

      expect(handleDragOver).toHaveBeenCalledWith(dragOverEvent);
    });
  });

  describe("WHEN using different orientations", () => {
    it("SHOULD apply correct styles for horizontal orientation", () => {
      makeSut({ orientation: "horizontal" });
      const container = screen.getByTestId("sortable-container");
      expect(container).toHaveStyle({ display: "flex", flexDirection: "row" });
    });

    it("SHOULD apply correct styles for vertical orientation", () => {
      makeSut({ orientation: "vertical" });
      const container = screen.getByTestId("sortable-container");
      expect(container).toHaveStyle({
        display: "flex",
        flexDirection: "column",
      });
    });
  });

  describe("WHEN using custom overlay settings", () => {
    it("SHOULD apply custom overlay settings", () => {
      const customSettings = {
        dropAnimation: {
          duration: 150,
          easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
        },
        zIndex: 1000,
      };

      makeSut({ overlaySettings: customSettings });

      act(() => {
        (global as any).__dndContextOnDragStart({ active: { id: "1" } });
      });

      const overlay = screen.getByTestId("sortable-overlay");
      expect(overlay).toBeInTheDocument();
    });

    it("SHOULD render custom overlay content", () => {
      const renderOverlay = (item: (typeof mockItems)[0]) => (
        <div data-testid="custom-overlay">{item.content}</div>
      );

      makeSut({ renderOverlay });

      act(() => {
        (global as any).__dndContextOnDragStart({ active: { id: "1" } });
      });

      const overlay = screen.getByTestId("custom-overlay");
      expect(overlay).toBeInTheDocument();
      expect(overlay).toHaveTextContent("Item 1");
    });
  });

  describe("WHEN handling edge cases", () => {
    it("SHOULD handle single item list", () => {
      const singleItem = [mockItems[0]];
      render(
        <Sortable items={singleItem} {...defaultProps}>
          <div data-testid="sortable-container">
            <Sortable.Item id={singleItem[0].id}>
              <div>{singleItem[0].content}</div>
            </Sortable.Item>
          </div>
        </Sortable>
      );

      expect(screen.getByText(singleItem[0].content)).toBeInTheDocument();
    });

    it("SHOULD handle custom sensor options", () => {
      const sensorOptions = {
        activationConstraint: {
          distance: 10,
          delay: 250,
        },
      };

      makeSut({ sensorOptions });
      const container = screen.getByTestId("sortable-container");
      expect(container).toBeInTheDocument();
    });

    it("SHOULD handle invalid drag operations", () => {
      const handleReorder = jest.fn();
      makeSut({ onReorder: handleReorder });

      act(() => {
        // Simulate drag end event with invalid target
        (global as any).__dndContextOnDragEnd({
          active: { id: "1" },
          over: null,
        });
      });

      expect(handleReorder).not.toHaveBeenCalled();
    });
  });
});
