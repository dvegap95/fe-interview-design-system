// @ts-nocheck — loads built ESM from dist/; run `pnpm build` then restart Storybook.
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../dist/style.css";
import { ActiveTabContextProvider } from "../dist/context/activeTabContext.js";
import { Badge, Tab, TabPanel, Tabs } from "../dist/index.js";

const meta = {
  title: "Package/Dist build",
  parameters: {
    docs: {
      description: {
        component:
          "Mounts the built package (`dist/index.js` + `dist/style.css`). Run `pnpm build`, then restart Storybook if this story is missing.",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const PillWithPanels: Story = {
  name: "Pill + panels + badge",
  render: () => (
    <ActiveTabContextProvider defaultActiveTab="emails">
      <Tabs
        variant="pill"
        size="md"
      >
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
      </Tabs>
      <TabPanel value="emails">Emails panel</TabPanel>
      <TabPanel value="files">Files panel</TabPanel>
      <TabPanel value="edits">Edits panel</TabPanel>
      <TabPanel value="dashboard">Dashboard panel</TabPanel>
      <TabPanel value="messages">Messages panel</TabPanel>
    </ActiveTabContextProvider>
  ),
};

export const UnderlineWithPanels: Story = {
  name: "Underline + panels",
  render: () => (
    <ActiveTabContextProvider defaultActiveTab="one">
      <Tabs
        variant="underline"
        size="sm"
      >
        <Tab value="one">One</Tab>
        <Tab value="two">Two</Tab>
        <Tab value="three">Three</Tab>
      </Tabs>
      <TabPanel value="one">Panel one</TabPanel>
      <TabPanel value="two">Panel two</TabPanel>
      <TabPanel value="three">Panel three</TabPanel>
    </ActiveTabContextProvider>
  ),
};
