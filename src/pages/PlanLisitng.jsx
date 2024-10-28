import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import PlanListingComponent from "../components/PlanListingComponent/PlanListingComponent";
import axios from "axios";
import PlanDialog from "../components/PlanListingComponent/PlanDialog";

export default function PlanLisitng() {
  const [planData, setPlanData] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  const handleClickOpen = () => {
    setDialogState(true);
  };

  const handleClose = () => {
    setDialogState(false);
  };

  const FetchPlanData = async () => {
    try {
      const response = await axios.get("https://api.sinusoid.in/prplans");

      return response?.data;
    } catch (error) {
      console.error("Error fetching plan registrations:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchPlanData();
      setPlanData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log({ planData });
  }, [planData]);

  return (
    <>
      <ProtectedHeader />
      <div className="flex justify-end w-[95vw] mt-20 ">
        <Button startIcon={<Add />} onClick={handleClickOpen}>
          Add a Plan
        </Button>
      </div>
      <PlanListingComponent planRegistrationData={planData} />
      <PlanDialog open={dialogState} onClose={handleClose} newPlan />
    </>
  );
}
