import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventsListing from "./pages/EventsListing";
import Home from "./pages/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsListing />} />
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
