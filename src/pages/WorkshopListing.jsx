import React, { useEffect, useState } from 'react'
import ProtectedHeader from '../components/Header';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import WorkshopListingTable from '../components/WorkshopComponents/WorkshopListingTable';
import WorkshopDialog from '../components/WorkshopComponents/WorkshopDialog';
import { newWorkshopSchema } from '../constants/generalConstants';

export default function WorkshopListing() {

  const fetchAllWorkshop = async () => {
    try {
      const response = await axios.get(`https://api.sinusoid.in/workshops`);
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.error("Error fetching workshops:", error);
      return null;
    }
  };
  const [workshopsData, setWorkshopsData] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  const handleClickOpen = () => {
    setDialogState(true);
  }

  const handleClose = () => {
    setDialogState(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllWorkshop();
      setWorkshopsData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log({ workshopsData });
  }, [workshopsData]);


  return (
    <div>
      <ProtectedHeader />
      <div className="flex mt-20 mx-auto flex-col items-center justify-center w-fit">
        <div className="flex justify-end w-full">
          <Button startIcon={<Add />} onClick={handleClickOpen}>
            Add a New Event
          </Button>
        </div>
        <WorkshopListingTable workshopsData={workshopsData} />
      </div>
      <WorkshopDialog
        workshop={newWorkshopSchema}
        newWorkshop
        onClose={handleClose}
        open={dialogState}
      />
    </div>
  );
}
