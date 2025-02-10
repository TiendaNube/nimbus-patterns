import React from "react";
import { render, screen } from "@testing-library/react";

import { InitialScreen } from "./InitialScreen";
import { InitialScreenProps } from "./initialScreen.types";

const bodyContent = "Body content";
const bodyChildren = <div>{bodyContent}</div>;

const makeSut = (rest: Omit<InitialScreenProps, "children">) => {
  render(<InitialScreen {...rest}>{bodyChildren}</InitialScreen>);
};

describe("GIVEN <InitialScreen />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyContent)).toBeDefined();
    });
  });
});
