import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableMultipleSelect from "@/components/Dropdown/MultipleDropdown";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { UserInitialState, textCompStyle } from "@/utils/UserDataExport";
import { SelectChangeEvent } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

export default function CreateUser() {
  const [formData, setFormData] = useState(UserInitialState);
  const [FormErrorMessage, setFormErrorMessage] = useState("");
  const UserDataCon = useContext(UseContextHook);
  const { setReusableSnackBar } = UserDataCon;
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
  if (!setReusableSnackBar) {
    return null;
  }
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
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User Created Sucessfully!`,
          open: true,
        }));
        setFormData(UserInitialState);
      }
    } catch (e: any) {
      console.log(e?.response);
      if (!setReusableSnackBar) return;
      if (e?.response) {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: String(
            e?.response?.data?.message
              ? e?.response?.data?.message
              : e?.response?.data?.error
          ),
          open: true,
        }));
      } else {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: `Error: ${e?.message}`,
          open: true,
        }));
      }
    }
  };
  function clearFormValues() {
    setFormData(UserInitialState);
  }

  return (
    <form className="create-user-wrapper" onSubmit={UserFormSubmitHandler}>
      <div className="create-user-wrapper-inputs">
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            FirstName
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter FirstName`}
            type="text"
            fullWidth
            value={formData.firstName}
            onChange={handleInputChange}
            name="firstName"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            LastName
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter LastName`}
            type="text"
            fullWidth
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Email
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Email`}
            type="text"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Phone No
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Phone No`}
            type="number"
            fullWidth
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Password
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Password`}
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Confirm Password
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter ConfirmPassword`}
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleInputChange}
            name="confirmPassword"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Department
            <span>:</span>
          </TextComp>
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
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Plant
            <span>:</span>
          </TextComp>
          <ReusableMultipleSelect
            label="Select Plant (Multiple Selection)"
            values={formData.plantId ? formData.plantId : []}
            options={PlantDropDownData ?? []}
            onChange={multiplehandleSelectChange}
            name="plantId"
            fullWidth={true}
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Role
            <span>:</span>
          </TextComp>
          <ReusableMultipleSelect
            label="Select Role (Multiple Selection)"
            values={formData.roles ? formData.roles : []}
            options={RolesDropDownData ?? []}
            onChange={multiplehandleSelectChange}
            fullWidth={true}
            name="roles"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Business
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Business`}
            fullWidth
            type="text"
            value={formData.business}
            onChange={handleInputChange}
            name="business"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            User Status {`(Active / Inactive)`}
            <span>:</span>
          </TextComp>
          <div
            className="statusDiv-wrapper"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ReusableSwitch
              checked={formData.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>
        </div>
        {/* <div className="status-user-toogle-div">
          <TextComp
            variant="body"
            style={{ fontWeight: "bold", color: PrimaryTextColor }}
          >
            User Status {`(Active / Inactive)`}
          </TextComp>

          <span>:</span>

          <ReusableSwitch
            checked={formData.status}
            onChange={handleInputChange}
            name="status"
          />
        </div> */}
      </div>
      {FormErrorMessage.length > 0 ? (
        <div className="user-error-message-div">
          <TextComp variant="body" style={{ color: "red" }}>
            {FormErrorMessage}
          </TextComp>
        </div>
      ) : (
        ""
      )}
      <div className="create-user-wrapper-action">
        <OutlinedButton onClick={clearFormValues}>Clear</OutlinedButton>
        <FillButton type="submit">Submit</FillButton>
      </div>
    </form>
  );
}
