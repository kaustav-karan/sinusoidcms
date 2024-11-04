import axios from "axios";
import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import PlanRegistrationListingComponent from "../components/PlanRegistrationComponents/PlanRegistrationListingComponent";
import { Button } from "@mui/material";
import { Link, Upload } from "@mui/icons-material";

export default function PlanRegistrations() {
  const [planRegistrationData, setPlanRegistrationData] = useState(null);
  const FetchPlanRegistrations = async () => {
    try {
      const response = await axios.get(
        "https://api.sinusoid.in/plan"
      );

      return response?.data;
    } catch (error) {
      console.error("Error fetching plan registrations:", error);
      return null;
    }
  };

  const updateGsheet = async () => {
    try {
      const response = await axios.post(
        "https://api.sinusoid.in/planRegistrationGsheet"
      );

      return response?.data;
    } catch (error) {
      console.error("Error updating G-Sheet:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchPlanRegistrations();
      setPlanRegistrationData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <ProtectedHeader />
      <div className="flex mt-20 mx-auto flex-col items-center justify-center w-fit">
        <div className="flex justify-end w-full mb-3 gap-2">
          <Button
            variant="contained"
            startIcon={<Link />}
            href="https://docs.google.com/spreadsheets/d/1_6_ncEp9SCD_J_xQIclQXU8sX8IP-czaP78voGFn3FI/edit?usp=sharing"
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
        <PlanRegistrationListingComponent
          planRegistrationData={planRegistrationData}
        />
      </div>
    </>
  );
}
