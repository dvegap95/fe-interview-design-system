import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";
import Badge from "@/components/Badge";
import Tab from "@/components/Tab";
import TabPanel from "@/components/TabPanel";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { ManagedTabs, Tabs } from "../Tabs";
import type { ManagedTabsProps } from "../types";
import customStyles from "./CustomStyled.module.scss";
import { tabsControls } from "./controls";
import styles from "./TabsStories.module.scss";

const meta = {
  title: "Components/Tabs",
  component: ManagedTabs,
  argTypes: tabsControls,
} satisfies Meta<typeof ManagedTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

// biome-ignore format: compact declaration
const DEFAULT_CHILDREN = [
    <Tab key="tab1" value="tab1">Label</Tab>,
    <Tab key="tab2" value="tab2">Label</Tab>,
    <Tab key="tab3" value="tab3">Label</Tab>,
    <Tab key="tab4" value="tab4">Label</Tab>,
    <Tab key="tab5" value="tab5">Label</Tab>,
  ]
;

export const Playground: Story = {
  args: {
    "aria-label": "Demo sections",
    children: DEFAULT_CHILDREN,
    defaultActiveTab: "tab1",
    variant: "pill",
    size: "md",
  },
};

export const Controlled: Story = {
  args: {
    "aria-label": "Demo sections",
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
    "aria-label": "Demo sections",
    children: DEFAULT_CHILDREN,
    onActiveTabChange: fn(),
  },
};

// biome-ignore format: compact declaration
const DISABLED_CHILDREN = [
  <Tab key="tab1" value="tab1">Label</Tab>,
  <Tab key="tab2" value="tab2" disabled>Disabled</Tab>,
  <Tab key="tab3" value="tab3">Label</Tab>,
  <Tab key="tab4" value="tab4" disabled>Disabled</Tab>,
  <Tab key="tab5" value="tab5">Label</Tab>,
];

export const Disabled: Story = {
  args: {
    "aria-label": "Sections with disabled tabs",
    children: DISABLED_CHILDREN,
    defaultActiveTab: "tab1",
    variant: "pill",
    size: "md",
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

// biome-ignore format: compact declaration
const OVERFLOW_CHILDREN = [
  <Tab key="tab1" value="tab1">Tab 1</Tab>,
  <Tab key="tab2" value="tab2">Tab 2</Tab>,
  <Tab key="tab3" value="tab3">Tab 3</Tab>,
  <Tab key="tab4" value="tab4">Tab 4</Tab>,
  <Tab key="tab5" value="tab5">Tab 5</Tab>,
  <Tab key="tab6" value="tab6">Tab 6</Tab>,
  <Tab key="tab7" value="tab7">Tab 7</Tab>,
  <Tab key="tab8" value="tab8">Tab 8</Tab>,
  <Tab key="tab9" value="tab9">Tab 9</Tab>,
];

export const Overflow: Story = {
  args: {
    "aria-label": "Overflowing sections",
    className: styles.overflowTabs,
    children: OVERFLOW_CHILDREN,
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
    "aria-label": "Vertical sections",
    children: DEFAULT_CHILDREN,
    defaultActiveTab: "tab1",
    orientation: "vertical",
  },
};

export const WithBadge: Story = {
  args: {
    "aria-label": "Sections with badge",
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

/** Components-only: Badge omits `size` and inherits from the `sm` tablist. */
export const BadgeInheritsSize: Story = {
  args: {
    "aria-label": "Sections with inheriting badge",
    children: (
      <>
        <Tab value="emails">Emails</Tab>
        <Tab
          value="files"
          slots={{
            end: <Badge variant="negative">Warning</Badge>,
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
    "aria-label": "Underline sections with badge",
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

export const CustomStyled: Story = {
  args: {
    children: null,
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => (
    <ActiveTabContextProvider defaultActiveTab="overview">
      <Tabs
        className={customStyles.tabs}
        aria-label="Custom styled sections"
      >
        <Tab
          className={customStyles.tab}
          id="custom-tab-overview"
          value="overview"
          aria-controls="custom-panel-overview"
        >
          Overview
        </Tab>
        <Tab
          className={customStyles.tab}
          id="custom-tab-files"
          value="files"
          aria-controls="custom-panel-files"
          slots={{
            end: <Badge className={customStyles.badge}>Hot</Badge>,
          }}
        >
          Files
        </Tab>
      </Tabs>
      <TabPanel
        className={customStyles.panel}
        id="custom-panel-overview"
        value="overview"
        aria-labelledby="custom-tab-overview"
      >
        Panels and tabs restyled only through className.
      </TabPanel>
      <TabPanel
        className={customStyles.panel}
        id="custom-panel-files"
        value="files"
        aria-labelledby="custom-tab-files"
      >
        Badge in slots.end is restyled the same way.
      </TabPanel>
    </ActiveTabContextProvider>
  ),
};
