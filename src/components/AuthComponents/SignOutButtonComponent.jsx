import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../auth/firebase";
import { Button } from "@mui/material";

const SignOutButton = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after sign-out
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
