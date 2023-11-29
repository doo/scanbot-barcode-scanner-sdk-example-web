import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const batchBarcodeScan = {
  containerId: "scanner",
  onBarcodesDetected: (result: BarcodeResult) => {
    console.log(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

export default batchBarcodeScan;