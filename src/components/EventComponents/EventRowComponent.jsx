import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import EventDialog from "./EventDialog";
import dayjs from "dayjs";
import { Delete } from "@mui/icons-material";
import axios from "axios";

export default function EventRowComponent({ event, idx }) {
  const [eventDialogState, setEventDialogState] = useState(false);

  const handleClickOpen = () => {
    setEventDialogState(true);
  };

  const handleClose = () => {
    setEventDialogState(false);
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid/event/${eventId}`
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to delete the event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


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
        <TableCell>{event?.eventId}</TableCell>
        <TableCell>{event?.eventName}</TableCell>
        <TableCell>{event?.published ? "Yes" : "No"}</TableCell>
        <TableCell>{event?.status}</TableCell>
        <TableCell>
          {dayjs(event?.schedule?.registrationStart).format(
            "MMMM D, YYYY h:mm A"
          )}
        </TableCell>
        <TableCell>
          {dayjs(event?.schedule?.registrationEnd).format(
            "MMMM D, YYYY h:mm A"
          )}
        </TableCell>
        <TableCell>
          {dayjs(event?.schedule?.eventStart).format("MMMM D, YYYY h:mm A")}
        </TableCell>
        <TableCell>
          {dayjs(event?.schedule?.eventEnd).format("MMMM D, YYYY h:mm A")}
        </TableCell>
        <TableCell>
          {dayjs(event?.schedule?.submissionStart).format(
            "MMMM D, YYYY h:mm A"
          )}
        </TableCell>
        <TableCell>
          {dayjs(event?.schedule?.submissionEnd).format("MMMM D, YYYY h:mm A")}
        </TableCell>
        <TableCell>
          <Button
            className="flex justify-center items-center w-[50px] h-[50px] aspect-square m-auto"
            onClick={() => handleDelete(event?.eventId)}
            startIcon={<Delete className="flex justify-center items-center m-auto" />}
          />
        </TableCell>
      </TableRow>
      <EventDialog
        open={eventDialogState}
        onClose={handleClose}
        event={event}
      />
    </>
  );
}
