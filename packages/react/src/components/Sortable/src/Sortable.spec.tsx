import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Sortable } from "./Sortable";
import { SortableProps } from "./Sortable.types";

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
    Omit<SortableProps<(typeof mockItems)[0]>, "children" | "items">
  >
) => {
  render(
    <Sortable
      items={mockItems}
      {...defaultProps}
      {...rest}
      data-testid="sortable-element"
    >
      {mockItems.map((item) => (
        <Sortable.Item
          key={item.id}
          id={item.id}
          item={item}
          data-testid={`item-${item.id}`}
        >
          <div>{item.content}</div>
        </Sortable.Item>
      ))}
    </Sortable>
  );
};

describe("GIVEN <Sortable />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render all items correctly", () => {
      makeSut();
      mockItems.forEach((item) => {
        expect(screen.getByText(item.content)).toBeDefined();
      });
    });

    it("SHOULD apply horizontal styles when orientation is horizontal", () => {
      makeSut({ orientation: "horizontal" });
      expect(
        screen.getByTestId("sortable-element").getAttribute("style")
      ).toContain("display: flex");
    });

    it("SHOULD not apply horizontal styles when orientation is vertical", () => {
      makeSut({ orientation: "vertical" });
      expect(
        screen.getByTestId("sortable-element").getAttribute("style")
      ).not.toContain("display: flex");
    });

    it("SHOULD not render drag context when disabled", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByTestId("sortable-element").getAttribute("data-dnd-context")
      ).toBeNull();
    });
  });

  describe("WHEN items are reordered", () => {
    it("SHOULD call onReorder callback", () => {
      const handleReorder = jest.fn();
      makeSut({ onReorder: handleReorder });

      const firstItem = screen.getByTestId("item-1");
      const secondItem = screen.getByTestId("item-2");

      fireEvent.dragStart(firstItem);
      fireEvent.dragOver(secondItem);
      fireEvent.drop(secondItem);

      expect(handleReorder).toBeCalled();
    });
  });
});
