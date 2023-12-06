import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const multiARScan = (updateResults: (result: BarcodeResult) => void) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  onError: (error: Error) => {
		console.log(error)
  },
  showFinder: false,
  overlay: {
    visible: true,
    automaticSelectionEnabled: true,
  },
});

export default multiARScan;
