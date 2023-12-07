import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { UpdateResultsType } from "./types";

const multipleBarcodeScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  showFinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result, "multiple");
  },
  onError: (error: Error) => {
    console.error(error);
  },
});

export default multipleBarcodeScan;
