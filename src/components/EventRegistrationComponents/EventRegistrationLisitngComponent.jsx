import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";

export default function EventRegistrationLisitngComponent({
  eventRegistrationData,
}) {

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid.in/eventRegistrations/${row.registrationId}`
      );
      console.log("Delete Plan", response);
      window.location.reload();
    } catch (error) {
      console.log("Error Deleting Plan", error);
    }
  };
    const columns = [
    { field: "registrationId", headerName: "Registration ID", width: 200 },
    { field: "eventId", headerName: "Event ID", width: 200 },
    { field: "eventParticipants", headerName: "Participants", width: 200 },
    {
      field: "fullName",
      headerName: "Name",
      width: 200,
      sortable: false,
      valueGetter: (value,row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "isNiitStudent", headerName: "NIIT Student", width: 200 },
  ];

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <Button onClick={() => handleDelete(params.row)}>Delete</Button>
        </div>
      );
    },
  };

    const updatedColumns = [...columns, actionColumn];

  const rows = eventRegistrationData
      ? eventRegistrationData.map((registration, index) => ({
        id: index + 1,
        registrationId: registration.registrationId,
        eventId: registration.eventId,
        eventParticipants: registration.eventParticipants,
        firstName: registration.firstName,
        lastName: registration.lastName,
        phone: registration.phone,
        isNiitStudent: registration.isNiitStudent ? "Yes" : "No",
      }))
    : [];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper sx={{ height: 900, width: "100%" }}>
        <DataGrid
          id="event-registration-listing"
          rows={rows}
          columns={updatedColumns}
          pageSize={paginationModel.pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          page={paginationModel.page}
          rowCount={rows?.length}
        />
      </Paper>
      
    </>
  );
}
