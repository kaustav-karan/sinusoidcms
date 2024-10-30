import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import MarkethingComponentsListing from "../components/MarketingComponentsConfigComponent/MarkethingComponentsListing";
import axios from "axios";
import MarketingComponentDialog from "../components/MarketingComponentsConfigComponent/MarketingComponentDialog";

export default function MarketingComponentConfig() {
  const [marketingComponentData, setMarketingComponentData] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  const FetchMaketingComponentData = async () => {
    try {
      const response = await axios.get(
        "https://api.sinusoid.in/marketingComponents"
      );

      return response?.data;
    } catch (error) {
      console.error("Error fetching marketing component data:", error);
      return null;
    }
  };

  const handleClickOpen = () => {
    setDialogState(true);
  };

  const handleClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchMaketingComponentData();
      setMarketingComponentData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <ProtectedHeader />
      <div className="flex justify-end w-[95vw] mt-20 ">
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={handleClickOpen}
        >
          Add New Component
        </Button>
      </div>
      <MarkethingComponentsListing
        marketingComponentData={marketingComponentData}
      />
      <MarketingComponentDialog handleClose={handleClose} open={dialogState} />
    </>
  );
}
