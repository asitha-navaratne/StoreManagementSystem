import { useContext } from "react";

import { AuthContext } from "../Contexts/AuthProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be called within the Auth Context Provider"
    );
  }

  return context;
};

export default useAuthContext;
