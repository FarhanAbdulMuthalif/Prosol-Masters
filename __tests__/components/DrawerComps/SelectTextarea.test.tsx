import SelectTextarea from "@/components/DynamicFields/Drawer/RenderFieldSelectType/SelectTextarea";
import { fireEvent, render } from "@testing-library/react";

describe("SelectTextarea", () => {
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
      <SelectTextarea
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );
  });

  it("should call handleInput when input value changes", () => {
    const { getByPlaceholderText } = render(
      <SelectTextarea
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const inputElement = getByPlaceholderText("Enter Name");
    fireEvent.change(inputElement, { target: { value: "Updated Name" } });
    expect(mockHandleInput).toHaveBeenCalled();
  });

  it("should call handleSelect when dropdown value changes", () => {
    const { getByPlaceholderText } = render(
      <SelectTextarea
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const dropdownElement = getByPlaceholderText("Select Field");
    fireEvent.change(dropdownElement, { target: { value: "2" } });
    expect(mockHandleSelect).toHaveBeenCalled();
  });

  it("should call handleInput when min or max input value changes", () => {
    const { getAllByPlaceholderText } = render(
      <SelectTextarea
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const [minInput, maxInput] = getAllByPlaceholderText("Enter No");

    fireEvent.change(minInput, { target: { value: "5" } });
    fireEvent.change(maxInput, { target: { value: "15" } });

    expect(mockHandleInput).toHaveBeenCalledTimes(2);
  });

  it("should call handleInput when switch state changes", () => {
    const { getByLabelText } = render(
      <SelectTextarea
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        handleCheckBox={mockHandleCheckBox}
      />
    );

    const switchElement = getByLabelText("Textarea fill required (yes / no) :");
    fireEvent.click(switchElement);

    expect(mockHandleInput).toHaveBeenCalled();
  });
});
