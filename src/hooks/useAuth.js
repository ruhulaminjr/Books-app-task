import { AuthProvider } from "context/authContext";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthProvider);
};
export default useAuth;
