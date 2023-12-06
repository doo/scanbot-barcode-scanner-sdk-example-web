import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const scanAndCountARScan = (
  updateResults: (result: BarcodeResult) => void
) => ({
  containerId: "scanner",
  showfinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
  scanAndCount: {
    enabled: true,
  },
});

export default scanAndCountARScan;
