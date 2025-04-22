import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
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

  it("renders items correctly", () => {
    const renderItem = (item: { id: string; content: string }) => (
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

  it("passes sortable props correctly", () => {
    const onReorder = jest.fn();
    render(
      <ProductDataListProducts sortable items={mockItems} onReorder={onReorder}>
        <div>Child</div>
      </ProductDataListProducts>
    );
  });
});
