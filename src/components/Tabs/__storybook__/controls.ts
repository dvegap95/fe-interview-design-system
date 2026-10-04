import type { Meta } from "@storybook/react-vite";
import {
  ariaLabelArgType,
  ariaLabelledByArgType,
  classNameArgType,
  hideNativeArgTypes,
  idArgType,
  sizeArgType,
  tabVariantArgType,
} from "@/__storybook__/argTypes";
import type { ManagedTabs } from "../Tabs";

export const tabsControls = {
  ...hideNativeArgTypes,
  className: classNameArgType,
  children: {
    control: false,
    description: "Tab items (`Tab` children). Panels stay outside `ManagedTabs`.",
    table: {
      type: {
        summary: "ReactNode",
      },
    },
  },
  variant: tabVariantArgType,
  size: sizeArgType,
  orientation: {
    control: "inline-radio",
    options: [
      "horizontal",
      "vertical",
    ],
    description: "Tab list orientation for layout and arrow-key navigation.",
    table: {
      type: {
        summary: '"horizontal" | "vertical"',
      },
      defaultValue: {
        summary: "horizontal",
      },
    },
  },
  autoScrollBehavior: {
    control: "select",
    options: [
      "none",
      "auto",
      "smooth",
      "instant",
    ],
    description:
      'Opt-in scroll-into-view for the selected tab. Host must own overflow CSS (see Overflow docs). `"none"` disables auto-scroll; otherwise passed to `scrollIntoView` as `behavior`.',
    table: {
      type: {
        summary: 'ScrollBehavior | "none"',
      },
      defaultValue: {
        summary: "none",
      },
    },
  },
  defaultActiveTab: {
    control: "text",
    description: "Initial active tab for uncontrolled usage.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  // Avoid meta-level `action:` — it injects onActiveTabChange and breaks uncontrolled.
  activeTab: {
    control: false,
    description: "Controlled active tab value.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  onActiveTabChange: {
    control: false,
    description: "Called when selection should change.",
    table: {
      type: {
        summary: "(activeTab: string) => void",
      },
    },
  },
  id: idArgType,
  "aria-label": ariaLabelArgType,
  "aria-labelledby": ariaLabelledByArgType,
} satisfies Meta<typeof ManagedTabs>["argTypes"];
