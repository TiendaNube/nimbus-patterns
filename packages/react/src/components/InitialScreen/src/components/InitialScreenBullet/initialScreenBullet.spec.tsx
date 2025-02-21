import React from "react";
import { render, screen } from "@testing-library/react";

import { BagIcon } from "@nimbus-ds/icons";
import { InitialScreenBullet } from "./InitialScreenBullet";
import { InitialScreenBulletProps } from "./initialScreenBullet.types";

const makeSut = (rest: Omit<InitialScreenBulletProps, "children">) => {
  render(<InitialScreenBullet {...rest} />);
};

describe("GIVEN <InitialScreenBullet />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the text correctly", () => {
      makeSut({ icon: <BagIcon />, text: "text" });

      expect(screen.getByText("text")).toBeDefined();
    });
  });
});
