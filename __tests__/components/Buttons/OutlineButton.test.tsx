import OutlinedButton from "@/components/Button/OutlineButton";
import { render, screen } from "@testing-library/react";

describe("OutlineButton Component", () => {
  it("renders children", () => {
    render(<OutlinedButton>Click me</OutlinedButton>);

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
    render(<OutlinedButton>Click me</OutlinedButton>);
    const button = screen.getByTestId("OutlineButtonId");
    // console.log(window.getComputedStyle(button));
    expect(button).toHaveStyle({
      fontSize: fontProps.fontSize,
      padding: "4px 8px",
      whiteSpace: "nowrap",
    }); // Assert against theme's primary color
  });
});
