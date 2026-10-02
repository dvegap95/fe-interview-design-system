import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "@/components/Badge/Badge";
import Tab from "../Tab";

const meta = {
  title: "Components/Tab",
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPill: Story = {
  args: {
    children: "Label",
  },
};

export const SelectedPill: Story = {
  args: {
    children: "Label",
    selected: true,
  },
};

export const DefaultUnderline: Story = {
  args: {
    children: "Label",
    variant: "underline",
  },
};

export const SelectedUnderline: Story = {
  args: {
    children: "Label",
    variant: "underline",
    selected: true,
  },
};

export const WithBadge: Story = {
  args: {
    children: "Label",
    slots: {
      end: <Badge variant="positive">BADGE</Badge>,
    },
  },
};