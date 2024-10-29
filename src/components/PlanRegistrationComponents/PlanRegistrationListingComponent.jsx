import {
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import axios from "axios";
import React, { useState } from "react";

export default function PlanRegistrationListingComponent({
  planRegistrationData,
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
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

  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid.in/plan/${row.registrationId}`
      );
      console.log("Delete Plan", response);
      window.location.reload();
    } catch (error) {
      console.log("Error Deleting Plan", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={() => handleView(params.row)}
            // style={{ marginRight: "5px" }}
          >
            View
          </Button>
          <Button onClick={() => handleDelete(params.row)}>Delete</Button>
        </div>
      );
    },
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

  const updatedColumns = [...columns, actionColumn];

  return (
    <>
      <div>
        <Paper sx={{ height: 900, width: "100%" }}>
          <DataGrid
            id="plan-registration-listing"
            rows={rows}
            columns={updatedColumns}
            pageSize={paginationModel.pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            page={paginationModel.page}
            rowCount={planRegistrationData?.length}
            onCellClick={() => {}}
          />
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>View Data</DialogTitle>
          <DialogContent>
            <DialogContent>
              {selectedRow && (
                <Grid2
                  container
                  spacing={2}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  {/* <Grid2 item xs={12} className="mb-4">
                    <Typography
                      variant="h6"
                      className="text-xl font-bold text-gray-800"
                    >
                      Plan Details
                    </Typography>
                  </Grid2> */}
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Registration ID:
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="body1"
                      className="text-sm text-gray-800"
                    >
                      {selectedRow.registrationId}
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Plan Name:
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="body1"
                      className="text-sm text-gray-800"
                    >
                      {selectedRow.planName}
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Name: {selectedRow.firstName} {selectedRow.lastName}
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={12} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Phone:
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="body1"
                      className="text-sm text-gray-800"
                    >
                      {selectedRow.phone}
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Photo ID:
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <img
                      src={`https://api.sinusoid.in/images/${selectedRow.photoIdUrl}`}
                      alt="ID Proof"
                      className="w-full rounded-lg shadow-md"
                    />
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <Typography
                      variant="subtitle1"
                      className="text-sm font-medium text-gray-600"
                    >
                      Payment Proof:
                    </Typography>
                  </Grid2>
                  <Grid2 item xs={6} className="mb-2">
                    <img
                      src={`https://api.sinusoid.in/images/${selectedRow.paymentProofUrl}`}
                      alt="Payment Proof"
                      className="w-full rounded-lg shadow-md"
                    />
                  </Grid2>
                </Grid2>
              )}
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
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
