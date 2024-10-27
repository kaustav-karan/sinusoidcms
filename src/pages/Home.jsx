import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import EventTable from "../components/EventTable";
import axios from "axios";
import { Box, Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainRoutes } from "../routes/MainRoutes";

const Home = () => {
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();
  async function fetchAllImageData() {
    try {
      const response = await axios.get(`https://api.sinusoid.in/images`);
      return response?.data?.files || [];
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllImageData();
      setImageData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ProtectedHeader />

      <Box
        className="mt-20 mx-auto w-[95vw] h-[50vh] overflow-y-auto"
        sx={{ flexGrow: 1 }}
      >
        <Grid2 container spacing={2}>
          {MainRoutes.filter((route) => route.nabarItem).map((route, index) => (
            <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }} key={index}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(route.path)}
              >
                {route.name}
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <div className="mt-2 p-4 w-full h-[40vh] overflow-x-auto border border-gray-300">
        <div className="flex space-x-4">
          {imageData.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-auto h-[35vh] cursor-pointer"
              onClick={() => {
                window.location.href = "/imagelisting";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
