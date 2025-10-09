import React from "react";
import { render, screen } from "@testing-library/react";

import { useMenuExpandContext } from "@common/contexts";
import { Menu } from "./Menu";
import { MenuProps } from "./menu.types";

const bodyChildren = "Body content";

const makeSut = (rest?: Omit<MenuProps, "children">) => {
  render(
    <Menu {...rest} data-testid="menu-element">
      {bodyChildren}
    </Menu>
  );
};

const ContextConsumer: React.FC = () => {
  const context = useMenuExpandContext(false);
  return (
    <div data-testid="context-value">
      {JSON.stringify({
        expanded: context.expanded,
        showTooltipsWhenCollapsed: context.showTooltipsWhenCollapsed,
        tooltipsPosition: context.tooltipsPosition,
      })}
    </div>
  );
};

describe("GIVEN <Menu />", () => {
  describe("WHEN rendered", () => {
    it("SHOULD render children correctly", () => {
      makeSut();
      expect(screen.getByText(bodyChildren)).toBeDefined();
    });
  });

  describe("WHEN tooltip configuration is provided", () => {
    it("SHOULD pass showTooltipsWhenCollapsed and tooltipsPosition to context", () => {
      render(
        <Menu
          expanded={false}
          showTooltipsWhenCollapsed={false}
          tooltipsPosition="left"
        >
          <ContextConsumer />
        </Menu>
      );

      const contextValue = JSON.parse(
        screen.getByTestId("context-value").textContent || "{}"
      );

      expect(contextValue.expanded).toBe(false);
      expect(contextValue.showTooltipsWhenCollapsed).toBe(false);
      expect(contextValue.tooltipsPosition).toBe("left");
    });

    it("SHOULD use default values when tooltip props are not provided", () => {
      render(
        <Menu>
          <ContextConsumer />
        </Menu>
      );

      const contextValue = JSON.parse(
        screen.getByTestId("context-value").textContent || "{}"
      );

      expect(contextValue.expanded).toBe(true);
      expect(contextValue.showTooltipsWhenCollapsed).toBe(true);
      expect(contextValue.tooltipsPosition).toBe("right");
    });
  });
});
