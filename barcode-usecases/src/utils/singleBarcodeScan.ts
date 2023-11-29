import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";
import { scannerService } from "../services/scannerService";

const singleBarcodeScan = {
  containerId: "scanner",
  style: {
	window: {
        aspectRatio: 1,
        widthProportion: 0.4,
    },
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  onBarcodesDetected: (result: BarcodeResult) => {
	console.log(result);
	toastService.showResultInfoToast(result);
	scannerService.pause();
  },
  onError: (error: Error) => {
	console.log(error);
  },
};

export default singleBarcodeScan;