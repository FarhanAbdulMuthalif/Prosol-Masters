"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import SimpleDropdown from "@/components/Dropdown/SimpleDropdown";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  PostCreateFieldData,
  ValidMasterDataTabs,
  mastersProps,
} from "../../../TypesStore";

// Import statements...

export default function CreateMastertWithDropdown() {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
    id: false,
  });
  const [formData, setFormData] = useState({
    Name: "",
    Code: "",
    id: 0,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters } = PlantDataCon;
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
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
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  if (!SelectedMasterDatatab) {
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
  if (!PlantDropDownData) {
    return null;
  }
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { id, Name, Code } = formData;

    if (Name.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (Code.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    }
    if (id < 1) {
      setplantFormError((prev) => ({ ...prev, id: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false, id: false }));
    }
    if (Code.length > 0 && Name.length > 0 && id > 0) {
      try {
        const response = await api.post(
          `${
            masters[ExactPath][SelectedMasterDatatab as ValidMasterDataTabs]
              .create
          }`,
          {
            [`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Name`]: Name,
            [`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Code`]: Code,

            plantId: id,
            [`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Status`]: true,
          }
        );
        const data = await response.data;
        if (response.status === 201) {
          console.log(data);
          setFormData({
            Name: "",
            Code: "",
            id: 0,
          });
          setOpenSnackbar(true);
        }
      } catch (error: any) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.data.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const DwnValue = PlantDropDownData.find(
    (data) => data.value === formData.id
  )?.label;

  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Name`}
            type="text"
            value={formData.Name}
            onChange={handleInputChange}
            helperText={
              plantFormError.name
                ? `${SelectedMasterDatatab}Name Should not be empty`
                : ""
            }
            error={plantFormError.name}
            name="Name"
          />
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Code`}
            type="text"
            value={formData.Code}
            onChange={handleInputChange}
            helperText={
              plantFormError.code
                ? `${SelectedMasterDatatab}Code Should not be empty`
                : ""
            }
            error={plantFormError.code}
            name="Code"
          />
          <SimpleDropdown
            value={DwnValue ? DwnValue : ""}
            onChange={handleSelectChange}
            options={PlantDropDownData}
            label={"Select Plant"}
          />
          {dynamicFields?.map((data: PostCreateFieldData) => {
            return (
              <>
                {data.dataType === "textField" ? (
                  <OutlineTextField
                    placeholder={`Enter ${data.fieldName}`}
                    key={data.id}
                    type={data.identity}
                    // value={formData.plantCode}
                    // onChange={handleInputChange}
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
                    // value={formData.plantCode}
                    // onChange={handleInputChange}
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
