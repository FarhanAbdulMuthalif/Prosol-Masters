import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
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
import { UserInitialStateProps } from "../../../TypesStore";

export default function EditUser({
  settabValue,
  EditDataGet,
}: {
  settabValue: (val: string) => void;
  EditDataGet: UserInitialStateProps;
}) {
  const ArrId = {
    ...EditDataGet,
    roles: EditDataGet.roles.map((item: any) => item?.id),
  };
  const { id, email, ...filteredData } = ArrId;
  // Define a type for the keys to remove
  type KeysToRemove =
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "updateAuditHistories";

  // List of keys to be removed
  const keysToRemove: KeysToRemove[] = [
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
    "updateAuditHistories",
  ];

  // Create a new object by filtering out specified keys
  const filteredUserData = { ...filteredData };

  keysToRemove.forEach((key) => delete filteredUserData[key]);

  const [formData, setFormData] = useState(filteredUserData);
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
  if (!setReusableSnackBar) {
    return null;
  }
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

    // Validate phone using regex
    const phoneRegex = /^[1-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }
    setFormErrorMessage("");
    try {
      const res = await api.put(`/user/updateById/${id}`, formData);
      const data = res.data;
      if (res.status === 200) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User updated Sucessfully!`,
          open: true,
        }));
        setFormData(UserInitialState);
        settabValue("table");
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
            fullWidth
            type="text"
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
            fullWidth
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            name="lastName"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            PhoneNo
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Phone No`}
            fullWidth
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
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
            fullWidth={true}
            label="Select Role (Multiple Selection)"
            values={formData.roles ? formData.roles : []}
            options={RolesDropDownData ?? []}
            onChange={multiplehandleSelectChange}
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
        <OutlinedButton
          onClick={() => {
            settabValue("table");
          }}
        >
          Cancel
        </OutlinedButton>
        <FillButton type="submit">Submit</FillButton>
      </div>
      <MasterAuditTrial formData={EditDataGet}></MasterAuditTrial>
    </form>
  );
}
