import type { Meta, StoryObj } from '@storybook/react-vite';
import Tab from '../Tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPill: Story = {
  args: {
    children: 'Label',
  },
};

export const SelectedPill: Story = {
  args: {
    children: 'Label',
    selected: true,
  },
};

export const DefaultOutline: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
  },
};

export const SelectedOutline: Story = {
  args: {
    children: 'Label',
    variant: 'outline',
    selected: true,
  },
};