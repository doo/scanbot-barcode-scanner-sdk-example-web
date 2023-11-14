import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";

export default async function singleBarcodeScan(scanbotSDK) {
	try {
		const configuration = {
			containerId: 'scanner',
			onBarcodesDetected: (result: BarcodeResult) => {
				console.log(result);
				scanner.dispose();
			},
		};
	
		const scanner = await scanbotSDK.createBarcodeScanner(configuration);

		document.getElementById("close-scanner").addEventListener("click", () => {
      scanner.dispose();
    });
	
		return scanner;
	} catch (error) {
		console.log(error.name);
	}
}
