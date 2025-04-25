import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDataListItem } from "./ProductDataListItem";

describe("ProductDataListItem", () => {
  const defaultProps = {
    id: "test-id",
    title: "Test Title",
    imageUrl: "test-image.jpg",
  };

  it("renders with basic props", () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("uses title as alt text when imageAlt is not provided", () => {
    render(<ProductDataListItem {...defaultProps} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Test Title");
  });

  it("uses imageAlt when provided instead of title", () => {
    render(
      <ProductDataListItem
        {...defaultProps}
        imageAlt="Custom Alt Text"
      />
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Custom Alt Text");
  });

  it("renders remove button when onRemove is provided", async () => {
    const onRemove = jest.fn();
    render(<ProductDataListItem {...defaultProps} onRemove={onRemove} />);
    
    const removeButton = screen.getByRole("button");
    await userEvent.click(removeButton);
    
    expect(onRemove).toHaveBeenCalled();
  });

  it("renders drag handle when isDraggable is true", () => {
    render(<ProductDataListItem {...defaultProps} isDraggable />);
    const dragHandle = screen.getByRole("button");
    expect(dragHandle).toHaveAttribute("aria-roledescription", "sortable");
  });

  it("does not render image section when imageUrl is not provided", () => {
    const { id, title } = defaultProps;
    render(<ProductDataListItem id={id} title={title} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
}); 