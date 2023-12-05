import {
  singleBarcodeScan,
  multipleBarcodeScan,
  multiARScan,
  batchBarcodeScan,
  scanAndCountARScan,
  selectARScan,
  findAndPickARScan,
} from "./index";
import detectBarcodeFromImageScan from "./detectBarcodeFromImageScan";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

export const menuData = (
  handleCreateScanner: (
    configuration: BarcodeScannerConfiguration
  ) => Promise<undefined>,
  updateResults: (result: { barcodes: Barcode[] }) => void
) => [
  {
    title: "Barcode Scanning Use Cases",
    data: [
      {
        title: "Scan Single Barcodes",
        scanningFunction: () =>
          handleCreateScanner(singleBarcodeScan(updateResults)),
      },
      {
        title: "Scan Multiple Barcodes",
        scanningFunction: () => handleCreateScanner(multipleBarcodeScan),
      },
      {
        title: "Batch Barcode Scan",
        scanningFunction: () =>
          handleCreateScanner(batchBarcodeScan(updateResults)),
      },
      {
        title: "Detect Barcode from Image",
        scanningFunction: () => detectBarcodeFromImageScan(),
      },
    ],
  },
  {
    title: "Barcode AR Overlay Use Cases",
    data: [
      {
        title: "AR-MultiScan",
        scanningFunction: () => handleCreateScanner(multiARScan),
      },
      {
        title: "AR-SelectScan",
        scanningFunction: () => handleCreateScanner(selectARScan),
      },
      {
        title: "AR-FindAndPickScan",
        scanningFunction: () => handleCreateScanner(findAndPickARScan),
      },
      {
        title: "AR-Scan and Count",
        scanningFunction: () => handleCreateScanner(scanAndCountARScan),
      },
    ],
  },
];
