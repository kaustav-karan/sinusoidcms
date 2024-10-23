import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import axios from "axios";
import EventRegistrationLisitngComponent from "../components/EventRegistrationComponents/EventRegistrationLisitngComponent";

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
      <div className="flex mt-20 mx-auto flex-col w-fit">
        <EventRegistrationLisitngComponent
          eventRegistrationData={eventRegistrationData}
        />
      </div>
    </>
  );
}
