import { PublicClientApplication } from "@azure/msal-browser";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const AUTHORITY = `https://login.microsoftonline.com/a128f472-574c-4ef3-9600-b01c16f10ed7`;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITY,
    redirectUri: "http://localhost:5173/",
    postLogoutRedirectUri: "http://localhost:5173/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
