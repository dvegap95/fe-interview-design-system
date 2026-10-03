import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tab from "@/components/Tab";
import { ManagedTabs } from "../Tabs";

const renderTabs = (props: { orientation?: "horizontal" | "vertical" } = {}) =>
  render(
    <ManagedTabs
      defaultActiveTab="tab2"
      {...props}
    >
      <Tab value="tab1">Tab1</Tab>
      <Tab value="tab2">Tab2</Tab>
      <Tab value="tab3">Tab3</Tab>
      <Tab
        value="tab4"
        disabled
      >
        Tab4
      </Tab>
    </ManagedTabs>,
  );

describe("Tabs keyboard navigation", () => {
  it("should use roving tabindex on the selected tab", () => {
    renderTabs();

    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByRole("tab", {
        name: "Tab1",
      }),
    ).toHaveAttribute("tabindex", "-1");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveAttribute("tabindex", "-1");
  });

  it("should only stop on the selected tab when tabbing", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">Before</button>
        <ManagedTabs defaultActiveTab="tab2">
          <Tab value="tab1">Tab1</Tab>
          <Tab value="tab2">Tab2</Tab>
          <Tab value="tab3">Tab3</Tab>
        </ManagedTabs>
        <button type="button">After</button>
      </>,
    );

    await user.tab();
    expect(
      screen.getByRole("button", {
        name: "Before",
      }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("button", {
        name: "After",
      }),
    ).toHaveFocus();
  });

  it("should move focus without changing selection until Enter or Space", async () => {
    const user = userEvent.setup();
    renderTabs();

    screen
      .getByRole("tab", {
        name: "Tab2",
      })
      .focus();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).not.toBeSelected();

    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();

    await user.keyboard("{ArrowLeft}");
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();

    await user.keyboard(" ");
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();
  });

  it("should wrap focus with ArrowRight and ArrowLeft", async () => {
    const user = userEvent.setup();
    renderTabs();

    screen
      .getByRole("tab", {
        name: "Tab2",
      })
      .focus();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("tab", {
        name: "Tab1",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();

    await user.keyboard("{ArrowLeft}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveFocus();
  });

  it("should skip disabled tabs", async () => {
    const user = userEvent.setup();
    renderTabs();

    screen
      .getByRole("tab", {
        name: "Tab3",
      })
      .focus();

    await user.keyboard("{ArrowRight}");
    expect(
      screen.getByRole("tab", {
        name: "Tab1",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();
  });

  it("should move focus to first and last tab with Home and End", async () => {
    const user = userEvent.setup();
    renderTabs();

    screen
      .getByRole("tab", {
        name: "Tab2",
      })
      .focus();

    await user.keyboard("{End}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();

    await user.keyboard("{Home}");
    expect(
      screen.getByRole("tab", {
        name: "Tab1",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();
  });

  it("should use ArrowDown and ArrowUp when orientation is vertical", async () => {
    const user = userEvent.setup();
    renderTabs({
      orientation: "vertical",
    });

    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");

    screen
      .getByRole("tab", {
        name: "Tab2",
      })
      .focus();

    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toBeSelected();

    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();

    await user.keyboard("{ArrowUp}");
    expect(
      screen.getByRole("tab", {
        name: "Tab2",
      }),
    ).toHaveFocus();
    expect(
      screen.getByRole("tab", {
        name: "Tab3",
      }),
    ).toBeSelected();
  });
});
