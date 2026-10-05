import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import Badge from "@/components/Badge";
import { Tabs } from "@/components/Tabs";
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

/** Components-only: omit Badge `size` so it inherits from the Tab / Tabs size context. */
export const BadgeInheritsSize: Story = {
  args: {
    children: "Files",
    size: "sm",
    slots: {
      end: <Badge variant="negative">Warning</Badge>,
    },
  },
};

// Function story: Docs "Show code" extracts this JSX instead of a CSF `render` object.
export const PropOverridesContext: StoryFn = () => (
  <Tabs
    variant="pill"
    size="sm"
  >
    <Tab variant="underline">Underline override</Tab>
    <Tab size="md">Md size override</Tab>
    <Tab>Inherits pill sm</Tab>
  </Tabs>
);
PropOverridesContext.parameters = {
  controls: {
    disable: true,
  },
};
