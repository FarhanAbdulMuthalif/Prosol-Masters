"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { usePathname, useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CharacteristicSingleProps,
  mastersCreateTemplateSubsubFields,
  mastersProps,
} from "../../../../TypesStore";

import useFetch from "@/Hooks/useFetch";
import OutlinedButton from "@/components/Button/OutlineButton";
import CreateTemplateAttributeUOMDialog from "@/components/Dialog/CreateTemplateAttributeUOMDialog";
import CreateTemplateValuesDialog from "@/components/Dialog/CreateTemplateValuesDialog";
import CharacteristicSingleSelectDropdown from "@/components/Dropdown/CharacteristicDropdown";
import CustomRadioGroupComponent from "@/components/RadioButton/CustomRadioGroup";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import { URL_FIX_LOGIN_PATH } from "@/components/apiLogin";
import { CharacteristSingleInitialData } from "@/utils/masters/plant";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import Image from "next/image";
import "./style.scss";

export default function Value() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [OpenValueMasterDialog, setOpenValueMasterDialog] = useState(false);
  const [OpenAttUOMMasterDialog, setOpenAttUOMMasterDialog] = useState(false);
  const [FileSelect, setFileSelect] = useState<File | null>(null);
  const [NounSuggestData, setNounSuggestData] = useState([]);
  const [ModifierSuggestData, setModifierSuggestData] = useState([]);
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [Characteristic, setCharacteristic] = useState<
    CharacteristicSingleProps[]
  >([CharacteristSingleInitialData]);
  const [CharacteristicId, setCharacteristicId] = useState(0);
  const [CharacteristicDwnValueId, setCharacteristicDwnValueId] = useState(0);
  // const [SingleCharacteristic, setSingleCharacteristic] =
  //   useState<CharacteristicSingleProps>({
  //     attributeId: 0,
  //     shortPriority: 1,
  //     mandatory: false,
  //     definition: "",
  //     valueId: [],
  //     uomMandatory: false,
  //     attrUomId: [],
  //   });
  const router = useRouter();

  const HandlerCloseCreateDrawer = () => {
    setCreateDrawerOpen(false);
  };
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  const PlantDataCon = useContext(UseContextHook);
  const {
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    auth,
    setReusableSnackBar,
  } = PlantDataCon;
  useEffect(() => {
    if (setSelectedMasterDatatab) {
      setSelectedMasterDatatab("CreateTemplate");
    }
  }, [setSelectedMasterDatatab]);
  const { data: attributeMasterOriginalArray } = useFetch(
    "/attribute/getAllAttributeFromMaster?showFull=true"
  ) ?? {
    data: [],
  };
  const { data: originalArray } = useFetch("/setting/getAllNmUom") ?? {
    data: [],
  };
  const nmUomDropDownData = originalArray
    ? (originalArray as { id: number; nmUomName: string }[]).map(
        ({ id, nmUomName }) => ({
          value: id,
          label: nmUomName,
        })
      )
    : [];
  const NounHandler = useCallback(
    async (nounValue: string) => {
      try {
        const res = await api.get(
          `${
            (masters[ExactPath] as mastersCreateTemplateSubsubFields).getAllnoun
          }${nounValue}`
        );
        const data = await res.data;
        setNounSuggestData(data);
      } catch (e: any) {
        console.log(e?.response);
      }
    },
    [ExactPath, masters]
  );
  const nounFrmData = formData ? formData.noun : "";
  const ModifierHandler = useCallback(
    async (NounText: string) => {
      try {
        const res = await api.get(
          `${
            (masters[ExactPath] as mastersCreateTemplateSubsubFields)
              .getAllModifier
          }${NounText}`
        );
        const data = await res.data;
        setModifierSuggestData(data);
      } catch (e: any) {
        console.log(e?.response);
      }
    },
    [ExactPath, masters]
  );
  const getDicyionaryNM = useCallback(
    async (modifier: string) => {
      try {
        const res = await api.get(
          `/dictionary/findByNounAndModifier?noun=${formData["noun"]}&modifier=${modifier}`
        );
        const data = await res.data;
        if (res.status === 200) {
          setFormData(data);
          setCharacteristic(data.attributes);
        }
      } catch (e: any) {
        console.log(e?.response);
      }
    },
    [formData]
  );
  const attributeMasterDwnData = attributeMasterOriginalArray
    ? (
        attributeMasterOriginalArray as { id: number; attributeName: string }[]
      ).map(({ id, attributeName }) => ({
        value: id,
        label: attributeName,
      }))
    : [];
  // const SingleAttributeMasterUom= attributeMasterOriginalArray ? attributeMasterOriginalArray.find((Data)=>Data.id=== ): []

  const authHook = UseAuth();
  if (!authHook && !auth) {
    return null;
  }
  if (
    !nmUomDropDownData ||
    !SelectedMasterDatatab ||
    !attributeMasterDwnData ||
    !setReusableSnackBar
  ) {
    return null;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const isNoun = name === "noun";
    if (isNoun) {
      NounHandler(value);
      ModifierHandler(value);
    }

    if (!isNoun && name === "modifier") {
      getDicyionaryNM(value);
      ModifierHandler(nounFrmData);
    }

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];
      console.log(selectedImage);
      setFileSelect(selectedImage);
      setFormData((prev: any) => {
        return { ...prev, image: selectedImage?.name };
      });
    }
  };
  const handleCharacteristicInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { name, value } = e.target;
    setCharacteristic((prevData) =>
      prevData.map((cData) =>
        cData.id === id
          ? {
              ...cData,
              [name]:
                name === "mandatory" || name === "uomMandatory"
                  ? (e.target.checked as boolean)
                  : value,
            }
          : cData
      )
    );
  };
  const handleCharacteristicSelectChange = (
    e: SelectChangeEvent,
    id: number
  ) => {
    const { name, value } = e.target;

    setCharacteristic((prevData) =>
      prevData.map((cData) =>
        cData.id === id
          ? {
              ...cData,
              [name]: value,
            }
          : cData
      )
    );
    setCharacteristicDwnValueId(Number(value));
    console.log(Number(value));
  };
  const handleAutoCompleteInputChange = (
    name: string,
    value: string | null
  ) => {
    if (!value) return;
    NounHandler(value);
    if (name === "modifier") {
      getDicyionaryNM(value);
    }
    ModifierHandler(value);
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const checkHandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      nmUoms: checked
        ? [...(prev?.nmUoms || []), Number(value)] // Initialize to [] if prev?.nmUoms is undefined
        : prev?.nmUoms?.filter((e: number) => e !== Number(value)) || [], // Initialize to [] if prev?.nmUoms is undefined
    }));
  };
  const CreateTemplateHandler = async (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);
    const CleanCharacteristic = Characteristic.map(({ id, ...rest }) => rest);
    console.log(CleanCharacteristic);

    // setFormData((prev: any) => {
    //   return { ...prev, attributes: CleanCharacteristic };
    // });
    const FormDataWthChar = { ...formData, attributes: CleanCharacteristic };
    const dataFrm = new FormData();
    dataFrm.append("source", JSON.stringify(FormDataWthChar));
    dataFrm.append("file", FileSelect as File);

    try {
      const response = await api.post(
        `${(masters[ExactPath] as mastersCreateTemplateSubsubFields).create}`,
        dataFrm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      if (response.status === 201) {
        console.log(data);
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Noun Modifier Template Created Sucessfully!`,
          open: true,
        }));

        setFormData((prev: any) => {
          return {
            noun: "",
            modifier: "",
            modifierSynonyms: "",
            nounSynonyms: "",
            nmDefinition: "",
            type: "",
            similarSearchItems: "",
            nmUoms: [],
          };
        });
        router.refresh();
        setCharacteristic([CharacteristSingleInitialData]);
        setOpenSnackbar(true);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response.data);
      console.log(error.response.data.message);
    }
  };

  const HandleValueMasterDialog = () => {
    setOpenValueMasterDialog(false);
  };
  const HandleAttUOMMasterDialog = () => {
    setOpenAttUOMMasterDialog(false);
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const LblFuncHandle = (id: number) => {
    const valueGet = attributeMasterDwnData.find(
      (data) => data.value === id
    )?.label;
    return valueGet ? valueGet : "";
  };
  const handleClear = () => {
    setFormData((prev: any) => {
      return {
        noun: "",
        modifier: "",
        modifierSynonyms: "",
        nounSynonyms: "",
        nmDefinition: "",
        type: "",
        similarSearchItems: "",
        nmUoms: [],
      };
    });

    setCharacteristic([CharacteristSingleInitialData]);
  };

  return (
    <section className="masters-vendor-main-content-section">
      <div className="masters-main-content-header">
        <p className="masters-main-content-header-text">
          {SelectedMasterDatatab}
        </p>
        <div className="export-import-header-master-div">
          <FillButton
            onClick={() => {
              setCreateDrawerOpen(true);
            }}
          >
            Add Fields
          </FillButton>
        </div>
      </div>
      <form
        onSubmit={CreateTemplateHandler}
        className="create-template-wrapper-div"
      >
        <div className="create-template-field-place-div">
          <Autocomplete
            options={NounSuggestData}
            forcePopupIcon={false}
            autoHighlight
            freeSolo
            getOptionLabel={(option) => option} // Specify how the value should be displayed
            fullWidth
            value={formData ? formData["noun"] : ""}
            onChange={(event, value) =>
              handleAutoCompleteInputChange("noun", value)
            } // Update formData when an option is selected
            renderOption={(props, option: string) => (
              <li
                style={{
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
                {...props}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            )}
            renderInput={(params) => (
              <OutlineTextField
                {...params}
                placeholder={`Enter Noun`}
                type="text"
                value={formData ? formData["noun"] : ""}
                onChange={handleInputChange}
                name={`noun`}
                size="small"
              />
            )}
            clearIcon={null} // Set clearIcon to null to remove the "x" icon
          />
          <Autocomplete
            options={ModifierSuggestData}
            forcePopupIcon={false}
            autoHighlight
            freeSolo
            getOptionLabel={(option) => option} // Specify how the value should be displayed
            fullWidth
            onChange={(event, value) =>
              handleAutoCompleteInputChange("modifier", value)
            } // Update formData when an option is selected
            value={formData ? formData["modifier"] : ""}
            renderOption={(props, option: string) => (
              <li
                style={{
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
                {...props}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            )}
            renderInput={(params) => (
              <OutlineTextField
                {...params}
                placeholder={`Enter Modifier`}
                type="text"
                value={formData ? formData["modifier"] : ""}
                onChange={handleInputChange}
                name={`modifier`}
                size="small"
              />
            )}
            clearIcon={null} // Set clearIcon to null to remove the "x" icon
          />

          <OutlineTextField
            placeholder={`Enter Noun Synonyms`}
            type="text"
            value={formData ? formData["nounSynonyms"] : ""}
            onChange={handleInputChange}
            name={`nounSynonyms`}
          />
          <OutlineTextField
            placeholder={`Enter Modifier Synonyms`}
            type="text"
            value={formData ? formData["modifierSynonyms"] : ""}
            onChange={handleInputChange}
            name={`modifierSynonyms`}
          />

          <OutlineTextField
            placeholder={`Enter Similar SearchItems`}
            type="text"
            value={formData ? formData["similarSearchItems"] : ""}
            onChange={handleInputChange}
            name={`similarSearchItems`}
          />

          <CustomRadioGroupComponent
            label=""
            name="type"
            options={["OEM", "OPM", "GENERIC"]}
            value={formData ? formData["type"] : ""}
            onChange={handleInputChange}
          />
          <TextareaOutline
            placeholder={`Enter NM Definition`}
            type="text"
            value={formData ? formData["nmDefinition"] : ""}
            onChange={handleInputChange}
            name={`nmDefinition`}
            rows={2}
          />
          <OutlinedButton component="label" startIcon={<CloudUploadIcon />}>
            {formData
              ? formData?.image
                ? formData?.image
                : "Upload Image"
              : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              style={{
                height: "100%",
                width: "100%",
                display: "none",
                overflow: "hidden",
              }}
              onChange={handleImageChange}
            />
          </OutlinedButton>
          {formData && formData["image"] && formData["id"] ? (
            <Image
              src={`${URL_FIX_LOGIN_PATH}/dictionary/downloadFile/${
                formData ? formData["id"] : ""
              }/${formData ? formData["image"] : ""}`}
              alt="loading..."
              height={50}
              width={100}
            />
          ) : (
            ""
          )}
        </div>
        <div className="template-nm-uom-section">
          <p className="template-nm-uom-section-text">Select UOM</p>
          <div className="template-nm-uom-section-checkbox">
            {nmUomDropDownData.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    onChange={checkHandler2}
                    checked={formData?.nmUoms?.includes(option.value)}
                    value={option.value}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      margin: "0 ",
                    }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </div>
        </div>
        <div className="template-nm-characteristic-section">
          <p className="template-nm-characteristic-section-text one">
            Characteristic
          </p>
          <p className="template-nm-characteristic-section-text two">
            Short Priority
          </p>
          <p className="template-nm-characteristic-section-text three">
            Mandatory
          </p>
          <p className="template-nm-characteristic-section-text four">
            Definition
          </p>
          <p className="template-nm-characteristic-section-text five">Values</p>
          <p className="template-nm-characteristic-section-text six">
            UOM Mandatory
          </p>
          <p className="template-nm-characteristic-section-text seven">UOM</p>
          <p className="template-nm-characteristic-section-text eight">
            Action
          </p>
        </div>
        <div className="template-nm-characteristic-section-input-wrp">
          {(Characteristic.length > 0 ? Characteristic : []).map((cData) => {
            return (
              <div
                key={cData.shortPriority}
                className="template-nm-characteristic-section-input-div"
              >
                <div className="template-nm-characteristic-section-input-div-inside one">
                  <CharacteristicSingleSelectDropdown
                    value={LblFuncHandle(cData.attributeId)}
                    onChange={(e) => {
                      handleCharacteristicSelectChange(e, cData.id);
                    }}
                    options={attributeMasterDwnData}
                    label={"Select Attribute Unit"}
                    name="attributeId"
                  />
                </div>
                <div className="template-nm-characteristic-section-input-div-inside two">
                  <OutlineTextField
                    placeholder={`ShortPriority`}
                    type="number"
                    value={cData["shortPriority"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCharacteristicInputChange(e, cData.id);
                    }}
                    name={`shortPriority`}
                    fullWidth
                  />
                </div>
                <div className="template-nm-characteristic-section-input-div-inside three">
                  <Switch
                    color="primary"
                    size="small"
                    checked={cData["mandatory"]}
                    onChange={(e) => {
                      handleCharacteristicInputChange(e, cData.id);
                    }}
                    name="mandatory"
                  />
                </div>
                <div className="template-nm-characteristic-section-input-div-inside four">
                  <OutlineTextField
                    placeholder={`Enter Definition`}
                    type="text"
                    value={cData["definition"]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleCharacteristicInputChange(e, cData.id);
                    }}
                    name={`definition`}
                    fullWidth
                  />
                </div>
                <div className="template-nm-characteristic-section-input-div-inside five">
                  <OutlinedButton
                    onClick={() => {
                      setOpenValueMasterDialog(true);
                      setCharacteristicId(cData.id);
                    }}
                  >
                    Add Value
                  </OutlinedButton>
                </div>
                <div className="template-nm-characteristic-section-input-div-inside six">
                  <Switch
                    color="primary"
                    size="small"
                    checked={cData["uomMandatory"]}
                    onChange={(e) => {
                      handleCharacteristicInputChange(e, cData.id);
                    }}
                    name="uomMandatory"
                  />
                </div>
                <div className="template-nm-characteristic-section-input-div-inside seven">
                  <OutlinedButton
                    onClick={() => {
                      setCharacteristicId(cData.id);
                      setOpenAttUOMMasterDialog(true);
                    }}
                  >
                    Add UOM
                  </OutlinedButton>
                </div>
                <div className="template-nm-characteristic-section-input-div-inside eight">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <DeleteForeverOutlinedIcon
                      onClick={() => {
                        setCharacteristic((prev) => {
                          if (Characteristic.length === 1) {
                            return [...prev];
                          }
                          return prev.filter((data) => data.id !== cData.id);
                        });
                      }}
                      sx={{
                        fontSize: "1.1rem",
                        color: "#1976d2",
                        cursor: "pointer",
                      }}
                    />
                    <AddIcon
                      onClick={() => {
                        setCharacteristic((prev) => [
                          ...prev,
                          {
                            ...CharacteristSingleInitialData,
                            id: Characteristic.length + 1,
                            shortPriority: Characteristic.length + 1,
                          },
                        ]);
                      }}
                      sx={{
                        fontSize: "1.1rem",
                        color: "#1976d2",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton type="button" onClick={handleClear}>
            CLEAR
          </OutlinedButton>
          <FillButton type="submit">Create Template</FillButton>
        </div>
      </form>

      <CreateDreawer
        OpenDrawer={CreateDrawerOpen}
        HandlerCloseDrawer={HandlerCloseCreateDrawer}
      />
      <CreateTemplateValuesDialog
        open={OpenValueMasterDialog}
        handleClose={HandleValueMasterDialog}
        formData={Characteristic}
        setFormData={setCharacteristic}
        id={CharacteristicId}
      />

      <CreateTemplateAttributeUOMDialog
        open={OpenAttUOMMasterDialog}
        handleClose={HandleAttUOMMasterDialog}
        formData={Characteristic}
        setFormData={setCharacteristic}
        id={CharacteristicId}
        CharacteristicDwnValueId={CharacteristicDwnValueId}
      />
    </section>
  );
}
