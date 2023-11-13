import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { IBarcodePolygonHandle } from "scanbot-web-sdk/@types/model/configuration/selection-overlay-configuration";

export default async function multiARScan(scanbotSDK) {
  try {
    const configuration = {
      containerId: "scanner",
      onBarcodesDetected: (result: BarcodeResult) => {
        console.log(result);
        // scanner.dispose();
      },
      scanAndCountScan: {
        enabled: true,
      },
      overlay: {
        enabled: true,
        onBarcodeFound: (polygon: IBarcodePolygonHandle) => {
          polygon.style({
            fill: "rgba(255, 255, 0, 0.3)",
            stroke: "yellow",
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
