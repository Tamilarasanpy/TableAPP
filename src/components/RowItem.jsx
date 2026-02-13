import { TableRow, TableCell, TextField, Button } from "@mui/material";
import { useState } from "react";
import { calculateVariance } from "../utils/hierarchyUtils";


export default function RowItem({
  node,
  level,
  allocatePercent,
  allocateValue,
  originalMap
}) {
  const [input, setInput] = useState("");

  const variance = calculateVariance(
    node.value,
    originalMap[node.id]
  );

  const isParent = !!node.children;

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: isParent ? "#fafafa" : "white",
          "&:hover": {
            backgroundColor: "#f0f7ff"
          }
        }}
      >
        <TableCell
          sx={{
            pl: level * 4,
            fontWeight: isParent ? 600 : 400
          }}
        >
          {level > 0 ? "— " : ""}
          {node.label}
        </TableCell>

        <TableCell>
          ₹ {node.value.toLocaleString()}
        </TableCell>

        <TableCell>
          <TextField
            size="small"
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ width: 90 }}
          />
        </TableCell>

        <TableCell>
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              allocatePercent(node.id, Number(input))
            }
          >
            %
          </Button>
        </TableCell>

        <TableCell>
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              allocateValue(node.id, Number(input))
            }
          >
            Set
          </Button>
        </TableCell>

        <TableCell
          sx={{
            color:
              variance > 0
                ? "green"
                : variance < 0
                ? "red"
                : "inherit",
            fontWeight: 500
          }}
        >
          {variance.toFixed(2)}%
        </TableCell>
      </TableRow>

      {node.children &&
        node.children.map((child) => (
          <RowItem
            key={child.id}
            node={child}
            level={level + 1}
            allocatePercent={allocatePercent}
            allocateValue={allocateValue}
            originalMap={originalMap}
          />
        ))}
    </>
  );
}
