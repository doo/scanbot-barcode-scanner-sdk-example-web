import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import toastService from "../services/toastService";
import { scannerService } from "../services/scannerService";

export default async function detectBarcodeFromImageScan() {
  const licenseInfo = await scannerService.getLicenseInfo();
  const scanbotSDK = scannerService.getScanbotSDK();

  if (scanbotSDK && licenseInfo.isValid()) {
    const fileInput: HTMLInputElement = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file-input";
    fileInput.accept = "image/png, image/jpeg";
    fileInput.style.display = "none";

    try {
      if (fileInput) {
        fileInput.click();

        fileInput.onchange = async (e: Event) => {
          e.preventDefault();
          const target = e.target as HTMLInputElement;

          const reader = new FileReader();
          const file = target.files?.[0];

          if (file) {
            reader.readAsDataURL(file);

            reader.onload = async () => {
              try {
                const id = toastService.showLoadingToast(
                  "Detecting barcodes..."
                );
                const result: BarcodeResult = await scanbotSDK.detectBarcodes(
                  reader.result as string
                );

                if (result.barcodes.length === 0) {
                  toastService.updateToast(id, "No barcodes detected.", "info");
                } else {
                  toastService.updateToast(
                    id,
                    `${result.barcodes.length} barcodes were detected in your image.`,
                    "success"
                  );
                }
              } catch (error) {
                toastService.showErrorToast(
                  "Error while detecting barcodes: " + error
                );
              }
            };
          }
        };
        fileInput.remove();
      }
    } catch (error) {
      toastService.showErrorToast("Error during image selection: " + error);
    }
  } else {
    toastService.showWarningToast(
      "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
    );
  }
}
