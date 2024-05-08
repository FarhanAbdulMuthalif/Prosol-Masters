import BasicCheckbox from "@/components/Checkbox/Checkbox";
import NoBorderTextfield from "@/components/Textfield/NoBorderTextfield";
import { PrimaryTextColor } from "@/styles/colorsCode";
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

export default function MMDescriptionVendor() {
  const tableStyle = {
    fontSize: "10px",
    fontWeight: "600",
    border: ".5px solid #e3e3e3",
  };
  const data = [
    {
      vendorType: "Material",
      name: "20",
      refFlag: "UOM",
      RefNo: "",
      s: false,
      l: false,
    },
  ];
  const ValueOptions = ["19", "78", "234"];
  return (
    <div className="material-master-description-fields-content-vendor">
      <TableContainer sx={{ width: "100%" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableStyle} align="left">
                Vendor Type
              </TableCell>
              <TableCell sx={tableStyle} align="left">
                Name
              </TableCell>
              <TableCell sx={tableStyle} align="left">
                Ref Flag
              </TableCell>
              <TableCell sx={tableStyle} align="left">
                Ref No
              </TableCell>
              <TableCell style={{ width: 60 }} sx={tableStyle} align="left">
                Short
              </TableCell>
              <TableCell style={{ width: 60 }} sx={tableStyle} align="left">
                Long
              </TableCell>
              <TableCell style={{ width: 100 }} sx={tableStyle} align="left">
                Add / Remove
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((row) => {
                return (
                  <TableRow key={row.vendorType}>
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
                    <TableCell sx={tableStyle} align="left">
                      <NoBorderTextfield />
                    </TableCell>
                    <TableCell sx={tableStyle} align="left">
                      <BasicCheckbox />
                    </TableCell>
                    <TableCell sx={tableStyle} align="left">
                      <BasicCheckbox />
                    </TableCell>
                    <TableCell sx={tableStyle} align="left">
                      <NoBorderTextfield />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
