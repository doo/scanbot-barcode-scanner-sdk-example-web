import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";
import { scannerService } from "../services/scannerService";

const singleBarcodeScan = {
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showResultInfoToast(result);
    scannerService.pause();
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

export default singleBarcodeScan;
