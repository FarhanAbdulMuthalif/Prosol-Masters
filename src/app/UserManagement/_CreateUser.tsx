import useFetch from "@/Hooks/useFetch";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableMultipleSelect from "@/components/Dropdown/MultipleDropdown";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { UserInitialState } from "@/utils/UserDataExport";
import { SelectChangeEvent, Switch } from "@mui/material";
import { FormEvent, useState } from "react";

export default function CreateUser() {
  const [formData, setFormData] = useState(UserInitialState);
  const [FormErrorMessage, setFormErrorMessage] = useState("");
  const [openSnackbar, setopenSnackbar] = useState(false);
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  const { data: departentArray } = useFetch("/plant/getAllDepartment") ?? {
    data: [],
  };
  const { data: rolesArray } = useFetch("/user/getAllRoles?show=false") ?? {
    data: [],
  };
  const PlantDropDownData = originalArray
    ? (originalArray as { id: number; plantName: string }[]).map(
        ({ id, plantName }) => ({
          value: id,
          label: plantName,
        })
      )
    : [];
  const RolesDropDownData = rolesArray
    ? (rolesArray as { id: number; name: string }[]).map(({ id, name }) => ({
        value: id,
        label: name,
      }))
    : [];
  const DepartmentDropDownData = departentArray
    ? (departentArray as { id: number; departmentName: string }[]).map(
        ({ id, departmentName }) => ({
          value: id,
          label: departmentName,
        })
      )
    : [];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked as boolean }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const multiplehandleSelectChange = (event: SelectChangeEvent) => {
    const selectedValues = event.target.value;

    const { name } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.isArray(selectedValues) ? selectedValues : [],
    }));
  };
  const UserFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof typeof formData)[] = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phone",
      "business",
      "plantId",
      "roles",
      "departmentId",
    ];
    const emptyFields = requiredFields.filter((field) => {
      const value = formData[field];

      if (Array.isArray(value)) {
        return value.length === 0; // Check if array is empty
      } else {
        return !value; // Check if other fields are empty
      }
    });
    if (emptyFields.length > 0) {
      // Throw an error or display a message
      setFormErrorMessage(
        `Please fill in the following fields: ${emptyFields.join(", ")}`
      );
      return;
    }
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate password using regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setFormErrorMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long."
      );
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormErrorMessage("Password and Confirm Password do not match.");
      return;
    }

    // Validate phone using regex
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    setFormErrorMessage("");
    try {
      const res = await api.post("/user/saveUser", formData);
      const data = res.data;
      if (res.status === 201) {
        setopenSnackbar(true);
        setFormData(UserInitialState);
      }
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  return (
    <form className="create-user-wrapper" onSubmit={UserFormSubmitHandler}>
      <div className="create-user-wrapper-inputs">
        <OutlineTextField
          placeholder={`Enter FirstName`}
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          name="firstName"
        />
        <OutlineTextField
          placeholder={`Enter LastName`}
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          name="lastName"
        />
        <OutlineTextField
          placeholder={`Enter Email`}
          type="text"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
        />
        <OutlineTextField
          placeholder={`Enter Phone No`}
          type="number"
          value={formData.phone}
          onChange={handleInputChange}
          name="phone"
        />
        <OutlineTextField
          placeholder={`Enter Password`}
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
        />
        <OutlineTextField
          placeholder={`Enter ConfirmPassword`}
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
        />

        <NameSingleSelectDropdown
          label="Select Department"
          value={
            formData.departmentId
              ? DepartmentDropDownData.find(
                  (data) => data.value === formData.departmentId
                )?.label || ""
              : ""
          }
          onChange={handleSelectChange}
          options={DepartmentDropDownData ?? []}
          name="departmentId"
        />

        <ReusableMultipleSelect
          label="Select Plant"
          values={formData.plantId ? formData.plantId : []}
          options={PlantDropDownData ?? []}
          onChange={multiplehandleSelectChange}
          name="plantId"
        />
        <ReusableMultipleSelect
          label="Select Role"
          values={formData.roles ? formData.roles : []}
          options={RolesDropDownData ?? []}
          onChange={multiplehandleSelectChange}
          name="roles"
        />
        <OutlineTextField
          placeholder={`Enter Business`}
          type="text"
          value={formData.business}
          onChange={handleInputChange}
          name="business"
        />
        <div className="status-user-toogle-div">
          <p className="status-user-toogle-switch-text">
            User Status {`(Active / Inactive)`}
          </p>
          <span>:</span>
          <Switch
            color="primary"
            size="small"
            checked={formData.status}
            onChange={handleInputChange}
            name="status"
          />
        </div>
      </div>
      {FormErrorMessage.length > 0 ? (
        <div className="user-error-message-div">
          <p className="user-error-message-div-text">{FormErrorMessage}</p>
        </div>
      ) : (
        ""
      )}
      <div className="create-user-wrapper-action">
        <OutlinedButton>Cancel</OutlinedButton>
        <FillButton type="submit">Submit</FillButton>
      </div>
      <ReusableSnackbar
        message={`User Created Sucessfully!`}
        severity="success"
        setOpen={setopenSnackbar}
        open={openSnackbar}
      />
    </form>
  );
}
