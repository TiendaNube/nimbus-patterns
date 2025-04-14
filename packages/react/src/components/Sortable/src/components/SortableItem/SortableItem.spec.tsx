import React, { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { SortableItem } from "./SortableItem";
import type { RenderItemProps } from "./sortableItem.types";

const mockItem = { id: "test-1", content: "Test Item" };
const childrenContent = "Item content";

type BaseTestProps = {
  id?: string;
  disabled?: boolean;
  handle?: boolean;
  "data-testid"?: string;
};

type TestProps = BaseTestProps &
  (
    | { children?: React.ReactNode; renderItem?: undefined }
    | {
        children?: undefined;
        renderItem: (props: RenderItemProps) => ReactElement;
      }
  );

const makeSut = (props?: TestProps) => {
  const defaultChildren = (
    <div data-testid="item-content">{childrenContent}</div>
  );

  if (props?.renderItem) {
    return render(
      <SortableItem
        id={props?.id ?? mockItem.id}
        data-testid="sortable-item"
        disabled={props?.disabled}
        handle={props?.handle}
        renderItem={props.renderItem}
      />
    );
  }

  return render(
    <SortableItem
      id={props?.id ?? mockItem.id}
      data-testid="sortable-item"
      disabled={props?.disabled}
      handle={props?.handle}
    >
      {props?.children ?? defaultChildren}
    </SortableItem>
  );
};

describe("GIVEN <SortableItem />", () => {
  describe("WHEN rendered with children", () => {
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
  });

  describe("WHEN rendered with renderItem", () => {
    const renderItemContent = "Custom rendered content";
    const customTestId = "custom-rendered-item";

    const renderItemFn = jest.fn(
      ({
        isDragging,
        setNodeRef,
        style,
        attributes,
        listeners,
      }: RenderItemProps) => (
        <div
          ref={setNodeRef}
          style={style}
          data-testid={customTestId}
          data-is-dragging={isDragging}
          {...attributes}
          {...listeners}
        >
          {renderItemContent}
        </div>
      )
    );

    beforeEach(() => {
      renderItemFn.mockClear();
    });

    it("SHOULD call renderItem with correct props", () => {
      makeSut({ renderItem: renderItemFn });

      expect(renderItemFn).toHaveBeenCalledTimes(1);
      expect(renderItemFn).toHaveBeenCalledWith(
        expect.objectContaining({
          isDragging: false,
          setNodeRef: expect.any(Function),
          style: expect.any(Object),
          attributes: expect.any(Object),
          listeners: expect.any(Object),
        })
      );
    });

    it("SHOULD render the custom content", () => {
      makeSut({ renderItem: renderItemFn });
      expect(screen.getByText(renderItemContent)).toBeDefined();
    });

    it("SHOULD apply drag attributes and listeners", () => {
      makeSut({ renderItem: renderItemFn });
      const element = screen.getByTestId(customTestId);

      // Check for drag-related attributes
      expect(element.getAttribute("role")).toBe("button");
      expect(element.getAttribute("tabindex")).toBe("0");
      expect(element.style.touchAction).toBe("none");
    });

    it("SHOULD not apply listeners when handle is true", () => {
      makeSut({ renderItem: renderItemFn, handle: true });

      expect(renderItemFn).toHaveBeenCalledWith(
        expect.objectContaining({
          listeners: undefined,
        })
      );
    });

    it("SHOULD apply disabled state correctly", () => {
      makeSut({ renderItem: renderItemFn, disabled: true });

      expect(renderItemFn).toHaveBeenCalledWith(
        expect.objectContaining({
          attributes: expect.objectContaining({
            "aria-disabled": true,
          }),
        })
      );
    });
  });
});
