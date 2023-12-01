import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";

const multiARScan = {
  containerId: "scanner",
	returnBarcodeImage: true,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showBarcodeInfoToast({
			barcode: result?.barcodes[0],
		});
  },
  onError: (error: Error) => {
    console.log(error);
  },
  showFinder: false,
  overlay: {
    visible: true,
    automaticSelectionEnabled: true,
  },
};

export default multiARScan;
