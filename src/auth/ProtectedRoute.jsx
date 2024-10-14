// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const ProtectedRoute = ({ component }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? component : <Navigate to="/auth" />;
};

export default ProtectedRoute;
