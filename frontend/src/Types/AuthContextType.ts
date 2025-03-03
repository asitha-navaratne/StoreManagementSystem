import { IPublicClientApplication } from "@azure/msal-browser";

type AuthContextType = {
  instance: IPublicClientApplication;
};

export default AuthContextType;
