import FillButton from "@/components/Button/FillButton";
import { render, screen } from "@testing-library/react";

describe("FillButton Component", () => {
  it("renders children", () => {
    render(<FillButton>Click me</FillButton>);

    // Check if the button renders with the provided children
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies styles based on theme", () => {
    const ThemeColor = {
      id: 1,
      name: "default",
      primaryColor: "rgb(22, 105, 187)",
      secondaryColor: "#1669bb",
      tertiaryColor: "#d1e3f6",
    };
    const fontProps = {
      fontSize: "12px",
    };
    render(<FillButton>Click me</FillButton>);
    const button = screen.getByTestId("FillButtonId");
    // console.log(window.getComputedStyle(button));
    expect(button).toHaveStyle({
      backgroundColor: ThemeColor.primaryColor,
      fontSize: fontProps.fontSize,
      padding: "3px 16px",
      whiteSpace: "nowrap",
    }); // Assert against theme's primary color
  });
});
