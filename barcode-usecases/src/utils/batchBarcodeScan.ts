import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { UpdateResultsType } from "./types";

const batchBarcodeScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    updateResults(result);
  },
  onError: (e: Error) => {
    console.error(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
  style: {
    window: {
      widthProportion: 0.5,
      top: "40%",
    },
  },
});

export default batchBarcodeScan;
