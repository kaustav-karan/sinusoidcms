import { TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import WorkshopDialog from "./WorkshopDialog";

export default function WorkshopRowCompoents({ idx, workshop }) {
  const [workshopDialogState, setWorkshopDialogState] = useState(false);

  const handleClickOpen = () => {
    setWorkshopDialogState(true);
  };

  const handleClose = () => {
    setWorkshopDialogState(false);
  };

  useEffect(() => {
    console.log({ workshop });
  }, [workshop]);

  return (
    <>
      <TableRow
        key={idx}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={handleClickOpen}
      >
        <TableCell component="th" scope="row">
          {idx + 1}
        </TableCell>
        <TableCell>{workshop?.workshopId}</TableCell>
        <TableCell>{workshop?.workshopName}</TableCell>
        <TableCell>{workshop?.published ? "Yes" : "No"}</TableCell>
        <TableCell>{workshop?.status}</TableCell>
        <TableCell>
          {dayjs(workshop?.schedule?.workshopStart).format(
            "MMMM D, YYYY h:mm A"
          )}
        </TableCell>
      </TableRow>
      <WorkshopDialog
        workshop={workshop}
        onClose={handleClose}
        open={workshopDialogState}
      />
    </>
  );
}
