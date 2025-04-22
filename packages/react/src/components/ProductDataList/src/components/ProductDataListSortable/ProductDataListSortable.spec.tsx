import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDataListSortable } from "./ProductDataListSortable";

describe("ProductDataList.Sortable", () => {
  const mockItems = [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
  ];

  it("renders children correctly", () => {
    render(
      <ProductDataListSortable items={mockItems} onReorder={jest.fn()}>
        <div data-testid="child">Test Child</div>
      </ProductDataListSortable>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders title and description when provided", () => {
    const title = "Test Title";
    const description = "Test Description";
    render(
      <ProductDataListSortable
        title={title}
        description={description}
        items={mockItems}
        onReorder={jest.fn()}
      >
        <div>Child</div>
      </ProductDataListSortable>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("passes sortable props correctly", () => {
    const onReorder = jest.fn();
    render(
      <ProductDataListSortable items={mockItems} onReorder={onReorder}>
        <div>Child</div>
      </ProductDataListSortable>
    );
  });
});
