import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

const multipleBarcodeScan = (updateResults: (result: BarcodeResult) => void) => ({
	containerId: "scanner",
	returnBarcodeImage: true,
	showFinder: false,
	onBarcodesDetected: (result: BarcodeResult) => {
		updateResults(result);
	},
	onError: (error: Error) => {
		console.error(error)
	},
});

export default multipleBarcodeScan;
