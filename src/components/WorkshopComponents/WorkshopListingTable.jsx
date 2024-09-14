import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import WorkshopRowCompoents from "./WorkshopRowCompoents";

export default function WorkshopListingTable({ workshopsData }) {
  const headerColumns = [
    { id: "srno", label: "Sr. No." },
    { id: "workshopId", label: "Workshop ID" },
    { id: "workshopName", label: "Workshop Name" },
    { id: "published", label: "Published" },
    { id: "status", label: "Status" },
    { id: "workshopStart", label: "Workshop Start" },
  ];
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          {headerColumns.map((column, idx) => (
            <TableCell key={idx}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {workshopsData?.map((workshop, index) => (
          <WorkshopRowCompoents key={index} idx={index} workshop={workshop} />
        ))}
      </TableBody>
    </TableContainer>
  );
}
