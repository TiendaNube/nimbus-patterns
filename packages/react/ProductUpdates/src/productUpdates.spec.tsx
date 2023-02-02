import React from "react";
import { render, screen } from "@testing-library/react";

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
    it("SHOULD render title text correctly", () => {
      makeSut({});
      expect(screen.getByText(titleText)).toBeDefined();
    });

    it("SHOULD render content text correctly", () => {
      makeSut({});
      expect(screen.getByText(contentText)).toBeDefined();
    });

    describe("SHOULD render the closing elements correctly", () => {
      it("SHOULD render the default X button", () => {
        makeSut({});
        expect(screen.getByTestId("icon-element")).toBeDefined();
      });

      it("SHOULD render the dismiss link correctly", () => {
        makeSut({ dismissLink: "Dismiss link" });
        expect(screen.getByText("Dismiss link")).toBeDefined();
      });
    });

    it("SHOULD render body content correctly", () => {
      makeSut({
        bodyContent: <p data-testid="body-content-element">Body content</p>
      });
      expect(screen.getByTestId("body-content-element")).toBeDefined();
    });
  });
});
