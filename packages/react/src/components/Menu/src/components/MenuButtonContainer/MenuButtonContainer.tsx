import React, { forwardRef } from "react";
import {
  MenuButton,
  MenuButtonAccordionBaseProps,
} from "@nimbus-ds/menubutton";
import { useMenuContext } from "../../context/MenuContext";
import {
  MenuButtonBaseProps,
  MenuButtonComponents,
} from "packages/react/src/components/MenuButton/src/menuButton.types";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/components";

const MenuButtonContainer = forwardRef(
  (props: MenuButtonBaseProps & { as: any }, ref) => {
    const { collapsed } = useMenuContext();
    return <MenuButton ref={ref} collapsed={collapsed} {...props} />;
  }
) as PolymorphicForwardRefComponent<"button" | "a", MenuButtonBaseProps> &
  MenuButtonComponents;

const MenuButtonAccordionContainer = forwardRef(
  (props: MenuButtonAccordionBaseProps & { as: any }, ref) => {
    const { collapsed } = useMenuContext();
    return (
      <MenuButton.Accordion ref={ref} collapsed={collapsed} {...props} />
    );
  }
) as PolymorphicForwardRefComponent<
  "button" | "a",
  MenuButtonAccordionBaseProps
> &
  MenuButtonComponents;

export { MenuButtonContainer, MenuButtonAccordionContainer };
