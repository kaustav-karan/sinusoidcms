import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function NewImageDialog({ open, onClose }) {
  const [imageFile, setImageFile] = useState(null);
//   const [imageName, setImageName] = useState("");
//   const [imageDescription, setImageDescription] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile); // key is 'image'
    // formData.append("name", imageName);
    // formData.append("description", imageDescription);

    try {
      const response = await axios.post(
        "https://api.sinusoid.in/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully:", response.data);
      onClose(); // Close dialog after successful upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: "900px !important" } }}
      fullWidth="lg"
    >
      <div className="flex justify-between">
        <DialogTitle>Add a New Image</DialogTitle>
        <DialogActions>
          <IconButton onClick={onClose} className="flex mx-2 px-2">
            <Close />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className="flex flex-col gap-3">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="btn-primary">
            Upload Image
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
