import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "@/components/Badge";
import Tab from "../Tab";
import { tabControls } from "./controls";

const meta = {
  title: "Components/Tab",
  component: Tab,
  argTypes: tabControls,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Label",
    variant: "pill",
    size: "md",
    selected: false,
  },
};

export const WithBadge: Story = {
  args: {
    children: "Files",
    size: "sm",
    slots: {
      end: (
        <Badge
          variant="negative"
          size="md"
        >
          Warning
        </Badge>
      ),
    },
  },
};
