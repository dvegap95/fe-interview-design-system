import type { Meta, StoryObj } from '@storybook/react-vite';
import TabPresentationTable from './TabPresentationTable/TabPresentationTable';

const meta = {
    title: 'Components/Tab/VariantsAndStates',
    component: TabPresentationTable,
} satisfies Meta<typeof TabPresentationTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const hoverIds = ['#default-pill-hover', '#selected-pill-hover', '#default-outline-hover', '#selected-outline-hover'];
const focusIds = ['#default-pill-focus', '#selected-pill-focus', '#default-outline-focus', '#selected-outline-focus'];
const activeIds = ['#default-pill-active', '#selected-pill-active', '#default-outline-active', '#selected-outline-active'];
const pseudo = {
    hover: hoverIds,
    focusVisible: focusIds,
    active: activeIds,
};

export const MobileOffTabPresentationTable: Story = {
    args: {
        size: 'md',
    },
};
MobileOffTabPresentationTable.parameters = {
    pseudo
};

export const MobileOnTabPresentationTable: Story = {
    args: {
        size: 'sm',
    },
};
MobileOnTabPresentationTable.parameters = {
    pseudo
};