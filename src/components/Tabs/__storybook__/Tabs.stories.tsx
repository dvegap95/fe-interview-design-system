import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Badge from "@/components/Badge";
import Tab from "@/components/Tab";
import { ManagedTabs } from "../Tabs";
import type { ManagedTabsProps } from "../types";
import styles from "./TabsStories.module.scss";

const meta = {
  title: "Components/Tabs",
  component: ManagedTabs,
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

export const Uncontrolled: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    defaultActiveTab: "tab1",
  },
};

export const Controlled: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    activeTab: "tab3",
  },
};

const ControlledTemplate = (args: ManagedTabsProps) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ManagedTabs
      {...args}
      activeTab={activeTab}
      onActiveTabChange={setActiveTab}
    />
  );
};
export const ControlledWired: Story = {
  render: ControlledTemplate,
  args: {
    children: DEFAULT_CHILDREN,
  },
};

export const PillMd: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "pill",
    size: "md",
    defaultActiveTab: "tab1",
  },
};

export const UnderlineMd: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "underline",
    size: "md",
    defaultActiveTab: "tab1",
  },
};

export const PillSm: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "pill",
    size: "sm",
    defaultActiveTab: "tab1",
  },
};

export const UnderlineSm: Story = {
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

export const Example1: Story = {
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

export const Example2: Story = {
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
