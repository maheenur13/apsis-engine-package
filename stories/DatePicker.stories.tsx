import { Meta } from "@storybook/react";
import type { StoryObj } from "@storybook/react";
import { DatePicker } from "../lib";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/Atoms/Date Picker",
  component: DatePicker,
  tags:['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Date: Story = {
  args: {
    picker:'date'

  },
};

export const Week: Story = {
  args: {
    picker:'week'
   
  },
};

export const Quarter: Story = {
  args: {
    picker:'quarter'
  },
};

export const Month: Story = {
  args: {
    picker:'month'
  },
};

export const Year: Story = {
  args: {
    picker:'year'
  },
};
export const Time: Story = {
  args: {
    picker:'time'
  },
};
