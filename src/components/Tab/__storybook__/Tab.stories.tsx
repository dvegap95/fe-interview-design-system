import type { Meta, StoryObj } from '@storybook/react-vite';
import Tab from '../Tab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
//   argTypes: {
//     variant: {
//       control: 'select',
//       options: ['primary', 'secondary', 'danger'],
//     },
//   },
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tab',
  },
};
