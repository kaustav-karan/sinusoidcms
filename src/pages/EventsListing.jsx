import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import { newEventSchema } from "../constants/generalConstants";
import EventDialog from "../components/EventComponents/EventDialog";
import EventsListingTable from "../components/EventComponents/EventsListingTable";

export default function EventsListing() {
  const fetchAllEvent = async () => {
    try {
      const response = await axios.get(`https://api.sinusoid.in/events`);
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return null;
    }
  };
  const [eventData, setEventData] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  const handleClickOpen = () => {
    setDialogState(true);
  };

  const handleClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllEvent();
      setEventData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log({ eventData });
  }, [eventData]);

  return (
    <>
      <ProtectedHeader />
      <div className="flex mt-20 mx-auto flex-col items-center justify-center w-fit">
        <div className="flex justify-end w-full">
          <Button startIcon={<Add />} onClick={handleClickOpen}>
            Add a New Event
          </Button>
        </div>
        <EventsListingTable eventsData={eventData} />
      </div>
      <EventDialog
        event={newEventSchema}
        newEvent
        onClose={handleClose}
        open={dialogState}
      />
    </>
  );
}
