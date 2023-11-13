import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

export default async function useMultipleBarcodeScan(scanbotSDK) {
	try {
		const configuration = {
			containerId: "scanner",
			onBarcodesDetected: (result: BarcodeResult) => {
				console.log(result);
			},
		};

		const scanner = await scanbotSDK.createBarcodeScanner(configuration);

		return scanner;
	} catch (error) {
		console.log(error.name);
	}
}
