import type { Meta } from "@storybook/react-vite";
import {
  ariaLabelArgType,
  ariaLabelledByArgType,
  childrenArgType,
  classNameArgType,
  hideNativeArgTypes,
  idArgType,
} from "@/__storybook__/argTypes";
import type TabPanel from "../TabPanel";

export const tabPanelControls = {
  ...hideNativeArgTypes,
  children: childrenArgType,
  className: classNameArgType,
  value: {
    control: "text",
    description: "Shown when this value matches the active tab from context.",
    table: {
      type: {
        summary: "string",
      },
    },
  },
  id: idArgType,
  "aria-labelledby": ariaLabelledByArgType,
  "aria-label": ariaLabelArgType,
} satisfies Meta<typeof TabPanel>["argTypes"];
