// utils/batchBarcodeScan.js
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const batchBarcodeScan = (onDetectedCallback: (result: BarcodeResult) => void) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    console.log("Barcodes detected:", result.barcodes);
    onDetectedCallback(result);
  },
  onError: (e: Error) => {
    console.error(e.name + ": " + e.message);
    alert(e.name + ": " + e.message);
  },
  style: {
    window: {
      widthProportion: 0.4,
      top: "40%",
    },
  },
});

export default batchBarcodeScan;
