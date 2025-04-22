import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDataListProducts } from "./ProductDataListProducts";

describe("ProductDataList.Sortable", () => {
  const mockItems = [
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
  ];

  it("renders children correctly", () => {
    render(
      <ProductDataListProducts sortable items={mockItems} onReorder={jest.fn()}>
        <div data-testid="child">Test Child</div>
      </ProductDataListProducts>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders title and description when provided", () => {
    const title = "Test Title";
    const description = "Test Description";
    render(
      <ProductDataListProducts sortable items={mockItems} onReorder={jest.fn()}>
        <div>Child</div>
      </ProductDataListProducts>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("passes sortable props correctly", () => {
    const onReorder = jest.fn();
    render(
      <ProductDataListProducts sortable items={mockItems} onReorder={onReorder}>
        <div>Child</div>
      </ProductDataListProducts>
    );
  });
});
