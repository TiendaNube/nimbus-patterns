import React from "react";
import { render, screen } from "@testing-library/react";

import { BagIcon } from "@nimbus-ds/icons";
import { LandingScreenBullet } from "./LandingScreenBullet";
import { LandingScreenBulletProps } from "./landingScreenBullet.types";

const makeSut = (rest: Omit<LandingScreenBulletProps, "children">) => {
  render(<LandingScreenBullet {...rest} />);
};

describe("GIVEN <LandingScreenBullet />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the text correctly", () => {
      makeSut({ icon: <BagIcon />, text: "text" });

      expect(screen.getByText("text")).toBeDefined();
    });
  });
});
