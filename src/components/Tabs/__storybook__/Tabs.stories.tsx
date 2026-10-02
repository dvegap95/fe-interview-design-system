import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Tab from "@/components/Tab/Tab";
import { TabsWithContext } from "../Tabs";
import type { TabsWithContextProps } from "../types";

const meta = {
  title: "Components/Tabs",
  component: TabsWithContext,
} satisfies Meta<typeof TabsWithContext>;

export default meta;

type Story = StoryObj<typeof meta>;

const DEFAULT_CHILDREN = (
  <>
    <Tab value="tab1">Label</Tab>
    <Tab value="tab2">Label</Tab>
    <Tab value="tab3">Label</Tab>
    <Tab value="tab4">Label</Tab>
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

const ControlledTemplate = (args: TabsWithContextProps) => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <TabsWithContext
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
    defaultActiveTab: "tab2",
  },
};

export const UnderlineMd: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "underline",
    size: "md",
    defaultActiveTab: "tab2",
  },
};

export const PillSm: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "pill",
    size: "sm",
    defaultActiveTab: "tab2",
  },
};

export const UnderlineSm: Story = {
  args: {
    children: DEFAULT_CHILDREN,
    variant: "underline",
    size: "sm",
    defaultActiveTab: "tab2",
  },
};

export const Overflow: Story = {
  args: {
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
  },
  globals: {
    viewport: "small",
  },
};
