import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return <navigate to="/login" replace />;
  }
  return children;
}
