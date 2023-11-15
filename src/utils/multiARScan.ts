import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { toast } from "react-toastify";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

export default async function multiARScan(scanbotSDK: ScanbotSDKType) {
  try {
    const configuration: BarcodeScannerConfiguration = {
      containerId: "scanner",
      onBarcodesDetected: (result: BarcodeResult) => {
        console.log(result);

        toast.info(
          `format: ${result.barcodes[0].format}
          text: ${result.barcodes[0].text}`
        );
      },
      onError: (e: Error) => {
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
      },
      showFinder: false,
      overlay: {
        visible: true,
        onBarcodeFound: (code: Barcode) => {
          toast.info(
            `format: ${code.format}
            text: ${code.text}`
          );
        },
      },
    };

    const scanner = await scanbotSDK?.createBarcodeScanner(configuration);

    return scanner;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}
