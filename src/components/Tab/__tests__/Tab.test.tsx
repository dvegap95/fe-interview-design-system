import { render, screen } from "@testing-library/react";
import { Tabs } from "@/components/Tabs";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { CONFLICT_WARNING } from "../constants";
import Tab from "../Tab";
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
    expect(tab).toHaveAttribute("data-variant", variant);
  });
  it("should default to pill md not selected", () => {
    render(<Tab>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveAttribute("data-variant", "pill");
    expect(tab).toHaveAttribute("data-size", "md");
    expect(tab).not.toBeSelected();
  });
  it("should be selected and render with selected styles if selected is true", () => {
    render(<Tab selected>Tab Text</Tab>);
    const tab = screen.getByRole("tab");
    expect(tab).toBeSelected();
  });

  describe("props vs context conflicts", () => {
    it.each<{
      value: string;
      description: string;
    }>([
      {
        value: "tab1",
        description: "selected matches activeTab",
      },
      {
        value: "tab2",
        description: "selected differs from activeTab",
      },
    ])(
      "should warn when selected is used under an active-tab context ({description})",
      ({ value }) => {
        console.warn = vi.fn();
        render(
          <ActiveTabContextProvider
            activeTab={value}
            onActiveTabChange={vi.fn()}
          >
            <Tab
              value="tab1"
              selected
            >
              Tab Text
            </Tab>
          </ActiveTabContextProvider>,
        );
        expect(console.warn).toHaveBeenCalledWith(CONFLICT_WARNING);
      },
    );

    it("should keep both tabs selected when selected forces one tab and context selects another", () => {
      render(
        <ActiveTabContextProvider
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
        </ActiveTabContextProvider>,
      );
      // selected forces Tab1; context still selects Tab2
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
      expect(tab1).toHaveAttribute("data-variant", "underline");
      expect(tab1).not.toHaveAttribute("data-variant", "pill");

      // context size since no size was provided through props
      expect(tab1).toHaveAttribute("data-size", "sm");

      const tab2 = screen.getByRole("tab", {
        name: "Tab2",
      });
      // context pill since no variant was provided through props
      expect(tab2).toHaveAttribute("data-variant", "pill");

      // stated size overrides context size
      expect(tab2).toHaveAttribute("data-size", "md");
    });
  });
});
