import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import { BarcodeScannerConfiguration } from "scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration";

export type ResultsType = "single" | "multiple" | null;

export type UpdateResultsType = (
  result: BarcodeResult | { barcodes: Barcode[] }
) => void;

export type HandleCreateScannerType = (
  configuration: BarcodeScannerConfiguration,
  type: ResultsType
) => Promise<undefined>;

export type ResultsContainerType = {
  barcodes: Barcode[];
  handleClearResults: () => void;
  resultsType: ResultsType;
  handleDismiss: () => void;
};
