import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { mainRoutes } from "./routes/mainRoutes";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          {mainRoutes.map((route, idx) => (
            <Route key={idx} path={route?.path} element={route?.component} />
          ))}
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
