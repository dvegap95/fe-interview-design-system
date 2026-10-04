import type { Meta, StoryObj } from "@storybook/react-vite";
import Tab from "@/components/Tab";
import { Tabs } from "@/components/Tabs";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import TabPanel from "../TabPanel";
import { tabPanelControls } from "./controls";

const meta = {
  title: "Components/TabPanel",
  component: TabPanel,
  argTypes: tabPanelControls,
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
      <Tabs aria-label="Demo sections">
        <Tab
          id="tab-1"
          value="tab1"
          aria-controls="panel-1"
        >
          Label
        </Tab>
        <Tab
          id="tab-2"
          value="tab2"
          aria-controls="panel-2"
        >
          Label
        </Tab>
        <Tab
          id="tab-3"
          value="tab3"
          aria-controls="panel-3"
        >
          Label
        </Tab>
        <Tab
          id="tab-4"
          value="tab4"
          aria-controls="panel-4"
        >
          Label
        </Tab>
      </Tabs>
      <TabPanel
        id="panel-1"
        value="tab1"
        aria-labelledby="tab-1"
      >
        Panel content for tab 1
      </TabPanel>
      <TabPanel
        id="panel-2"
        value="tab2"
        aria-labelledby="tab-2"
      >
        Panel content for tab 2
      </TabPanel>
      <TabPanel
        id="panel-3"
        value="tab3"
        aria-labelledby="tab-3"
      >
        Panel content for tab 3
      </TabPanel>
      <TabPanel
        id="panel-4"
        value="tab4"
        aria-labelledby="tab-4"
      >
        Panel content for tab 4
      </TabPanel>
    </ActiveTabContextProvider>
  ),
};
