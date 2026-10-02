import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import Badge from "../Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const BadgeVariantsRow = ({ size, gap }: { size: "sm" | "md", gap: CSSProperties['gap'] }) => {
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

export const Default: Story = {
  render: () => <Badge>Badge</Badge>,
};

export const AllVariantsSm: Story = {
  render: () => <BadgeVariantsRow size="sm" gap="28px" />,
};

export const AllVariantsMd: Story = {
  render: () => <BadgeVariantsRow size="md" gap="20px" />,
};
