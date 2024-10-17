import React, { useEffect, useState } from "react";
import ProtectedHeader from "../components/Header";
import EventTable from "../components/EventTable";
import axios from "axios";

const Home = () => {
  const [imageData, setImageData] = useState([]);
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
      <EventTable />
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
