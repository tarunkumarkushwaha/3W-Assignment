import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
const PublicRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.AUTH);
  return accessToken ? <Navigate to="/post" replace /> : children;
};


export default PublicRoute