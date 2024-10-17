import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ImageGridComponent({ images }) {
  const imagesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(images?.length / imagesPerPage);

  // Get the current page of images
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images?.slice(indexOfFirstImage, indexOfLastImage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    console.log({ images });
  }, [images]);

  return (
    <Box sx={{ marginX: "1.5rem" }}>
      {/* Container to constrain images to 500x500px */}
      <Box
        sx={{
          width: "90vw",
          height: "100%",
          overflow: "auto", // Add scrolling if content overflows
          margin: "auto",
          border: "1px solid #ccc", // Optional: Add border to visualize the box
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {currentImages?.map((image, index) => (
            <Grid
              item
              xs={4}
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.5rem",
                }}
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%", // Ensure the image occupies the entire grid space
                    objectFit: "contain", // Ensure the image fits inside the grid cell
                  }}
                />
                <Typography align="center">{image}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      </Box>
    </Box>
  );
}
