import { toast } from "react-toastify";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const toastService = {
  showResultInfo(result: BarcodeResult) {
    toast.info(
      `format: ${result.barcodes[0].format}
          text: ${result.barcodes[0].text}`,
      {
        autoClose: 5000,
      }
    );
  },

  showBarcodeInfo(code: Barcode) {
    toast.info(
      `format: ${code.format}
		  text: ${code.text}`,
      {
        autoClose: 5000,
      }
    );
  },

  showErrorMessage(message: string) {
    toast.error(message, {
      autoClose: 5000,
    });
  },

  showWarningMessage(message: string) {
    toast.warn(message, {
      autoClose: 5000,
    });
  },
};

export default toastService;
