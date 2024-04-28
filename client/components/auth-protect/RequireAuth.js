/* import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext.js";
import { useNavigate } from "react-router-native";

const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  return children;
};

export default RequireAuth; */
