import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import Badge from "@/components/Badge";
import Tab from "@/components/Tab";
import { ManagedTabs } from "../Tabs";
import type { ManagedTabsProps } from "../types";
import { tabsControls } from "./controls";
import styles from "./TabsStories.module.scss";

const meta = {
  title: "Components/Tabs",
  component: ManagedTabs,
  argTypes: tabsControls,
} satisfies Meta<typeof ManagedTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_CHILDREN = (
  <>
    <Tab value="tab1">Label</Tab>
    <Tab value="tab2">Label</Tab>
    <Tab value="tab3">Label</Tab>
    <Tab value="tab4">Label</Tab>
    <Tab value="tab5">Label</Tab>
  </>
);

export const Playground: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    defaultActiveTab: "tab1",
    variant: "pill",
    size: "md",
  },
};

export const Controlled: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    activeTab: "tab3",
    onActiveTabChange: fn(),
  },
};

const ControlledTemplate = (args: ManagedTabsProps) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ManagedTabs
      {...args}
      activeTab={activeTab}
      onActiveTabChange={(value) => {
        args.onActiveTabChange?.(value);
        setActiveTab(value);
      }}
    />
  );
};

export const ControlledWired: Story = {
  render: ControlledTemplate,
  args: {
    children: DEFAULT_CHILDREN,
    onActiveTabChange: fn(),
  },
};

const figmaQa = {
  docs: {
    disable: true,
  },
} as const;

export const PillMd: Story = {
  parameters: figmaQa,
  args: {
    children: DEFAULT_CHILDREN,
    variant: "pill",
    size: "md",
    defaultActiveTab: "tab1",
  },
};

export const UnderlineMd: Story = {
  parameters: figmaQa,
  args: {
    children: DEFAULT_CHILDREN,
    variant: "underline",
    size: "md",
    defaultActiveTab: "tab1",
  },
};

export const PillSm: Story = {
  parameters: figmaQa,
  args: {
    children: DEFAULT_CHILDREN,
    variant: "pill",
    size: "sm",
    defaultActiveTab: "tab1",
  },
};

export const UnderlineSm: Story = {
  parameters: figmaQa,
  args: {
    children: DEFAULT_CHILDREN,
    variant: "underline",
    size: "sm",
    defaultActiveTab: "tab1",
  },
};

export const Overflow: Story = {
  args: {
    className: styles.overflowTabs,
    children: (
      <>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
        <Tab value="tab4">Tab 4</Tab>
        <Tab value="tab5">Tab 5</Tab>
        <Tab value="tab6">Tab 6</Tab>
        <Tab value="tab7">Tab 7</Tab>
        <Tab value="tab8">Tab 8</Tab>
        <Tab value="tab9">Tab 9</Tab>
      </>
    ),
    variant: "pill",
    size: "md",
    defaultActiveTab: "tab8",
    autoScrollBehavior: "smooth",
  },
  globals: {
    viewport: "small",
  },
};

export const Vertical: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    defaultActiveTab: "tab1",
    orientation: "vertical",
  },
};

export const WithBadge: Story = {
  args: {
    children: (
      <>
        <Tab value="emails">Emails</Tab>
        <Tab
          value="files"
          slots={{
            end: (
              <Badge
                variant="negative"
                size="md"
              >
                Warning
              </Badge>
            ),
          }}
        >
          Files
        </Tab>
        <Tab value="edits">Edits</Tab>
        <Tab value="dashboard">Dashboard</Tab>
        <Tab value="messages">Messages</Tab>
      </>
    ),
    variant: "pill",
    size: "sm",
    defaultActiveTab: "emails",
  },
};

export const UnderlineWithBadge: Story = {
  args: {
    children: (
      <>
        <Tab value="emails">Emails</Tab>
        <Tab
          value="files"
          slots={{
            end: (
              <Badge
                variant="negative"
                size="md"
              >
                Warning
              </Badge>
            ),
          }}
        >
          Files
        </Tab>
        <Tab value="edits">Edits</Tab>
        <Tab value="dashboard">Dashboard</Tab>
        <Tab value="messages">Messages</Tab>
      </>
    ),
    variant: "underline",
    size: "sm",
    defaultActiveTab: "emails",
  },
};
