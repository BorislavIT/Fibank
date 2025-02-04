import { Routes, Route } from "react-router";
import { AuthenticationPage } from "./modules/authentication";
import { NotFound } from "./modules/notFound";
import { StarWarsPage } from "./modules/starWars";
import { routerPaths } from "./shared/constant";
import { useState, useEffect } from "react";
import { OfflineModal } from "./modules/offline";

import "./app.css";

export function App() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="appContainer">
      <OfflineModal isVisible={!isOnline} />
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
  );
}
