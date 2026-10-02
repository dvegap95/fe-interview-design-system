import { render, screen } from "@testing-library/react";

describe("isSelected", () => {
  it('should be true if the element has aria-selected="true"', () => {
    render(
      <div
        role="tab"
        tabIndex={0}
        aria-selected="true"
      >
        Test
      </div>,
    );
    expect(screen.getByText("Test")).toBeSelected();
  });
  it('should be false if the element has aria-selected="false"', () => {
    render(
      <div
        role="tab"
        tabIndex={0}
        aria-selected="false"
      >
        Test
      </div>,
    );
    expect(screen.getByText("Test")).not.toBeSelected();
  });
  it("should be false if the element does not have aria-selected", () => {
    render(<div>Test</div>);
    expect(screen.getByText("Test")).not.toBeSelected();
  });
  it("should throw the correct error message(not.toBeSelected)", () => {
    render(
      <div
        role="tab"
        tabIndex={0}
        aria-selected="true"
      >
        Test
      </div>,
    );
    expect(() => {
      expect(screen.getByText("Test")).not.toBeSelected();
    }).toThrow(/expected .+ not to be selected \(aria-selected\)/);
  });
  it("should throw the correct error message(toBeSelected)", () => {
    render(
      <div
        role="tab"
        tabIndex={0}
        aria-selected="false"
      >
        Test
      </div>,
    );
    expect(() => {
      expect(screen.getByText("Test")).toBeSelected();
    }).toThrow(/expected (?!.* not to be selected).+ to be selected \(aria-selected\)/);
  });
});
