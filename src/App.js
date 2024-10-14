import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./auth/firebase";
import { MainRoutes } from "./routes/MainRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set true if user is logged in
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // While checking authentication status, display a loader
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        {/* Render all routes from mainRoutes */}
        {MainRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              route.path === "/auth" ? (
                route.component
              ) : isAuthenticated ? (
                route.component
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        ))}
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
