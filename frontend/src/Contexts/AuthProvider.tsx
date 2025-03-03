import { createContext, FC } from "react";

import { useMsal } from "@azure/msal-react";

import AuthContextType from "../Types/AuthContextType";
import AuthProviderProps from "../Types/AuthProviderProps";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { instance } = useMsal();

  return (
    <AuthContext.Provider value={{ instance: instance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
