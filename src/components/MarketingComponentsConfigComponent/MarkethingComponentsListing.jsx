import { Close, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";

export default function MarkethingComponentsListing({
  marketingComponentData,
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleView = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid.in/marketingComponents/${row.componentId}`
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

  const columns = [
    { field: "componentId", headerName: "Component ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "varient", headerName: "Varient", flex: 1 },
  ];

  const actionColumns = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <Button onClick={() => handleView(params.row)}>View</Button>
          <Button onClick={() => handleDelete(params.row)}>Delete</Button>
        </div>
      );
    },
  };

  const updatedColumns = [...columns, actionColumns];

  const rows = marketingComponentData
    ? marketingComponentData.map((data, index) => {
        return {
          id: index,
          ...data,
        };
      })
    : [];

  const paginationModel = {
    page: 1,
    pageSize: 10,
  };

  return (
    <div>
      <DataGrid
        className="w-[45vw] mt-10 mx-auto"
        id="marketing-component-lisitng"
        rows={rows}
        columns={updatedColumns}
        pageSizeOptions={[5, 10, 20]}
        pagination
        page={paginationModel.page}
        rowCount={marketingComponentData?.length}
        onCellClick={() => {}}
      />
      <Dialog open={open} onClose={handleClose}>
        <div className="flex flex-row justify-between">
          <DialogTitle>{selectedRow?.title}</DialogTitle>
          <DialogActions>
            <IconButton className="flex mx-4 px-2">
              <Delete />
              <Typography>Delete</Typography>
            </IconButton>
            <IconButton onClick={handleClose} className="flex mx-2 px-2">
              <Close />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <TextField label="Varient" value={selectedRow?.varient} disabled />
          <TextField
            label="Component ID"
            value={selectedRow?.componentId}
            disabled
          />
          <TextField
            label="Image URL"
            value={selectedRow?.imageSrcLink}
            disabled
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
