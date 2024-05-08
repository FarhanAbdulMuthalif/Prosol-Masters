import { UseContextHook } from "@/Provides/UseContextHook";
import { RoleInitialStateProps } from "../../../../TypesStore";

import useFetch from "@/Hooks/useFetch";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import BasicCheckbox from "@/components/Checkbox/Checkbox";
import ReusableMultipleSelect from "@/components/Dropdown/MultipleDropdown";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { RoleInitialState, textCompStyle } from "@/utils/UserDataExport";
import {
  Chip,
  FormControlLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FormEvent, useContext, useEffect, useState } from "react";

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
  const RoleDataCon = useContext(UseContextHook);
  const { setReusableSnackBar, ThemeColor } = RoleDataCon;
  keysToRemove.forEach((key) => delete filteredUserData[key]);
  const [formData, setFormData] = useState(filteredUserData);
  const [FormErrorMessage, setFormErrorMessage] = useState("");
  const [RoleWiseUserList, setRoleWiseUserList] = useState<
    { id: number; email: string; fullName: string }[]
  >([]);
  const getIdonlyFormUserListDropdownValues = RoleWiseUserList.map(
    (item) => item.id
  );
  useEffect(() => {
    async function fetchImage() {
      if (!id) {
        setRoleWiseUserList([]);
        return;
      }
      try {
        const response = await api.get(`/user/getAllUsersByRoleId/${id}`);
        const data = response.data;

        setRoleWiseUserList(data);
      } catch (error) {
        console.error("Error fetching image:", error);
        setRoleWiseUserList([]); // Set to a default image on error
      }
    }

    fetchImage();
  }, [id]);
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
  const { data: FullUserArray } = useFetch("/user/getAllUsers") ?? {
    data: [],
  };
  const UserFullDropDownData = FullUserArray
    ? (
        FullUserArray as { id: number; firstName: string; lastName: string }[]
      ).map(({ id, firstName, lastName }) => ({
        value: id,
        label: firstName + " " + lastName,
      }))
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
  const multiplehandleSelectChange = async (event: SelectChangeEvent) => {
    const selectedValues = event.target.value;
    const dataGo = {
      users: Array.isArray(selectedValues) ? [...selectedValues] : [],
    };
    try {
      const response = await api.patch(
        `/user/assignUsersToRole/${EditDataGet.id}`,
        dataGo
      );
      if (response.status === 200) {
        const response = await api.get(`/user/getAllUsersByRoleId/${id}`);
        const data = response.data;

        setRoleWiseUserList(data);
      }
    } catch (error: any) {
      console.log(error);
    }
    // const { name } = event.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: Array.isArray(selectedValues) ? selectedValues : [],
    // }));
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
  const handleDeleteUserformRole = async (val: number) => {
    const dataGo = {
      users: [val],
    };
    try {
      const res = await api.delete(
        `/user/unassignUsersFromRole/${EditDataGet.id}`,
        { data: dataGo }
      );
      const data = res.data;
      if (res.status === 200 || res.status === 204) {
        setRoleWiseUserList((prev) => prev.filter((e) => e.id !== val));
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User unassigned from Role Sucessfully!`,
          open: true,
        }));
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
            Enter RoleName
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Name`}
            fullWidth
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Enter Description
            <span>:</span>
          </TextComp>
          <OutlineTextField
            placeholder={`Enter Description`}
            fullWidth
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Select Plant
            <span>:</span>
          </TextComp>
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
        </div>

        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Role Status {`(Active / Inactive)`}
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
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Users Mapped
            <span>:</span>
          </TextComp>
          <ReusableMultipleSelect
            label="Select User"
            values={
              getIdonlyFormUserListDropdownValues
                ? getIdonlyFormUserListDropdownValues
                : []
            }
            options={UserFullDropDownData ?? []}
            onChange={multiplehandleSelectChange}
            name="UserList"
            fullWidth={true}
          />
          {/* <TextComp
            variant="subTitle"
            style={{
              fontWeight: "bold",
              color: ThemeColor.primaryColor,
              textDecoration: "underline",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <span>View users</span>
          </TextComp> */}
        </div>
        <div className="edit-role-wrapper-user-list-card">
          {RoleWiseUserList.map((value) => (
            <Chip
              key={value.id}
              label={value.fullName}
              clickable
              onDelete={() => {
                handleDeleteUserformRole(value.id);
              }}
            />
          ))}
        </div>
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Privilages
            <span>:</span>
          </TextComp>
          <div
            className="statusDiv-wrapper"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div className="status-role-div-checkbox-list">
              <FormControlLabel
                control={
                  <BasicCheckbox
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
                  <BasicCheckbox
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
                  <BasicCheckbox
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
                  <BasicCheckbox
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
      </div>
      {FormErrorMessage.length > 0 ? (
        <div className="user-error-message-div">
          <p className="user-error-message-div-text">{FormErrorMessage}</p>
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
