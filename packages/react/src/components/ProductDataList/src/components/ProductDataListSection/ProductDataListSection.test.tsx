import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ProductDataListSection } from "./ProductDataListSection";

describe("ProductDataListSection", () => {
  const defaultProps = {
    title: "Test Title",
    description: "Test Description",
    link: <a href="#">Test Link</a>,
  };

  it("renders title and description correctly", () => {
    render(<ProductDataListSection {...defaultProps} />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders custom content when provided", () => {
    const customContent = <div data-testid="custom-content">Custom Content</div>;
    render(<ProductDataListSection {...defaultProps} content={customContent} />);
    
    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  it("renders link correctly", () => {
    render(<ProductDataListSection {...defaultProps} />);
    
    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <ProductDataListSection {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </ProductDataListSection>
    );
    
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
}); 