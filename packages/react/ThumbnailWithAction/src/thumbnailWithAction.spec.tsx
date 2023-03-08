import React from "react";
import { render, screen } from "@testing-library/react";

import { ThumbnailWithAction } from "./ThumbnailWithAction";
import { ThumbnailWithActionProps } from "./thumbnailWithAction.types";

const childrenContent = "Children content";

const makeSut = (
  rest: Omit<ThumbnailWithActionProps, "thumbnail" | "children">
) => {
  render(
    <ThumbnailWithAction
      {...rest}
      data-testid="thumbnail-with-action-element"
      thumbnail={{ alt: "thumbnail" }}
    >
      {childrenContent}
    </ThumbnailWithAction>
  );
};

describe("GIVEN <ThumbnailWithAction />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the children correctly", () => {
      makeSut({});
      expect(screen.getByText(childrenContent)).toBeDefined();
    });

    it("THEN should render the thumbnail element correctly", () => {
      makeSut({});
      expect(screen.getByTestId("thumbnail-empty")).toBeDefined();
    });
  });
});
