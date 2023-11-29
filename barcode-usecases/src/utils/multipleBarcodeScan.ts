import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";

const multipleBarcodeScan = {
  containerId: "scanner",
  showfinder: false,
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showResultInfoToast(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

export default multipleBarcodeScan;