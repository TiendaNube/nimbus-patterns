import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RedoIcon } from "@nimbus-ds/icons";
import { ProductDataListItem } from "./ProductDataListItem";

describe("ProductDataListItem", () => {
  const defaultProps = {
    id: "test-id",
    title: "Test Product",
  };

  it("renders title correctly", () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    const props = {
      ...defaultProps,
      imageUrl: "test-image.jpg",
      imageAlt: "Test image",
    };
    render(<ProductDataListItem {...props} />);
    const image = screen.getByAltText(props.imageAlt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", props.imageUrl);
  });

  it("uses title as alt text when imageUrl is provided but imageAlt is not", () => {
    render(<ProductDataListItem {...defaultProps} imageUrl="test-image.jpg" />);
    const image = screen.getByAltText(defaultProps.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders drag handle when isDraggable is true", () => {
    render(<ProductDataListItem {...defaultProps} isDraggable />);
    const dragButton = screen.getByRole("button");
    expect(dragButton).toBeInTheDocument();
    expect(dragButton).toHaveAttribute("aria-roledescription", "sortable");
  });

  it("does not render drag handle when isDraggable is false", () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(
      screen.queryByRole("button", { name: /drag handle/i })
    ).not.toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = jest.fn();
    render(<ProductDataListItem {...defaultProps} onRemove={onRemove} />);

    const removeButton = screen.getByRole("button");
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("renders children content", () => {
    const childText = "Child content";
    render(
      <ProductDataListItem {...defaultProps}>
        <div>{childText}</div>
      </ProductDataListItem>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("renders divider when withDivider is true", () => {
    render(<ProductDataListItem {...defaultProps} withDivider />);
    const divider = screen.getByTestId("divider");
    expect(divider).toBeInTheDocument();
  });

  it("renders tag when both tagIcon and tagText are provided", () => {
    render(
      <ProductDataListItem
        {...defaultProps}
        tagIcon={<RedoIcon />}
        tagText="In subscription"
      />
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
  });

  it("does not render tag when only tagIcon is provided", () => {
    render(<ProductDataListItem {...defaultProps} tagIcon={<RedoIcon />} />);
    expect(screen.queryByText("In subscription")).not.toBeInTheDocument();
  });

  it("does not render tag when only tagText is provided", () => {
    render(<ProductDataListItem {...defaultProps} tagText="In subscription" />);
    expect(screen.queryByText("In subscription")).not.toBeInTheDocument();
  });

  it("renders both tag and children when both are provided", () => {
    const childText = "Child content";
    render(
      <ProductDataListItem
        {...defaultProps}
        tagIcon={<RedoIcon />}
        tagText="In subscription"
      >
        <div>{childText}</div>
      </ProductDataListItem>
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("renders children when tag is not provided", () => {
    const childText = "Child content";
    render(
      <ProductDataListItem {...defaultProps}>
        <div>{childText}</div>
      </ProductDataListItem>
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("does not render divider when withDivider is false", () => {
    render(<ProductDataListItem {...defaultProps} />);
    expect(screen.queryByTestId("divider")).not.toBeInTheDocument();
  });

  it("renders draggable item with tag", () => {
    render(
      <ProductDataListItem
        {...defaultProps}
        isDraggable
        tagIcon={<RedoIcon />}
        tagText="In subscription"
      />
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
    const dragButton = screen.getByRole("button");
    expect(dragButton).toHaveAttribute("aria-roledescription", "sortable");
  });

  it("renders item with tag and remove button", () => {
    const onRemove = jest.fn();
    render(
      <ProductDataListItem
        {...defaultProps}
        tagIcon={<RedoIcon />}
        tagText="In subscription"
        onRemove={onRemove}
      />
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders item with image, tag, and children", () => {
    const childText = "Description text";
    render(
      <ProductDataListItem
        {...defaultProps}
        imageUrl="test-image.jpg"
        imageAlt="Test image"
        tagIcon={<RedoIcon />}
        tagText="In subscription"
      >
        <div>{childText}</div>
      </ProductDataListItem>
    );
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
    expect(screen.getByText("In subscription")).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("renders tag with default warning appearance", () => {
    render(
      <ProductDataListItem
        {...defaultProps}
        tagIcon={<RedoIcon />}
        tagText="In subscription"
      />
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
  });

  it("renders tag with custom appearance", () => {
    render(
      <ProductDataListItem
        {...defaultProps}
        tagIcon={<RedoIcon />}
        tagText="In subscription"
        tagAppearance="primary"
      />
    );
    expect(screen.getByText("In subscription")).toBeInTheDocument();
  });
});
