"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { textCompStyle } from "@/utils/UserDataExport";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../../../TypesStore";

// Import statements...

export default function EditStorageBin({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
    id: false,
  });
  const [formData, setFormData] = useState<any>(EditDataGet);

  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  const [storgaeLocationData, setstorgaeLocationData] = useState([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, settabValue, setReusableSnackBar } =
    PlantDataCon;
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      plantId: prev?.plant?.id,
      storageLocationId: prev?.storageLocation?.id,
    }));
  }, []);
  useEffect(() => {
    async function getter() {
      try {
        const res = await api.get(
          `/plant/getAllByPlantById/${EditDataGet?.plant?.id}`
        );
        if (res.status === 200) {
          setstorgaeLocationData(res.data);
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
    }
    getter();
  }, [EditDataGet, setReusableSnackBar]);

  useEffect(() => {
    const dynamicFormFieldHandler = async () => {
      try {
        const res = await api.get(
          `/dynamic/getAllDynamicFieldsByForm/${SelectedMasterDatatab}`
        );
        const data = await res.data;
        if (res.status === 200) {
          setdynamicFields(data);
        }
      } catch (e: any) {
        console.log(e?.response);
        if (!setReusableSnackBar) return;
        if (e?.response?.status === 404 || e?.response?.status === 400) return;
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
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab, setReusableSnackBar]);

  const [dynFldErrValidation, setdynFldErrValidation] = useState<
    Record<string, string>
  >({});
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  if (!SelectedMasterDatatab || !settabValue || !setReusableSnackBar) {
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
  const storgaeLocationDropDownData = storgaeLocationData
    ? (
        storgaeLocationData as { id: number; storageLocationName: string }[]
      ).map(({ id, storageLocationName }) => ({
        value: id,
        label: storageLocationName,
      }))
    : [];
  if (!PlantDropDownData || !storgaeLocationDropDownData) {
    return null;
  }
  console.log(PlantDropDownData);
  console.log(storgaeLocationDropDownData);
  const fieldName = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Name`;
  const fieldCode = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Code`;
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData[fieldName]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }

    if (formData[fieldCode]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    }
    if (formData["plantId"] < 1) {
      setplantFormError((prev) => ({ ...prev, id: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false, id: false }));
    }
    const { id, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updateAuditHistories",
      "plant",
      "storageLocation",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete filteredUserData[key]);

    if (formData[fieldCode]?.length > 0 && formData[fieldName]?.length > 0) {
      try {
        const response = await api.put(
          `${
            (masters[ExactPath] as mastersPlantSubFields)[
              SelectedMasterDatatab as ValidMasterDataTabs
            ].update
          }/${id}`,
          filteredUserData
        );
        const data = await response.data;
        if (response.status === 200) {
          console.log(data);
          setFormData({});
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} updated Sucessfully!`,
            open: true,
          }));
          settabValue("table");
        }
      } catch (e: any) {
        console.log(e?.response);
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
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`${
        SelectedMasterDatatab.charAt(0).toLowerCase() +
        SelectedMasterDatatab.slice(1)
      }Status`]: true,
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const DwnValue = PlantDropDownData.find(
    (data) => data.value === formData?.plantId
  )?.label;
  const StgLcDwnValue = storgaeLocationDropDownData.find(
    (data) => data.value === formData?.storageLocationId
  )?.label;
  const handleSelectDynChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const handleMultiSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: Array.isArray(value) ? value : [],
    }));
  };
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Enter {SelectedMasterDatatab} Name
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter ${SelectedMasterDatatab} Name`}
              type="text"
              value={formData ? formData[fieldName] : ""}
              onChange={handleInputChange}
              helperText={
                plantFormError.name
                  ? `${SelectedMasterDatatab}Name Should not be empty`
                  : ""
              }
              error={plantFormError.name}
              name={`${
                SelectedMasterDatatab.charAt(0).toLowerCase() +
                SelectedMasterDatatab.slice(1)
              }Name`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Enter {SelectedMasterDatatab} Code
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter ${SelectedMasterDatatab} Code`}
              type="text"
              value={formData ? formData[fieldCode] : ""}
              onChange={handleInputChange}
              helperText={
                plantFormError.code
                  ? `${SelectedMasterDatatab}Code Should not be empty`
                  : ""
              }
              error={plantFormError.code}
              name={`${
                SelectedMasterDatatab.charAt(0).toLowerCase() +
                SelectedMasterDatatab.slice(1)
              }Code`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select Plant
              <span>:</span>
            </TextComp>
            <NameSingleSelectDropdown
              value={DwnValue ? DwnValue : ""}
              onChange={handleSelectChange}
              options={PlantDropDownData}
              label={"Select Plant"}
              name="plantId"
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select Storage Location
              <span>:</span>
            </TextComp>
            <NameSingleSelectDropdown
              value={StgLcDwnValue ? StgLcDwnValue : ""}
              onChange={handleSelectChange}
              options={storgaeLocationDropDownData}
              label={"Select Storage Location"}
              name="storageLocationId"
            />
          </div>
          <MasterDynamicFieldRender
            formData={formData}
            dynamicFields={dynamicFields}
            handleInputChange={handleInputChange}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSelectChange={handleSelectChange}
            dynFldErrValidation={dynFldErrValidation}
          />
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton
            onClick={() => {
              settabValue("table");
            }}
          >
            Cancel
          </OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
        <MasterAuditTrial formData={formData}></MasterAuditTrial>
      </div>
    </form>
  );
}
