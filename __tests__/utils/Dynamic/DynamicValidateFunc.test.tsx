import { validateField } from "@/utils/DynamicFields/DynamicFunction";
import { PostCreateFieldData } from "../../../TypesStore";

describe("validateField function", () => {
  it("should validate text field correctly", () => {
    const textFieldField: PostCreateFieldData = {
      dataType: "textField",
      fieldName: "testField",
      isRequired: true,
      min: 3,
      max: 10,
    };

    // Test case with empty value
    expect(validateField(textFieldField, "")).toBe("This field is required.");

    // Test case with value less than minimum length
    expect(validateField(textFieldField, "ab")).toBe(
      "This field must be at least 3 characters long."
    );

    // Test case with value greater than maximum length
    expect(validateField(textFieldField, "abcdefghijk")).toBe(
      "This field cannot exceed 10 characters."
    );

    // Test case with valid value
    expect(validateField(textFieldField, "valid")).toBeUndefined();
  });
  it("should validate DropDown correctly", () => {
    const DropdownTestField: PostCreateFieldData = {
      dataType: "dropDown",
      fieldName: "testField",
      isRequired: true,
      dropDowns: [
        { value: "value1", id: "1" },
        { value: "value2", id: "2" },
      ],
    };

    // Test case with empty value
    expect(validateField(DropdownTestField, "")).toBe(
      "This field is required."
    );

    // Test case with valid value
    expect(validateField(DropdownTestField, "valid")).toBeUndefined();
  });

  // Add more test cases for other data types and validation rules
});
