import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { initialDynamicStateField } from "@/utils/DynamicFields/DynamicFieldsData";
import { getUpdatedFieldData } from "@/utils/DynamicFields/MasterFieldDropdownData";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, SelectChangeEvent } from "@mui/material";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Option, PostCreateFieldData } from "../../../../../TypesStore";
import RelationalDropdown from "../RenderFieldSelectType/RelationalDropdown";
import SelectDropDown from "../RenderFieldSelectType/SelectDropDown";
import SelectRadio from "../RenderFieldSelectType/SelectRadio";
import SelectTextarea from "../RenderFieldSelectType/SelectTextarea";
import SelectTextfield from "../RenderFieldSelectType/SelectTextfield";
import "./CreateDrawer.scss";

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

  const {
    SelectedMasterDatatab,
    settabValue,
    setReusableSnackBar,
    setSelectedFormFields,
    SelectedFormFields,
  } = useContext(UseContextHook);
  if (
    !settabValue ||
    !setReusableSnackBar ||
    !setSelectedFormFields ||
    !SelectedFormFields
  ) {
    return null;
  }
  const handleFieldTypeChangeSelect = (e: SelectChangeEvent) => {
    setFieldTypeSelect(e.target.value as string);
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, dataType: e.target.value as string };
    });
  };

  const HandletInputCreateName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "isRequired") {
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
  const handlerReusableSelectInputType = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, [name]: e.target.value as string };
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
          DropDownChipArrayList.find(
            (data) => data.optionValue === ChipTextIndiual
          )
        ) {
          return [...prev];
        } else {
          const enteredDataArr = ChipTextIndiual.trim()
            .split(",")
            .filter((n) => n);
          const stingOnly = DropDownChipArrayList.map(
            (data) => data.optionValue
          );
          if (enteredDataArr.length > 1) {
            const filteredArray1 = enteredDataArr.filter(
              (item) => !stingOnly.includes(item)
            );
            const transformedData = filteredArray1.map((data) => ({
              optionValue: data,
            }));
            return [...prev, ...transformedData];
          } else {
            return [...prev, { optionValue: ChipTextIndiual }];
          }
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
    relational: (
      <RelationalDropdown
        handleSelectForm={handlerReusableSelectInputType}
        handleSelect={handlerSelectInputType}
        handleInput={HandletInputCreateName}
        valueData={CreateFieldSetObj}
      />
    ),
  };

  const DrawerSubmitHandlet = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let dataSet: any = {};

      switch (FieldTypeSelect) {
        case "textField":
        case "textArea":
        case "relational":
          if (
            CreateFieldSetObj.fieldName.length < 1 ||
            !CreateFieldSetObj.identity
          ) {
            throw new Error("Required field should not be empty");
          }
          if (Number(CreateFieldSetObj.max) < Number(CreateFieldSetObj.min)) {
            throw new Error("Minimum number should be lesser than maximum");
          }
          dataSet = { ...CreateFieldSetObj };
          break;

        case "dropDown":
          dataSet = {
            fieldName: CreateFieldSetObj.fieldName,
            dataType: CreateFieldSetObj.dataType,
            identity: CreateFieldSetObj.identity,
            min: 2,
            max: 20,
            isRequired: CreateFieldSetObj.isRequired,
            pattern: [],
            isExtraField: true,
            isReadable: true,
            isWritable: true,
            isUnique: false,
            enums: [],
            dropDowns: DropDownChipArrayList,
          };
          if (
            CreateFieldSetObj.fieldName.length < 1 ||
            !CreateFieldSetObj.identity
          ) {
            throw new Error("Required field should not be empty");
          }
          break;

        case "radioButton":
          dataSet = {
            fieldName: CreateFieldSetObj.fieldName,
            dataType: CreateFieldSetObj.dataType,
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
          if (CreateFieldSetObj.fieldName.length < 1 || !dataSet.enums.length) {
            throw new Error("Required field should not be empty");
          }
          break;

        default:
          throw new Error("Invalid field type");
      }

      const res = await api.post(
        `/dynamic/saveDynamicField/${SelectedMasterDatatab}`,
        dataSet
      );
      if (res.status === 201 || res.status === 200) {
        await getUpdatedFieldData(
          SelectedMasterDatatab,
          setSelectedFormFields,
          setReusableSnackBar
        );
        HandlerCloseDrawer();
        setReusableSnackBar({
          severity: "success",
          message: "Field Created Successfully!",
          open: true,
        });
        settabValue("table");
      }
    } catch (error: any) {
      if (setReusableSnackBar) {
        setReusableSnackBar({
          severity: "error",
          message:
            error.response?.data?.message ||
            error.message ||
            "Unknown error occurred",
          open: true,
        });
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
      <form
        className="drawer-wrapper-form"
        onSubmit={DrawerSubmitHandlet}
        data-testid="create-drawer-form-submission"
      >
        <header className="header-of-drawer">
          <TextComp
            variant="subTitle"
            style={{
              color: PrimaryTextColor,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Create Field ({SelectedMasterDatatab})
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
                { value: "relational", label: "Relational Dropdown" },
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
