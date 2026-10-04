import { render, screen } from "@testing-library/react";
import Tab from "@/components/Tab";
import { Tabs } from "@/components/Tabs";
import type { Size } from "@/context/sizeContext";
import Badge from "../Badge";

type TestCase = {
  sizeProps: (Size | undefined)[];
  expectedSizes: (Size | undefined)[];
  description: string;
};

// biome-ignore format: compact test cases presentation
const testCases: TestCase[] = [{
  sizeProps: [undefined, undefined, undefined],
  expectedSizes: ["md", "md", "md"],
  description: "default size if unspecified (md)",
}, {
  sizeProps: ["sm", undefined, undefined],
  expectedSizes: ["sm", "sm", "sm"],
  description: "all inherited from Tabs",
}, {
  sizeProps: ["sm", "md", undefined],
  expectedSizes: ["sm", "md", "md"],
  description: "inherited from Tabs and overridden by Tab",
}, {
  sizeProps: ["sm", "sm", "md"],
  expectedSizes: ["sm", "sm", "md"],
  description: "All stated",
}];

describe("Badge", () => {
  it("should render", () => {
    render(<Badge>Badge Text</Badge>);
    expect(screen.getByText("Badge Text")).toBeInTheDocument();
  });

  it.each<TestCase>(testCases)(
    "should resolve size from nested context and props ({description})",
    ({ sizeProps, expectedSizes }) => {
      render(
        <Tabs size={sizeProps[0]}>
          <Tab
            size={sizeProps[1]}
            slots={{
              end: <Badge size={sizeProps[2]}>Badge Text</Badge>,
            }}
          >
            Tab Text
          </Tab>
        </Tabs>,
      );
      const badge = screen.getByText("Badge Text");
      expect(badge).toHaveAttribute("data-size", expectedSizes[2]);

      const tab = screen.getByRole("tab");
      expect(tab).toHaveAttribute("data-size", expectedSizes[1]);

      const tabs = screen.getByRole("tablist");
      expect(tabs).toHaveAttribute("data-size", expectedSizes[0]);
    },
  );
});
