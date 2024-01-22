"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { FormEvent, useContext, useEffect, useState } from "react";
import { PostCreateFieldData, ValidMasterDataTabs } from "../../../TypesStore";

// Import statements...

export default function CreateMastert() {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters } = PlantDataCon;

  const [formData, setFormData] = useState<any>({ status: true });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { plantName, plantCode } = formData;
    console.log(formData);
    if (plantName.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (plantCode.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    if (plantCode?.length > 0 && plantName.length > 0) {
      const response = await api.post(
        `${masters[SelectedMasterDatatab as ValidMasterDataTabs].create}`,
        formData
      );
      const data = await response.data;
      if (response.status === 201) {
        console.log(data);
        setFormData({
          plantName: "",
          plantCode: "",
        });
        setOpenSnackbar(true);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  // const dynamicFieldRender={
  //   textField:
  // }
  useEffect(() => {
    const dynamicFormFieldHandler = async () => {
      const res = await api.get(
        `/dynamic/getAllFieldsByForm/${SelectedMasterDatatab}`
      );
      const data = await res.data;
      if (res.status === 200) {
        console.log(data);
        setdynamicFields(data);
      }
    };
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab]);

  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Name`}
            type="text"
            value={formData.plantName}
            onChange={handleInputChange}
            helperText={
              plantFormError.name
                ? `${SelectedMasterDatatab}Name Should not be empty`
                : ""
            }
            error={plantFormError.name}
            name="plantName"
          />
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Code`}
            type="text"
            value={formData.plantCode}
            onChange={handleInputChange}
            helperText={
              plantFormError.code
                ? `${SelectedMasterDatatab}Code Should not be empty`
                : ""
            }
            error={plantFormError.code}
            name="plantCode"
          />
          {dynamicFields?.map((data: PostCreateFieldData) => {
            return (
              <>
                {data.dataType === "textField" ? (
                  <OutlineTextField
                    placeholder={`Enter ${data.fieldName}`}
                    key={data.id}
                    type={data.identity}
                    value={formData[data.fieldName]}
                    onChange={handleInputChange}
                    name={data.fieldName}
                    inputProps={{
                      autoComplete: "new-password",
                      maxLength: data.max,
                      minLength: data.min,
                    }}
                  />
                ) : data.dataType === "textArea" ? (
                  <TextareaOutline
                    placeholder={`Enter ${data.fieldName}`}
                    key={data.id}
                    rows={typeof Number(data.identity) ? data.identity : 2}
                    value={formData[data.fieldName]}
                    onChange={handleInputChange}
                    name={data.fieldName}
                    inputProps={{
                      autoComplete: "new-password",
                      maxLength: data.max,
                      minLength: data.min,
                    }}
                  />
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
      <ReusableSnackbar
        message={`${SelectedMasterDatatab} created Sucessfully!`}
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </form>
  );
}
