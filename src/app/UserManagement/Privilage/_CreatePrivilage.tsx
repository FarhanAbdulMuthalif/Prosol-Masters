import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { PrivilageInitialState, textCompStyle } from "@/utils/UserDataExport";
import { FormEvent, useContext, useState } from "react";

export default function CreatePrivilage() {
  const [formData, setFormData] = useState({ name: "", status: false });
  const [FormErrorMessage, setFormErrorMessage] = useState("");

  const ContextDataCon = useContext(UseContextHook);
  const { setReusableSnackBar } = ContextDataCon;

  if (!setReusableSnackBar) {
    return null;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "status") {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked as boolean }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const UserFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const requiredFields: (keyof typeof formData)[] = ["name"];
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
      const res = await api.post("/user/savePrivilege", formData);
      const data = res.data;
      if (res.status === 201) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Privilage Created Sucessfully!`,
          open: true,
        }));
        setFormData(PrivilageInitialState);
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
    setFormData({ name: "", status: false });
  }
  return (
    <form className="create-user-wrapper" onSubmit={UserFormSubmitHandler}>
      <div className="create-user-wrapper-inputs">
        <div className="create-user-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Enter Privilage Name
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
      </div>
      {FormErrorMessage.length > 0 ? (
        <div className="user-error-message-div">
          <p className="user-error-message-div-text">{FormErrorMessage}</p>
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
