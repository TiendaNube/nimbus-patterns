import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDataList } from "./ProductDataList";

describe("ProductDataList", () => {
  it("renders children correctly", () => {
    render(
      <ProductDataList>
        <div data-testid="child">Test Child</div>
      </ProductDataList>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders title and description when provided", () => {
    const title = "Test Title";
    const description = "Test Description";
    render(
      <ProductDataList title={title}>
        <div>Child</div>
      </ProductDataList>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("does not render title and description when not provided", () => {
    render(
      <ProductDataList>
        <div>Child</div>
      </ProductDataList>
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
