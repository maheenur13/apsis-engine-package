import { Meta } from "@storybook/react";
import type { StoryObj } from "@storybook/react";

import {  Mastergrid } from "../lib";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Components/Engine/MasterGrid",
  component: Mastergrid,
  tags:['autodocs'],
} satisfies Meta<typeof Mastergrid>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    slug: "cit_drivers",
  },
};



