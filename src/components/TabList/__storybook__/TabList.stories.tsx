import type { Meta, StoryObj } from '@storybook/react-vite';
import TabList from '../TabList';
import Tab from '@/components/Tab/Tab';
import { useState } from 'react';
import { TabListProps } from '../types';

const meta = {
  title: 'Components/TabList',
  component: TabList,
} satisfies Meta<typeof TabList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    children: <>
      <Tab value="tab1">Tab1</Tab>
      <Tab value="tab2">Tab2</Tab>
      <Tab value="tab3">Tab3</Tab>
      <Tab value="tab4">Tab4</Tab>
    </>,
    defaultActiveTab: 'tab1',
  },
};

export const Controlled: Story = {
  args: {
    children: <>
      <Tab value="tab1">Tab1</Tab>
      <Tab value="tab2">Tab2</Tab>
      <Tab value="tab3">Tab3</Tab>
      <Tab value="tab4">Tab4</Tab>
    </>,
    activeTab: 'tab3',
  },
}

const ControlledTemplate = (args: TabListProps) => {
  const [activeTab, setActiveTab] = useState('tab1');
  return <TabList {...args} activeTab={activeTab} onActiveTabChange={setActiveTab} />
}
export const ControlledWired: Story = {
  render: ControlledTemplate,
  args: {
    children: <>
      <Tab value="tab1">Tab1</Tab>
      <Tab value="tab2">Tab2</Tab>
      <Tab value="tab3">Tab3</Tab>
      <Tab value="tab4">Tab4</Tab>
    </>,
  },
};