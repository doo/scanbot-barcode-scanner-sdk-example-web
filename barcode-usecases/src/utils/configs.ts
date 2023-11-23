import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import toastService from "./toastService";
import { scannerService } from "./scannerService";
import {
  IBarcodePolygonHandle,
  IBarcodePolygonLabelHandle,
} from "scanbot-web-sdk/@types/model/configuration/selection-overlay-configuration";

// edit default error handler
const onError = (e: Error) => {
  console.log(e.name + ": " + e.message);
  alert(e.name + ": " + e.message);
};

// edit default handler for when a barcode is detected
const onBarcodesDetected = (result: BarcodeResult) => {
  toastService.showResultInfoToast(result);
};

// edit default handler for when a barcode is found with the AR overlay
const onBarcodeFound = (code: Barcode) => {
  toastService.showBarcodeInfoToast(code);
};

// base configuration for all barcode scanner examples
const baseConfig: BarcodeScannerConfiguration = {
  containerId: "scanner",
  onBarcodesDetected: onBarcodesDetected,
  onError: onError,
};

export const singleConfig = {
  ...baseConfig,
  onBarcodesDetected: (result: BarcodeResult) => {
    toastService.showResultInfoToast(result);
    scannerService.dispose();
  },
};

export const multipleConfig = {
  ...baseConfig,
  showFinder: false,
};

export const multipleARConfig = {
  ...baseConfig,
  onBarcodesDetected: () => {},
  showFinder: false,
  overlay: {
    visible: true,
    automaticSelectionEnabled: true,
    onBarcodeFound: onBarcodeFound,
  },
};

export const batchConfig = {
  ...baseConfig,
};

export const scanAndCountConfig = {
  ...baseConfig,
  scanAndCount: {
    enabled: true,
  },
};

export const selectARConfig = {
  ...baseConfig,
  onBarcodesDetected: () => {},
  showFinder: false,
  overlay: {
    visible: true,
    onBarcodeFound: onBarcodeFound,
    // should have something like onBarcodeSelected here
  },
};

export const findAndPickARConfig = {
  ...baseConfig,
  onBarcodesDetected: () => {},
  showFinder: false,
  overlay: {
    visible: true,
    onBarcodeFound: (
      code: Barcode,
      polygon: IBarcodePolygonHandle,
      label: IBarcodePolygonLabelHandle
    ) => {
      if (code.format === "QR_CODE") {
        polygon.style({
          fill: "rgba(0, 255, 0, 0.3)",
          stroke: "rgba(0, 255, 0, 1)",
        });
        label.style({
          backgroundColor: "rgba(0, 255, 0, 0.9)",
          textColor: "white",
        });
        toastService.showBarcodeInfoToast(code);
      }
    },
  },
};
