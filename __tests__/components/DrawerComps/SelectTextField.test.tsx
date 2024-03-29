import SelectTextfield from "@/components/DynamicFields/Drawer/RenderFieldSelectType/SelectTextfield";
import { fireEvent, render } from "@testing-library/react";

describe("SelectTextfield", () => {
  const mockHandleInput = jest.fn();
  const mockHandleSelect = jest.fn();
  const mockHandleCheckBox = jest.fn();

  const mockValueData = {
    id: 1,
    dataType: "string",
    identity: "text",
    fieldName: "textField",
    min: 0,
    max: 10,
    isRequired: true,
    isExtraField: true,
    isReadable: true,
    isWritable: true,
    isUnique: true,
    enums: ["Option 1", "Option 2"],
    dropDowns: [
      { value: "value1", label: "Label 1" },
      { value: "value2", label: "Label 2" },
    ],
    displayRelationFieldName: "Related Field",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <SelectTextfield
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );
  });

  it("should call handleInput when input value changes", () => {
    const { getByPlaceholderText } = render(
      <SelectTextfield
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const inputElement = getByPlaceholderText("Enter Name");
    fireEvent.change(inputElement, { target: { value: "Test" } });
    expect(mockHandleInput).toHaveBeenCalled();
  });

  it("should call handleCheckBox when checkbox value changes", () => {
    const { getByLabelText } = render(
      <SelectTextfield
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const checkboxElement = getByLabelText("Special Character");
    fireEvent.click(checkboxElement);
    expect(mockHandleCheckBox).toHaveBeenCalled();
  });
  it("should call handleSelect when dropdown value changes", () => {
    const { getByPlaceholderText } = render(
      <SelectTextfield
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const dropdownElement = getByPlaceholderText("Select Field");

    fireEvent.change(dropdownElement, { target: { value: "number" } });

    expect(dropdownElement).toBeInTheDocument();
    expect(mockHandleSelect).toHaveBeenCalled();
  });
});
