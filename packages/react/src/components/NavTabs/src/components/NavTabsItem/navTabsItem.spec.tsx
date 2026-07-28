import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { NavTabsItem } from "./NavTabsItem";
import {
  NavTabsItemNeutralProperties,
  NavTabsItemAIGenerativeProperties,
} from "./navTabsItem.types";

const iconElement = "Icon element";
const mockedClickFunction = jest.fn();

const makeSut = (
  rest: Omit<NavTabsItemNeutralProperties, "icon" | "onClick" | "ariaLabel">
) => {
  render(
    <NavTabsItem
      {...rest}
      icon={iconElement}
      data-testid="nav-tabs-item-element"
      onClick={mockedClickFunction}
      ariaLabel="nav-tabs-item"
    />
  );
};

const makeAISut = (
  rest: Omit<
    NavTabsItemAIGenerativeProperties,
    "appearance" | "onClick" | "ariaLabel"
  > = {}
) => {
  render(
    <NavTabsItem
      {...rest}
      appearance="ai-generative"
      data-testid="nav-tabs-item-element"
      onClick={mockedClickFunction}
      ariaLabel="nav-tabs-item"
    />
  );
};

describe("GIVEN <NavTabsItem />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render the icon element correctly", () => {
      makeSut({});
      expect(screen.getByText(iconElement)).toBeDefined();
    });

    it("SHOULD render the aria label correctly", () => {
      makeSut({});
      const button = screen.getByRole("button");
      expect(button.getAttribute("aria-label")).toBe("nav-tabs-item");
    });

    it("SHOULD execute the onClick correctly", () => {
      makeSut({});
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
    });
  });

  describe('WHEN rendered with appearance="ai-generative"', () => {
    it("SHOULD render the frozen AI icon and ignore any icon passed at runtime", () => {
      const props = {
        appearance: "ai-generative",
        icon: iconElement,
        onClick: mockedClickFunction,
        ariaLabel: "nav-tabs-item",
        // Simulates a consumer bypassing the `icon?: never` type constraint.
      } as unknown as NavTabsItemAIGenerativeProperties;
      render(<NavTabsItem {...props} />);

      expect(screen.queryByText(iconElement)).toBeNull();
      const button = screen.getByRole("button");
      expect(button.querySelector("svg")).not.toBeNull();
    });

    it("SHOULD render the aria label correctly", () => {
      makeAISut();
      const button = screen.getByRole("button");
      expect(button.getAttribute("aria-label")).toBe("nav-tabs-item");
    });

    it("SHOULD execute the onClick correctly", () => {
      makeAISut();
      const buttonClick = screen.getByRole<HTMLButtonElement>("button");
      fireEvent.click(buttonClick);
      expect(mockedClickFunction).toHaveBeenCalled();
    });

    it("SHOULD reject `active` at the type level", () => {
      render(
        // @ts-expect-error `active` is not accepted when appearance="ai-generative"
        <NavTabsItem
          active
          appearance="ai-generative"
          onClick={mockedClickFunction}
          ariaLabel="nav-tabs-item"
        />
      );

      expect(screen.getByRole("button")).toBeDefined();
    });

    it("SHOULD render the badge when requested", () => {
      const { container: withoutBadge } = render(
        <NavTabsItem
          appearance="ai-generative"
          onClick={mockedClickFunction}
          ariaLabel="nav-tabs-item"
        />
      );
      const { container: withBadge } = render(
        <NavTabsItem
          appearance="ai-generative"
          badge
          onClick={mockedClickFunction}
          ariaLabel="nav-tabs-item"
        />
      );

      expect(withBadge.querySelectorAll("div")).toHaveLength(
        withoutBadge.querySelectorAll("div").length + 1
      );
    });

    it("SHOULD wrap the button in a gradient border that hugs its content", () => {
      const { container } = render(
        <NavTabsItem
          appearance="ai-generative"
          onClick={mockedClickFunction}
          ariaLabel="nav-tabs-item"
        />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.tagName).toBe("DIV");
      expect(wrapper.style.display).toBe("inline-flex");
      expect(wrapper.style.padding).toBe("2px");
      expect(wrapper.style.borderRadius).toBe(
        `calc(${tokens.shape.border.radius["2"].value} + 2px)`
      );
      // jsdom's style engine can't validate/store `linear-gradient()` on
      // background-image (a known jsdom limitation), so the gradient itself
      // isn't asserted here — verified visually in Storybook instead.
      expect(wrapper.querySelector("button")).not.toBeNull();
    });
  });
});
