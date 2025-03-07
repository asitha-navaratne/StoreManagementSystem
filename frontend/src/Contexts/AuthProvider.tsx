import { createContext, FC } from "react";

import { useAccount, useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";

import AuthContextType from "../Types/AuthContextType";
import AuthProviderProps from "../Types/AuthProviderProps";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {}) as AccountInfo;

  return (
    <AuthContext.Provider value={{ instance: instance, account: account }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
