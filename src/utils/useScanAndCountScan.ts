import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

export default async function useScanAndCountScan(scanbotSDK) {
	try {
		const configuration = {
			containerId: "scanner",
			onBarcodesDetected: (result: BarcodeResult) => {
				console.log(result);
				// scanner.dispose();
			},
			scanAndCountScan: {
				enabled: true,
			}
		};

		const scanner = await scanbotSDK.createBarcodeScanner(configuration);

		return scanner;
	} catch (error) {
		console.log(error.name);
	}
}
