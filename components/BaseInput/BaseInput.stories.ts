import type { Meta, StoryObj } from "@storybook/vue3";

import BaseInput from "./BaseInput.vue";

const meta = {
  title: "BaseInput",
  component: BaseInput,
  render: (args: any) => ({
    components: { BaseInput },
    setup() {
      return { args };
    },
    template: '<BaseInput type="text" />',
  }),
} satisfies Meta<typeof BaseInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    type: "text",
  },
};
