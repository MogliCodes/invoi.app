import type { Meta, StoryObj } from "@storybook/vue3";

import TheSidebar from "./TheSidebar.vue";

const meta = {
  title: "TheSidebar",
  component: TheSidebar,
  render: (args: any) => ({
    components: { TheSidebar },
    setup() {
      return { args };
    },
    template: '<TheSidebar type="text" />',
  }),
} satisfies Meta<typeof TheSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    type: "text",
  },
};
