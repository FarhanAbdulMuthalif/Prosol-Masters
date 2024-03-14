import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  KeysToRemoveEditMaster,
  Option,
  PostCreateFieldData,
} from "../../../../../TypesStore";
import SelectDropDown from "../RenderFieldSelectType/SelectDropDown";
import SelectRadio from "../RenderFieldSelectType/SelectRadio";
import SelectTextarea from "../RenderFieldSelectType/SelectTextarea";
import SelectTextfield from "../RenderFieldSelectType/SelectTextfield";
import "./EditDrawer.scss";

type fieldRenderData = {
  [key: string]: ReactNode;
};
export default function EditDreawer({
  HandlerCloseDrawer,
  OpenDrawer,
  SelectedValue,
}: {
  OpenDrawer: boolean;
  HandlerCloseDrawer: () => void;
  SelectedValue: PostCreateFieldData;
}) {
  const [ChipTextIndiual, setChipTextIndiual] = useState("");
  const [ChipArrayList, setChipArrayList] = useState<string[]>([]);
  const [EditFieldSetObj, setEditFieldSetObj] =
    useState<PostCreateFieldData>(SelectedValue);
  useEffect(() => {
    setEditFieldSetObj(SelectedValue);
  }, [SelectedValue]);
  const [DropDownChipArrayList, setDropDownChipArrayList] = useState<Option[]>(
    []
  );
  const setChipIntoDivHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChipTextIndiual(e.target.value);
  };
  const router = useRouter();
  const {
    SelectedMasterDatatab,
    settabValue,
    setReusableSnackBar,
    setSelectedFormFields,
  } = useContext(UseContextHook);
  if (
    !SelectedMasterDatatab ||
    !settabValue ||
    !setReusableSnackBar ||
    !setSelectedFormFields
  ) {
    return null;
  }
  const handleFieldTypeChangeSelect = (e: SelectChangeEvent) => {
    setEditFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, dataType: e.target.value as string };
    });
  };

  const HandletInputEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "isRequired") {
      setEditFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.checked as boolean };
      });
    } else {
      setEditFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.value as string };
      });
    }
  };
  const handlerSelectInputType = (e: SelectChangeEvent) => {
    setEditFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, identity: e.target.value as string };
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setEditFieldSetObj((prev: PostCreateFieldData) => {
      const dataTemp = { ...prev };
      if (checked) {
        return { ...prev, pattern: [...(prev?.pattern as any), value] };
      } else {
        return {
          ...prev,
          pattern: dataTemp?.pattern?.filter((option) => option !== value),
        };
      }
    });
  };
  const DropDownChipEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      setDropDownChipArrayList((prev: Option[]) => {
        if (
          DropDownChipArrayList.find((data) => data.value === ChipTextIndiual)
        ) {
          return [...prev];
        } else {
          return [...prev, { value: ChipTextIndiual }];
        }
      });
      setChipTextIndiual("");
    }
  };
  const ChipEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      setChipArrayList((prev: string[]) => {
        if (ChipArrayList.includes(ChipTextIndiual)) {
          return [...prev];
        } else {
          return [...prev, ChipTextIndiual];
        }
      });
      setChipTextIndiual("");
    }
  };
  const fieldTypeFieldRender: fieldRenderData = {
    textField: (
      <SelectTextfield
        handleCheckBox={handleCheckboxChange}
        handleSelect={handlerSelectInputType}
        handleInput={HandletInputEditName}
        valueData={EditFieldSetObj}
      />
    ),
    dropDown: (
      <SelectDropDown
        handleSelect={handlerSelectInputType}
        handleInput={HandletInputEditName}
        valueData={EditFieldSetObj}
        chipText={ChipTextIndiual}
        chipHandler={setChipIntoDivHandler}
        dropHandler={DropDownChipEnterHandler}
        dDChipList={DropDownChipArrayList}
        setDDChipList={setDropDownChipArrayList}
      />
    ),
    radioButton: (
      <SelectRadio
        handleInput={HandletInputEditName}
        valueData={EditFieldSetObj}
        ChipEnterHandler={ChipEnterHandler}
        ChipTextIndiual={ChipTextIndiual}
        setChipIntoDivHandler={setChipIntoDivHandler}
        ChipArrayList={ChipArrayList}
        setChipArrayList={setChipArrayList}
      />
    ),
    textArea: (
      <SelectTextarea
        handleCheckBox={handleCheckboxChange}
        handleSelect={handlerSelectInputType}
        handleInput={HandletInputEditName}
        valueData={EditFieldSetObj}
      />
    ),
  };
  const getUpdatedFieldData = async () => {
    try {
      const resField = await api.get(
        `/dynamic/getAllDynamicFieldsByForm/${SelectedMasterDatatab}`
      );
      const dataField = await resField.data;
      console.log(dataField);
      if (resField.status === 200) {
        setSelectedFormFields(dataField);
      }
    } catch (e: any) {
      setReusableSnackBar((prev) => ({
        severity: "error",
        message: `Error: ${e?.message} on getting updated fields`,
        open: true,
      }));
    }
  };
  const DrawerSubmitHandlet = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { id, ...filteredData } = EditFieldSetObj;
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete (filteredUserData as any)[key]);
    if (
      EditFieldSetObj.dataType === "textField" ||
      EditFieldSetObj.dataType === "textArea"
    ) {
      if (
        EditFieldSetObj.fieldName.length < 1 ||
        EditFieldSetObj.identity?.length === 0
      ) {
        return alert("required field should not be empty");
      }

      if (Number(EditFieldSetObj?.max) < Number(EditFieldSetObj?.min)) {
        return alert("Minimum number should be lesser than maximun ");
      }
      console.log(EditFieldSetObj);
      try {
        const res = await api.put(
          `/dynamic/updateDynamicFieldById/${id}?formName=${SelectedMasterDatatab}`,
          filteredUserData
        );
        if (res.status === 201 || res.status === 200) {
          getUpdatedFieldData();
        }
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Field Editd Sucessfully!`,
          open: true,
        }));
        HandlerCloseDrawer();
        settabValue("table");
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
    if (EditFieldSetObj.dataType === "dropDown") {
      const dataSet = {
        fieldName: EditFieldSetObj.fieldName,
        dataType: EditFieldSetObj.dataType,
        identity: EditFieldSetObj.identity,
        min: 2,
        max: 20,
        isRequired: EditFieldSetObj.isRequired,
        pattern: [],
        isExtraField: true,
        isReadable: true,
        isWritable: true,
        isUnique: false,
        enums: [],

        dropDowns: DropDownChipArrayList,
      };
      console.log(dataSet);
      if (
        EditFieldSetObj.fieldName.length < 1 ||
        EditFieldSetObj.identity?.length === 0 ||
        EditFieldSetObj.dataType?.length < 1
      ) {
        return alert("required field should not be empty");
      }
      try {
        const res = await api.put(
          `/dynamic/updateDynamicFieldById/${id}?formName=${SelectedMasterDatatab}`,
          dataSet
        );
        if (res.status === 201 || res.status === 200) {
          getUpdatedFieldData();
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `Field Editd Sucessfully!`,
            open: true,
          }));
          HandlerCloseDrawer();
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
    }
    if (EditFieldSetObj.dataType === "radioButton") {
      const dataSet = {
        fieldName: EditFieldSetObj.fieldName,
        dataType: EditFieldSetObj.dataType,
        identity: "",
        min: 2,
        max: 20,
        isRequired: true,
        pattern: [],
        isExtraField: true,
        isReadable: true,
        isWritable: true,
        isUnique: false,
        enums: ChipArrayList,
        dropDowns: [],
      };
      if (
        EditFieldSetObj.fieldName.length < 1 ||
        dataSet?.enums?.length === 0
      ) {
        return alert("required field should not be empty");
      }
      try {
        const res = await api.put(
          `/dynamic/updateDynamicFieldById/${id}?formName=${SelectedMasterDatatab}`,
          dataSet
        );
        if (res.status === 201 || res.status === 200) {
          getUpdatedFieldData();
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `Field Editd Sucessfully!`,
            open: true,
          }));
          HandlerCloseDrawer();
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
    }
  };
  return (
    <Drawer
      anchor={"right"}
      variant="temporary"
      open={OpenDrawer}
      onClose={HandlerCloseDrawer}
    >
      <form className="drawer-wrapper-form" onSubmit={DrawerSubmitHandlet}>
        <header className="header-of-drawer">
          <TextComp
            variant="subTitle"
            style={{
              color: PrimaryTextColor,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Edit Field ({SelectedMasterDatatab})
          </TextComp>
          <IconButton onClick={HandlerCloseDrawer} sx={{ padding: "3px" }}>
            <CloseIcon />
          </IconButton>
        </header>
        <section className="drawer-Center-Part">
          <div className="input-render-field-wrap">
            <TextComp
              variant="bodySmall"
              style={{
                color: PrimaryTextColor,
                fontWeight: "600",
                alignSelf: "flex-start",
                textTransform: "uppercase",
              }}
            >
              Select Field Type *
            </TextComp>
            <SingleSelectDropdown
              label="Select Field"
              value={EditFieldSetObj.dataType}
              onChange={handleFieldTypeChangeSelect}
              options={[
                { value: "textField", label: "TextField" },
                { value: "textArea", label: "TextArea" },
                { value: "dropDown", label: "DropDown" },
                { value: "radioButton", label: "RadioButton" },
              ]}
            />
          </div>
          {fieldTypeFieldRender[EditFieldSetObj.dataType]}
        </section>
        <footer>
          <OutlinedButton
            onClick={HandlerCloseDrawer}
            size="small"
            variant="outlined"
          >
            Cancel
          </OutlinedButton>
          <FillButton type="submit" size="small" variant="contained">
            Save
          </FillButton>
        </footer>
      </form>
    </Drawer>
  );
}
