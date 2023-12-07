import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { scannerService } from "../services/scannerService";

const singleBarcodeScan = (updateResults: (result: BarcodeResult) => void) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    scannerService.pause();
    updateResults(result);
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
  style: {
    window: {
      widthProportion: 0.5,
      top: "40%",
    },
  },
});

export default singleBarcodeScan;
