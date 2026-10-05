import type { Meta } from "@storybook/react-vite";
import {
  ariaControlsArgType,
  ariaLabelArgType,
  childrenArgType,
  classNameArgType,
  hideNativeArgTypes,
  idArgType,
  sizeArgType,
  tabVariantArgType,
} from "@/__storybook__/argTypes";
import type Tab from "../Tab";

export const tabControls = {
  ...hideNativeArgTypes,
  children: childrenArgType,
  className: classNameArgType,
  variant: tabVariantArgType,
  size: sizeArgType,
  selected: {
    control: "boolean",
    description:
      "Forces selected appearance on this Tab only. Prefer outside the provider; mixing with context can select two tabs.",
    table: {
      type: {
        summary: "boolean",
      },
    },
  },
  value: {
    control: "text",
    description:
      "Value matched against the active tab from context. Required for selection — without it, clicks do not change the active tab.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  slots: {
    control: false,
    description: "Optional trailing content (typically a `Badge` via `slots.end`).",
    table: {
      type: {
        summary: "{ end?: ReactNode }",
      },
    },
  },
  id: idArgType,
  "aria-controls": ariaControlsArgType,
  "aria-label": ariaLabelArgType,
} satisfies Meta<typeof Tab>["argTypes"];
