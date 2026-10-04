import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ReactNode, useState } from "react";
import Tab from "@/components/Tab";
import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { ManagedTabs } from "../Tabs";

const ControlledTabWrapper = ({
  children,
  defaultActiveTab,
}: {
  children: ReactNode;
  defaultActiveTab: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  return (
    <ManagedTabs
      activeTab={activeTab}
      onActiveTabChange={setActiveTab}
    >
      {children}
    </ManagedTabs>
  );
};

describe("ManagedTabs", () => {
  it("should render", () => {
    render(
      <ManagedTabs>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </ManagedTabs>,
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
        <ManagedTabs defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </ManagedTabs>,
      );
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toBeSelected();
    });

    it("should handle tab selection uncontrolled", async () => {
      render(
        <ManagedTabs defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </ManagedTabs>,
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
        <ManagedTabs
          activeTab="tab3"
          onActiveTabChange={vi.fn()}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </ManagedTabs>,
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
        <ManagedTabs
          activeTab="tab3"
          onActiveTabChange={onActiveTabChangeSpy}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </ManagedTabs>,
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
        <ManagedTabs
          variant={variant as "pill" | "underline"}
          size={size as "sm" | "md"}
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </ManagedTabs>,
      );

      expect(
        screen.getByRole("tab", {
          name: "Tab1",
        }),
      ).toHaveAttribute("data-variant", variant);
      expect(
        screen.getByRole("tab", {
          name: "Tab1",
        }),
      ).toHaveAttribute("data-size", size);
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toHaveAttribute("data-variant", variant);
      expect(
        screen.getByRole("tab", {
          name: "Tab2",
        }),
      ).toHaveAttribute("data-size", size);
    });

    it("should render tab list with specified variant and size", () => {
      render(
        <ManagedTabs
          variant="pill"
          size="sm"
        >
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
        </ManagedTabs>,
      );
      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("data-variant", "pill");
      expect(tablist).toHaveAttribute("data-size", "sm");
    });
  });
});

describe("ActiveTabContextProvider standalone", () => {
  it("should handle tab selection uncontrolled", async () => {
    render(
      <ActiveTabContextProvider defaultActiveTab="tab2">
        <div>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </div>
      </ActiveTabContextProvider>,
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
      <ActiveTabContextProvider
        activeTab="tab3"
        onActiveTabChange={onActiveTabChangeSpy}
      >
        <div>
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
          <Tab value="tab4">Tab4</Tab>
        </div>
      </ActiveTabContextProvider>,
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
