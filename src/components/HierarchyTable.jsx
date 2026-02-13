import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";

import RowItem from "./RowItem";
import { useHierarchy } from "../hooks/useHierarchy"; 
import { rowsData } from "../data/dummyData";
import { calculateGrandTotal } from "../utils/hierarchyUtils";

export default function HierarchyTable() {
  const {
    rows,
    allocatePercent,
    allocateValue,
    originalMap
  } = useHierarchy(rowsData);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f4f6f8"
            }}
          >
            <TableCell sx={{ fontWeight: 600 }}>Label</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Input</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Allocation %</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Allocation Val</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Variance %</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <RowItem
              key={row.id}
              node={row}
              level={0}
              allocatePercent={allocatePercent}
              allocateValue={allocateValue}
              originalMap={originalMap}
              isEven={index % 2 === 0}
            />
          ))}

          <TableRow
            sx={{
              backgroundColor: "#e3f2fd",
              "& td": { fontWeight: 700 }
            }}
          >
            <TableCell>Grand Total</TableCell>
            <TableCell>
              {calculateGrandTotal(rows)}
            </TableCell>
            <TableCell colSpan={4} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
