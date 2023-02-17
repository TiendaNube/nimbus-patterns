import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { CalloutCard } from "./CalloutCard";
import { CalloutCardProps } from "./calloutCard.types";

const makeSut = (rest: CalloutCardProps) => {
  render(<CalloutCard {...rest} data-testid="callout-card-element" />);
};

describe("GIVEN <CalloutCard />", () => {
  describe("WHEN rendered", () => {
    it("THEN should correctly render the submitted content", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        icon: () => <svg data-testid="icon-element" />,
      });
      expect(screen.getByText("My tittle")).toBeDefined();
      expect(screen.getByText("My subtitle")).toBeDefined();
      expect(screen.getByTestId("icon-element")).toBeDefined();
    });

    it("THEN should correctly render the submitted link", () => {
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        icon: () => <svg data-testid="icon-element" />,
        link: {
          children: "My link",
          // eslint-disable-next-line
          // @ts-ignore
          href: "http://localhost:3000/",
        },
      });
      const link = screen.getByText<HTMLAnchorElement>("My link");
      expect(link).toBeDefined();
      expect(link.href).toEqual("http://localhost:3000/");
    });

    it("THEN should correctly render the submitted onClick", () => {
      const mockedOnClick = jest.fn();
      makeSut({
        title: "My tittle",
        subtitle: "My subtitle",
        appearance: "primary",
        onClick: mockedOnClick,
        icon: () => <svg data-testid="icon-element" />,
      });
      fireEvent.click(screen.getByTestId("callout-card-open-icon"));
      expect(mockedOnClick).toHaveBeenCalled();
    });
  });
});
