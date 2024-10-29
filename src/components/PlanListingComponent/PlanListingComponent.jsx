import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import PlanDialog from "./PlanDialog";
import axios from "axios";

export default function PlanListingComponent({ planRegistrationData }) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const columns = [
    { field: "referralCode", headerName: "Referral Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "varient", headerName: "Varient", flex: 1 },
    { field: "planType", headerName: "Plan Type", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "ttl", headerName: "TTL", flex: 1 },
  ];

  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid.in/prplans/${row.referralCode}`
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

  const updatedColumns = [...columns, actionColumn];

  const rows = planRegistrationData
    ? planRegistrationData.map((plan, index) => {
        return {
          id: index + 1,
          referralCode: plan.referralCode,
          name: plan.name,
          varient: plan.varient,
          planType: plan.planType,
          price: plan.price,
          ttl: plan.ttl,
        };
      })
    : [];

  const paginationModel = {
    page: 0,
    pageSize: 5,
  };
  return (
    <>
      <div>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>View Data</DialogTitle>
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
                    ID:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.id}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    Referral Code:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.referralCode}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    Name:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.name}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    Varient:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.varient}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    Plan Type:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.planType}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    Price:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.price}
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography
                    variant="subtitle1"
                    className="text-sm font-medium text-gray-600"
                  >
                    TTL:
                  </Typography>
                </Grid2>
                <Grid2 item xs={6} className="mb-2">
                  <Typography variant="body1" className="text-sm text-gray-800">
                    {selectedRow.ttl}
                  </Typography>
                </Grid2>
              </Grid2>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <PlanDialog loadPlanData={} onClose={} open={} /> */}
    </>
  );
}
