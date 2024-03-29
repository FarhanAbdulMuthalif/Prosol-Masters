import SelectRadio from "@/components/DynamicFields/Drawer/RenderFieldSelectType/SelectRadio";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SelectRadio", () => {
  const mockHandleInput = jest.fn();
  const mockChipEnterHandler = jest.fn();
  const mockSetChipIntoDivHandler = jest.fn();
  const mockSetChipArrayList = jest.fn();

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

  const mockChipTextIndiual = "Option 1";
  const mockChipArrayList = ["Option 1", "Option 2"];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call handleInput when input value changes", () => {
    const { getByPlaceholderText } = render(
      <SelectRadio
        valueData={mockValueData}
        handleInput={mockHandleInput}
        ChipEnterHandler={mockChipEnterHandler}
        ChipTextIndiual={mockChipTextIndiual}
        setChipIntoDivHandler={mockSetChipIntoDivHandler}
        ChipArrayList={mockChipArrayList}
        setChipArrayList={mockSetChipArrayList}
      />
    );

    const inputElement = getByPlaceholderText("Enter Name");
    fireEvent.change(inputElement, { target: { value: "Updated Name" } });
    expect(mockHandleInput).toHaveBeenCalled();
  });
  it("should render without crashing", () => {
    render(
      <SelectRadio
        valueData={mockValueData}
        handleInput={mockHandleInput}
        ChipEnterHandler={mockChipEnterHandler}
        ChipTextIndiual={mockChipTextIndiual}
        setChipIntoDivHandler={mockSetChipIntoDivHandler}
        ChipArrayList={mockChipArrayList}
        setChipArrayList={mockSetChipArrayList}
      />
    );
  });

  it("should call setChipIntoDivHandler when input value changes", () => {
    render(
      <SelectRadio
        valueData={mockValueData}
        handleInput={mockHandleInput}
        ChipEnterHandler={mockChipEnterHandler}
        ChipTextIndiual={mockChipTextIndiual}
        setChipIntoDivHandler={mockSetChipIntoDivHandler}
        ChipArrayList={mockChipArrayList}
        setChipArrayList={mockSetChipArrayList}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Options");
    fireEvent.change(inputElement, { target: { value: "New Option" } });

    expect(mockSetChipIntoDivHandler).toHaveBeenCalled();
  });

  it("should call ChipEnterHandler when 'Enter' key is pressed", () => {
    render(
      <SelectRadio
        valueData={mockValueData}
        handleInput={mockHandleInput}
        ChipEnterHandler={mockChipEnterHandler}
        ChipTextIndiual={mockChipTextIndiual}
        setChipIntoDivHandler={mockSetChipIntoDivHandler}
        ChipArrayList={mockChipArrayList}
        setChipArrayList={mockSetChipArrayList}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Options");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockChipEnterHandler).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
