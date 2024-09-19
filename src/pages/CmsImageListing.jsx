import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import ImageGridComponent from "../components/CmsImageComponents/ImageGridComponent";
import axios from "axios";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import NewImageDialog from "../components/CmsImageComponents/NewImageDialog";

export default function CmsImageListing() {
  async function fetchAllImageData() {
    try {
      const response = await axios.get(`https://api.sinusoid.in/images`);

      return response?.data;
    } catch (error) {
      console.error("Error fetching images:", error);
      return null;
    }
  }
  const [imageData, setImageData] = useState(null);
  const [dialogState, setDialogState] = useState(false);

  const handleClickOpen = () => {
    setDialogState(true);
  };

  const handleClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllImageData();
      setImageData(data?.files);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  return (
    <>
      <ProtectedHeader />
      <div className="flex mt-20 mx-auto flex-col w-fit">
        <div className="flex justify-end w-full">
          <Button startIcon={<Add />} onClick={handleClickOpen}>
            Add a New Image
          </Button>
        </div>
          <ImageGridComponent images={imageData} />
      </div>
      <NewImageDialog open={dialogState} onClose={handleClose} />
    </>
  );
}
