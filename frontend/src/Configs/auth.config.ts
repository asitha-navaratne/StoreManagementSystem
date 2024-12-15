const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const AUTHORITY = `https://${
  import.meta.env.VITE_TENANT_SUBDOMAIN
}.ciamlogin.com/`;

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITY,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [],
};
