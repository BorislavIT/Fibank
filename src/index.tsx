import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./modules/authentication/userContext";
import { BrowserRouter } from "react-router";
import { App } from "./app";

import "primereact/resources/themes/arya-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </StrictMode>
  </BrowserRouter>
);
