import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import { ProductUpdates } from "./ProductUpdates";
import { ProductUpdatesProps } from "./productUpdates.types";

const titleText = "Title";
const contentText = "Body content";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const makeSut = (
  rest: Omit<ProductUpdatesProps, "children" | "title" | "text">
) => {
  render(
    <ProductUpdates
      {...rest}
      title={titleText}
      text={contentText}
      visible
      data-testid="product-updates-element"
    >
      Launcher element
    </ProductUpdates>
  );
};

describe("GIVEN <ProductUpdates />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title text correctly", async () => {
      makeSut({});
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("product-updates-element"));
      });
      expect(screen.getByText(titleText)).toBeDefined();
    });

    it("SHOULD render content text correctly", async () => {
      makeSut({});
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("product-updates-element"));
      });
      expect(screen.getByText(contentText)).toBeDefined();
    });

    describe("SHOULD render the closing elements correctly", () => {
      it("SHOULD render the default X button", async () => {
        makeSut({});
        await act(() => {
          fireEvent.mouseEnter(screen.getByTestId("product-updates-element"));
        });
        expect(screen.getByTestId("icon-element")).toBeDefined();
      });

      it("SHOULD render the dismiss link correctly", async () => {
        makeSut({ dismissLink: "Dismiss link" });
        await act(() => {
          fireEvent.mouseEnter(screen.getByTestId("product-updates-element"));
        });
        expect(screen.getByText("Dismiss link")).toBeDefined();
      });
    });

    it("SHOULD render body content correctly", async () => {
      makeSut({
        bodyContent: <p data-testid="body-content-element">Body content</p>
      });
      await act(() => {
        fireEvent.mouseEnter(screen.getByTestId("product-updates-element"));
      });
      expect(screen.getByTestId("body-content-element")).toBeDefined();
    });
  });
});
