import { Barcode } from 'scanbot-web-sdk/@types/model/barcode/barcode';
import { BarcodeResult } from 'scanbot-web-sdk/@types/model/barcode/barcode-result';
import { BarcodeScannerConfiguration } from 'scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration';
import {
	IBarcodePolygonHandle,
	IBarcodePolygonLabelHandle,
} from 'scanbot-web-sdk/@types/model/configuration/selection-overlay-configuration';

export default async function useARMultiScan(scanbotSDK) {
	try {
		const configuration: BarcodeScannerConfiguration = {
			containerId: 'scanner',
			onBarcodesDetected: (result: BarcodeResult) => {
				console.log(result);
				// scanner.dispose();
			},
			overlay: {
				visible: true,
				onBarcodeFound: (
					code: Barcode,
					polygon: IBarcodePolygonHandle,
					label: IBarcodePolygonLabelHandle
				) => {
					console.log(code);

					polygon.style({
						fill: 'rgba(255, 255, 0, 0.3)',
						stroke: 'yellow',
					});
				},
			},
		};

		const scanner = await scanbotSDK.createBarcodeScanner(configuration);

		return scanner;
	} catch (error) {
		console.log(error.name);
	}
}
