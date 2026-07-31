import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@nimbus-ds/components";
import { PlanDisplay } from "../../PlanDisplay";

const meta: Meta<typeof PlanDisplay.Price> = {
  title: "Patterns/PlanDisplay/PlanDisplay.Price",
  component: PlanDisplay.Price,
  argTypes: {
    annualNote: {
      control: { disable: true },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PlanDisplay.Price>;

export const base: Story = {
  args: {
    price: "$999",
    period: "/mes",
  },
};

export const withPreviousPrice: Story = {
  args: {
    price: "$24.999",
    previousPrice: "$29.999",
    period: "/mes",
  },
};

export const withAnnualNote: Story = {
  args: {
    price: "$24.999",
    previousPrice: "$29.999",
    period: "/mes",
    annualNote: (
      <>
        $269.990/año.{" "}
        <Text as="span" color="primary-textLow" fontSize="caption">
          Ahorra $30.000.
        </Text>
      </>
    ),
  },
};
