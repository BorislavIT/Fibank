import { IOfflineModalProps } from "./model";
import "./offline.css";

export function OfflineModal(props: IOfflineModalProps) {
  const { isVisible } = props;

  return (
    <div className={`offlineModalOverlay ${isVisible && "isVisible"}`}>
      <div className="offlineModal">
        <img src="/offline.png" alt="No connection" className="offlineImage" />
        <p>You are currently offline. Please check your internet connection.</p>
      </div>
    </div>
  );
}
