import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

export type ResultsType = "single" | "multiple" | null;

export type UpdateResultsType = (
  result: BarcodeResult | { barcodes: Barcode[] },
  type: ResultsType
) => void;
