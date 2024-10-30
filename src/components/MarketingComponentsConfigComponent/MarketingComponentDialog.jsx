import {
  ArrowOutward,
  Close,
  CloudUpload,
  Delete,
  InsertLink,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { MoonLoader } from "react-spinners";

export default function MarketingComponentDialog({
  open,
  handleClose,
  selectedRow,
}) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [newComponentData, setNewComponentData] = useState(null);
  const [formDisabled, setFormDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.sinusoid.in/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNewComponentData((prev) => ({
        ...prev,
        imgSrcLink: response?.data?.fileName,
      }));
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.sinusoid.in/marketingComponents",
        newComponentData
      );
      console.log("Save successful:", response.data);
      setFormDisabled(true);
      setLoading(false);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving component:", error);
    }
  };

  useEffect(() => {
    console.log({ newComponentData });
  }, [newComponentData]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "100%", maxWidth: "900px !important" } }}
      fullWidth="lg"
    >
      <div className="flex flex-row justify-between">
        <DialogTitle>Create a New Component</DialogTitle>
        <DialogActions className="mx-2">
          {/* <IconButton className="flex mx-4 px-2">
            <Delete />
            <Typography>Delete</Typography>
          </IconButton> */}
          <IconButton color="error" onClick={handleClose} className="flex">
            <Close />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Title"
                value={newComponentData?.title}
                disabled={formDisabled}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    title: newValue,
                  }));
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Varient"
                value={newComponentData?.varient}
                disabled={formDisabled}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    varient: newValue,
                  }));
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Redirect URL"
                value={newComponentData?.redirectLink}
                disabled={formDisabled}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    redirectLink: newValue,
                  }));
                }}
              />
            </Grid2>
            <Grid2 className="flex gap-2 flex-row" size={6}>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<ArrowOutward />}
                onClick={() => {
                  window.open(newComponentData?.redirectLink, "_blank");
                }}
                disabled={!newComponentData?.redirectLink}
              >
                Check Redirect URL
              </Button>
            </Grid2>
          </Grid2>
          <Divider />
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={12}>
              <Typography
                sx={{ fontSize: "1.25rem" }}
                className="text-md font-medium text-gray-800"
              >
                Image Upload
              </Typography>
            </Grid2>

            <Grid2 size={6}>
              <TextField
                fullWidth
                label={newComponentData?.imgSrcLink ? "" : "Upload Image -->"}
                value={newComponentData?.imgSrcLink}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    imgSrcLink: newValue,
                  }));
                }}
                disabled
              />
            </Grid2>
            <Grid2 className="flex gap-2 flex-row " size={6}>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => handleFileUpload(event)}
                  multiple
                />
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Image Alt"
                value={newComponentData?.imgAlt}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    imgAlt: newValue,
                  }));
                }}
                disabled={formDisabled}
              />
            </Grid2>
            <Grid2 className="flex gap-2 flex-row " size={6}>
              <Button
                fullWidth
                component="label"
                variant="contained"
                startIcon={<InsertLink />}
                onClick={() => {
                  window.open(`https://api.sinusoid.in/images/{newComponentData?.imgSrcLink}`, "_blank");
                }}
                disabled={!newComponentData?.imgSrcLink}
              >
                Check Uploaded Image
              </Button>
            </Grid2>
          </Grid2>
          <Divider />
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={12}>
              <Typography
                sx={{ fontSize: "1.25rem" }}
                className="text-md font-medium text-gray-800"
              >
                Component Settings
              </Typography>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Note"
                value={newComponentData?.note}
                disabled={formDisabled}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    note: newValue,
                  }));
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Time to Live (TTL)"
                value={newComponentData?.ttl}
                disabled={formDisabled}
                onChange={(e) => {
                  const newValue = e?.target?.value;
                  setNewComponentData((prev) => ({
                    ...prev,
                    componentType: newValue,
                  }));
                }}
              />
            </Grid2>
          </Grid2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={() => onSave()} disabled={loading}>
          {loading ? <MoonLoader size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
