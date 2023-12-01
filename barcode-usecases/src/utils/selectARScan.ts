import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";

const selectARScan = {
  containerId: "scanner",
	returnBarcodeImage: true,
  showFinder: false,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showBarcodeInfoToast({ barcode: result?.barcodes[0] });
  },
  overlay: {
    visible: true,
    automaticSelectionEnabled: false,
  },
  onError: (error: Error) => {
    console.log(error);
  },
};

export default selectARScan;