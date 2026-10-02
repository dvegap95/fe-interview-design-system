import { expect } from "vitest";

expect.extend({
  toBeSelected(element: HTMLElement) {
    const { isNot } = this;
    const pass = element.getAttribute("aria-selected") === "true";

    return {
      pass,
      message: () =>
        `expected ${element.outerHTML}${isNot ? " not" : ""} to be selected (aria-selected)`,
      actual: element.getAttribute("aria-selected"),
      expected: "true",
    };
  },
});
