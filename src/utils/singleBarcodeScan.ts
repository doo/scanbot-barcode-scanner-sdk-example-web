import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { toast } from "react-toastify";

export default async function singleBarcodeScan(scanbotSDK: ScanbotSDKType) {
  try {
    const configuration: BarcodeScannerConfiguration = {
      containerId: "scanner",
      onBarcodesDetected: (result: BarcodeResult) => {
        toast.info(
          `format: ${result.barcodes[0].format}
          text: ${result.barcodes[0].text}`,
          {
            autoClose: 5000,
          }
        );
        toast.onChange(
          (toast) => toast.status === "removed" && scanner?.dispose()
        );
      },
      onError: (e: Error) => {
        console.log(e.name + ": " + e.message);
        alert(e.name + ": " + e.message);
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
