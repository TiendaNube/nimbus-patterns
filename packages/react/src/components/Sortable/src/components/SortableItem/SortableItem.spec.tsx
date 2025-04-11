import React from "react";
import { render, screen } from "@testing-library/react";
import { SortableItem } from "./SortableItem";
import { SortableItemProps } from "./sortableItem.types";

const mockItem = { id: "test-1", content: "Test Item" };
const childrenContent = "Item content";

const makeSut = (
  rest?: Omit<SortableItemProps, "children" | "id" | "item">
) => {
  render(
    <SortableItem
      id={mockItem.id}
      item={mockItem}
      data-testid="sortable-item"
      {...rest}
    >
      <div data-testid="item-content">{childrenContent}</div>
    </SortableItem>
  );
};

describe("GIVEN <SortableItem />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut();
      expect(screen.getByText(childrenContent)).toBeDefined();
    });

    it("SHOULD apply handle attribute when handle prop is true", () => {
      makeSut({ handle: true });
      expect(
        screen.getByTestId("item-content").getAttribute("data-handle-selector")
      ).toBeDefined();
    });

    it("SHOULD apply disabled attribute when disabled prop is true", () => {
      makeSut({ disabled: true });
      expect(
        screen.getByTestId("sortable-item").getAttribute("data-disabled")
      ).toBeDefined();
    });

    it("SHOULD apply custom props correctly", () => {
      const customClass = "custom-class";
      makeSut({ itemProps: { className: customClass } });
      expect(
        screen.getByTestId("sortable-item").getAttribute("class")
      ).toContain(customClass);
    });
  });
});
