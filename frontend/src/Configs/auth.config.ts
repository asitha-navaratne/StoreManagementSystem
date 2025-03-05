import { InteractionType, PublicClientApplication } from "@azure/msal-browser";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const AUTHORITY = import.meta.env.VITE_TENANT_SUBDOMAIN;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITY,
    redirectUri: REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
  interactionType: InteractionType.Redirect,
};

export const msalInstance = new PublicClientApplication(msalConfig);
