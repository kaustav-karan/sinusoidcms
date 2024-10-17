import { CloudUpload } from "@mui/icons-material";
import { Button, Grid2, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenericImgModal({ category, imageData, setImageData }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  async function onClickUploadImage(event) {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

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
      setImageData((prev) => ({
        ...prev,
        imageAsset: {
          ...prev?.imageAsset,
          [category]: {
            ...prev?.imageAsset?.[category],
            imgUrl: response?.data?.fileName,
          },
        },
      }));
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
    console.log( imageData?.imgUrl );
  }, [imageData]);

  return (
    <>
      <Grid2 className="flex gap-2 flex-row" size={6}>
        <TextField
          className="w-full"
          id="imgTitle"
          label="Image Title"
          value={imageData?.imgTitle}
          onChange={(e) => {
            const newValue = e?.target?.value;
            setImageData((prev) => ({
              ...prev,
              imageAsset: {
                ...prev?.imageAsset,
                [category]: {
                  ...prev?.imageAsset?.[category],
                  imgTitle: newValue,
                },
              },
            }));
          }}
        />
      </Grid2>
      <Grid2 className="flex gap-2 flex-row" size={6}>
        <TextField
          className="w-full"
          id="imgAlt"
          label="Image Alt"
          value={imageData?.imgAlt}
          onChange={(e) => {
            const newValue = e?.target?.value;
            setImageData((prev) => ({
              ...prev,
              imageAsset: {
                ...prev?.imageAsset,
                [category]: {
                  ...prev?.imageAsset?.[category],
                  imgAlt: newValue,
                },
              },
            }));
          }}
        />
      </Grid2>

      <Grid2 className="flex gap-2 flex-row" size={6}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => onClickUploadImage(event)}
            multiple
          />
        </Button>
      </Grid2>
      <Grid2 className="flex gap-2 flex-row" size={6}>
        <Link
          to={`https://api.sinusoid.in/images/${imageData?.imgUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography
            variant="body1"
            className="text-md font-medium text-gray-800"
          >
            {imageData?.imgUrl}
          </Typography>
        </Link>
      </Grid2>
    </>
  );
}
