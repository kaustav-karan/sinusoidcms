import { Add, Close, Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import ImageListingComponent from "./imageComponents/ImageListingComponent";
import StructuredEventData from "./StructuredEventData";

export default function EventDialog({ open, onClose, event, newEvent }) {
  const [eventData, setEventData] = useState(event);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      const response = newEvent
        ? await axios.post("https://api.sinusoid.in/events", eventData)
        : await axios.put(
            `https://api.sinusoid.in/events/${eventData?.eventId}`,
            eventData
          );
      return response?.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      onClose();
      return null;
    }
  }

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(
        `https://api.sinusoid.in/events/${eventId}`
      );

      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Failed to delete the event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function deleteEvent() {
    setLoading(true);
    await handleDelete(eventData?.eventId);
    onClose();
    setLoading(false);
  }

  async function onSave() {
    setLoading(true);
    await handleSave();
    onClose();
    setLoading(false);
    window.location.reload();
  }

  function onChangeText(e, key) {
    setEventData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  }

  function onChangeDate(e, key) {
    setEventData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [key]: dayjs(e),
      },
    }));
  }

  function onChangeSwitch(e, key) {
    setEventData((prev) => ({
      ...prev,
      [key]: e.target.checked,
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
          {newEvent
            ? "Add a New Event"
            : `Edit ${eventData?.eventName} Details`}
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
                className="w-full"
                id={`${event?.eventId}-dialog`}
                label="Event Id"
                value={eventData?.eventId}
                onChange={(e) => onChangeText(e, "eventId")}
                disabled={loading}
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
                    disabled={loading}
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
            disabled={loading}
          />

          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id={`${event?.status}-dialog`}>Status</InputLabel>
                <Select
                  label="Status"
                  id={`${event?.status}-dialog-input`}
                  value={eventData?.status}
                  onChange={(e) => onChangeText(e, "status")}
                  disabled={loading}
                >
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="registrations">Registrations</MenuItem>
                  <MenuItem value="ongoing">Ongoing</MenuItem>
                  <MenuItem value="ended">Ended</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id={`${event?.eventType}-dialog`}>
                  Event Type
                </InputLabel>
                <Select
                  label="Event Type"
                  id={`${event?.eventType}-dialog-input`}
                  value={eventData?.eventType}
                  onChange={(e) => onChangeText(e, "eventType")}
                  disabled={loading}
                >
                  <MenuItem value="prefest">Prefest</MenuItem>
                  <MenuItem value="onfest">Onfest</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id={`${event?.eventMode}-dialog`}>
                  Event Mode
                </InputLabel>
                <Select
                  label="Event Mode"
                  id={`${event?.eventMode}-dialog-input`}
                  value={eventData?.eventMode}
                  onChange={(e) => onChangeText(e, "eventMode")}
                  disabled={loading}
                >
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                  <MenuItem value="unstop">Unstop</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                id={`${eventData?.eventRedirectUrl}-dialog`}
                label="Event Redirect URL"
                value={eventData?.eventRedirectUrl}
                onChange={(e) => onChangeText(e, "eventRedirectUrl")}
                disabled={loading}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                id={`minTeamMember-dialog`}
                label="Min Team Member"
                value={eventData?.minTeamMember}
                onChange={(e) => onChangeText(e, "minTeamMember")}
                disabled={loading}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                id={`maxTeamMember-dialog`}
                label="Max Team Member"
                value={eventData?.maxTeamMember}
                onChange={(e) => onChangeText(e, "maxTeamMember")}
                disabled={loading}
              />
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <FormControl fullWidth>
              <InputLabel id={`${event?.eventRedirectUrl}-dialog`}>
                Event Participants
              </InputLabel>
              <Select
                label="Event Participants"
                id={`${event?.eventParticipants}-dialog-input`}
                value={eventData?.eventParticipants}
                onChange={(e) => onChangeText(e, "eventParticipants")}
                disabled={loading}
              >
                <MenuItem value="solo">Solo</MenuItem>
                <MenuItem value="team">Team</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id={`${eventData?.eventTagline}-dialog`}
              label="Event Tagline"
              value={eventData?.eventTagline}
              onChange={(e) => onChangeText(e, "eventTagline")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id={`${eventData?.shortDesc}-dialog`}
              label="Short Description"
              value={eventData?.shortDesc}
              onChange={(e) => onChangeText(e, "shortDesc")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id={`${eventData?.longDesc}-dialog`}
              label="Long Description"
              value={eventData?.longDesc}
              onChange={(e) => onChangeText(e, "longDesc")}
              multiline
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id={`${eventData?.note}-dialog`}
              label="Note"
              value={eventData?.note}
              onChange={(e) => onChangeText(e, "note")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              fullWidth
              id={`${eventData?.overview}-dialog`}
              label="Overview"
              value={eventData?.overview}
              onChange={(e) => onChangeText(e, "overview")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.registrationStart}-dialog`}
              label="Registration Start"
              value={dayjs(eventData?.schedule?.registrationStart)}
              onChange={(e) => onChangeDate(e, "registrationStart")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.registrationEnd}-dialog`}
              label="Registration End"
              value={dayjs(eventData?.schedule?.registrationEnd)}
              onChange={(e) => onChangeDate(e, "registrationEnd")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.eventStart}-dialog`}
              label="Event Start"
              value={dayjs(eventData?.schedule?.eventStart)}
              onChange={(e) => onChangeDate(e, "eventStart")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.eventEnd}-dialog`}
              label="Event End"
              value={dayjs(eventData?.schedule?.eventEnd)}
              onChange={(e) => onChangeDate(e, "eventEnd")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.submissionStart}-dialog`}
              label="Submission Start"
              value={dayjs(eventData?.schedule?.submissionStart)}
              onChange={(e) => onChangeDate(e, "submissionStart")}
              disabled={loading}
            />
          </Grid2>
          <Grid2 size={6}>
            <DatePicker
              className="flex w-full"
              id={`${event?.schedule?.submissionEnd}-dialog`}
              label="Submission End"
              value={dayjs(eventData?.schedule?.submissionEnd)}
              onChange={(e) => onChangeDate(e, "submissionEnd")}
              disabled={loading}
            />
          </Grid2>

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
                disabled={loading}
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
                id={`${index}-dialog`}
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
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* Upload Event Image Assets */}
            <Grid2 size={6}>
              <Typography
                variant="h6"
                className="text-lg font-semibold text-gray-800"
              >
                Event Image Assets
              </Typography>
            </Grid2>
          </Grid2>
          <ImageListingComponent
            eventData={eventData}
            setImageAssets={setEventData}
          />
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
