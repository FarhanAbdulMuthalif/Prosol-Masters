import {
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
  return (
    <div className="material-master-description-fields-content-characteristic">
      <div className="material-master-description-fields-content-characteristic-table">
        <TableContainer>
          <Table sx={{ width: "50%" }} size="small" aria-label="a dense table">
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
                        {row.value}
                      </TableCell>
                      <TableCell sx={tableStyle} align="left">
                        {row.abbreviate}
                      </TableCell>
                      <TableCell sx={tableStyle} align="left">
                        {row.unit}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="material-master-description-fields-content-characteristic-lng-shrt-desc"></div>
    </div>
  );
}
