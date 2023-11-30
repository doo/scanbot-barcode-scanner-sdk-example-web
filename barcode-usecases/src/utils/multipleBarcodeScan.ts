import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";

const multipleBarcodeScan = {
  containerId: "scanner",
  returnBarcodeImage: true,
  showFinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showBarcodeInfoToast({ barcode: result?.barcodes[0] });
  },
  onError: (e: Error) => {
    console.log(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
};

export default multipleBarcodeScan;
