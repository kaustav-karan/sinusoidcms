import { Add, Close, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { planModal } from "../../constants/planModal";

export default function PlanDialog({ open, onClose, newPlan, loadPlanData }) {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(newPlan ? planModal : loadPlanData);

  async function handleSave() {
    try {
      const response = newPlan
        ? await axios.post("https://api.sinusoid.in/prplans", planData)
        : await axios.put(
            `https://api.sinusoid.in/events/${planData?.referralCode}`,
            planData
          );
      return response?.data;
    } catch (error) {
      console.log("Error Saving Plan", error);
      onClose();
      return;
    }
  }

  async function onSave() {
    setLoading(true);
    await handleSave();
    onClose();
    setLoading(false);
    window.location.reload();
  }

  function handleOnClose() {
    onClose();
    setPlanData(newPlan ? planModal : {});
  }

  function onChangeText(e, key) {
    const value = e.target.value;
    setPlanData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function onChangeDescription(e, idx) {
    const newValue = e.target.value;
    const updatedPlanData = {
      ...planData,
      description: planData?.description?.map((item, i) =>
        i === idx ? newValue : item
      ),
    };
    setPlanData(updatedPlanData);
    return updatedPlanData;
  }

  useEffect(() => {
    if (planData?.description?.length === 0) {
      setPlanData((prev) => ({ ...prev, description: [""] }));
    }
  }, [planData?.description?.length, setPlanData]);

  useEffect(() => {
    console.log({ planData });
  }, [planData]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: "900px !important" } }}
      fullWidth="lg"
    >
      <div className="flex flex-row justify-between">
        <DialogTitle>Add a New Plan</DialogTitle>
        <DialogActions>
          {!newPlan && (
            <IconButton className="flex mx-4 px-2">
              <Delete />
              <Typography>Delete</Typography>
            </IconButton>
          )}
          <IconButton onClick={handleOnClose} className="flex mx-2 px-2">
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
                className="w-full"
                id={"dialog-name-input"}
                label="Plan Name"
                value={planData.name || ""}
                onChange={(e) => onChangeText(e, "name")}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id={"planTypeInputLabel"}>Plan Type</InputLabel>
                <Select
                  label="Plan Type"
                  id="planTypeInput"
                  value={planData?.planType}
                  onChange={(e) => onChangeText(e, "planType")}
                >
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="platinum">Platinum</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                className="w-full"
                id={"dialog-varient-input"}
                label="Plan Varient"
                value={planData.varient || ""}
                onChange={(e) => onChangeText(e, "varient")}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                className="w-full"
                id="dialog-price-input"
                label="Plan Price"
                value={planData.price || ""}
                onChange={(e) => onChangeText(e, "price")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: "numeric", // Enables numeric keyboard on mobile devices
                  pattern: "[0-9]*", // Restricts input to numeric only
                }}
              />
            </Grid2>

            <Grid2 size={6}>
              <TextField
                className="w-full"
                id="dialog-ttl-input"
                label="Validity of the plan"
                value={planData?.ttl}
                onChange={(e) => onChangeText(e, "ttl")}
              />
            </Grid2>
          </Grid2>
          <Divider />
          <Grid2
            container
            gap={2}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {planData?.description?.map((sentence, idx) => (
              <Grid2 className="flex gap-2 flex-row" size={12} key={idx}>
                <TextField
                  className="w-full"
                  multiline
                  id={`${idx}-dialog`}
                  label={`Description ${idx + 1}`}
                  value={sentence || ""}
                  onChange={(e) => onChangeDescription(e, idx)}
                />
              </Grid2>
            ))}

            {/* + Button to add new description */}
            <Grid2 size={12} className="flex justify-end">
              <Button
                startIcon={<Add />}
                onClick={() => {
                  setPlanData((prev) => ({
                    ...prev,
                    description: [...(prev.description || []), ""],
                  }));
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Description
              </Button>
            </Grid2>
          </Grid2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={() => onSave()} disabled={loading}>
          {loading ? <MoonLoader size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
