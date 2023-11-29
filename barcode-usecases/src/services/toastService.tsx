import { toast } from "react-toastify";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import BarcodeResultToast from "../components/BarcodeResultMessage";
import { ToastOptions } from "react-toastify";
import { scannerService } from "./scannerService";

const toastService = {
  showToast(message: string, type: "info" | "success" | "error" | "warning") {
    toast(message, {
      type,
      autoClose: 5000,
    });
  },

  showResultInfoToast(result: BarcodeResult, config?: ToastOptions) {
    toast.info(<BarcodeResultToast barcode={result} />, { config });
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

  resumeDetectionAfterRemoval() {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        scannerService.resume();
      }
    });
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
