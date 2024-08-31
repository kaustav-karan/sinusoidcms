import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function WorkshopDialog({
  workshop,
  newWorkshop,
  onClose,
  open,
}) {
  const [workshopData, setWorkshopData] = useState(workshop);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      const response = newWorkshop
        ? await axios.post(`https://api.sinusoid.in/workshops`, workshopData)
        : await axios.put(
            `https://api.sinusoid.in/workshops/${workshopData?.workshopId}`,
            workshopData
          );
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error saving workshop:", error);
      return null;
    }
  }

  async function onSave() {
    setLoading(true);
    await handleSave();
    onClose();
    setLoading(false);
    window.location.reload();
  }

  useEffect(() => {
    console.log({ workshopData });
  }, [workshopData]);

  function onChangeText(e, key) {
    setWorkshopData((prev) => ({
      ...prev,
      [key]: e?.target?.value,
    }));
  }

  function onChangeSwitch(e, key) {
    setWorkshopData((prev) => ({
      ...prev,
      [key]: e?.target?.checked,
    }));
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: "900px !important" } }}
      fullWidth="lg"
    >
      <div className="flex flex-row justify-between">
        <DialogTitle>
          <Typography
            variant="h4"
            className="text-base font-bold text-gray-800"
          >
            {newWorkshop
              ? "Add New Workshop"
              : `Edit ${workshopData?.workshopName}`}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <IconButton onClick={onClose} className="flex mx-2 px-2">
            <Close />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800"
          >
            Workshop Details
          </Typography>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={6}>
              <TextField
                required
                className="w-full"
                id={`${workshop?.workshopId}-dialog`}
                label="Workshop Id"
                value={workshopData?.workshopId}
                onChange={(e) => onChangeText(e, "workshopId")}
                disabled={loading}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={workshopData?.published}
                    onChange={(e) => onChangeSwitch(e, "published")}
                    id={`${workshop?.published}-dialog`}
                    disabled={loading}
                  />
                }
                label="Published"
              />
            </Grid2>
          </Grid2>
          <TextField
            className="w-full"
            id={`${workshop?.workshopName}-dialog`}
            label="Workshop Name"
            value={workshopData?.workshopName}
            onChange={(e) => onChangeText(e, "workshopName")}
            disabled={loading}
          />
          <TextField
            className="w-full"
            id={`${workshop?.status}-dialog`}
            label="Status"
            value={workshopData?.status}
            onChange={(e) => onChangeText(e, "status")}
            disabled={loading}
          />
          <TextField
            className="w-full"
            id={`${workshop?.workshopTagline}-dialog`}
            label="Tagline"
            value={workshopData?.workshopTagline}
            onChange={(e) => onChangeText(e, "workshopTagline")}
            disabled={loading}
          />
          <TextField
            className="w-full"
            id={`${workshop?.description}-dialog`}
            label="Description"
            value={workshopData?.description}
            onChange={(e) => onChangeText(e, "description")}
            disabled={loading}
          />
          <Divider />

          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800"
          >
            Schedule
          </Typography>

          <DateTimePicker
            label="Workshop Start"
            value={dayjs(workshopData?.schedule?.workshopStart)}
            onChange={(e) =>
              setWorkshopData((prev) => ({
                ...prev,
                schedule: { ...prev?.schedule, workshopStart: e },
              }))
            }
            disabled={loading}
          />

          <Divider />

          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800"
          >
            Collaboration
          </Typography>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {workshopData?.collaboration?.map((collab, index) => (
              <>
                <Grid2 size={6} key={index}>
                  <TextField
                    className="w-full"
                    id={`${index}-collab`}
                    label={`Collaboration ${index + 1}`}
                    placeholder="Enter Collaborators Name"
                    value={collab?.name}
                    disabled={loading}
                    onChange={(e) =>
                      setWorkshopData((prev) => ({
                        ...prev,
                        collaboration: prev?.collaboration?.map((item, i) =>
                          i === index
                            ? { ...item, name: e?.target?.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid2>
                <Grid2 size={6} key={index}>
                  <TextField
                    className="w-full"
                    id={`${index}-collab-logo`}
                    label={`Collaboration Logo ${index + 1}`}
                    placeholder="Enter Collaborators Logo URL"
                    value={collab?.logo}
                    disabled={loading}
                    onChange={(e) =>
                      setWorkshopData((prev) => ({
                        ...prev,
                        collaboration: prev?.collaboration?.map((item, i) =>
                          i === index
                            ? { ...item, logoSrc: e?.target?.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid2>
                <Grid2 size={12} key={index}>
                  <TextField
                    className="w-full"
                    id={`${index}-collab-link`}
                    label={`Collaboration Link ${index + 1}`}
                    placeholder="Enter Collaborators Link"
                    value={collab?.link}
                    disabled={loading}
                    onChange={(e) =>
                      setWorkshopData((prev) => ({
                        ...prev,
                        collaboration: prev?.collaboration?.map((item, i) =>
                          i === index
                            ? { ...item, link: e?.target?.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid2>
              </>
            ))}
            <Button
              startIcon={<Add />}
              disabled={loading}
              onClick={() =>
                setWorkshopData((prev) => ({
                  ...prev,
                  collaboration: [
                    ...prev?.collaboration,
                    { name: "", logo: "", link: "" },
                  ],
                }))
              }
            >
              Add Collaboration
            </Button>
          </Grid2>
          <Divider />
          <Typography
            variant="h6"
            className="text-lg font-semibold text-gray-800"
          >
            Guidelines
          </Typography>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {workshopData?.guidelines?.map((guide, index) => (
              <>
                <Grid2 size={12} id={`${index}-info`}>
                  <TextField
                    className="w-full"
                    id={`${index}-guideline`}
                    label={`Guideline ${index + 1}`}
                    value={guide?.info}
                    disabled={loading}
                    onChange={(e) =>
                      setWorkshopData((prev) => ({
                        ...prev,
                        guidelines: prev?.guidelines?.map((item, i) =>
                          i === index
                            ? { ...item, info: e?.target?.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    id={`${index}-guideline-link`}
                    className="w-full"
                    label={`Guideline Link ${index + 1}`}
                    value={guide?.resourceLink}
                    disabled={loading}
                    onChange={(e) =>
                      setWorkshopData((prev) => ({
                        ...prev,
                        guidelines: prev?.guidelines?.map((item, i) =>
                          i === index
                            ? { ...item, resourceLink: e?.target?.value }
                            : item
                        ),
                      }))
                    }
                  />
                </Grid2>
              </>
            ))}
            <Button
              startIcon={<Add />}
              disabled={loading}
              onClick={() =>
                setWorkshopData((prev) => ({
                  ...prev,
                  guidelines: [...prev?.guidelines, ""],
                }))
              }
            >
              Add Guideline
            </Button>
          </Grid2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave()} disabled={loading}>
          {loading ? <MoonLoader size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
