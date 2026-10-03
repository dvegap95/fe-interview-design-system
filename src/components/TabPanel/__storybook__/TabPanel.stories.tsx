import type { Meta, StoryObj } from "@storybook/react-vite";
import Tab from "@/components/Tab";
import { Tabs } from "@/components/Tabs";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import TabPanel from "../TabPanel";

const meta = {
  title: "Components/TabPanel",
  component: TabPanel,
} satisfies Meta<typeof TabPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTabs: Story = {
  args: {
    children: null,
    value: "tab1",
  },
  render: () => (
    <ActiveTabContextProvider defaultActiveTab="tab1">
      <Tabs>
        <Tab value="tab1">Label</Tab>
        <Tab value="tab2">Label</Tab>
        <Tab value="tab3">Label</Tab>
        <Tab value="tab4">Label</Tab>
      </Tabs>
      <TabPanel value="tab1">Panel content for tab 1</TabPanel>
      <TabPanel value="tab2">Panel content for tab 2</TabPanel>
      <TabPanel value="tab3">Panel content for tab 3</TabPanel>
      <TabPanel value="tab4">Panel content for tab 4</TabPanel>
    </ActiveTabContextProvider>
  ),
};
