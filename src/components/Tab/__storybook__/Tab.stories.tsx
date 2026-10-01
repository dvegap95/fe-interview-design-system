import type { Meta, StoryObj } from '@storybook/react-vite';
import Tab from '../Tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const Selected: Story = {
  args: {
    children: 'Label',
    selected: true,
  },
};

export const DefaultSm: Story = {
  args: {
    children: 'Label',
    size: 'sm',
  },
};

export const SelectedSm: Story = {
  args: {
    children: 'Label',
    size: 'sm',
    selected: true,
  },
};
