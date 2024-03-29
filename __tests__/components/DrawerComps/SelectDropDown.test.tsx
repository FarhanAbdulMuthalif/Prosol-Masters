import SelectDropDown from "@/components/DynamicFields/Drawer/RenderFieldSelectType/SelectDropDown";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SelectDropDown", () => {
  const mockHandleInput = jest.fn();
  const mockHandleSelect = jest.fn();
  const mockChipHandler = jest.fn();
  const mockDropHandler = jest.fn();
  const mockSetDDChipList = jest.fn();

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

  const mockChipText = "Option 1";
  const mockDDChipList = [{ value: "Option 1" }, { value: "Option 2" }];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <SelectDropDown
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        chipText={mockChipText}
        chipHandler={mockChipHandler}
        dropHandler={mockDropHandler}
        dDChipList={mockDDChipList}
        setDDChipList={mockSetDDChipList}
      />
    );
  });

  it("should call handleInput when input value changes", () => {
    render(
      <SelectDropDown
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        chipText={mockChipText}
        chipHandler={mockChipHandler}
        dropHandler={mockDropHandler}
        dDChipList={mockDDChipList}
        setDDChipList={mockSetDDChipList}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Name");
    fireEvent.change(inputElement, { target: { value: "New Name" } });

    expect(mockHandleInput).toHaveBeenCalled();
  });

  it("should call handleSelect when dropdown value changes", () => {
    render(
      <SelectDropDown
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        chipText={mockChipText}
        chipHandler={mockChipHandler}
        dropHandler={mockDropHandler}
        dDChipList={mockDDChipList}
        setDDChipList={mockSetDDChipList}
      />
    );

    const dropdownElement = screen.getByPlaceholderText("Select Field");
    fireEvent.change(dropdownElement, { target: { value: "multiple" } });

    expect(mockHandleSelect).toHaveBeenCalled();
  });

  it("should call chipHandler when chip text changes", () => {
    render(
      <SelectDropDown
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        chipText={mockChipText}
        chipHandler={mockChipHandler}
        dropHandler={mockDropHandler}
        dDChipList={mockDDChipList}
        setDDChipList={mockSetDDChipList}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Options");
    fireEvent.change(inputElement, { target: { value: "New Option" } });

    expect(mockChipHandler).toHaveBeenCalled();
  });

  it("should call dropHandler when 'Enter' key is pressed", () => {
    render(
      <SelectDropDown
        valueData={mockValueData}
        handleInput={mockHandleInput}
        handleSelect={mockHandleSelect}
        chipText={mockChipText}
        chipHandler={mockChipHandler}
        dropHandler={mockDropHandler}
        dDChipList={mockDDChipList}
        setDDChipList={mockSetDDChipList}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter Options");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockDropHandler).toHaveBeenCalled();
  });
});
