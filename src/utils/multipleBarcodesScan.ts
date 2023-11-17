import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { IBarcodeScannerHandle } from "scanbot-web-sdk/@types/interfaces/i-barcode-scanner-handle";
import toastService from "./toastService";

export default async function multipleBarcodeScan(
  scanbotSDK: ScanbotSDKType
): Promise<IBarcodeScannerHandle> {
  try {
    const configuration: BarcodeScannerConfiguration = {
      containerId: "scanner",
      onBarcodesDetected: (result: BarcodeResult) => {
		console.log(result);
		toastService.showResultInfo(result);
      },
      onError: (e: Error) => {
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
      },
      showFinder: false,
    };

    const scanner = await scanbotSDK?.createBarcodeScanner(configuration);

    return scanner;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject("An unknown error occurred.");
    }
  }
}
