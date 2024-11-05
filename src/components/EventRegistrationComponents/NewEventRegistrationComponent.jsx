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
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { eventRegistrationModal } from "../../constants/eventRegistrationModal";
import axios from "axios";
import { Close, Delete } from "@mui/icons-material";
import { MoonLoader } from "react-spinners";

export default function NewEventRegistrationComponent({
  open,
  onClose,
  initialRegistrationData = eventRegistrationModal,
  newRegistration,
}) {
  const [registrationData, setRegistrationData] = useState(
    initialRegistrationData
  );
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEventDatas = async () => {
    try {
      const response = await axios.get(`https://api.sinusoid.in/events`);
      return response?.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  };

  const deleteEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api.sinusoid.in/eventRegistrations/${registrationData.eventId}`
      );
      setLoading(false);
      console.log(response?.data);
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
      setLoading(false);
    }
  };

  function handleEventChange(e) {
    const selectedEvent = events.find(
      (event) => event.eventId === e.target.value
    );
    setRegistrationData((prev) => ({
      ...prev,
      eventId: e.target.value,
      eventName: selectedEvent?.eventName,
      eventParticipants: selectedEvent?.eventParticipants,
      isNiitStudent: false,
    }));
  }

  const onSave = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.sinusoid.in/eventRegistrations`,
        registrationData
      );
      setLoading(false);
      console.log(response?.data);
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventDatas();
      setEvents(data);
    };

    fetchData();
  }, []);

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
          {newRegistration
            ? "New Event Registration"
            : `Edit Event Registration `}
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
              <FormControl fullWidth>
                <InputLabel id="selectEvents">Select Event</InputLabel>
                <Select
                  labelId="selectEvents"
                  value={registrationData.eventId}
                  onChange={(e) => handleEventChange(e)}
                  label="Select Event"
                >
                  {events.map((event) => (
                    <MenuItem key={event.eventId} value={event.eventId}>
                      {event.eventName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={registrationData.firstName}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    firstName: e.target.value,
                  })
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
                  setRegistrationData({
                    ...registrationData,
                    lastName: e.target.value,
                  })
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={registrationData.email}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
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
                  setRegistrationData({
                    ...registrationData,
                    phone: e.target.value,
                  })
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
                  setRegistrationData({
                    ...registrationData,
                    universityName: e.target.value,
                  })
                }
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                label="Team Members"
                variant="outlined"
                value={registrationData.teamMembers}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    teamMembers: e.target.value,
                  })
                }
              />
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
