import React from "react";
import { render, screen } from "@testing-library/react";

import { BagIcon } from "@nimbus-ds/icons";
import {
  InitialScreenCard,
  InitialScreenCardLayout,
} from "./InitialScreenCard";
import {
  InitialScreenCardLayoutProps,
  InitialScreenCardProps,
} from "./initialScreenCard.types";

describe("GIVEN <InitialScreenCard />", () => {
  const makeSut = (rest: Omit<InitialScreenCardProps, "children">) => {
    render(<InitialScreenCard {...rest} />);
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

describe("GIVEN <InitialScreenCardLayout />", () => {
  const makeSut = (rest: Omit<InitialScreenCardLayoutProps, "children">) => {
    render(
      <InitialScreenCardLayout {...rest}>
        Children content
      </InitialScreenCardLayout>
    );
  };

  describe("WHEN rendered", () => {
    it("SHOULD render title and description correctly", () => {
      makeSut({});

      expect(screen.getByText("Children content")).toBeDefined();
    });
  });
});
