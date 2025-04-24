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
    
    expect(divider).toHaveStyle({
      borderTopWidth: "1px",
      borderBottomWidth: "0",
      borderStyle: "solid"
    });
  });

  it("should pass through additional props", () => {
    render(<ProductDataListItemDivider data-testid="divider" id="custom-id" />);
    const divider = screen.getByTestId("divider");
    expect(divider).toHaveAttribute("id", "custom-id");
  });
});
