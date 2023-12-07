import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import {
  IBarcodePolygonHandle,
  IBarcodePolygonLabelHandle,
} from "scanbot-web-sdk/@types/model/configuration/selection-overlay-configuration";
import { UpdateResultsType } from "./types";

const findAndPickARScan = (updateResults: UpdateResultsType) => ({
  containerId: "scanner",
  returnBarcodeImage: true,
  onError: (error: Error) => {
    console.log(error);
  },
  showFinder: false,
  overlay: {
    visible: true,
    returnBarcodeImage: true,
    onBarcodeFound: (
      code: Barcode,
      polygon: IBarcodePolygonHandle,
      label: IBarcodePolygonLabelHandle
    ) => {
      if (code.format === "QR_CODE") {
        console.log(code);
        updateResults({ barcodes: [code] });
        polygon.style({
          fill: "rgba(0, 255, 0, 0.3)",
          stroke: "rgba(0, 255, 0, 1)",
        });
        label.style({
          backgroundColor: "rgba(0, 255, 0, 0.9)",
          textColor: "white",
        });
      } else {
        polygon.style({
          fill: "rgba(255, 255, 255, 0.3)",
          stroke: "rgba(255, 255, 255, 1)",
        });
        label.style({
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          textColor: "black",
        });
      }
    },
  },
});

export default findAndPickARScan;
