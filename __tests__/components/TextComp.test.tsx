import TextComp from "@/components/TextComp/TextComp";
import { render, screen } from "@testing-library/react";

describe("Text Component", () => {
  it("paragraph render check", () => {
    render(<TextComp variant="title">Check Text</TextComp>);
    expect(screen.getByTestId("reusableTextTag")).toBeInTheDocument();
  });
  it("renders children Text to display", () => {
    render(<TextComp variant="title">Check Text</TextComp>);
    expect(screen.getByText("Check Text")).toBeInTheDocument();
  });
});
