import { useState, useEffect } from "react";
import { offlineEventListener, onlineEventListener } from "./constant";

import "./offline.css";

export function OfflineModal() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener(onlineEventListener, handleOnline);
    window.addEventListener(offlineEventListener, handleOffline);

    return () => {
      window.removeEventListener(onlineEventListener, handleOnline);
      window.removeEventListener(offlineEventListener, handleOffline);
    };
  }, []);

  return (
    <div className={`offlineModalOverlay ${Boolean(!isOnline) && "isVisible"}`}>
      <div className="offlineModal">
        <img src="/offline.png" alt="No connection" className="offlineImage" />
      </div>
    </div>
  );
}
