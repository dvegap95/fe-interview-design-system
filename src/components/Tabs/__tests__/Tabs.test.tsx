import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode, useState } from "react";
import Tab from "@/components/Tab/Tab";
import tabStyles from "@/components/Tab/Tab.module.scss";
import tabsStyles from "@/components/Tabs/Tabs.module.scss";
import { TabsContextProvider, TabsWithContext } from "../Tabs";

const ControlledTabWrapper = ({
  children,
  defaultActiveTab,
}: {
  children: ReactNode;
  defaultActiveTab: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  return (
    <TabsWithContext
      activeTab={activeTab}
      onActiveTabChange={setActiveTab}
    >
      {children}
    </TabsWithContext>
  );
};

describe("TabsWithContext", () => {
  it("should render", () => {
    render(
      <TabsWithContext>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </TabsWithContext>,
    );
    expect(
      screen.getByRole("tab", {
        name: "Tab1",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeInTheDocument();
  });

  describe("uncontrolled", () => {
    it("should render with default active tab", () => {
      render(
        <TabsWithContext defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </TabsWithContext>,
      );
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toBeSelected();
    });

    it("should handle tab selection uncontrolled", async () => {
      render(
        <TabsWithContext defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </TabsWithContext>,
      );
      await userEvent.click(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      );

      expect(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      ).toBeSelected();
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).not.toBeSelected();
    });
  });

  describe("controlled", () => {
    it("should render with active tab", () => {
      render(
        <TabsWithContext
          activeTab="tab3"
          onActiveTabChange={vi.fn()}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </TabsWithContext>,
      );
      expect(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      ).toBeSelected();
    });

    it("should handle tab selection controlled", async () => {
      const onActiveTabChangeSpy = vi.fn();
      render(
        <TabsWithContext
          activeTab="tab3"
          onActiveTabChange={onActiveTabChangeSpy}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </TabsWithContext>,
      );
      await userEvent.click(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      );

      expect(onActiveTabChangeSpy).toHaveBeenCalledWith("tab2");
      expect(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      ).toBeSelected(); // controlled props still owns the state
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).not.toBeSelected();
    });

    it("should handle tab selection controlled with wrapper", async () => {
      render(
        <ControlledTabWrapper defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </ControlledTabWrapper>,
      );
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toBeSelected();

      await userEvent.click(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      );

      expect(
        screen.getByRole("tab", {
          name: "Tab3",
        }),
      ).toBeSelected();
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).not.toBeSelected();
    });
  });

  describe("variants", () => {
    it.each([
      [
        "pill",
        "md",
      ],
      [
        "pill",
        "sm",
      ],
      [
        "underline",
        "md",
      ],
      [
        "underline",
        "sm",
      ],
    ])("should render tabs with specified variant and size for tabs", (variant, size) => {
      render(
        <TabsWithContext
          variant={variant as "pill" | "underline"}
          size={size as "sm" | "md"}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </TabsWithContext>,
      );

      expect(
        screen.getByRole("tab", {
          name: "Tab1",
        }),
      ).toHaveClass(tabStyles[`variant-${variant}`], tabStyles[`size-${size}`]);
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toHaveClass(tabStyles[`variant-${variant}`], tabStyles[`size-${size}`]);
    });

    it("should render tab list with specified variant and size", () => {
      render(
        <TabsWithContext variant="pill" size="sm">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </TabsWithContext>,
      );
      expect(screen.getByRole("tablist")).toHaveClass(tabsStyles["variant-pill"], tabsStyles["size-sm"]);
    });

  });
});

describe("TabsContextProvider standalone", () => {
  it("should handle tab selection uncontrolled", async () => {
    render(
      <TabsContextProvider defaultActiveTab="tab2">
        <div>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </div>
      </TabsContextProvider>,
    );
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();

    await userEvent.click(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    );

    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).not.toBeSelected();
  });
  it("should render with active tab", async () => {
    const onActiveTabChangeSpy = vi.fn();
    render(
      <TabsContextProvider
        activeTab="tab3"
        onActiveTabChange={onActiveTabChangeSpy}
      >
        <div>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </div>
      </TabsContextProvider>,
    );
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();

    await userEvent.click(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    );

    expect(onActiveTabChangeSpy).toHaveBeenCalledWith("tab2");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected(); // controlled props still owns the state
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).not.toBeSelected();
  });
});
