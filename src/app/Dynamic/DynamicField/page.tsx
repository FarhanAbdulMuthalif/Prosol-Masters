"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import CreateDreawer from "@/components/DynamicFields/Drawer/Create/CreateDreawer";
import EditDreawer from "@/components/DynamicFields/Drawer/EditDrawer/EditDrawer";
import RadioGroupComponent from "@/components/RadioButton/RadioGroup";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import FormDataDropdown from "@/utils/DynamicFields/DynComponents/FormDataDropdown";
import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import { initialDynamicStateField } from "@/utils/DynamicFields/DynamicFieldsData";
import { getUpdatedFieldData } from "@/utils/DynamicFields/MasterFieldDropdownData";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SelectChangeEvent } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { PostCreateFieldData } from "../../../../TypesStore";
import "./style.scss";
type FormOptionsCache = { [form: string]: string[] };

export default function DynamicField() {
  const [SelectedFormOption, setSelectedFormOption] = useState("");
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [EditDrawerOpen, setEditDrawerOpen] = useState(false);
  const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false);
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
    SelectedMasterDatatab,
  } = contextDataHub;
  const OpenDeleteConformationDialogHandler = () => {
    setDeleteConfirmationDialogOpen(false);
  };

  const [optionsCache, setOptionsCache] = useState<FormOptionsCache>({
    example: ["hello", "hi"],
  });

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
      } catch (e: any) {}
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const renderField = useCallback((data: PostCreateFieldData) => {
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
      case "relational":
        return (
          <FormDataDropdown
            label={`Select ${data.fieldName}`}
            options={data.enums ? data?.enums : []}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = UseAuth();
  if (
    !auth ||
    !setSelectedMasterDatatab ||
    !settabValue ||
    !setSelectedFormFields ||
    !setReusableSnackBar ||
    !SelectedFormFields ||
    !SelectedMasterDatatab
  ) {
    return null;
  }
  // const handleSelectChange = async (e: SelectChangeEvent) => {
  //   const { name, value } = e.target;
  //   setSelectedFormOption(value);
  //   setSelectedMasterDatatab(value);
  //   try {
  //     const res = await api.get(`/dynamic/getAllDynamicFieldsByForm/${value}`);
  //     const data = await res.data;

  //     if (res.status === 200) {
  //       setSelectedFormFields(data);
  //       const fetchDataAndUpdateArray = async (
  //         displayRelationFieldName: string,
  //         fieldName: string
  //       ) => {
  //         try {
  //           const res = await api.get(
  //             `/dynamic/getListOfFieldNameValues?displayName=${displayRelationFieldName}&formName=${fieldName}`
  //           );
  //           const responseData = res.data;
  //           setSelectedFormFields((prevArrObj) =>
  //             data.map((obj: PostCreateFieldData) => {
  //               if (
  //                 obj.dataType === "relational" &&
  //                 obj.fieldName === fieldName &&
  //                 obj.displayRelationFieldName === displayRelationFieldName
  //               ) {
  //                 return { ...obj, enums: responseData };
  //               }
  //               return obj;
  //             })
  //           );
  //         } catch (error) {
  //           console.error("Error fetching data:", error);
  //         }
  //       };

  //       data.forEach((obj: PostCreateFieldData) => {
  //         if (obj.dataType === "relational") {
  //           fetchDataAndUpdateArray(
  //             obj.displayRelationFieldName || "",
  //             obj.fieldName
  //           );
  //         }
  //       });
  //     }
  //   } catch (e: any) {
  //     if (!setReusableSnackBar) return;
  //     setSelectedFormFields([]);
  //     console.log(e?.response);
  //     if (e?.response) {
  //       setReusableSnackBar((prev) => ({
  //         severity: "error",
  //         message: String(
  //           e?.response ? e?.response?.data : e?.response?.data?.error
  //         ),
  //         open: true,
  //       }));
  //     } else {
  //       setReusableSnackBar((prev) => ({
  //         severity: "error",
  //         message: `Error: ${e?.message}`,
  //         open: true,
  //       }));
  //     }
  //   }
  // };
  // Utility function to fetch relational field data
  async function fetchAndUpdateRelationalFields(
    data: PostCreateFieldData[],
    updateFormFields: Function
  ) {
    const updates = data.map(async (obj: PostCreateFieldData) => {
      if (
        obj.dataType === "relational" &&
        obj.displayRelationFieldName &&
        obj.fieldName
      ) {
        try {
          const response = await api.get(
            `/dynamic/getListOfFieldNameValues?displayName=${obj.displayRelationFieldName}&formName=${obj.fieldName}`
          );
          return { ...obj, enums: response.data };
        } catch (error) {
          console.error("Error fetching relational data:", error);
          return obj; // Return the object unchanged in case of an error
        }
      }
      return obj;
    });

    const updatedFields = await Promise.all(updates);
    updateFormFields(updatedFields);
  }

  // Event handler for select change
  const handleSelectChange = async (e: SelectChangeEvent) => {
    const { value } = e.target;
    setSelectedFormOption(value);
    setSelectedMasterDatatab(value);
    try {
      const response = await api.get(
        `/dynamic/getAllDynamicFieldsByForm/${value}`
      );
      if (response.status === 200) {
        const data = response.data;
        setSelectedFormFields(data); // Set initial data
        fetchAndUpdateRelationalFields(data, setSelectedFormFields); // Update with relational data asynchronously
      }
    } catch (error) {
      console.error("Failed to fetch form fields:", error);
      handleAPIError(error); // Handle API errors with a dedicated function
    }
  };

  // Utility function for handling API errors
  function handleAPIError(error: any) {
    if (!setReusableSnackBar || !setSelectedFormFields) return;
    setSelectedFormFields([]);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    setReusableSnackBar({
      severity: "error",
      message: errorMessage,
      open: true,
    });
  }
  const HandlerCloseCreateDrawer = () => {
    setEditDataSelected(initialDynamicStateField);

    setCreateDrawerOpen(false);
  };
  const HandlerOpenCreateDrawer = () => {
    setCreateDrawerOpen(true);
  };
  const HandlerCloseEditDrawer = () => {
    setEditDataSelected(initialDynamicStateField);
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

  const DeleteConformationDialogHandler = async () => {
    try {
      const res = await api.delete(
        `/dynamic/${EditDataSelected.id}/removeDynamicField`
      );
      const data = await res.data;
      if (res.status === 204) {
        await getUpdatedFieldData(
          SelectedMasterDatatab,
          setSelectedFormFields,
          setReusableSnackBar
        );
        setDeleteConfirmationDialogOpen(false);
        setReusableSnackBar({
          severity: "success",
          message: `${EditDataSelected.fieldName} Deleted Sucessfully!`,
          open: true,
        });
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
  };
  console.log(SelectedFormFields);
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
        <FillButton onClick={HandlerOpenCreateDrawer}>Add Field</FillButton>
      </div>
      <div className="dynamic-page-field-module-body-div">
        {SelectedFormFields?.length > 0 ? (
          <>
            {SelectedFormFields?.map((data: PostCreateFieldData) => {
              return (
                <div
                  key={data.id}
                  className="dynamic-page-field-module-field-wrapper"
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
                      fontSize: "12px",
                      color: PrimaryTextColor,
                      opacity: "0.7",
                      position: "absolute",
                      right:
                        data.dataType === "dropDown" ||
                        data.dataType === "relational"
                          ? "30px"
                          : "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      setEditDataSelected(data);
                      setDeleteConfirmationDialogOpen(true);
                      console.log(data);
                    }}
                    sx={{
                      fontSize: "12px",
                      color: PrimaryTextColor,
                      opacity: "0.7",
                      position: "absolute",
                      right:
                        data.dataType === "dropDown" ||
                        data.dataType === "relational"
                          ? "50px"
                          : "30px",
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
      <ReusableConfirmationDialog
        open={deleteConfirmationDialogOpen}
        title={`Dynamic Field Delete`}
        content="Are you sure you want to remove the field in the form it may affect the data?"
        onConfirm={DeleteConformationDialogHandler}
        onCancel={OpenDeleteConformationDialogHandler}
      />
    </div>
  );
}
