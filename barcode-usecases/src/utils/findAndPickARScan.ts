import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { IBarcodePolygonHandle, IBarcodePolygonLabelHandle } from "scanbot-web-sdk/@types/model/configuration/selection-overlay-configuration";

const findAndPickARScan = {
  containerId: "scanner",
  onBarcodesDetected: (result: BarcodeResult) => {
    console.log(result);
  },
  onError: (error: Error) => {
    console.log(error);
  },
	style: {
		hint: "Please scan a QR code to see FindAndPick in action!",
	},
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
      }
    },
  },
};


export default findAndPickARScan;