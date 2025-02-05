import React from "react";
import { render, screen } from "@testing-library/react";

import { LandingScreen } from "./LandingScreen";
import { LandingScreenProps } from "./landingScreen.types";

const bodyContent = "Body content";
const bodyChildren = <div>{bodyContent}</div>;

const makeSut = (rest: Omit<LandingScreenProps, "children">) => {
  render(
    <LandingScreen {...rest} data-testid="empty-app-element">
      {bodyChildren}
    </LandingScreen>
  );
};

describe("GIVEN <LandingScreen />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render children correctly", () => {
      makeSut({});
      expect(screen.getByText(bodyContent)).toBeDefined();
    });
  });
});
