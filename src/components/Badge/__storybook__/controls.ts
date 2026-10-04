import type { Meta } from "@storybook/react-vite";
import {
  ariaLabelArgType,
  childrenArgType,
  classNameArgType,
  hideNativeArgTypes,
  idArgType,
  sizeArgType,
} from "@/__storybook__/argTypes";
import type Badge from "../Badge";

export const badgeControls = {
  ...hideNativeArgTypes,
  children: childrenArgType,
  className: classNameArgType,
  variant: {
    control: "inline-radio",
    options: [
      "neutral",
      "positive",
      "negative",
    ],
    description: "Visual tone.",
    table: {
      type: {
        summary: '"neutral" | "positive" | "negative"',
      },
      defaultValue: {
        summary: "neutral",
      },
    },
  },
  size: sizeArgType,
  id: idArgType,
  "aria-label": ariaLabelArgType,
} satisfies Meta<typeof Badge>["argTypes"];
