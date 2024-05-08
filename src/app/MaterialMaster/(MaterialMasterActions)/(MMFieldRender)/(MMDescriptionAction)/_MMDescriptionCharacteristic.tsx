import BasicCheckbox from "@/components/Checkbox/Checkbox";
import TextComp from "@/components/TextComp/TextComp";
import NoBorderTextfield from "@/components/Textfield/NoBorderTextfield";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { MMDescriptionFields } from "@/utils/MaterialMasters/MMfunctions";
import { textCompStyleMM } from "@/utils/UserDataExport";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MMCharacteristic } from "../../../../../../TypesStore";

export default function MMDescriptionCharacteristic() {
  const tableRowStyle = {
    fontSize: "10px",
    fontWeight: "600",
    border: ".5px solid #e3e3e3",
    padding: "3px",
    color: PrimaryTextColor,
  };
  const tableHeadStyle = {
    fontSize: "10px",
    fontWeight: "600",
    border: ".5px solid #e3e3e3",
    padding: "3px 15px",
    color: PrimaryTextColor,
  };
  const tableStyleWithCheckbox = {
    fontSize: "10px",
    fontWeight: "600",
    padding: "3px 15px",
    color: PrimaryTextColor,
    border: ".5px solid #e3e3e3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const data = [
    {
      characteristic: "Type",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
    {
      characteristic: "Material",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
    {
      characteristic: "Display",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
    {
      characteristic: "Accuracy",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
    {
      characteristic: "Voltage",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
  ];
  const ValueOptions = ["19", "78", "234"];

  const MMDescCharacteristics = MMDescriptionFields.formFields
    .find((data) => data.name === "characteristics")
    ?.formFields?.find((data) => data.name === "characteristics");

  return (
    <div className="material-master-description-fields-content-characteristic">
      {MMDescCharacteristics?.view ? (
        <div className="material-master-description-fields-content-characteristic-table">
          <TableContainer sx={{ width: "100%" }}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableStyleWithCheckbox} align="left">
                    Characteristic
                    <BasicCheckbox title="EXCEPTIONAL : Enable this for remove required fields to optional" />
                  </TableCell>
                  <TableCell sx={tableHeadStyle} align="left">
                    Value
                  </TableCell>
                  <TableCell sx={tableHeadStyle} align="left">
                    Abbreviate
                  </TableCell>
                  <TableCell sx={tableHeadStyle} align="left">
                    Unit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.map((row: MMCharacteristic) => {
                    return (
                      <TableRow key={row.characteristic}>
                        <TableCell sx={tableHeadStyle} align="left">
                          {row.characteristic}
                        </TableCell>
                        <TableCell sx={tableRowStyle} align="left">
                          <Autocomplete
                            options={ValueOptions}
                            forcePopupIcon={false}
                            autoHighlight
                            freeSolo
                            getOptionLabel={(option) => option} // Specify how the value should be displayed
                            fullWidth
                            sx={{
                              fontSize: "10px",
                              color: PrimaryTextColor,
                              "& .MuiInputBase-input": {
                                fontSize: "10px",
                                color: PrimaryTextColor,
                              },
                            }}
                            renderOption={(props, option: string) => (
                              <li
                                style={{
                                  fontSize: "10px",
                                  color: PrimaryTextColor,
                                }}
                                {...props}
                              >
                                {capitalizeFunc(option)}
                              </li>
                            )}
                            renderInput={(params) => (
                              <NoBorderTextfield
                                {...params}
                                fullWidth
                                type="text"
                                // value={formData ? formData["modifier"] : ""}
                                // onChange={handleInputChange}
                                // name={`modifier`}

                                size="small"
                              />
                            )}
                            clearIcon={null} // Set clearIcon to null to remove the "x" icon
                          />
                        </TableCell>
                        <TableCell sx={tableRowStyle} align="left">
                          <NoBorderTextfield fullWidth />
                        </TableCell>
                        <TableCell sx={tableRowStyle} align="left">
                          <Autocomplete
                            options={ValueOptions}
                            forcePopupIcon={false}
                            autoHighlight
                            freeSolo
                            getOptionLabel={(option) => option} // Specify how the value should be displayed
                            fullWidth
                            sx={{
                              fontSize: "10px",
                              color: PrimaryTextColor,
                              "& .MuiInputBase-input": {
                                fontSize: "10px",
                                color: PrimaryTextColor,
                              },
                            }}
                            renderOption={(props, option: string) => (
                              <li
                                style={{
                                  fontSize: "10px",
                                  color: PrimaryTextColor,
                                }}
                                {...props}
                              >
                                {capitalizeFunc(option)}
                              </li>
                            )}
                            renderInput={(params) => (
                              <NoBorderTextfield
                                {...params}
                                type="text"
                                // value={formData ? formData["modifier"] : ""}
                                // onChange={handleInputChange}
                                // name={`modifier`}

                                size="small"
                              />
                            )}
                            clearIcon={null} // Set clearIcon to null to remove the "x" icon
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
      <div className="material-master-description-fields-content-characteristic-lng-shrt-desc">
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Short Desc
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Short Desc`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Long Desc
            <span>:</span>
          </TextComp>
          <TextareaOutline rows={2} placeholder={`Enter Long Desc`} fullWidth />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Additional Data For Description
            <span>:</span>
          </TextComp>
          <TextareaOutline
            rows={2}
            placeholder={`Enter Additional Data For Description`}
            fullWidth
          />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Missing Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Missing Value`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Enriched Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Enriched Value`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="bodySmall" style={textCompStyleMM}>
            Repeated Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Repeated Value`} />
        </div>
      </div>
    </div>
  );
}
