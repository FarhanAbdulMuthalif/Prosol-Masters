import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { textCompStyle } from "@/utils/UserDataExport";
import { useContext, useState } from "react";

export default function CreateDynamicForm() {
  const contextDataHub = useContext(UseContextHook);
  const { setReusableSnackBar } = contextDataHub;
  const [DynamicformError, setDynamicformError] = useState({
    formName: false,
    desc: false,
  });
  const [formName, setformName] = useState({
    formName: "",
    formDescription: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformName((prev) => {
      return { ...prev, [name]: value };
    });
  };
  if (!setReusableSnackBar) return null;
  const DynamicFormCreateHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (formName.formName.length < 1) {
      setDynamicformError((prev) => ({ ...prev, formName: true }));
      return null;
    }
    if (formName.formDescription.length < 1) {
      setDynamicformError((prev) => ({ ...prev, desc: true }));
      return null;
    }
    setDynamicformError((prev) => ({ ...prev, formName: false }));
    try {
      const res = await api.post(`/dynamic/createForm`, formName);
      const data = await res.data;
      setformName({
        formName: "",
        formDescription: "",
      });
      if (res.status === 201) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Dynamic Form Created Sucessfully!`,
          open: true,
        }));
      }
    } catch (e: any) {
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
    setformName({
      formName: "",
      formDescription: "",
    });
  }
  return (
    <form onSubmit={DynamicFormCreateHandler}>
      <div className="create-dynamic-form-module">
        <div className="create-dynamic-form-module-div">
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              FormName
              <span>:</span>
            </TextComp>
            <OutlineTextField
              placeholder={`Enter Form Name`}
              type="text"
              fullWidth
              value={formName.formName}
              onChange={handleInputChange}
              helperText={
                DynamicformError.formName ? `Form Name Should not be empty` : ""
              }
              error={DynamicformError.formName}
              name="formName"
            />
          </div>
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Form Description
              <span>:</span>
            </TextComp>
            <TextareaOutline
              placeholder={`Enter Description`}
              value={formName.formDescription}
              onChange={handleInputChange}
              fullWidth
              helperText={
                DynamicformError.desc
                  ? `Form Description Should not be empty`
                  : ""
              }
              error={DynamicformError.desc}
              rows={2}
              name="formDescription"
            />
          </div>
        </div>
        <div className="create-dynamic-form-module-action">
          <OutlinedButton onClick={clearFormValues}>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
