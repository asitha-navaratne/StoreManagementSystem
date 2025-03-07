import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";

type AuthContextType = {
  instance: IPublicClientApplication;
  account: AccountInfo;
};

export default AuthContextType;
