import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { TextFieldProps } from "@mui/material";
import { render } from "@testing-library/react";

describe("OutlineTextField", () => {
  it("should render without crashing", () => {
    render(<OutlineTextField />);
  });

  it("should render with provided props", () => {
    const testProps: TextFieldProps = {
      label: "Test Label",
      value: "Test Value",
      onChange: jest.fn(),
    };
    const { getByLabelText } = render(<OutlineTextField {...testProps} />);
    const inputElement = getByLabelText("Test Label") as HTMLInputElement;
    expect(inputElement.value).toBe("Test Value");
  });

  it("should pass through additional props", () => {
    const { getByTestId } = render(<OutlineTextField data-testid="test" />);
    const textField = getByTestId("test");
    expect(textField).toBeInTheDocument();
  });

  it("should disable autocomplete", () => {
    const { getByRole } = render(<OutlineTextField />);
    const textField = getByRole("textbox");
    expect(textField).toHaveAttribute("autocomplete", "off");
  });
  it("should display the correct value if provided", () => {
    const { getByDisplayValue } = render(<OutlineTextField value="hello" />);
    const inputElement = getByDisplayValue("hello") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });
});
