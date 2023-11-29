import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";

const batchBarcodeScan = {
  containerId: "scanner",
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showResultInfoToast(result);
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
};

export default batchBarcodeScan;
