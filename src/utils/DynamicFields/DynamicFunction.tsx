import { PostCreateFieldData } from "../../../TypesStore";

export const validateField = (field: PostCreateFieldData, value: string) => {
  switch (field.dataType) {
    case "textField":
      return validateTextField(field, value);
    case "textArea":
      return validateTextField(field, value);
    case "dropDown":
      return validateDropDown(field, value);
    // ... add validation for other data types
  }
};
export const validateTextField = (
  field: PostCreateFieldData,
  value: string
) => {
  if (field.isRequired && !value) {
    return "This field is required.";
  }
  if (field.min && value?.length < field.min) {
    return `This field must be at least ${field.min} characters long.`;
  }
  if (field.max && value?.length > field.max) {
    return `This field cannot exceed ${field.max} characters.`;
  }
  // ... add other validation rules for text fields
};
export const validateDropDown = (field: PostCreateFieldData, value: string) => {
  if (field.isRequired && !value) {
    return "This field is required.";
  }

  // ... add other validation rules for text fields
};
