import TextComp from "@/components/TextComp/TextComp";
import NoBorderTextfield from "@/components/Textfield/NoBorderTextfield";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { textCompStyle } from "@/utils/UserDataExport";
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
  const tableStyle = {
    fontSize: "10px",
    fontWeight: "600",
    border: ".5px solid #e3e3e3",
  };
  const data = [
    {
      characteristic: "Material",
      value: "20",
      abbreviate: "UOM",
      unit: "",
    },
  ];
  const ValueOptions = ["19", "78", "234"];
  return (
    <div className="material-master-description-fields-content-characteristic">
      <div className="material-master-description-fields-content-characteristic-table">
        <TableContainer sx={{ width: "100%" }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={tableStyle} align="left">
                  Characteristic
                </TableCell>
                <TableCell sx={tableStyle} align="left">
                  Value
                </TableCell>
                <TableCell sx={tableStyle} align="left">
                  Abbreviate
                </TableCell>
                <TableCell sx={tableStyle} align="left">
                  Unit
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((row: MMCharacteristic) => {
                  return (
                    <TableRow key={row.characteristic}>
                      <TableCell sx={tableStyle} align="left">
                        {row.characteristic}
                      </TableCell>
                      <TableCell sx={tableStyle} align="left">
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
                      <TableCell sx={tableStyle} align="left">
                        <NoBorderTextfield />
                      </TableCell>
                      <TableCell sx={tableStyle} align="left">
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
      <div className="material-master-description-fields-content-characteristic-lng-shrt-desc">
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Short Desc
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Short Desc`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Long Desc
            <span>:</span>
          </TextComp>
          <TextareaOutline rows={2} placeholder={`Enter Long Desc`} fullWidth />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
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
          <TextComp variant="subTitle" style={textCompStyle}>
            Missing Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Missing Value`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Enriched Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Enriched Value`} />
        </div>
        <div className="create-mm-description-wrapper-single-input">
          <TextComp variant="subTitle" style={textCompStyle}>
            Repeated Value
            <span>:</span>
          </TextComp>
          <OutlineTextField fullWidth placeholder={`Enter Repeated Value`} />
        </div>
      </div>
    </div>
  );
}
