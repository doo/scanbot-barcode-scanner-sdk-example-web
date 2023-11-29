import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const multiARScan = {
  containerId: "scanner",
  onBarcodesDetected: (result: BarcodeResult) => {
    console.log(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
  showFinder: false,
  overlay: {
    visible: true,
    automaticSelectionEnabled: true,
    onBarcodeFound: (code: Barcode) => {
      console.log(code);
      console.log("Barcode found");
    },
  },
};

export default multiARScan;
