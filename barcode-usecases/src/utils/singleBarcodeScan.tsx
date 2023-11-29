import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";
import { scannerService } from "../services/scannerService";

const singleBarcodeScan = {
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    scannerService.pause();
    toastService.showResultInfoToast(result, {});
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
};

toastService.resumeDetectionAfterRemoval(); // resume detection after toast removal

export default singleBarcodeScan;
