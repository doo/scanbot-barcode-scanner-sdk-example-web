import { Slide, toast } from "react-toastify";
import { Barcode } from "scanbot-web-sdk/@types/model/barcode/barcode";
import BarcodeResultToast from "../components/SingleBarcodeResult";
import { ToastOptions } from "react-toastify";
import { scannerService } from "./scannerService";

interface BaseToastProps {
  type?: "info" | "success" | "error" | "warning";
  options?: ToastOptions;
}

interface MessageToastProps extends BaseToastProps {
  message: string;
}

interface BarcodeToastProps extends BaseToastProps {
  barcode: Barcode;
}

const defaultToastOptions: ToastOptions = {
  icon: false,
  transition: Slide,
  className:
    "mb-0 shadow-none rounded-none border-b border-gray-300 last:border-0",
};

const toastService = {
  showToast({
    message,
    type = "info",
    options = defaultToastOptions,
  }: MessageToastProps) {
    toast(message, {
      type,
      ...options,
    });
  },

  showBarcodeInfoToast({
    barcode,
    options = defaultToastOptions,
    singleToast = false,
  }: BarcodeToastProps & { singleToast?: boolean }) {
    toast.info(
      <BarcodeResultToast barcode={barcode} singleToast={singleToast} />,
      {
        ...options,
        toastId: barcode.rawBytes.join(),
        closeButton: singleToast ? false : true,
      }
    );
  },

  showErrorToast({
    message = "An error has occurred",
    options = defaultToastOptions,
  }: MessageToastProps) {
    toast.error(message, { ...options, icon: true, autoClose: 4000 });
  },

  showWarningToast({
    message,
    options = defaultToastOptions,
  }: MessageToastProps) {
    toast.warn(message, options);
  },

  showLoadingToast(id: string | number, message = "Loading...") {
    return toast.loading(message, { toastId: id });
  },

  resumeDetectionAfterRemoval() {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        scannerService.getScanner()?.isDetectionPaused() &&
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
