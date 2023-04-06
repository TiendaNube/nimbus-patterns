import React from "react";
import { render, screen } from "@testing-library/react";

import { EmptyMessage } from "./EmptyMessage";
import { EmptyMessageProps } from "./emptyMessage.types";

const titleText = "Title text";
const contentText = "Content text";
const illustrationElement = "This is an image";
const iconElement = "This is an icon";
const actionsElement = "This is an action";

const makeSut = (rest: Omit<EmptyMessageProps, "title">) => {
  render(
    <EmptyMessage
      {...rest}
      data-testid="empty-message-element"
      title={titleText}
    />
  );
};

describe("GIVEN <EmptyMessage />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render title correctly", () => {
      makeSut({});
      expect(screen.getByText(titleText)).toBeDefined();
    });

    it("SHOULD render text correctly", () => {
      makeSut({ text: contentText });
      expect(screen.getByText(contentText)).toBeDefined();
    });

    it("SHOULD render the icon correctly", () => {
      makeSut({ icon: iconElement });
      expect(screen.getByText(iconElement)).toBeDefined();
    });

    it("SHOULD render the illustration correctly", () => {
      makeSut({ illustration: illustrationElement });
      expect(screen.getByText(illustrationElement)).toBeDefined();
    });

    it("SHOULD render the actions correctly", () => {
      makeSut({ actions: actionsElement });
      expect(screen.getByText(actionsElement)).toBeDefined();
    });
  });
});
