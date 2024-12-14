import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import "material-icons/iconfont/material-icons.css";
import {
  AccountInfo,
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";

import App from "./App.tsx";

import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import "./index.scss";

import theme from "./Styles/theme.ts";

import queryClient from "./Utils/QueryClient.ts";
import { msalConfig } from "./Configs/auth.config.ts";

const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  const accounts: AccountInfo[] = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event?.payload) {
    const authResult = event.payload as AuthenticationResult;
    if (authResult.account) {
      msalInstance.setActiveAccount(authResult.account);
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
