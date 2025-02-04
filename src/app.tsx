import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import { AuthenticationPage } from "./modules/authentication";
import { NotFound } from "./modules/notFound";
import { StarWarsPage } from "./modules/starWars";
import { UserProvider } from "./modules/authentication/userContext";
import { routerPaths } from "./shared/constant";
import { OfflineModal } from "./modules/offline";

import "./app.css";

export function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="appContainer">
          <OfflineModal />
          <Routes>
            <Route
              path={routerPaths.authenticate}
              element={<AuthenticationPage />}
            />
            <Route path={routerPaths.starWars} element={<StarWarsPage />} />
            <Route path={routerPaths.home} element={<StarWarsPage />} />
            <Route path={routerPaths.notFound} element={<NotFound />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}
