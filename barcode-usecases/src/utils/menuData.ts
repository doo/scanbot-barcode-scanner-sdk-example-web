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
import { UpdateResultsType, HandleCreateScannerType } from "./types";

export const menuData = (
  handleCreateScanner: HandleCreateScannerType,
  updateResults: UpdateResultsType
) => [
  {
    title: "Barcode Scanning Use Cases",
    data: [
      {
        title: "Scan Single Barcodes",
        scanningFunction: () =>
          handleCreateScanner(singleBarcodeScan(updateResults), "single"),
      },
      {
        title: "Scan Multiple Barcodes",
        scanningFunction: () =>
          handleCreateScanner(multipleBarcodeScan(updateResults), "multiple"),
      },
      {
        title: "Batch Barcode Scan",
        scanningFunction: () =>
          handleCreateScanner(batchBarcodeScan(updateResults), "multiple"),
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
        scanningFunction: () =>
          handleCreateScanner(multiARScan(updateResults), "multiple"),
      },
      {
        title: "AR-SelectScan",
        scanningFunction: () =>
          handleCreateScanner(selectARScan(updateResults), "multiple"),
      },
      {
        title: "AR-FindAndPickScan",
        scanningFunction: () =>
          handleCreateScanner(findAndPickARScan(updateResults), "multiple"),
      },
      {
        title: "AR-Scan and Count",
        scanningFunction: () =>
          handleCreateScanner(scanAndCountARScan(), "multiple"),
      },
    ],
  },
];
