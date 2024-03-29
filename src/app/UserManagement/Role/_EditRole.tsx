import { UseContextHook } from "@/Provides/UseContextHook";
import { RoleInitialStateProps } from "../../../../TypesStore";

import useFetch from "@/Hooks/useFetch";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { RoleInitialState } from "@/utils/UserDataExport";
import {
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FormEvent, useContext, useState } from "react";

export default function EditRole({
  settabValue,
  EditDataGet,
}: {
  settabValue: (val: string) => void;
  EditDataGet: RoleInitialStateProps;
}) {
  const ArrId = {
    ...EditDataGet,
    privileges: EditDataGet.privileges.map((item: any) => item?.id),
  };
  const { id, ...filteredData } = ArrId;
  // Define a type for the keys to remove
  type KeysToRemove = "createdAt" | "createdBy" | "updatedAt" | "updatedBy";

  // List of keys to be removed
  const keysToRemove: KeysToRemove[] = [
    "createdAt",
    "createdBy",
    "updatedAt",
    "updatedBy",
  ];
  // Create a new object by filtering out specified keys
  const filteredUserData = { ...filteredData };
  const RoleDataCon = useContext(UseContextHook);
  const { setReusableSnackBar } = RoleDataCon;
  keysToRemove.forEach((key) => delete filteredUserData[key]);
  const [formData, setFormData] = useState(filteredUserData);
  const [FormErrorMessage, setFormErrorMessage] = useState("");
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
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
      "name",
      "description",
      "plantId",
      "status",
      "privileges",
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

    setFormErrorMessage("");
    try {
      const res = await api.put(`/user/updateRole/${id}`, formData);
      const data = res.data;
      if (res.status === 200) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Role updated Sucessfully!`,
          open: true,
        }));
        setFormData(RoleInitialState);
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
  const checkHandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        privileges: [...prev.privileges, Number(value)],
      }));
    }

    // Case 2  : The user unchecks the box
    else {
      setFormData((prev) => ({
        ...prev,
        privileges: prev.privileges.filter((e: number) => e !== Number(value)),
      }));
    }
  };
  return (
    <form className="create-user-wrapper" onSubmit={UserFormSubmitHandler}>
      <div className="create-user-wrapper-inputs">
        <OutlineTextField
          placeholder={`Enter Name`}
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
        />
        <OutlineTextField
          placeholder={`Enter Description`}
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          name="description"
        />

        <NameSingleSelectDropdown
          label="Select Plant"
          value={
            formData.plantId
              ? PlantDropDownData.find(
                  (data) => data.value === formData.plantId
                )?.label || ""
              : ""
          }
          onChange={handleSelectChange}
          options={PlantDropDownData ?? []}
          name="plantId"
        />
        <div className="status-user-toogle-div">
          <TextComp
            variant="body"
            style={{ fontWeight: "bold", color: PrimaryTextColor }}
          >
            Role Status {`(Active / Inactive)`}
          </TextComp>

          <span>:</span>

          <ReusableSwitch
            checked={formData.status}
            onChange={handleInputChange}
            name="status"
          />
        </div>
        <div className="status-role-div">
          <TextComp
            variant="body"
            style={{ fontWeight: "bold", color: PrimaryTextColor }}
          >
            Privilages
          </TextComp>

          <span>:</span>
          <div className="status-role-div-checkbox-list">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={checkHandler2}
                  checked={formData.privileges.includes(1)}
                  value="1"
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", color: "#71747A" }}>
                  Create
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={checkHandler2}
                  checked={formData.privileges.includes(2)}
                  value="2"
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", color: "#71747A" }}>
                  Read
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={checkHandler2}
                  checked={formData.privileges.includes(3)}
                  value="3"
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", color: "#71747A" }}>
                  Update
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={checkHandler2}
                  checked={formData.privileges.includes(4)}
                  value="4"
                />
              }
              label={
                <Typography sx={{ fontSize: "12px", color: "#71747A" }}>
                  Delete
                </Typography>
              }
            />
          </div>
        </div>
      </div>
      {FormErrorMessage.length > 0 ? (
        <div className="user-error-message-div">
          <p className="user-error-message-div-text">{FormErrorMessage}</p>
        </div>
      ) : (
        ""
      )}
      <MasterAuditTrial formData={EditDataGet}></MasterAuditTrial>
      <div className="create-user-wrapper-action">
        <OutlinedButton>Cancel</OutlinedButton>
        <FillButton type="submit">Submit</FillButton>
      </div>
    </form>
  );
}
