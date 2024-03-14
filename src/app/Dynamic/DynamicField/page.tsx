"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import EditDreawer from "@/components/DynamicFields/Drawer/EditDrawer/EditDrawer";
import RadioGroupComponent from "@/components/RadioButton/RadioGroup";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import { initialDynamicStateField } from "@/utils/DynamicFields/DynamicFieldsData";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import EditIcon from "@mui/icons-material/Edit";
import { SelectChangeEvent } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PostCreateFieldData } from "../../../../TypesStore";
import "./style.scss";

export default function DynamicField() {
  const [SelectedFormOption, setSelectedFormOption] = useState("");
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [EditDrawerOpen, setEditDrawerOpen] = useState(false);
  const [EditDataSelected, setEditDataSelected] = useState<PostCreateFieldData>(
    initialDynamicStateField
  );
  const [FormOption, setFormOption] = useState([]);
  const contextDataHub = useContext(UseContextHook);
  const {
    setReusableSnackBar,
    settabValue,
    setSelectedMasterDatatab,
    setSelectedFormFields,
    SelectedFormFields,
  } = contextDataHub;
  useEffect(() => {
    async function fetchData() {
      if (!setReusableSnackBar || !settabValue || !setSelectedFormFields)
        return;
      if (!SelectedFormOption) setSelectedFormFields([]);
      settabValue("table");
      try {
        const res = await api.get(`/dynamic/getAllForm`);
        const data = await res.data;
        if (res.status === 200) {
          setFormOption(data);
        }
      } catch (e: any) {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: `Error: ${e?.message}`,
          open: true,
        }));
      }
    }
    fetchData();
  }, [
    setReusableSnackBar,
    settabValue,
    setSelectedFormFields,
    SelectedFormOption,
  ]);
  const auth = UseAuth();
  if (
    !auth ||
    !setSelectedMasterDatatab ||
    !settabValue ||
    !setSelectedFormFields ||
    !SelectedFormFields
  ) {
    return null;
  }
  const handleSelectChange = async (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setSelectedFormOption(value);
    setSelectedMasterDatatab(value);
    try {
      const res = await api.get(`/dynamic/getAllDynamicFieldsByForm/${value}`);
      const data = await res.data;
      if (res.status === 200) {
        setSelectedFormFields(data);
      }
    } catch (e: any) {
      if (!setReusableSnackBar) return;
      setSelectedFormFields([]);
      console.log(e?.response);
      if (e?.response) {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: String(
            e?.response ? e?.response?.data : e?.response?.data?.error
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
  const HandlerCloseCreateDrawer = () => {
    setCreateDrawerOpen(false);
  };
  const HandlerCloseEditDrawer = () => {
    setEditDrawerOpen(false);
  };
  const FormDropDownData = FormOption
    ? (FormOption as { id: string; formName: string }[]).map(
        ({ id, formName }) => ({
          value: formName,
          label: formName,
        })
      )
    : [];
  const renderField = (data: PostCreateFieldData) => {
    switch (data.dataType) {
      case "textField":
        return (
          <OutlineTextField
            placeholder={`Enter ${data.fieldName}`}
            key={data.id}
            type={data.identity}
            name={data.fieldName}
            fullWidth
            inputProps={{
              autoComplete: "new-password",
              maxLength: data.max,
              minLength: data.min,
            }}
          />
        );
      case "textArea":
        return (
          <TextareaOutline
            placeholder={`Enter ${data.fieldName}`}
            key={data.id}
            fullWidth
            rows={typeof Number(data.identity) ? data.identity : 2}
            name={data.fieldName}
            inputProps={{
              autoComplete: "new-password",
              maxLength: data.max,
              minLength: data.min,
            }}
          />
        );
      case "dropDown":
        return data.identity === "single" ? (
          <DynamicSingleSelectDropdown
            label={`Select ${data.fieldName}`}
            options={data.dropDowns ? data.dropDowns : []}
            name={data.fieldName}
            value={""}
            onChange={() => {}}
          />
        ) : (
          <MultipleDynamicSelectDropdown
            label={`Select ${data.fieldName}`}
            options={data.dropDowns ? data.dropDowns : []}
            name={data.fieldName}
            value={""}
            onChange={() => {}}
          />
        );
      case "radioButton":
        return (
          <RadioGroupComponent
            label={`${data.fieldName} :`}
            name={data.fieldName}
            value={""}
            onChange={() => {}}
            options={data.enums ? data?.enums : []}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div className="dynamic-field-module-wrapper">
      <div className="dynamic-field-module-header-div">
        <TextComp
          variant="subTitle"
          style={{ color: PrimaryTextColor, fontWeight: "bold" }}
        >
          DYNAMIC FIELD
        </TextComp>
        <div className="dynamic-field-module-dropdown-wrapper">
          <NameSingleSelectDropdown
            value={SelectedFormOption ? SelectedFormOption : ""}
            onChange={handleSelectChange}
            options={FormDropDownData}
            label={"Select Form"}
            name="formName"
          />
        </div>
        <FillButton onClick={() => setCreateDrawerOpen(true)}>
          Add Field
        </FillButton>
      </div>
      <div className="dynamic-field-module-body-div">
        {SelectedFormFields?.length > 0 ? (
          <>
            {SelectedFormFields?.map((data: PostCreateFieldData) => {
              return (
                <div
                  key={data.id}
                  className="dynamic-field-module-field-wrapper"
                >
                  <TextComp
                    variant="body"
                    style={{
                      fontWeight: "600",
                      color: PrimaryTextColor,
                      width: "30%",
                    }}
                  >
                    {capitalizeFunc(data.fieldName)} :
                  </TextComp>
                  {renderField(data)}
                  <EditIcon
                    onClick={() => {
                      setEditDataSelected(data);
                      setEditDrawerOpen(true);
                      console.log(data);
                    }}
                    sx={{
                      fontSize: "14px",
                      color: PrimaryTextColor,
                      position: "absolute",
                      right: data.dataType === "dropDown" ? "30px" : "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <TextComp
            variant="title"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: PrimaryTextColor,
              textTransform: "uppercase",
            }}
          >
            No Fields
          </TextComp>
        )}
      </div>
      <CreateDreawer
        OpenDrawer={CreateDrawerOpen}
        HandlerCloseDrawer={HandlerCloseCreateDrawer}
      />
      <EditDreawer
        OpenDrawer={EditDrawerOpen}
        HandlerCloseDrawer={HandlerCloseEditDrawer}
        SelectedValue={EditDataSelected}
      />
    </div>
  );
}
