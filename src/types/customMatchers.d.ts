import "vitest";

declare module "vitest" {
	interface Matchers<
		R extends void | Promise<void> = void | Promise<void>,
		T = unknown,
	> {
		/**
		 * Asserts `aria-selected="true"`.
		 * Not for checkable controls — use `aria-checked` / `toBeChecked()` instead.
		 */
		toBeSelected: () => R;
	}
}

export {};
