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
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import StructuredEventData from "./StructuredEventData";

export default function EventDialog({ open, onClose, event, newEvent }) {
  const [eventData, setEventData] = useState(event);

  async function handleSave() {
    try {
      const response = newEvent
        ? await axios.post("https://api.sinusoid.in/events", eventData)
        : await axios.put(
            `https://api.sinusoid.in/events/${eventData?.eventId}`,
            eventData
          );
      console.log(response?.data);
      onClose();
      return response?.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      onClose();
      return null;
    }
  }

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  function onChangeText(e, id) {
    setEventData((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  }

  function onChangeDate(e, id) {
    setEventData((prev) => ({
      ...prev,
      structure: {
        ...prev.structure,
        [id]: dayjs(e),
      },
    }));
  }

  function onChangeSwitch(e, id) {
    setEventData((prev) => ({
      ...prev,
      [id]: e.target.checked,
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
        <DialogTitle>{`Edit ${eventData?.eventName} Details`}</DialogTitle>
        <DialogActions>
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
                className="w-full"
                id={`${event?.eventId}-dialog`}
                label="Event Id"
                value={eventData?.eventId}
                onChange={(e) => onChangeText(e, "eventId")}
              />
            </Grid2>
            <Grid2 size={6}>
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Switch
                    checked={eventData?.published}
                    onChange={(e) => onChangeSwitch(e, "published")}
                    id={`${event?.published}-dialog`}
                  />
                }
                label="Published"
              />
            </Grid2>
          </Grid2>
          <TextField
            id={`${event?.eventName}-dialog`}
            label="Event Name"
            value={eventData?.eventName}
            onChange={(e) => onChangeText(e, "eventName")}
          />

          <TextField
            id={`${event?.status}-dialog`}
            label="Status"
            value={eventData?.status}
            onChange={(e) => onChangeText(e, "status")}
          />

          <TextField
            id={`${eventData?.eventTagline}-dialog`}
            label="Event Tagline"
            value={eventData?.eventTagline}
            onChange={(e) => onChangeText(e, "eventTagline")}
          />

          <TextField
            id={`${eventData?.shortDesc}-dialog`}
            label="Short Description"
            value={eventData?.shortDesc}
            onChange={(e) => onChangeText(e, "shortDesc")}
          />

          <TextField
            id={`${eventData?.longDesc}-dialog`}
            label="Long Description"
            value={eventData?.longDesc}
            onChange={(e) => onChangeText(e, "longDesc")}
            multiline
          />

          <TextField
            id={`${eventData?.note}-dialog`}
            label="Note"
            value={eventData?.note}
            onChange={(e) => onChangeText(e, "note")}
          />

          <TextField
            id={`${eventData?.overview}-dialog`}
            label="Overview"
            value={eventData?.overview}
            onChange={(e) => onChangeText(e, "overview")}
          />

          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.registrationStart}-dialog`}
                label="Registration Start"
                value={dayjs(eventData?.schedule?.registrationStart)}
                onChange={(e) => onChangeDate(e, "registrationStart")}
              />
            </Grid2>
            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.registrationEnd}-dialog`}
                label="Registration End"
                value={dayjs(eventData?.schedule?.registrationEnd)}
                onChange={(e) => onChangeDate(e, "registrationEnd")}
              />
            </Grid2>

            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.eventStart}-dialog`}
                label="Event Start"
                value={dayjs(eventData?.schedule?.eventStart)}
                onChange={(e) => onChangeDate(e, "eventStart")}
              />
            </Grid2>
            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.eventEnd}-dialog`}
                label="Event End"
                value={dayjs(eventData?.schedule?.eventEnd)}
                onChange={(e) => onChangeDate(e, "eventEnd")}
              />
            </Grid2>

            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.submissionStart}-dialog`}
                label="Submission Start"
                value={dayjs(eventData?.schedule?.submissionStart)}
                onChange={(e) => onChangeDate(e, "submissionStart")}
              />
            </Grid2>

            <Grid2 size={6}>
              <DatePicker
                className="flex w-full"
                id={`${event?.schedule?.submissionEnd}-dialog`}
                label="Submission End"
                value={dayjs(eventData?.schedule?.submissionEnd)}
                onChange={(e) => onChangeDate(e, "submissionEnd")}
              />
            </Grid2>
          </Grid2>

          {/* Event Structure */}
          <Divider />
          <Grid2
            container
            gap={2}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={12}>
              <Typography
                variant="h6"
                className="text-lg font-semibold text-gray-800"
              >
                Event Structures
              </Typography>
            </Grid2>
            {eventData?.eventStructure?.map((eventInfo, index) => (
              <StructuredEventData
                type={{ id: "eventStructure", label: "Event Structure " }}
                eventInfo={eventInfo}
                index={index}
                setEventData={setEventData}
              />
            ))}
            <Button
              startIcon={<Add />}
              onClick={() =>
                setEventData((prev) => ({
                  ...prev,
                  eventStructure: [...prev?.eventStructure, ""],
                }))
              }
            >
              Add Structure
            </Button>
          </Grid2>

          {/* Rules */}
          <Divider />
          <Grid2
            container
            gap={2}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={12}>
              <Typography
                variant="h6"
                className="text-lg font-semibold text-gray-800"
              >
                Event Rules
              </Typography>
            </Grid2>
            {eventData?.rules?.map((eventInfo, index) => (
              <StructuredEventData
                type={{ id: "rules", label: "Rule" }}
                eventInfo={eventInfo}
                index={index}
                setEventData={setEventData}
              />
            ))}
            <Button
              startIcon={<Add />}
              onClick={() =>
                setEventData((prev) => ({
                  ...prev,
                  rules: [...prev?.rules, ""],
                }))
              }
            >
              Add Rule
            </Button>
          </Grid2>

          {/* Prize */}
          <Divider />
          <Grid2
            container
            gap={2}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={12}>
              <Typography
                variant="h6"
                className="text-lg font-semibold text-gray-800"
              >
                Event Prize
              </Typography>
            </Grid2>
            {eventData?.prizes?.map((eventInfo, index) => (
              <StructuredEventData
                type={{ id: "prizes", label: "Prize" }}
                eventInfo={eventInfo}
                index={index}
                setEventData={setEventData}
              />
            ))}
            <Button
              startIcon={<Add />}
              onClick={() =>
                setEventData((prev) => ({
                  ...prev,
                  prizes: [...prev?.prizes, ""],
                }))
              }
            >
              Add Prize
            </Button>
          </Grid2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSave()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
