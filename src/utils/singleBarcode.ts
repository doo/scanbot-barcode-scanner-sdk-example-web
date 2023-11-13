export default async function singleBarcodeScan(scanbotSDK) {
	let scanner;
	const configuration = {
		containerId: 'scanner',
		onBarcodesDetected: (result: BarcodeResult) => {
			console.log(result);
			scanner.dispose();
		},
	};

	scanner = await scanbotSDK.createBarcodeScanner(configuration);

	return scanner;
}
