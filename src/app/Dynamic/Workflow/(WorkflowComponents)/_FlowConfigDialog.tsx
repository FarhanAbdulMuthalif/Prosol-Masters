import { UseContextHook } from "@/Provides/UseContextHook";
import api from "@/components/api";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  DynamicFormsProps,
  PostCreateFieldData,
} from "../../../../../TypesStore";
import "./FlowConfigDialog.scss";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
  content: string;
}
type strVMH = {
  type: "view" | "modify" | "hide";
};
function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)];
}

export default function FlowConfigDialog({
  open,
  handleClose,
  content,
  handleOk,
}: DialogProps) {
  const [value, setvalue] = useState("levelConfig");
  const [DynamicForms, setDynamicForms] = useState<DynamicFormsProps[]>([]);
  const [formHeadFields, setFormHeadFields] = useState([
    {
      id: 0,
      dataType: "",
      identity: "",
      fieldName: "",
      pattern: [],
      min: 0,
      max: 0,
      minLength: 0,
      maxLength: 0,
      extraField: false,
      readable: false,
      writable: false,
      showAsColumn: false,
      enums: [],
      required: false,
      dropDownValues: [],
    },
  ]);
  const [FormSelectionDropdown, setFormSelectionDropdown] = useState("");
  const [ReworkShowInput, setReworkShowInput] = useState(false);
  const [setFieldShowInForm, setsetFieldShowInForm] = useState<
    "view" | "modify" | "hide"
  >("view");
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<number[]>([]);
  const [right, setRight] = useState<number[]>([]);
  const [view, setView] = useState<number[]>([]);
  const [modify, setModify] = useState<number[]>([]);
  const [hide, setHide] = useState<number[]>([]);
  const valCrtSltNow = {
    view: view,
    modify: modify,
    hide: hide,
  };
  const setValCrtSltNow = {
    view: setView,
    modify: setModify,
    hide: setHide,
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, valCrtSltNow[setFieldShowInForm]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setValCrtSltNow[setFieldShowInForm](
      valCrtSltNow[setFieldShowInForm].concat(leftChecked)
    );
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };
  const capitalizedStr =
    setFieldShowInForm.charAt(0).toUpperCase() + setFieldShowInForm.slice(1);
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setValCrtSltNow[setFieldShowInForm](
      not(valCrtSltNow[setFieldShowInForm], rightChecked)
    );
    setChecked(not(checked, rightChecked));
  };
  const getNameHandlerInTransfer = (value: number) => {
    const selectedField: PostCreateFieldData | undefined = formHeadFields.find(
      (field: PostCreateFieldData) => field.id === value
    );
    console.log(formHeadFields);
    console.log("+++value++++++" + value);
    console.log(selectedField);
    return selectedField;
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card variant="outlined">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: "100%",
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const selectedField = getNameHandlerInTransfer(value);
          if (selectedField) {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={selectedField?.fieldName} />
              </ListItem>
            );
          } else {
            return null; // Handle the case when the field with the ID is not found
          }
        })}
      </List>
    </Card>
  );

  const ReworkTextVisibleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setReworkShowInput(e.target.checked);
  };
  const [formData, setformData] = useState<{
    table: string;
    tableCol: number[];
    tableRow: number[];
  }>({ table: "no", tableCol: [], tableRow: [] });
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setvalue(newValue);
  };
  const TableRowsEnterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const conToNumber = Number(e.target.value);
    const newArray = Array.from(
      { length: conToNumber },
      (_, index) => index + 1
    );
    console.log([e.target.name], newArray);
    setformData((prev) => {
      return { ...prev, [e.target.name]: newArray };
    });
    console.log(newArray);
  };
  const contextData = useContext(UseContextHook);
  const { outgoing, incoming } = contextData;
  const menuItemStyle = {
    fontSize: "12px",
    color: "#5E5873",
  };

  const SelectStyle = {
    fontSize: "12px",
    color: "brown",
    height: "2.4rem",
  };
  const commonEdges = incoming.filter((data) => outgoing.includes(data));
  const getForms = async () => {
    try {
      const response = await api.get("/getAllForm");
      const data = await response.data;
      if (response.status === 200) {
        console.log(data);
        setDynamicForms(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const FormSelectionHandler = (e: SelectChangeEvent) => {
    setFormSelectionDropdown(e.target.value);
  };
  const SelectFieldModeHandler = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value as "view" | "modify" | "hide";

    setsetFieldShowInForm(selectedValue);
  };

  useEffect(() => {
    getForms();
    const getFormFields = async () => {
      try {
        const response = await api.get(
          `/getAllFieldsByForm?formName=${FormSelectionDropdown}`
        );
        const data = await response.data;
        if (response.status === 200) {
          setFormHeadFields(data);
          console.log(data);
          const wholeId = data.map((field: PostCreateFieldData) =>
            Number(field?.id)
          );

          setLeft(wholeId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFormFields();
  }, [FormSelectionDropdown]);
  console.log(incoming);
  console.log(outgoing);
  console.log(commonEdges);
  const ReducedOutgoing = outgoing.filter(
    (data) => !commonEdges.includes(data)
  );
  // const allId = formHeadFields.map((field: PostCreateFieldData) => field?.id);
  // console.log(allId);

  return (
    <Dialog
      open={open}
      className="dialog-with-try-to-lg"
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ borderBottom: "1px solid rgba(0, 0, 255, 0.1) " }}
      >
        {content} Configration{" "}
        <Chip
          avatar={
            <Avatar
              sx={{
                width: 14,
                height: 14,
                backgroundColor: "brown",
              }}
            ></Avatar>
          }
          size="small"
          label={
            commonEdges.length > 0 ? "Bi-directional Level" : "Uni-directional"
          }
          style={{ fontWeight: "600", color: "#686868" }}
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          width: "100%",
          height: "25rem",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            marginBottom: "5px",
            borderBottom: ".5px solid #888E94",
          }}
        >
          <Tab
            sx={{ backgroundColor: "transparent" }}
            label="Form setup"
            value="levelConfig"
          />
          <Tab label="Email Config" value="emailConfig" />
        </Tabs>
        {value === "levelConfig" ? (
          <>
            <section className="form-setuo-dialog-tab-onworkflow">
              <div className="input-wrapper-div">
                <label
                  htmlFor="SelectRoleOnConfig"
                  className="input-wrapper-label"
                >
                  Select Role :
                </label>
                <Select
                  id="SelectRoleOnConfig"
                  sx={SelectStyle}
                  fullWidth
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"requester"}>
                    Requester
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"approver"}>
                    Approver
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"cataloguer"}>
                    Cataloguer
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"reviewer"}>
                    Reviewer
                  </MenuItem>
                </Select>
              </div>
              <div className="input-wrapper-div">
                <label
                  htmlFor="SelectFormOnConfig"
                  className="input-wrapper-label"
                >
                  Select Form :
                </label>
                <Select
                  id="SelectFormOnConfig"
                  sx={SelectStyle}
                  fullWidth
                  displayEmpty
                  onChange={FormSelectionHandler}
                  value={FormSelectionDropdown}
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>

                  {DynamicForms.map((data) => (
                    <MenuItem
                      sx={menuItemStyle}
                      value={data.formName}
                      key={data.id}
                    >
                      {data.formName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="input-wrapper-div">
                <label
                  htmlFor="SetRoleOnConfig"
                  className="input-wrapper-label"
                >
                  Set Rule :
                </label>
                <TextField
                  id="SetRoleOnConfig"
                  placeholder="Enter Rule"
                  className="input-wrapper-input"
                  size="small"
                  fullWidth
                />
              </div>
              <div className="input-wrapper-div">
                <label
                  htmlFor="SetLevelOnConfig"
                  className="input-wrapper-label"
                >
                  Select Next Level :
                </label>
                <FormGroup aria-label="position" row>
                  {ReducedOutgoing.map((data: string) => {
                    return (
                      <FormControlLabel
                        value={data}
                        control={<Checkbox size="small" />}
                        key={data}
                        labelPlacement="start"
                        label={
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.875rem",
                              margin: "0 ",
                            }}
                          >
                            {data}
                          </Typography>
                        }
                      />
                    );
                  })}
                </FormGroup>
              </div>

              {commonEdges.length > 0 ? (
                <div className="input-wrapper-div">
                  <label id="SetReworkOnConfig">
                    Select Rework or Reject Level :
                  </label>
                  <FormGroup aria-label="position" row>
                    {commonEdges.map((data: string) => {
                      return (
                        <FormControlLabel
                          value={data}
                          control={
                            <Checkbox
                              size="small"
                              onChange={ReworkTextVisibleHandler}
                            />
                          }
                          key={data}
                          labelPlacement="start"
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.875rem",
                                margin: "0 ",
                              }}
                            >
                              {data}
                            </Typography>
                          }
                        />
                      );
                    })}
                  </FormGroup>
                </div>
              ) : (
                ""
              )}
              {ReworkShowInput ? (
                <div className="input-wrapper-div">
                  <label id="SetReworkOnConfig">
                    Select Rework or Reject inputs :
                  </label>
                  <FormGroup aria-label="position" row>
                    {["Reason Textbox", "Without Reason"].map(
                      (data: string) => {
                        return (
                          <FormControlLabel
                            value={data}
                            control={<Checkbox size="small" />}
                            key={data}
                            labelPlacement="start"
                            label={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: "0.875rem",
                                  margin: "0 ",
                                }}
                              >
                                {data}
                              </Typography>
                            }
                          />
                        );
                      }
                    )}
                  </FormGroup>
                </div>
              ) : (
                ""
              )}
              <div className="input-wrapper-div">
                <label
                  htmlFor="SelectRoleOnConfig"
                  className="input-wrapper-label"
                >
                  Select Field mode :
                </label>
                <Select
                  id="SelectRoleOnConfig"
                  sx={SelectStyle}
                  fullWidth
                  onChange={SelectFieldModeHandler}
                  value={setFieldShowInForm}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value={"view"}>
                    View
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"modify"}>
                    Modify
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"hide"}>
                    Hide
                  </MenuItem>
                </Select>
              </div>
            </section>
            <div></div>
            <Card style={{ marginTop: "20px" }}>
              <Grid
                container
                // spacing={2}
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid sx={{ width: "45%" }} item>
                  {customList("All Fields", left)}
                </Grid>
                <Grid sx={{ width: "10%" }} item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{
                        my: 0.5,
                        borderRadius: "50%",
                        minWidth: "30px",
                        minHeight: "30px",
                      }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      sx={{
                        my: 0.5,
                        borderRadius: "50%",
                        minWidth: "30px",
                        minHeight: "30px",
                      }}
                      variant="outlined"
                      size="small"
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid sx={{ width: "45%" }} item>
                  {customList(capitalizedStr, valCrtSltNow[setFieldShowInForm])}
                </Grid>
              </Grid>
            </Card>
          </>
        ) : (
          <>
            <section
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                margin: "10px 0",
                padding: "0 8px",
              }}
            >
              <label
                htmlFor="SelectEmailTemplateTo"
                className="emailtoccbcccls"
              >
                Select email to :
                <Select
                  id="SelectEmailTemplateTo"
                  name="toText"
                  // sx={{ width: "8rem" }}
                  fullWidth
                  size="small"
                >
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value=""
                  >
                    Select Field
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="approver"
                  >
                    Approver
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="cataloger"
                  >
                    Cataloger
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="requester"
                  >
                    Requester
                  </MenuItem>
                </Select>
              </label>
              <label
                htmlFor="SelectEmailTemplateCC"
                className="emailtoccbcccls"
              >
                Select email cc :
                <Select
                  id="SelectEmailTemplateCC"
                  name="ccText"
                  fullWidth
                  size="small"
                  // sx={{ width: "8rem" }}
                >
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value=""
                  >
                    Select Field
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="approver"
                  >
                    Approver
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="cataloger"
                  >
                    Cataloger
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="requester"
                  >
                    Requester
                  </MenuItem>
                </Select>
              </label>
              <label
                htmlFor="SelectEmailTemplateBCC"
                className="emailtoccbcccls"
              >
                Select email bcc :
                <Select
                  id="SelectEmailTemplateBCC"
                  name="bccText"
                  size="small"
                  // sx={{ width: "8rem" }}
                  fullWidth
                >
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value=""
                  >
                    Select Field
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="approver"
                  >
                    Approver
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="cataloger"
                  >
                    Cataloger
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value="requester"
                  >
                    Requester
                  </MenuItem>
                </Select>
              </label>
            </section>

            <div className="input-wrapper-div">
              <label
                htmlFor="SetEmailSubjectOnConfig"
                className="input-wrapper-label"
              >
                Enter Subject :
              </label>
              <TextField
                id="SetEmailSubjectOnConfig"
                placeholder="Enter Email Subject"
                className="input-wrapper-input"
                size="small"
                fullWidth
              />
            </div>
            <div className="input-wrapper-div">
              <label
                htmlFor="SetEmailBodyOnConfig"
                className="input-wrapper-label"
              >
                Enter Body Content :
              </label>
              <TextField
                id="SetEmailBodyOnConfig"
                placeholder="Enter Email Body Content"
                className="input-wrapper-input"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </div>
            <div className="input-wrapper-div">
              <label
                htmlFor="SetEmailTableBoolOnConfig"
                className="input-wrapper-label"
              >
                Add Table :
              </label>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                id="SetEmailTableBoolOnConfig"
                sx={{ width: "100%" }}
                value={formData.table}
                onChange={(e) => {
                  setformData((prev) => {
                    return { ...prev, table: e.target.value };
                  });
                }}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        margin: "0 ",
                      }}
                    >
                      Yes
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.9rem",
                        margin: "0 ",
                      }}
                    >
                      No
                    </Typography>
                  }
                />
              </RadioGroup>
            </div>
            {formData.table === "yes" ? (
              <>
                <section
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    margin: "10px 0",
                    padding: "0 8px",
                  }}
                >
                  <div className="input-wrapper-div">
                    <label
                      htmlFor="SetEmailTableColumnsOnConfig"
                      className="input-wrapper-label"
                    >
                      Enter Columns :
                    </label>
                    <TextField
                      id="SetEmailTableColumnsOnConfig"
                      placeholder="Enter Columns"
                      className="input-wrapper-input"
                      size="small"
                      onChange={TableRowsEnterHandler}
                      name="tableCol"
                      fullWidth
                    />
                  </div>
                  <div className="input-wrapper-div">
                    <label
                      htmlFor="SetEmailTableRowsOnConfig"
                      className="input-wrapper-label"
                    >
                      Enter Rows :
                    </label>
                    <TextField
                      id="SetEmailTableRowsOnConfig"
                      placeholder="Enter Rows"
                      className="input-wrapper-input"
                      size="small"
                      fullWidth
                      onChange={TableRowsEnterHandler}
                      name="tableRow"
                    />
                  </div>
                </section>
                {formData.tableCol.length > 0 ? (
                  <div className="input-wrapper-div-table-setup">
                    <label
                      htmlFor="SetEmailTableColumnsHeaderOnConfig"
                      className="input-wrapper-label"
                    >
                      Enter Header :
                    </label>
                    <div className="input-wrapper-div-table-setup-view">
                      {formData.tableCol.map((_colData, colIndex) => (
                        <div className="tbl-inpt-wrp-grd" key={colIndex}>
                          <TextField
                            id="SetEmailTableColumnsHeaderOnConfig"
                            placeholder="Enter Header"
                            className="input-wrapper-input"
                            size="small"
                          />
                          <div className="show-tbl-dta">
                            {formData.tableRow.length > 0 ? (
                              <div>
                                {formData.tableRow.map((_rowData, rowIndex) => (
                                  <div key={rowIndex}>
                                    <Select
                                      size="small"
                                      fullWidth
                                      sx={{ fontSize: "12px", margin: "3px 0" }}
                                    >
                                      <MenuItem
                                        sx={{
                                          fontSize: "12px",
                                          color: "#5E5873",
                                        }}
                                        value=""
                                      >
                                        Select Field
                                      </MenuItem>
                                      <MenuItem
                                        sx={{
                                          fontSize: "12px",
                                          color: "#5E5873",
                                        }}
                                        value="approver"
                                      >
                                        Material Code
                                      </MenuItem>
                                      <MenuItem
                                        sx={{
                                          fontSize: "12px",
                                          color: "#5E5873",
                                        }}
                                        value="cataloger"
                                      >
                                        Plant
                                      </MenuItem>
                                      <MenuItem
                                        sx={{
                                          fontSize: "12px",
                                          color: "#5E5873",
                                        }}
                                        value="requester"
                                      >
                                        Department
                                      </MenuItem>
                                    </Select>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              ""
            )}

            <div className="input-wrapper-div">
              <label
                htmlFor="SetEmailSignatureOnConfig"
                className="input-wrapper-label"
              >
                Enter Signature :
              </label>
              <TextField
                id="SetEmailSignatureOnConfig"
                placeholder="Enter Email Signature"
                className="input-wrapper-input"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 255, 0.1) " }}>
        <Button onClick={handleClose}>CANCEL</Button>
        <Button onClick={handleOk} variant="contained" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
