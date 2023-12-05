import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { scannerService } from "../services/scannerService";

const singleBarcodeScan = (updateResults: (result: BarcodeResult) => void) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
    scannerService.pause();
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
});

export default singleBarcodeScan;
