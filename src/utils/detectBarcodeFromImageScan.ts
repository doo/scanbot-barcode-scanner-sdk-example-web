import type { default as ScanbotSDKType } from "scanbot-web-sdk/@types/scanbot-sdk";
import { BarcodeResult } from "scanbot-web-sdk/@types/model/barcode/barcode-result";
import { toast } from "react-toastify";

export default async function detectBarcodeFromImageScan(
  scanbotSDK: ScanbotSDKType | null
) {
  if (!scanbotSDK) {
    throw new Error("Scanbot SDK not initialized yet.");
  }

  const licenseInfo = await scanbotSDK.getLicenseInfo();

  if (licenseInfo.isValid()) {
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
                const id = toast.loading("Detecting barcodes...");
                const result: BarcodeResult = await scanbotSDK.detectBarcodes(
                  reader.result as string
                );

                if (result.barcodes.length === 0) {
                  toast.update(id, {
                    render: "No barcodes detected.",
                    type: "info",
                    isLoading: false,
                  });
                  setTimeout(() => toast.dismiss(id), 5000);
                } else {
                  toast.update(id, {
                    render: `${result.barcodes.length} barcodes were detected in your image.`,
                    type: "success",
                    isLoading: false,
                  });
                  setTimeout(() => toast.dismiss(id), 5000);
                }
              } catch (error) {
                toast.error("Error while detecting barcodes: " + error);
              }
            };
          }
        };
        fileInput.remove();
      }
    } catch (error) {
      toast.error("Error during image selection: " + error);
    }
  } else {
    toast.warn(
      "License not valid. Your license is corrupted or expired, Scanbot features are disabled. Please restart the app in order to receive one minute valid license."
    );
  }
}
