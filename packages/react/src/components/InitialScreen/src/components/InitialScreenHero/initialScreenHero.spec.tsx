import React from "react";
import { render, screen } from "@testing-library/react";

import { BagIcon } from "@nimbus-ds/icons";
import { Button } from "@nimbus-ds/components";
import { InitialScreenHero } from "./InitialScreenHero";
import { InitialScreenHeroProps } from "./initialScreenHero.types";
import InitialScreenBullet from "../InitialScreenBullet";

const bodyChildren = "Body content";

const makeSut = (rest: Omit<InitialScreenHeroProps, "children">) => {
  render(<InitialScreenHero {...rest}>{bodyChildren}</InitialScreenHero>);
};

describe("GIVEN <InitialScreenHero />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({
        image: {
          alt: "./static/feature_img.png",
          src: "./static/feature_img.png",
        },
      });

      expect(screen.getByText(bodyChildren)).toBeDefined();
    });

    it("SHOULD render the title, subtitle, description and image correctly", () => {
      const title = "title";
      const subtitle = "subtitle";
      const description = "description";

      makeSut({
        image: {
          alt: "./static/feature_img.png",
          src: "./static/feature_img.png",
        },
        title,
        subtitle,
        description,
      });

      expect(screen.getByText(title)).toBeDefined();
      expect(screen.getByText(subtitle)).toBeDefined();
      expect(screen.getByText(description)).toBeDefined();

      const image = screen.getByAltText("./static/feature_img.png");
      expect(image).toBeDefined();
    });

    it("SHOULD render the bullets correctly", () => {
      makeSut({
        image: {
          alt: "./static/feature_img.png",
          src: "./static/feature_img.png",
        },
        bullets: [
          <InitialScreenBullet icon={<BagIcon />} text="bullet 1" />,
          <InitialScreenBullet icon={<BagIcon />} text="bullet 2" />,
          <InitialScreenBullet icon={<BagIcon />} text="bullet 3" />,
        ],
      });

      expect(screen.getByText("bullet 1")).toBeDefined();
      expect(screen.getByText("bullet 2")).toBeDefined();
      expect(screen.getByText("bullet 3")).toBeDefined();
    });

    it("SHOULD render the actions correctly", () => {
      makeSut({
        image: {
          alt: "./static/feature_img.png",
          src: "./static/feature_img.png",
        },
        actions: (
          <>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </>
        ),
      });

      expect(screen.getByText("Action 1")).toBeDefined();
      expect(screen.getByText("Action 2")).toBeDefined();
    });
  });
});
