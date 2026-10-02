import { render, screen } from "@testing-library/react";
import { Tabs, TabsContextProvider } from "@/components/Tabs";
import { CONFLICT_WARNING } from "../constants";
import Tab from "../Tab";
import styles from "../Tab.module.scss";
import type { TabProps } from "../types";

describe("Tab", () => {
  it("should render", () => {
    render(<Tab>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent("Tab Text");
  });
  it.each<TabProps["variant"]>([
    "pill",
    "underline",
  ])("should render with variant %s", (variant) => {
    render(<Tab variant={variant}>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveClass(styles[variant as string]);
  });
  it("should default to pill md not selected", () => {
    render(<Tab>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveClass(styles.pill);
    expect(tab).not.toBeSelected();
  });
  it("should be selected and render with selected styles if selected is true", () => {
    render(<Tab selected>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveClass(styles.selected);
    expect(tab).toBeSelected();
  });

  describe("props vs context conflicts", () => {
    it.each<{
      value: string;
      description: string;
    }>([
      {
        value: "tab1",
        description: "controlled = uncontrolled",
      },
      {
        value: "tab2",
        description: "controlled != uncontrolled",
      },
    ])(
      "should warn when both controlled and uncontrolled props are provided ({description})",
      ({ value }) => {
        console.warn = vi.fn();
        render(
          <TabsContextProvider
            activeTab={value}
            onActiveTabChange={vi.fn()}
          >
            <Tab
              value="tab1"
              selected
            >
              Tab Text
            </Tab>
          </TabsContextProvider>,
        );
        expect(console.warn).toHaveBeenCalledWith(CONFLICT_WARNING);
      },
    );

    it("should prioritize uncontrolled props over controlled props", () => {
      render(
        <TabsContextProvider
          activeTab="tab2"
          onActiveTabChange={vi.fn()}
        >
          <Tab
            value="tab1"
            selected
          >
            Tab1
          </Tab>
          <Tab value="tab2">Tab2</Tab>
        </TabsContextProvider>,
      );
      // both tabs should be selected tab1 state overrides unselected context
      expect(
        screen.getByRole("tab", {
          name: "Tab1",
        }),
      ).toBeSelected();
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toBeSelected();
    });

    it("should prioritize variants and sizes provided through props over the onesprovided through context", () => {
      render(
        <Tabs
          variant="pill"
          size="sm"
        >
          <Tab variant="underline">Tab1</Tab>
          <Tab size="md">Tab2</Tab>
        </Tabs>,
      );
      const tab1 = screen.getByRole("tab", {
        name: "Tab1",
      });
      // stated underline overrides context pill
      expect(tab1).toHaveClass(styles.underline);
      expect(tab1).not.toHaveClass(styles.pill);

      // context size since no size was provided through props
      expect(tab1).toHaveClass(styles["size-sm"]);
      expect(tab1).not.toHaveClass(styles["size-md"]);

      const tab2 = screen.getByRole("tab", {
        name: "Tab2",
      });
      // context pill since no variant was provided through props
      expect(tab2).toHaveClass(styles.pill);
      expect(tab2).not.toHaveClass(styles.underline);

      // stated size overrides context size
      expect(tab2).toHaveClass(styles["size-md"]);
      expect(tab2).not.toHaveClass(styles["size-sm"]);
    });
  });
});
