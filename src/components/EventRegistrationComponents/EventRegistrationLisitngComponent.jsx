import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function EventRegistrationLisitngComponent({
  eventRegistrationData,
}) {
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
          columns={columns}
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
