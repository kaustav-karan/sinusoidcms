import { Close, Delete, Link, Upload } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import {
  planRegistrationModal,
  plans,
} from "../../constants/planRegistrationModal";

export default function PlanRegistrationDialog({
  open,
  onClose,
  planData = planRegistrationModal,
  newRegistration,
}) {
  const [registrationData, setRegistrationData] = useState(planData);
  const [loading, setLoading] = useState(false);
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

  const deleteEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api.sinusoid.in/plan/${planData.registrationId}`
      );
      setLoading(false);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
      setLoading(false);
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.sinusoid.in/plan`,
        registrationData
      );
      setLoading(false);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
      setLoading(false);
    }
  };

  const onClickUploadImage = async (event, type) => {
    const file = event.target.files[0];
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
      setRegistrationData((prev) => ({
        ...prev,
        [type]: response?.data?.fileName,
      }));
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onPlanChange = (e) => {
    const selectedPlan = plans.find((plan) => plan.planid === e.target.value);
    setRegistrationData((prev) => ({
      ...prev,
      planId: selectedPlan?.planid,
      planName: selectedPlan?.planName,
    }));
    //   console.log(e);
  };

  useEffect(() => {
    console.log({ registrationData });
  }, [registrationData]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: "900px !important" } }}
      fullWidth="lg"
    >
      <div className="flex flex-row justify-between">
        <DialogTitle>
          {newRegistration ? "New Plan Registration" : "Plan Registration"}
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={deleteEvent} className="flex mx-4 px-2">
            <Delete />
            <Typography>Delete</Typography>
          </IconButton>
          <IconButton onClick={onClose} className="flex mx-2 px-2">
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
                label="First Name"
                variant="outlined"
                value={registrationData.firstName}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={registrationData.lastName}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Email ID"
                variant="outlined"
                value={registrationData.email}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={registrationData.phone}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="University Name"
                variant="outlined"
                value={registrationData.universityName}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    universityName: e.target.value,
                  }))
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Plan
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={registrationData.planName}
                  label="Select Plan"
                  onChange={onPlanChange}
                >
                  {plans.map((plan) => (
                    <MenuItem key={plan.planid} value={plan.planid}>
                      {plan.planName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={6}>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Upload />}
              >
                Upload Photo ID
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => onClickUploadImage(event, "photoIdUrl")}
                  multiple
                />
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<Link />}
                disabled={!registrationData.photoIdUrl}
              >
                <a
                  href={`https://api.sinusoid.in/images/${registrationData.photoIdUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Check Photo Id
                </a>
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Upload />}
              >
                Upload Payment Proof
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) =>
                    onClickUploadImage(event, "paymentProofUrl")
                  }
                  multiple
                />
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <a
                href={`https://api.sinusoid.in/images/${registrationData.paymentProofUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<Link />}
                  disabled={!registrationData.paymentProofUrl}
                >
                  Check Payment Proof
                </Button>
              </a>
            </Grid2>
          </Grid2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={() => onSave()} disabled={loading}>
          {loading ? <MoonLoader size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
