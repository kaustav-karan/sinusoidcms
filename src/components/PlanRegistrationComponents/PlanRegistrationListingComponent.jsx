import { Paper, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import React, { useState } from "react";

export default function PlanRegistrationListingComponent({
  planRegistrationData,
}) {
  const [openPhotoId, setOpenPhotoId] = useState(false);
  const [openPaymentProof, setOpenPaymentProof] = useState(false);
  const [selectedPhotoIdUrl, setSelectedPhotoIdUrl] = useState("");
  const [selectedPaymentProofUrl, setSelectedPaymentProofUrl] = useState("");

  const handleCellClick = (params) => {
    switch (params.field) {
      case "photoIdUrl":
        setSelectedPhotoIdUrl(params.value);
        setOpenPhotoId(true);
        break;
      case "paymentProofUrl":
        setSelectedPhotoIdUrl(params.value);
        setOpenPhotoId(true);
        break;
      default:
        break;
    }
  };

  const handleClosePhotoIdUrl = ({ par }) => {
    setOpenPhotoId(false);
    setSelectedPhotoIdUrl("");
  };

  const handleClosePaymentProofUrl = ({ par }) => {
    setOpenPhotoId(false);
    setSelectedPaymentProofUrl("");
  };

  const columns = [
    { field: "registrationId", headerName: "Registration ID", width: 200 },
    { field: "planName", headerName: "Plan Name", width: 200 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (values, row) => `${row?.firstName} ${row?.lastName}`,
    },
    { field: "phone", headerName: "Phone", width: 200 },
    {
      field: "photoIdUrl",
      headerName: "Photo ID",
      width: 400,
      renderCell: (params) => (
        <a href="#" onClick={() => handleCellClick(params)}>
          Click here to view
        </a>
      ),
    },
    {
      field: "paymentProofUrl",
      headerName: "Payment Proof",
      width: 400,
      renderCell: (params) => (
        <a href="#" onClick={() => handleCellClick(params)}>
          Click here to view
        </a>
      ),
    },
  ];

  const rows = planRegistrationData
    ? planRegistrationData.map((registration, index) => ({
        id: index + 1,
        registrationId: registration.registrationId,
        planName: registration.planName,
        firstName: registration.firstName,
        lastName: registration.lastName,
        phone: registration.phone,
        photoIdUrl: registration.photoIdUrl,
        paymentProofUrl: registration.paymentProofUrl,
      }))
    : [];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Paper sx={{ height: 900, width: "100%" }}>
        <DataGrid
          id="plan-registration-listing"
          rows={rows}
          columns={columns}
          pageSize={paginationModel.pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          page={paginationModel.page}
          rowCount={planRegistrationData?.length}
          onCellClick={handleCellClick}
        />
      </Paper>
      <Dialog open={openPhotoId} onClose={handleClosePhotoIdUrl}>
        <DialogTitle>Photo ID</DialogTitle>
        <DialogContent>
          <img
            src={`https://api.sinusoid.in/images/${selectedPhotoIdUrl}`}
            alt="ID Proof"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openPaymentProof} onClose={handleClosePaymentProofUrl}>
        <DialogTitle>Payment Proof</DialogTitle>
        <DialogContent>
          <img
            src={`https://api.sinusoid.in/images/${selectedPaymentProofUrl}`}
            alt="Payment Proof"
            style={{ width: "100%" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
