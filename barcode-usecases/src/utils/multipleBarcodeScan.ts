import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const multipleBarcodeScan = {
  containerId: "scanner",
  showfinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    console.log(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

export default multipleBarcodeScan;