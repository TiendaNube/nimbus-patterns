import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { PlaygroundCheck } from "./PlaygroundCheck";

const meta: Meta<typeof PlaygroundCheck> = {
  title: "Prototypes/PlaygroundCheck",
  component: PlaygroundCheck,
  args: { initialCount: 0 },
  argTypes: { initialCount: { control: { type: "number", min: 0 } } },
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PlaygroundCheck>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Add item" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Count: 1");
    await userEvent.click(canvas.getByRole("button", { name: "Reset" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("Count: 0");
  },
};

export const FullScreen: Story = {
  name: "Full screen",
  parameters: { layout: "fullscreen", controls: { disable: true } },
};
