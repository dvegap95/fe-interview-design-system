import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import Badge from "../Badge";
import { badgeControls } from "./controls";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: badgeControls,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const figmaQa = {
  docs: {
    disable: true,
  },
} as const;

const BadgeVariantsRow = ({ size, gap }: { size: "sm" | "md"; gap: CSSProperties["gap"] }) => {
  return (
    <div
      style={{
        display: "flex",
        gap,
      }}
    >
      <Badge
        variant="neutral"
        size={size}
      >
        Badge
      </Badge>
      <Badge
        variant="positive"
        size={size}
      >
        Badge
      </Badge>
      <Badge
        variant="negative"
        size={size}
      >
        Badge
      </Badge>
    </div>
  );
};

export const Playground: Story = {
  args: {
    children: "Badge",
    variant: "neutral",
    size: "md",
  },
};

export const AllVariantsSm: Story = {
  parameters: figmaQa,
  render: () => (
    <BadgeVariantsRow
      size="sm"
      gap="28px"
    />
  ),
};

export const AllVariantsMd: Story = {
  parameters: figmaQa,
  render: () => (
    <BadgeVariantsRow
      size="md"
      gap="20px"
    />
  ),
};
