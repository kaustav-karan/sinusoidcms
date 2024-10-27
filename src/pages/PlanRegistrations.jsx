import axios from "axios";
import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import PlanRegistrationListingComponent from "../components/PlanRegistrationComponents/PlanRegistrationListingComponent";

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
      <div className="flex mt-20 mx-auto flex-col w-fit">
        <PlanRegistrationListingComponent
          planRegistrationData={planRegistrationData}
        />
      </div>
    </>
  );
}
