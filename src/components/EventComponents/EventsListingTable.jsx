import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EventRowComponent from "./EventRowComponent";

export default function EventsListingTable({ eventsData }) {
  const headerColumns = [
    { id: "srno", label: "Sr. No." },
    { id: "eventId", label: "Event ID" },
    { id: "eventName", label: "Event Name" },
    { id: "eventType", label: "Event Type" },
    { id: "published", label: "Published" },
    { id: "status", label: "Status" },
    { id: "registrationStart", label: "Registration Start" },
    { id: "registrationEnd", label: "Registration End" },
    { id: "eventStart", label: "Event Start" },
    { id: "eventEnd", label: "Event End" },
    { id: "submissionStart", label: "Submission Start" },
    { id: "submissionEnd", label: "Submission End" },
  ];

  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow >
          {headerColumns.map((column,idx) => (
            <TableCell key={idx}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {eventsData?.map((event, index) => (
          <EventRowComponent key={index} idx={index} event={event} />
        ))}
      </TableBody>
    </TableContainer>
  );
}
