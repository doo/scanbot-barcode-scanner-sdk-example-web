import { toast } from "react-toastify";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";

const toastService = {
  showToast(message: string, type: "info" | "success" | "error" | "warning") {
    toast(message, {
      type,
      autoClose: 5000,
    });
  },

  showResultInfoToast(result: BarcodeResult) {
    toast.info(
      `format: ${result.barcodes[0].format}
          text: ${result.barcodes[0].text}`,
      {
        autoClose: 5000,
      }
    );
  },

  showBarcodeInfoToast(code: Barcode) {
    toast.info(
      `format: ${code.format}
		  text: ${code.text}`,
      {
        autoClose: 5000,
      }
    );
  },

  showErrorToast(message: string) {
    toast.error(message, {
      autoClose: 5000,
    });
  },

  showWarningToast(message: string) {
    toast.warn(message, {
      autoClose: 5000,
    });
  },

  showLoadingToast(id: string | number, message = "Loading...") {
    return toast.loading(message, { toastId: id });
  },

  updateToast(
    id: string | number,
    message: string,
    type: "info" | "success" | "error" | "warning",
    autoClose: number = 5000
  ) {
    toast.update(id, {
      render: message,
      type,
      autoClose,
      isLoading: false,
    });
  },
};

export default toastService;
