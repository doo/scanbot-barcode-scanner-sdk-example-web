import { BarcodeResult } from 'scanbot-web-sdk/@types/model/barcode/barcode-result';

export default async function scanAndCountScan(scanbotSDK) {
	try {
		const configuration = {
			containerId: 'scanner',
			onBarcodesDetected: (result: BarcodeResult) => {
				console.log(result);
				// scanner.dispose();
			},
			scanAndCount: {
				enabled: true,
				// style: {},
			},
		};

		const scanner = await scanbotSDK.createBarcodeScanner(configuration);

		return scanner;
	} catch (error) {
		console.log(error.name);
	}
}
