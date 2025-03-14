import React from "react";
import { render, screen } from "@testing-library/react";

import { Box, Thumbnail } from "@nimbus-ds/components";
import {
  InitialScreenFeature,
  InitialScreenFeatureItem,
  InitialScreenFeatureItemSpacing,
} from "./InitialScreenFeature";
import {
  InitialScreenFeatureItemProperties,
  InitialScreenFeatureItemSpacingProps,
  InitialScreenFeatureProperties,
} from "./initialScreenFeature.types";

describe("GIVEN <InitialScreenFeature />", () => {
  const makeSut = (rest: Omit<InitialScreenFeatureProperties, "children">) => {
    render(<InitialScreenFeature {...rest} />);
  };

  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      const itemTitle = "title";
      const itemDescription = "description";

      makeSut({
        content: (
          <Box>
            <InitialScreenFeatureItem
              title={itemTitle}
              description={itemDescription}
            />
          </Box>
        ),
        image: (
          <Thumbnail
            src="./static/feature_img.png"
            alt="./static/feature_img.png"
          />
        ),
      });

      expect(screen.getByText(itemTitle)).toBeDefined();
      expect(screen.getByText(itemDescription)).toBeDefined();

      const img = screen.getByAltText("./static/feature_img.png");
      expect(img).toBeDefined();
    });
  });
});

describe("GIVEN <InitialScreenFeatureItem />", () => {
  const makeSut = (rest: InitialScreenFeatureItemProperties) => {
    render(<InitialScreenFeatureItem {...rest} />);
  };

  describe("WHEN rendered", () => {
    it("SHOULD render title, description and children correctly", () => {
      const itemTitle = "title";
      const itemDescription = "description";

      makeSut({
        title: itemTitle,
        description: itemDescription,
        children: <Box data-testid="children-element" />,
      });

      expect(screen.getByText(itemTitle)).toBeDefined();
      expect(screen.getByText(itemDescription)).toBeDefined();

      const childrenElement = screen.getByTestId("children-element");
      expect(childrenElement).toBeDefined();
    });
  });
});

describe("GIVEN <InitialScreenFeatureItemSpacing />", () => {
  const makeSut = (rest: InitialScreenFeatureItemSpacingProps) => {
    render(
      <InitialScreenFeatureItemSpacing
        {...rest}
        data-testid="spacing-element"
      />
    );
  };

  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut({});

      const spacingElement = screen.getByTestId("spacing-element");
      expect(spacingElement).toBeDefined();
    });
  });
});
