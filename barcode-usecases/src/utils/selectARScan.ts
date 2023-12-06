import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const selectARScan = (updateResults: (result: BarcodeResult) => void) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  showFinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  overlay: {
    visible: true,
    automaticSelectionEnabled: false,
  },
  onError: (error: Error) => {
    console.log(error);
  },
});

export default selectARScan;
