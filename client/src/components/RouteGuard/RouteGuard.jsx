import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuth, children }) {
  return isAuth ? children : <Navigate to="/auth" />;
}

function PublicRoute({ isAuth, children }) {
  return !isAuth ? children : <Navigate to="/home" />;
}

export { ProtectedRoute, PublicRoute };
