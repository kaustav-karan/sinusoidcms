import { Link, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EventRegistrationLisitngComponent from "../components/EventRegistrationComponents/EventRegistrationLisitngComponent";
import ProtectedHeader from "../components/Header";

export default function EventRegistration() {
  const [eventRegistrationData, setEventRegistrationData] = useState(null);

  // Fetch Event Registration Data
  const FetchEventRegistrations = async () => {
    try {
      const response = await axios.get(
        "https://api.sinusoid.in/eventRegistrations"
      );

      return response?.data;
    } catch (error) {
      console.error("Error fetching event registrations:", error);
      return null;
    }
  };

  const updateGsheet = async () => {
    try {
      const response = await axios.post(
        "https://api.sinusoid.in/eventRegistrationGsheet"
      );

      return response?.data;
    } catch (error) {
      console.error("Error updating G-Sheet:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchEventRegistrations();
      setEventRegistrationData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(eventRegistrationData);
  }, [eventRegistrationData]);

  return (
    <>
      <ProtectedHeader />
      <div className="flex mt-20 mx-auto flex-col items-center justify-center w-fit">
        <div className="flex justify-end w-full mb-3 gap-2">
          <Button
            variant="contained"
            startIcon={<Link />}
            href="https://docs.google.com/spreadsheets/d/1JNvdE69FYBWXa3Us_nLKShz1XSK2vCjvQciFofKtYP0/edit?usp=sharing"
            target="_blank"
          >
            Check the G-Sheet
          </Button>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            onClick={updateGsheet}
          >
            Update the G-Sheet
          </Button>
        </div>
        <EventRegistrationLisitngComponent
          eventRegistrationData={eventRegistrationData}
        />
      </div>
    </>
  );
}
