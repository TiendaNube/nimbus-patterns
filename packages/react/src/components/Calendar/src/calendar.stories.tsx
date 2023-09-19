import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";
import {
  CalendarRender,
  DatePickerRender,
  ScrollingDatePickerModal
} from "./calendar.utils";

const meta: Meta<typeof Calendar> = {
  title: "Patterns/Calendar",
  component: Calendar,
  argTypes: {
    containerProps: { control: { disable: true } }
  },
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Basic: Story = {
  args: {},
  render: CalendarRender,
};

export const DatePicker: Story = {
  args: {},
  render: DatePickerRender,
}

export const DatePickerModal: Story = {
  args: {},
  render: ScrollingDatePickerModal,
}
