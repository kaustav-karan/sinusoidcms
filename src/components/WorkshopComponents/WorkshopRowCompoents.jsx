import { Delete } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import WorkshopDialog from "./WorkshopDialog";
import axios from "axios";

export default function WorkshopRowCompoents({ idx, workshop }) {
  const [workshopDialogState, setWorkshopDialogState] = useState(false);

  const handleClickOpen = () => {
    setWorkshopDialogState(true);
  };

  const handleClose = () => {
    setWorkshopDialogState(false);
  };

  const handleDelete = async (workshopId) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid/workshop/${workshopId}`
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to delete the workshop");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <TableCell>
          <Button
            className="flex justify-center items-center w-[50px] h-[50px] aspect-square m-auto"
            onCliok={() => handleDelete(workshop?.workshopId)}
            startIcon={
              <Delete className="flex justify-center items-center m-auto" />
            }
          />
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
