import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductDataListItemDivider } from "./ProductDataListItemDivider";

describe("<ProductDataListItemDivider />", () => {
  it("should render correctly", () => {
    render(<ProductDataListItemDivider data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
  });

  it("should have correct default styles", () => {
    render(<ProductDataListItemDivider data-testid="divider" />);
    const divider = screen.getByTestId("divider");
    
    // The Nimbus Box component applies styles via CSS classes and CSS variables
    expect(divider).toHaveClass(
      "nimbus-box_borderTopWidth-xs__cklfiif9",
      "nimbus-box_borderBottomWidth-xs__cklfiifr",
      "nimbus-box_borderColor-xs__cklfiidr",
      "nimbus-box_borderStyle-solid-xs__cklfiiyr"
    );
  });

  it("should pass through additional props", () => {
    render(<ProductDataListItemDivider data-testid="divider" id="custom-id" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toHaveAttribute("id", "custom-id");
  });
});
