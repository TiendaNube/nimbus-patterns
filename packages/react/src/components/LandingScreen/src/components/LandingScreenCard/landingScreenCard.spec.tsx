import React from "react";
import { render, screen } from "@testing-library/react";

import { BagIcon } from "@nimbus-ds/icons";
import {
  LandingScreenCard,
  LandingScreenCardLayout,
} from "./LandingScreenCard";
import {
  LandingScreenCardLayoutProps,
  LandingScreenCardProps,
} from "./landingScreenCard.types";

describe("GIVEN <LandingScreenCard />", () => {
  const makeSut = (rest: Omit<LandingScreenCardProps, "children">) => {
    render(<LandingScreenCard {...rest} />);
  };

  describe("WHEN rendered", () => {
    it("SHOULD render title and description correctly", () => {
      makeSut({
        icon: <BagIcon />,
        title: "title",
        description: "description",
      });

      expect(screen.getByText("title")).toBeDefined();
      expect(screen.getByText("description")).toBeDefined();
    });
  });
});

describe("GIVEN <LandingScreenCardLayout />", () => {
  const makeSut = (rest: Omit<LandingScreenCardLayoutProps, "children">) => {
    render(
      <LandingScreenCardLayout {...rest}>
        Children content
      </LandingScreenCardLayout>
    );
  };

  describe("WHEN rendered", () => {
    it("SHOULD render title and description correctly", () => {
      makeSut({});

      expect(screen.getByText("Children content")).toBeDefined();
    });
  });
});
