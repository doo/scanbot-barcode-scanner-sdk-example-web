import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import CloseScannerButton from "./CloseScannerButton";
import Scanner from "./Scanner";

const ScannerContainer = ({
  overlayState,
  activeScanner,
  handleScannerClose,
} : {
	overlayState: boolean,
	activeScanner: IBarcodeScannerHandle | null,
	handleScannerClose: () => void,
}) => {
  return (
    <div
      className={`${
        overlayState
          ? "fixed top-0 left-0 bottom-0 right-0 bg-gray-700"
          : "hidden"
      }`}
    >
      <div className="container px-0 flex flex-col h-full">
        <Scanner id="scanner" className="h-4/5" />
        {activeScanner && (
          <CloseScannerButton handleScannerClose={handleScannerClose} />
        )}
      </div>
    </div>
  );
};

export default ScannerContainer;
