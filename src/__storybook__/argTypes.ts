import type { ArgTypes } from "@storybook/react-vite";

/** Shared size control used by Badge, Tab, and Tabs. */
export const sizeArgType = {
  control: "inline-radio",
  options: [
    "sm",
    "md",
  ],
  description: "Size; inherits from nearest `SizeProvider` when omitted.",
  table: {
    type: {
      summary: '"sm" | "md"',
    },
    defaultValue: {
      summary: "md",
    },
  },
} as const;

/** Tab / Tabs visual style. */
export const tabVariantArgType = {
  control: "inline-radio",
  options: [
    "pill",
    "underline",
  ],
  description: "Visual style; inherits from nearest `TabVariantProvider` when omitted.",
  table: {
    type: {
      summary: '"pill" | "underline"',
    },
    defaultValue: {
      summary: "pill",
    },
  },
} as const;

/** Hide noisy React / DOM props from Controls and ArgTypes tables. */
export const hideNativeArgTypes = {
  ref: {
    table: {
      disable: true,
    },
  },
  key: {
    table: {
      disable: true,
    },
  },
  style: {
    table: {
      disable: true,
    },
  },
} as const satisfies ArgTypes;

export const classNameArgType = {
  control: "text",
  description: "Extra class names merged onto the root element.",
  table: {
    type: {
      summary: "string",
    },
  },
} as const;

export const childrenArgType = {
  control: "text",
  description: "Component content.",
  table: {
    type: {
      summary: "ReactNode",
    },
  },
} as const;

export const idArgType = {
  control: "text",
  description: "Element id. Pair tab `id` with panel `aria-labelledby`.",
  table: {
    category: "Accessibility",
    type: {
      summary: "string",
    },
  },
} as const;

export const ariaLabelArgType = {
  control: "text",
  description: "Accessible name when there is no visible label (e.g. tablist).",
  table: {
    category: "Accessibility",
    type: {
      summary: "string",
    },
  },
} as const;

export const ariaLabelledByArgType = {
  control: "text",
  description: "Id of the labeling element (panel → tab id).",
  table: {
    category: "Accessibility",
    type: {
      summary: "string",
    },
  },
} as const;

export const ariaControlsArgType = {
  control: "text",
  description: "Id of the controlled element (tab → panel id).",
  table: {
    category: "Accessibility",
    type: {
      summary: "string",
    },
  },
} as const;
