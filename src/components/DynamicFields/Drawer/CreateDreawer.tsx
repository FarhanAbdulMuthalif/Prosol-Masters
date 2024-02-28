import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { initialDynamicStateField } from "@/utils/DynamicFields/DynamicFieldsData";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Option, PostCreateFieldData } from "../../../../TypesStore";
import "./CreateDrawer.scss";
import SelectDropDown from "./RenderFieldSelectType/SelectDropDown";
import SelectRadio from "./RenderFieldSelectType/SelectRadio";
import SelectTextarea from "./RenderFieldSelectType/SelectTextarea";
import SelectTextfield from "./RenderFieldSelectType/SelectTextfield";

type fieldRenderData = {
  [key: string]: ReactNode;
};
export default function CreateDreawer({
  HandlerCloseDrawer,
  OpenDrawer,
}: {
  OpenDrawer: boolean;
  HandlerCloseDrawer: () => void;
}) {
  const [FieldTypeSelect, setFieldTypeSelect] = useState("");
  const [ChipTextIndiual, setChipTextIndiual] = useState("");
  const [ChipArrayList, setChipArrayList] = useState<string[]>([]);
  const [CreateFieldSetObj, setCreateFieldSetObj] =
    useState<PostCreateFieldData>(initialDynamicStateField);
  const [DropDownChipArrayList, setDropDownChipArrayList] = useState<Option[]>(
    []
  );
  const setChipIntoDivHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChipTextIndiual(e.target.value);
  };
  const router = useRouter();
  const { SelectedMasterDatatab, settabValue, setReusableSnackBar } =
    useContext(UseContextHook);
  if (!SelectedMasterDatatab || !settabValue || !setReusableSnackBar) {
    return null;
  }
  const handleFieldTypeChangeSelect = (e: SelectChangeEvent) => {
    setFieldTypeSelect(e.target.value as string);
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, dataType: e.target.value as string };
    });
  };

  const HandletInputCreateName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "required") {
      setCreateFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.checked as boolean };
      });
    } else {
      setCreateFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.value as string };
      });
    }
  };
  const handlerSelectInputType = (e: SelectChangeEvent) => {
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, identity: e.target.value as string };
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
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
        handleInput={HandletInputCreateName}
        valueData={CreateFieldSetObj}
      />
    ),
    dropDown: (
      <SelectDropDown
        handleSelect={handlerSelectInputType}
        handleInput={HandletInputCreateName}
        valueData={CreateFieldSetObj}
        chipText={ChipTextIndiual}
        chipHandler={setChipIntoDivHandler}
        dropHandler={DropDownChipEnterHandler}
        dDChipList={DropDownChipArrayList}
        setDDChipList={setDropDownChipArrayList}
      />
    ),
    radioButton: (
      <SelectRadio
        handleInput={HandletInputCreateName}
        valueData={CreateFieldSetObj}
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
        handleInput={HandletInputCreateName}
        valueData={CreateFieldSetObj}
      />
    ),
  };
  const DrawerSubmitHandlet = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (FieldTypeSelect === "textField" || FieldTypeSelect === "textArea") {
      if (
        CreateFieldSetObj.fieldName.length < 1 ||
        CreateFieldSetObj.identity?.length === 0
      ) {
        return alert("required field should not be empty");
      }

      if (Number(CreateFieldSetObj?.max) < Number(CreateFieldSetObj?.min)) {
        return alert("Minimum number should be lesser than maximun ");
      }
      console.log(e);
      console.log(CreateFieldSetObj);
      try {
        const res = await api.post(
          `/dynamic/saveField/${SelectedMasterDatatab}`,
          CreateFieldSetObj
        );
        // if (res.status === 201) {
        // }
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Field Created Sucessfully!`,
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
    if (FieldTypeSelect === "dropDown") {
      const dataSet = {
        fieldName: CreateFieldSetObj.fieldName,
        dataType: CreateFieldSetObj.dataType,
        identity: CreateFieldSetObj.identity,
        min: 2,
        max: 20,
        required: CreateFieldSetObj.required,
        pattern: [],
        minLength: 0,
        maxLength: 0,
        extraField: true,
        readable: true,
        writable: true,
        showAsColumn: true,
        enums: [],

        dropDowns: DropDownChipArrayList,
      };
      console.log(dataSet);
      if (
        CreateFieldSetObj.fieldName.length < 1 ||
        CreateFieldSetObj.identity?.length === 0 ||
        CreateFieldSetObj.dataType?.length < 1
      ) {
        return alert("required field should not be empty");
      }
      try {
        const res = await api.post(
          `/dynamic/saveField/${SelectedMasterDatatab}`,
          dataSet
        );
        if (res.status === 201) {
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `Field Created Sucessfully!`,
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
    if (FieldTypeSelect === "radioButton") {
      const dataSet = {
        fieldName: CreateFieldSetObj.fieldName,
        dataType: CreateFieldSetObj.dataType,
        identity: "",
        min: 2,
        max: 20,
        required: true,
        pattern: [],
        minLength: 0,
        maxLength: 0,
        extraField: true,
        readable: true,
        writable: true,
        showAsColumn: true,
        enums: ChipArrayList,
        dropDowns: [],
      };
      if (
        CreateFieldSetObj.fieldName.length < 1 ||
        dataSet?.enums?.length === 0
      ) {
        return alert("required field should not be empty");
      }
      try {
        const res = await api.post(
          `/dynamic/saveField/${SelectedMasterDatatab}`,
          dataSet
        );
        if (res.status === 201) {
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `Field Created Sucessfully!`,
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
            Create Field
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
              value={FieldTypeSelect}
              onChange={handleFieldTypeChangeSelect}
              options={[
                { value: "textField", label: "TextField" },
                { value: "textArea", label: "TextArea" },
                { value: "dropDown", label: "DropDown" },
                { value: "radioButton", label: "RadioButton" },
              ]}
            />
          </div>
          {fieldTypeFieldRender[FieldTypeSelect]}
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
